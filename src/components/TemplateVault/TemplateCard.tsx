
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Edit3, Maximize2, Check, Trash2, Mail, Code, CopyPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmailTemplate } from '@/lib/templates';
import { toGmailHtml } from '@/lib/gmail';
import { Badge } from "@/components/ui/badge";
import { UserAccount } from '@/lib/auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TemplateCardProps {
  template: EmailTemplate;
  currentUser: UserAccount;
  onUpdate: (updatedTemplate: EmailTemplate) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (template: EmailTemplate) => void;
  onSelect?: () => void;
}

export function TemplateCard({ template, currentUser, onUpdate, onReset, onDelete, onDuplicate, onSelect }: TemplateCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isGmailCopied, setIsGmailCopied] = useState(false);
  const { toast } = useToast();

  const canDelete = currentUser.role === 'Admin';

  const handleCopyGmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const gmailHtml = toGmailHtml(template.html);
      const type = "text/html";
      const blob = new Blob([gmailHtml], { type });
      const data = [new ClipboardItem({
        [type]: blob,
        "text/plain": new Blob([gmailHtml], { type: "text/plain" })
      })];
      await navigator.clipboard.write(data);
      setIsGmailCopied(true);
      setTimeout(() => setIsGmailCopied(false), 2000);
      toast({ title: "Copied for Gmail", description: `${template.title} is ready to paste into Gmail compose.` });
    } catch {
      try {
        const gmailHtml = toGmailHtml(template.html);
        await navigator.clipboard.writeText(gmailHtml);
        setIsGmailCopied(true);
        setTimeout(() => setIsGmailCopied(false), 2000);
        toast({ title: "Copied for Gmail", description: `${template.title} HTML copied. Paste into Gmail compose.` });
      } catch {
        toast({ title: "Error", description: "Clipboard access denied.", variant: "destructive" });
      }
    }
  };

  const handleCopyRaw = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const type = "text/html";
      const blob = new Blob([template.html], { type });
      const data = [new ClipboardItem({
        [type]: blob,
        "text/plain": new Blob([template.html], { type: "text/plain" })
      })];
      await navigator.clipboard.write(data);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({ title: "HTML Source Copied", description: `${template.title} raw HTML source copied.` });
    } catch {
      try {
        await navigator.clipboard.writeText(template.html);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast({ title: "HTML Source Copied", description: `${template.title} raw HTML copied as text.` });
      } catch {
        toast({ title: "Error", description: "Clipboard access denied.", variant: "destructive" });
      }
    }
  };

  return (
    <Card
      className="flex flex-col h-full bg-[#161b22] border border-slate-700/30 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 group relative cursor-pointer"
      onClick={onSelect}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
        <div className="space-y-1.5 flex-1 min-w-0">
          <Badge variant="outline" className="text-[9px] uppercase tracking-[0.2em] font-mono text-cyan-400 border-cyan-500/20 bg-cyan-500/5">
            {template.category}
          </Badge>
          <CardTitle className="text-sm font-semibold text-white truncate">{template.title}</CardTitle>
        </div>

        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity self-start">
          <Button
            variant="ghost" size="icon"
            onClick={(e) => { e.stopPropagation(); onDuplicate(template); }}
            className="hover:bg-cyan-400/10 hover:text-cyan-400 transition-colors h-7 w-7"
            title="Duplicate"
          >
            <CopyPlus className="h-3.5 w-3.5" />
          </Button>
          {canDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost" size="icon"
                  className="hover:bg-red-400/10 hover:text-red-400 transition-colors h-7 w-7"
                  title="Remove"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#161b22] border border-slate-700/50">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-sm text-white font-semibold">Permanent Deletion?</AlertDialogTitle>
                  <AlertDialogDescription className="text-xs text-slate-400 font-mono">
                    This will remove &quot;{template.title}&quot; from the vault records.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border border-slate-700/50 text-slate-400 font-mono text-xs h-8">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(template.id)} className="bg-red-500 text-white font-mono text-xs h-8 hover:bg-red-600">
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button
            variant="ghost" size="icon"
            className="hover:bg-cyan-400/10 hover:text-cyan-400 transition-colors h-7 w-7"
            title="Open Template"
            onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-[280px] max-h-[380px] overflow-hidden p-0 border-y border-slate-700/20 relative bg-[#0d1117] group/preview">
        <div className="w-full h-full overflow-auto custom-scrollbar bg-white rounded-none relative">
          <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/5 transition-colors z-10 pointer-events-none" />
          <iframe
            srcDoc={template.html}
            title={template.title}
            className="w-full h-full border-none pointer-events-none"
            style={{ minHeight: '100%' }}
          />
          <div className="absolute bottom-2 right-2 opacity-0 group-hover/preview:opacity-100 transition-opacity z-20">
            <span className="bg-[#0d1117]/80 text-[9px] font-mono text-cyan-400 px-2 py-1 rounded border border-cyan-500/20 backdrop-blur-sm">
              Click to view
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-3 pb-3 relative">
        <Button
          onClick={handleCopyGmail}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black hover:from-cyan-400 hover:to-emerald-400 gap-1.5 h-9 font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          {isGmailCopied ? <Check className="h-3.5 w-3.5" /> : <Mail className="h-3.5 w-3.5" />}
          {isGmailCopied ? "Copied!" : "Copy for Gmail"}
        </Button>
        <Button
          onClick={handleCopyRaw}
          variant="outline"
          className="bg-transparent border border-slate-700/50 hover:bg-white/5 h-9 px-3"
          title="Copy HTML"
        >
          {isCopied ? <Check className="h-3.5 w-3.5" /> : <Code className="h-3.5 w-3.5" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
