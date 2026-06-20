
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { DEFAULT_TEMPLATES, EmailTemplate, generateHtml } from '@/lib/templates';
import { TemplateCard } from './TemplateCard';
import { UserManagement } from './UserManagement';
import { Sidebar } from './Sidebar';
import { TemplateViewer } from './TemplateViewer';
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Upload, ArrowUpDown, PanelLeft, FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { UserAccount } from '@/lib/auth';
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const STORAGE_KEY = "smic360_vault_data_v3";
const SEARCH_DEBOUNCE_MS = 300;

type SortOption = "default" | "alpha-asc" | "alpha-desc" | "category";

interface DashboardProps {
  currentUser: UserAccount;
  onLogout: () => void;
}

export function Dashboard({ currentUser, onLogout }: DashboardProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("templates");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const { toast } = useToast();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // If stored data is from old schema (no fieldGroups), clear and use defaults
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].fieldGroups) {
          setTemplates(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          setTemplates(DEFAULT_TEMPLATES);
        }
      } catch (e) {
        setTemplates(DEFAULT_TEMPLATES);
      }
    } else {
      setTemplates(DEFAULT_TEMPLATES);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    }
  }, [templates, isLoading]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(value), SEARCH_DEBOUNCE_MS);
  }, []);

  const filteredTemplates = useMemo(() => {
    let result = templates.filter(t => {
      return search.toLowerCase() === "" ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
    });
    if (sortBy === "alpha-asc") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "alpha-desc") result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    else if (sortBy === "category") result = [...result].sort((a, b) => a.category.localeCompare(b.category));
    return result;
  }, [templates, search, sortBy]);

  const handleUpdate = useCallback((updatedTemplate: EmailTemplate) => {
    setTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
  }, []);

  const handleReset = useCallback((id: string) => {
    const original = DEFAULT_TEMPLATES.find(t => t.id === id);
    if (original) setTemplates(prev => prev.map(t => t.id === id ? original : t));
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast({ title: "Template Removed", description: "The template has been deleted from the vault.", variant: "destructive" });
  }, [toast]);

  const handleDuplicate = useCallback((template: EmailTemplate) => {
    const duplicate: EmailTemplate = { ...template, id: crypto.randomUUID(), title: `${template.title} (Copy)` };
    setTemplates(prev => [duplicate, ...prev]);
    toast({ title: "Template Duplicated", description: `"${template.title}" has been copied.` });
  }, [toast]);

  const allCategories = useMemo(() => {
    const cats = [...new Set(templates.map(t => t.category))];
    return cats.sort();
  }, [templates]);

  const handleAddTemplate = useCallback((category?: string) => {
    const newTemplate: EmailTemplate = {
      id: crypto.randomUUID(),
      title: "New Template",
      category: category || "General",
      fieldGroups: [
        {
          name: "Content",
          fields: [
            { key: "heading", label: "Heading", type: "text", placeholder: "e.g. Your Heading Here" },
            { key: "body", label: "Body Text", type: "textarea", placeholder: "Write your message..." },
          ],
        },
        {
          name: "Call to Action",
          fields: [
            { key: "cta", label: "Button Text", type: "text", placeholder: "e.g. Learn More" },
            { key: "ctaUrl", label: "Button Link", type: "text", placeholder: "https://..." },
          ],
        },
      ],
      values: {
        heading: "New <em>Template</em>",
        body: "Start building your custom content here. Click edit to modify the fields.",
        cta: "Get Started",
        ctaUrl: "#",
      },
      html: "",
    };
    newTemplate.html = generateHtml(newTemplate);
    setTemplates(prev => [newTemplate, ...prev]);
    toast({ title: "Template Created", description: "A new blank template has been added to your vault." });
  }, [toast]);

  const handleExport = useCallback(() => {
    const data = JSON.stringify(templates, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smic360-templates-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export Complete", description: `${templates.length} templates exported to JSON.` });
  }, [templates, toast]);

  const handleImport = useCallback(() => { fileInputRef.current?.click(); }, []);

  const handleImportFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported) && imported.every((t: any) => t.id && t.title && t.html)) {
          setTemplates(prev => [...imported, ...prev]);
          toast({ title: "Import Complete", description: `${imported.length} templates imported.` });
        } else {
          toast({ title: "Import Failed", description: "Invalid template file format.", variant: "destructive" });
        }
      } catch { toast({ title: "Import Failed", description: "Could not parse the file.", variant: "destructive" }); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [toast]);

  const stats = useMemo(() => ({
    total: templates.length,
    edited: templates.filter(t => !DEFAULT_TEMPLATES.find(d => d.id === t.id && d.html === t.html)).length,
    categories: new Set(templates.map(t => t.category)).size,
  }), [templates]);

  const [htmlImportOpen, setHtmlImportOpen] = useState(false);
  const [htmlImportCode, setHtmlImportCode] = useState("");
  const [htmlImportName, setHtmlImportName] = useState("");
  const [htmlImportCategory, setHtmlImportCategory] = useState("General");

  const handleHtmlImport = useCallback(() => {
    const raw = htmlImportCode.trim();
    if (!raw) {
      toast({ title: "No HTML", description: "Paste some HTML code first.", variant: "destructive" });
      return;
    }
    const title = htmlImportName.trim() || "Imported Template";
    const newTemplate: EmailTemplate = {
      id: crypto.randomUUID(),
      title,
      category: htmlImportCategory || "General",
      fieldGroups: [
        { name: "Raw HTML", fields: [
          { key: "rawHtml", label: "HTML Source", type: "textarea", placeholder: "Paste your HTML here..." },
        ]},
      ],
      values: { rawHtml: raw },
      html: raw,
    };
    setTemplates(prev => [newTemplate, ...prev]);
    setHtmlImportOpen(false);
    setHtmlImportCode("");
    setHtmlImportName("");
    setHtmlImportCategory("General");
    toast({ title: "Template Imported", description: `"${title}" has been added to your vault.` });
  }, [htmlImportCode, htmlImportName, htmlImportCategory, toast]);

  return (
    <div className="min-h-screen bg-[#0a0e17] flex">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.03) 2px, rgba(0,255,136,0.03) 4px)',
      }} />

      {/* Sidebar */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); setSelectedTemplateId(null); }}
        onLogout={onLogout}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(prev => !prev)}
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={(id) => { setSelectedTemplateId(id); setActiveTab('templates'); }}
      />

      {/* Main area — offset by sidebar width */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[68px]' : 'lg:ml-64'}`}>
        {/* Top status bar */}
        <div className="bg-[#0d1117] border-b border-cyan-500/20 px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest">System Online</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400/50">SMIC360 VAULT v2.0</span>
        </div>

        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-[#0d1117]/90 backdrop-blur-md border-b border-cyan-500/10">
          <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-3">
            {/* Left: mobile toggle + page title */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(prev => !prev)}
                className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5 h-9 w-9 lg:hidden"
                aria-label="Toggle sidebar"
              >
                <PanelLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight font-mono uppercase">
                  {activeTab === 'templates' ? 'Email Templates' : 'User Accounts'}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-mono">Dashboard</span>
                  <div className="w-1 h-1 rounded-full bg-cyan-400" />
                  <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded font-mono uppercase">
                    {currentUser.role}: {currentUser.username}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                <Input
                  placeholder="Search vault..."
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 bg-[#161b22] border border-slate-700/50 text-slate-300 h-9 text-sm w-48 md:w-64 focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/50 font-mono placeholder:text-slate-600"
                  aria-label="Search templates"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5 h-9 w-9">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#161b22] border border-slate-700/50">
                  <DropdownMenuLabel className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Sort By</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSortBy("default")} className="font-mono text-xs text-slate-300 cursor-pointer">Default Order</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("alpha-asc")} className="font-mono text-xs text-slate-300 cursor-pointer">Name A → Z</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("alpha-desc")} className="font-mono text-xs text-slate-300 cursor-pointer">Name Z → A</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700/50" />
                  <DropdownMenuItem onClick={() => setSortBy("category")} className="font-mono text-xs text-slate-300 cursor-pointer">Category</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {(currentUser.role === 'Admin' || currentUser.role === 'Manager') && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="gap-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs h-9 px-3 hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20">
                        <Plus className="w-3.5 h-3.5" />
                        New
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#161b22] border border-slate-700/50">
                      <DropdownMenuLabel className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Select Category</DropdownMenuLabel>
                      {allCategories.map(cat => (
                        <DropdownMenuItem key={cat} onClick={() => handleAddTemplate(cat)} className="font-mono text-xs text-slate-300 cursor-pointer">
                          {cat}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5 h-9 w-9" title="Import / Export">
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#161b22] border border-slate-700/50">
                      <DropdownMenuItem onClick={handleExport} className="gap-2 cursor-pointer font-mono text-xs text-slate-300">
                        <Download className="h-3.5 w-3.5" /> Export All Templates
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleImport} className="gap-2 cursor-pointer font-mono text-xs text-slate-300">
                        <Upload className="h-3.5 w-3.5" /> Import Templates
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-700/50" />
                      <DropdownMenuItem onClick={() => setHtmlImportOpen(true)} className="gap-2 cursor-pointer font-mono text-xs text-slate-300">
                        <FileCode2 className="h-3.5 w-3.5" /> Import from HTML
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImportFile} />
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 min-h-0">
          {activeTab === 'templates' && selectedTemplateId ? (
            /* Template Viewer - large preview */
            <div className="h-full" style={{ minHeight: 'calc(100vh - 140px)' }}>
              <TemplateViewer
                template={templates.find(t => t.id === selectedTemplateId)!}
                currentUser={currentUser}
                onUpdate={handleUpdate}
                onReset={handleReset}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onBack={() => setSelectedTemplateId(null)}
              />
            </div>
          ) : activeTab === 'templates' ? (
            /* Template Grid - default view */
            <>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-[#161b22] border border-slate-700/30 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/5 to-transparent" />
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Total Templates</p>
                  <p className="text-2xl font-bold text-white font-mono">{stats.total}</p>
                </div>
                <div className="bg-[#161b22] border border-slate-700/30 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/5 to-transparent" />
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Customized</p>
                  <p className="text-2xl font-bold text-emerald-400 font-mono">{stats.edited}</p>
                </div>
                <div className="bg-[#161b22] border border-slate-700/30 rounded-lg p-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/5 to-transparent" />
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Categories</p>
                  <p className="text-2xl font-bold text-amber-400 font-mono">{stats.categories}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Templates</h2>
                <Badge variant="secondary" className="h-5 min-w-[20px] justify-center text-[10px] px-1.5 bg-cyan-500/10 text-cyan-400 border-none font-mono">
                  {filteredTemplates.length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filteredTemplates.map(template => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    currentUser={currentUser}
                    onUpdate={handleUpdate}
                    onReset={handleReset}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                    onSelect={() => setSelectedTemplateId(template.id)}
                  />
                ))}
                {filteredTemplates.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-16 h-16 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700/50">
                      <Search className="w-7 h-7 text-slate-600" />
                    </div>
                    <p className="text-slate-400 text-sm font-mono">
                      {search ? `No matches for "${search}"` : "Your vault is empty."}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : null}

          {activeTab === 'users' && currentUser.role === 'Admin' && (
            <UserManagement />
          )}
        </main>

        <footer className="border-t border-slate-700/30 bg-[#0d1117] mt-auto">
          <div className="px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-[11px] text-slate-600 font-mono">&copy; 2025 SMIC360 Ltd. Enterprise Vault Operations.</p>
            <div className="flex gap-5">
              <a href="#" className="text-[11px] text-cyan-400/60 hover:text-cyan-400 transition-colors font-mono">Security Protocol</a>
              <a href="#" className="text-[11px] text-cyan-400/60 hover:text-cyan-400 transition-colors font-mono">System Status</a>
              <a href="#" className="text-[11px] text-cyan-400/60 hover:text-cyan-400 transition-colors font-mono">Operations</a>
            </div>
          </div>
        </footer>
      </div>
      <Toaster />

      {/* Import HTML Modal */}
      {htmlImportOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setHtmlImportOpen(false)}>
          <div className="bg-[#161b22] border border-slate-700/50 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl shadow-cyan-500/5" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-700/30 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Import HTML Template</h2>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">Paste any HTML email template to add it to your vault</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setHtmlImportOpen(false)} className="h-7 w-7 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Template Name</label>
                  <Input
                    value={htmlImportName}
                    onChange={e => setHtmlImportName(e.target.value)}
                    placeholder="e.g. Summer Campaign 2026"
                    className="h-9 text-xs bg-[#0d1117] border border-slate-700/50 text-white font-mono focus-visible:ring-1 focus-visible:ring-cyan-500/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Category</label>
                  <Input
                    value={htmlImportCategory}
                    onChange={e => setHtmlImportCategory(e.target.value)}
                    placeholder="e.g. Marketing"
                    className="h-9 text-xs bg-[#0d1117] border border-slate-700/50 text-white font-mono focus-visible:ring-1 focus-visible:ring-cyan-500/30"
                  />
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">HTML Source</label>
                <textarea
                  value={htmlImportCode}
                  onChange={e => setHtmlImportCode(e.target.value)}
                  placeholder="Paste your full HTML email template here..."
                  className="w-full min-h-[300px] text-[11px] font-mono text-slate-300 bg-[#0d1117] border border-slate-700/50 rounded-lg p-4 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500/30 custom-scrollbar"
                  spellCheck={false}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-700/30 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setHtmlImportOpen(false)} className="text-xs font-mono text-slate-400 hover:text-white h-9">
                Cancel
              </Button>
              <Button onClick={handleHtmlImport} className="gap-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs h-9 px-4 hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20">
                <FileCode2 className="w-3.5 h-3.5" /> Import Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
