
"use client";

import React, { useState, useEffect } from 'react';
import { DEFAULT_TEMPLATES, EmailTemplate } from '@/lib/templates';
import { TemplateCard } from './TemplateCard';
import { UserManagement } from './UserManagement';
import { Input } from "@/components/ui/input";
import { Search, LogOut, Plus, Users, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from "@/hooks/use-toast";
import { UserAccount } from '@/lib/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STORAGE_KEY = "smic360_vault_data_v2";

interface DashboardProps {
  currentUser: UserAccount;
  onLogout: () => void;
}

export function Dashboard({ currentUser, onLogout }: DashboardProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const logoImage = PlaceHolderImages.find(img => img.id === 'brand-logo');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTemplates(JSON.parse(stored));
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

  const handleUpdate = (updatedTemplate: EmailTemplate) => {
    setTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
  };

  const handleReset = (id: string) => {
    const original = DEFAULT_TEMPLATES.find(t => t.id === id);
    if (original) {
      setTemplates(prev => prev.map(t => t.id === id ? original : t));
    }
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Template Removed",
      description: "The template has been deleted from the vault.",
      variant: "destructive",
    });
  };

  const handleAddTemplate = () => {
    const newTemplate: EmailTemplate = {
      id: crypto.randomUUID(),
      title: "New Template",
      category: "Uncategorized",
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { background-color: #050505; font-family: sans-serif; padding: 40px; color: #888; text-align: center; }
    .card { max-width: 600px; margin: 0 auto; background: #0C0C0C; border: 1px solid #C9963A; padding: 40px; }
    h1 { color: #C9963A; }
  </style>
</head>
<body>
  <div class="card">
    <h1>New SMIC360 Template</h1>
    <p>Start building your custom content here.</p>
  </div>
</body>
</html>`
    };
    setTemplates(prev => [newTemplate, ...prev]);
    toast({
      title: "Template Created",
      description: "A new blank template has been added to your vault.",
    });
  };

  const filteredTemplates = templates.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-[6%] ring-1 ring-white/10 overflow-hidden">
              {logoImage && (
                <Image 
                  src={logoImage.imageUrl} 
                  alt="SMIC360 Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-headline font-bold text-foreground">SMIC360 Ltd</h1>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Repository</p>
                <div className="w-1 h-1 rounded-full bg-primary" />
                <p className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                  {currentUser.role}: {currentUser.username}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search vault..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-muted/30 border-none ring-1 ring-white/10 focus-visible:ring-primary h-10 text-sm"
              />
            </div>
            
            {(currentUser.role === 'Admin' || currentUser.role === 'Manager') && (
              <Button onClick={handleAddTemplate} className="gap-2 bg-primary text-primary-foreground font-semibold">
                <Plus className="w-4 h-4" />
                New
              </Button>
            )}

            <Button variant="ghost" size="icon" onClick={onLogout} className="text-muted-foreground hover:text-accent hover:bg-accent/10 h-10 w-10">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10">
        <Tabs defaultValue="templates" className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/30 border border-white/5 p-1">
              <TabsTrigger value="templates" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Layout className="w-4 h-4" />
                Vault
              </TabsTrigger>
              {currentUser.role === 'Admin' && (
                <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Users className="w-4 h-4" />
                  Accounts
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <TabsContent value="templates" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  currentUser={currentUser}
                  onUpdate={handleUpdate}
                  onReset={handleReset}
                  onDelete={handleDelete}
                />
              ))}
              {filteredTemplates.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-muted-foreground text-lg italic">No matches found in your repository.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {currentUser.role === 'Admin' && (
            <TabsContent value="users" className="m-0">
              <UserManagement />
            </TabsContent>
          )}
        </Tabs>
      </main>

      <footer className="border-t border-white/5 py-8 px-6 md:px-10 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2024 SMIC360 Ltd. Enterprise Vault Operations.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Security Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">System Status</a>
            <a href="#" className="hover:text-primary transition-colors">Operations</a>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
