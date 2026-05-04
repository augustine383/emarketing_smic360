"use client";

import React, { useState, useEffect } from 'react';
import { DEFAULT_TEMPLATES, EmailTemplate } from '@/lib/templates';
import { TemplateCard } from './TemplateCard';
import { Input } from "@/components/ui/input";
import { Search, LogOut, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import Image from 'next/image';

const STORAGE_KEY = "smic360_vault_data";
const LOGO_URL = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg";

export function Dashboard() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const filteredTemplates = templates.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-[6%] ring-1 ring-white/10 overflow-hidden">
              <Image 
                src={LOGO_URL} 
                alt="SMIC360 Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-headline font-bold text-foreground">SMIC360 Ltd</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Email Templates Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search templates..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-muted/30 border-none ring-1 ring-white/10 focus-visible:ring-primary h-10 text-sm"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-accent hover:bg-accent/10 h-10 w-10">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10">
        <div className="flex items-center gap-2 mb-8 bg-primary/5 border border-primary/10 p-4 rounded-xl">
          <Info className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">
            All changes are stored locally in your browser. You can edit the HTML directly and copy it for use in your email service provider.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredTemplates.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onUpdate={handleUpdate}
              onReset={handleReset}
            />
          ))}
          {filteredTemplates.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-foreground text-lg italic">No templates match your search criteria.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 px-6 md:px-10 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2024 SMIC360 Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
