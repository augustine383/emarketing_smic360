"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Layout, Users, LogOut, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search, Mail, Megaphone, Home, ShoppingCart, Cpu, Layers } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { UserAccount } from '@/lib/auth';
import { EmailTemplate } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";

interface SidebarProps {
  currentUser: UserAccount;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggle: () => void;
  templates: EmailTemplate[];
  selectedTemplateId: string | null;
  onSelectTemplate: (id: string) => void;
}

export function Sidebar({ currentUser, activeTab, onTabChange, onLogout, isCollapsed, onToggle, templates, selectedTemplateId, onSelectTemplate }: SidebarProps) {
  const logoImage = PlaceHolderImages.find(img => img.id === 'brand-logo');
  const isAdmin = currentUser.role === 'Admin';
  const [templatesExpanded, setTemplatesExpanded] = useState(true);
  const [templateSearch, setTemplateSearch] = useState("");

  const navItems = [
    { id: 'templates', label: 'Vault', icon: Layout, show: true },
    { id: 'users', label: 'Accounts', icon: Users, show: isAdmin },
  ];

  const filteredTemplates = templates.filter(t =>
    templateSearch === "" || t.title.toLowerCase().includes(templateSearch.toLowerCase())
  );

  const CATEGORY_ICONS: Record<string, React.ElementType> = {
    General: Layers,
    Advertising: Megaphone,
    "Real Estate": Home,
    Procurement: ShoppingCart,
    Technology: Cpu,
  };

  const groupedTemplates = useMemo(() => {
    const groups: Record<string, typeof filteredTemplates> = {};
    for (const t of filteredTemplates) {
      const cat = t.category || "Uncategorized";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(t);
    }
    // Sort: known categories first (alphabetical), then unknown ones
    const knownOrder = ["General", "Advertising", "Real Estate", "Procurement", "Technology"];
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      const ai = knownOrder.indexOf(a);
      const bi = knownOrder.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });
    return sortedKeys.map(key => [key, groups[key]] as const);
  }, [filteredTemplates]);

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-[#0d1117] border-r border-cyan-500/10 flex flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[68px]" : "w-72",
          "max-lg:transition-transform max-lg:duration-300",
          isCollapsed ? "max-lg:-translate-x-full" : "max-lg:translate-x-0",
        )}
      >
        {/* Top glow accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500/50 via-emerald-500/30 to-transparent" />

        {/* Logo area */}
        <div className={cn(
          "flex items-center border-b border-cyan-500/10 transition-all duration-300",
          isCollapsed ? "justify-center px-2 py-4" : "gap-3 px-4 py-4"
        )}>
          <div className="relative shrink-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg opacity-30 blur-sm" />
            <div className="relative bg-[#0d1117] p-1 rounded-lg border border-cyan-500/30">
              {logoImage && (
                <Image src={logoImage.imageUrl} alt="SMIC360" width={32} height={32} className="object-contain" />
              )}
            </div>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h2 className="text-sm font-bold text-white tracking-tight whitespace-nowrap">SMIC360</h2>
              <p className="text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest whitespace-nowrap">Vault</p>
            </div>
          )}
        </div>

        {/* Navigation + Templates list */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-2 py-3 space-y-0.5">
          {/* Nav items */}
          {navItems.filter(i => i.show).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !selectedTemplateId;
            return (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); }}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg transition-all duration-200 group relative",
                  isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-r-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                )}
                <Icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
                {!isCollapsed && (
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">{item.label}</span>
                )}
              </button>
            );
          })}

          {/* Templates section (only show when vault tab is active) */}
          {activeTab === 'templates' && !isCollapsed && (
            <div className="pt-2">
              {/* Section header */}
              <button
                onClick={() => setTemplatesExpanded(prev => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors"
              >
                <span>Templates ({filteredTemplates.length})</span>
                {templatesExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {/* Template search */}
              {templatesExpanded && (
                <div className="px-2 pb-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
                    <Input
                      placeholder="Filter..."
                      value={templateSearch}
                      onChange={(e) => setTemplateSearch(e.target.value)}
                      className="pl-7 h-7 text-[11px] bg-[#161b22] border border-slate-700/30 text-slate-300 font-mono placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-cyan-500/30"
                    />
                  </div>
                </div>
              )}

              {/* Grouped template list */}
              {templatesExpanded && (
                <div className="space-y-2">
                  {groupedTemplates.map(([category, items]) => {
                    return (
                      <div key={category}>
                    {/* Category header */}
                    <div className="flex items-center gap-2 px-3 py-1.5">
                      {(() => { const CatIcon = CATEGORY_ICONS[category] || Layers; return <CatIcon className="w-3 h-3 text-slate-600" />; })()}
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{category}</span>
                          <span className="text-[9px] font-mono text-slate-600">({items.length})</span>
                        </div>
                        {/* Templates in this category */}
                        <div className="space-y-0.5 ml-1">
                          {items.map((template) => {
                            const isSelected = selectedTemplateId === template.id;
                            return (
                              <button
                                key={template.id}
                                onClick={() => onSelectTemplate(template.id)}
                                className={cn(
                                  "w-full flex items-center gap-2.5 pl-5 pr-3 py-1.5 rounded-lg transition-all duration-200 text-left group/tmpl",
                                  isSelected
                                    ? "bg-cyan-500/10 text-cyan-400"
                                    : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
                                )}
                              >
                                <div className={cn(
                                  "w-6 h-6 rounded flex items-center justify-center shrink-0 border",
                                  isSelected
                                    ? "bg-cyan-500/10 border-cyan-500/30"
                                    : "bg-[#161b22] border-slate-700/30 group-hover/tmpl:border-slate-600/50"
                                )}>
                                  <Mail className={cn("w-2.5 h-2.5", isSelected ? "text-cyan-400" : "text-slate-500 group-hover/tmpl:text-slate-300")} />
                                </div>
                                <p className={cn("text-[11px] font-semibold truncate", isSelected ? "text-cyan-400" : "text-slate-300")}>
                                  {template.title}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  {groupedTemplates.length === 0 && (
                    <p className="text-[10px] font-mono text-slate-600 text-center py-4">No templates found</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Collapsed mode: template icons */}
          {activeTab === 'templates' && isCollapsed && (
            <div className="pt-2 space-y-0.5">
              {templates.slice(0, 8).map((template) => {
                const isSelected = selectedTemplateId === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => onSelectTemplate(template.id)}
                    className={cn(
                      "w-full flex items-center justify-center py-2 rounded-lg transition-all duration-200",
                      isSelected
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
                    )}
                    title={template.title}
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          )}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-cyan-500/10 px-2 py-3 space-y-1 shrink-0">
          <div className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"
          )}>
            <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                {currentUser.username.charAt(0)}
              </span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{currentUser.username}</p>
                <p className="text-[9px] font-mono text-slate-500 uppercase">{currentUser.role}</p>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg text-slate-400 hover:bg-red-400/5 hover:text-red-400 transition-colors",
              isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && (
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">Logout</span>
            )}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#161b22] border border-cyan-500/30 rounded-full items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all z-50 shadow-lg"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>
    </>
  );
}
