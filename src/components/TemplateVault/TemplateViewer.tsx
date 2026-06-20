"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft, Copy, Edit3, Save, RotateCcw, Trash2, X, Mail, Code,
  CopyPlus, Check, Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmailTemplate, generateHtml } from '@/lib/templates';
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
import { cn } from "@/lib/utils";

interface TemplateViewerProps {
  template: EmailTemplate;
  currentUser: UserAccount;
  onUpdate: (updatedTemplate: EmailTemplate) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (template: EmailTemplate) => void;
  onBack: () => void;
}

export function TemplateViewer({ template, currentUser, onUpdate, onReset, onDelete, onDuplicate, onBack }: TemplateViewerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({ ...(template.values || {}) });
  const [isCopied, setIsCopied] = useState(false);
  const [isGmailCopied, setIsGmailCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [htmlSourceVisible, setHtmlSourceVisible] = useState(false);
  const [highlightText, setHighlightText] = useState(true);
  const { toast } = useToast();

  const canEdit = currentUser.role === 'Admin' || currentUser.role === 'Manager';
  const canDelete = currentUser.role === 'Admin';

  const renderedHtml = useMemo(() => {
    const t = { ...template, values: values || {} };
    return generateHtml(t);
  }, [template, values]);

  useEffect(() => {
    setValues({ ...(template.values || {}) });
    setIsEditing(false);
    setIsGmailCopied(false);
    setIsCopied(false);
    setPreviewMode("desktop");
    setHtmlSourceVisible(false);
  }, [template.id]);

  const handleFieldChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleCopyGmail = async () => {
    try {
      const gmailHtml = toGmailHtml(renderedHtml);
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
        const gmailHtml = toGmailHtml(renderedHtml);
        await navigator.clipboard.writeText(gmailHtml);
        setIsGmailCopied(true);
        setTimeout(() => setIsGmailCopied(false), 2000);
        toast({ title: "Copied for Gmail", description: `${template.title} HTML copied. Paste into Gmail compose.` });
      } catch {
        toast({ title: "Error", description: "Clipboard access denied.", variant: "destructive" });
      }
    }
  };

  const highlightEditable = (html: string): React.ReactNode[] => {
    const segments = html.split(/(<[^>]+>)/g);
    return segments.map((seg, i) => {
      if (seg.startsWith('<')) return <span key={i}>{seg}</span>;
      const trimmed = seg.trim();
      if (!trimmed) return <span key={i}>{seg}</span>;
      return (
        <span key={i}>
          {seg.replace(trimmed, '')}
          <span style={{ background: 'rgba(34,211,238,0.08)', borderBottom: '1px solid rgba(34,211,238,0.25)', borderRadius: '2px', padding: '0 1px' }}>
            {trimmed}
          </span>
        </span>
      );
    });
  };

  const handleCopyRaw = async () => {
    try {
      const type = "text/html";
      const blob = new Blob([renderedHtml], { type });
      const data = [new ClipboardItem({
        [type]: blob,
        "text/plain": new Blob([renderedHtml], { type: "text/plain" })
      })];
      await navigator.clipboard.write(data);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({ title: "HTML Source Copied", description: `${template.title} raw HTML source copied.` });
    } catch {
      try {
        await navigator.clipboard.writeText(renderedHtml);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast({ title: "HTML Source Copied", description: `${template.title} raw HTML copied as text.` });
      } catch {
        toast({ title: "Error", description: "Clipboard access denied.", variant: "destructive" });
      }
    }
  };

  const handleSave = () => {
    const updatedHtml = generateHtml({ ...template, values });
    onUpdate({ ...template, values, html: updatedHtml });
    setIsEditing(false);
    toast({ title: "Changes Saved", description: "Template committed to vault storage." });
  };

  const handleReset = () => {
    onReset(template.id);
    setIsEditing(false);
    toast({ title: "Reset", description: "Restored to factory standard." });
  };

  const handleCancel = () => {
    setValues({ ...(template.values || {}) });
    setIsEditing(false);
  };

  const totalFields = (template.fieldGroups || []).reduce((acc, g) => acc + g.fields.length, 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Action bar */}
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-slate-400 hover:text-white hover:bg-white/5 h-9 w-9 shrink-0"
            aria-label="Back to templates"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[9px] uppercase tracking-[0.2em] font-mono text-cyan-400 border-cyan-500/20 bg-cyan-500/5 shrink-0">
                {template.category}
              </Badge>
              <h2 className="text-base font-bold text-white truncate">{template.title}</h2>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex bg-[#161b22] border border-slate-700/30 rounded-lg p-0.5 mr-1">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all",
                previewMode === "desktop" ? "bg-cyan-500/10 text-cyan-400" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Desktop
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all",
                previewMode === "mobile" ? "bg-cyan-500/10 text-cyan-400" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Mobile
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHtmlSourceVisible(prev => !prev)}
            className={cn(
              "h-9 w-9",
              htmlSourceVisible ? "text-cyan-400 bg-cyan-400/10" : "text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5"
            )}
            title="View HTML Source"
          >
            <Code className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDuplicate(template)}
            className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5 h-9 w-9"
            title="Duplicate"
          >
            <CopyPlus className="w-3.5 h-3.5" />
          </Button>

          {canEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
              className={cn(
                "h-9 w-9",
                isEditing ? "text-red-400 hover:text-red-400 hover:bg-red-400/10" : "text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5"
              )}
              title={isEditing ? "Discard" : "Edit"}
            >
              {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            </Button>
          )}

          {canDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 hover:bg-red-400/5 h-9 w-9" title="Delete">
                  <Trash2 className="w-3.5 h-3.5" />
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
                  <AlertDialogAction onClick={() => { onDelete(template.id); onBack(); }} className="bg-red-500 text-white font-mono text-xs h-8 hover:bg-red-600">
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {isEditing ? (
            <Button
              onClick={handleSave}
              className="gap-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs h-9 px-3 hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20"
            >
              <Save className="w-3.5 h-3.5" /> Save
            </Button>
          ) : (
            <div className="flex bg-[#161b22] border border-slate-700/30 rounded-lg overflow-hidden">
              <Button
                onClick={handleCopyGmail}
                className="gap-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs h-9 px-3 hover:from-cyan-400 hover:to-emerald-400 rounded-none border-none"
              >
                {isGmailCopied ? <Check className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                {isGmailCopied ? "Copied!" : "Gmail"}
              </Button>
              <Button
                onClick={handleCopyRaw}
                variant="ghost"
                className="gap-1.5 text-slate-300 hover:text-white font-bold text-xs h-9 px-3 hover:bg-white/5 rounded-none"
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                {isCopied ? "Copied!" : "HTML"}
              </Button>
            </div>
          )}

          {canEdit && !isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 h-9 w-9"
              title="Reset to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Editor or Preview */}
      <div className="flex-1 flex gap-4 min-h-0">
        {isEditing ? (
          /* Field-based editor */
          <div className="w-[380px] shrink-0 bg-[#161b22] border border-slate-700/30 rounded-xl overflow-hidden flex flex-col min-h-0">
            <div className="bg-[#0d1117] border-b border-slate-700/30 px-4 py-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Edit Fields ({totalFields})
              </span>
              <span className="text-[9px] font-mono text-cyan-400/60">{template.category}</span>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-5">
              {(template.fieldGroups || []).length === 0 ? (
                <p className="text-[11px] font-mono text-slate-500 text-center py-8">No editable fields defined for this template.</p>
              ) : (template.fieldGroups || []).map((group) => (
                <div key={group.name}>
                  <h3 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">{group.name}</h3>
                  <div className="space-y-3">
                    {group.fields.map((field) => (
                      <div key={field.key} className="space-y-1">
                        <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-500">{field.label}</Label>
                        {field.type === 'textarea' ? (
                          <Textarea
                            value={values[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="min-h-[80px] text-xs bg-[#0d1117] border border-slate-700/50 text-white font-mono resize-none focus-visible:ring-1 focus-visible:ring-cyan-500/30"
                            spellCheck={false}
                          />
                        ) : (
                          <Input
                            value={values[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="h-8 text-xs bg-[#0d1117] border border-slate-700/50 text-white font-mono focus-visible:ring-1 focus-visible:ring-cyan-500/30"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Preview area */}
        <div className={cn(
          "flex-1 flex flex-col min-h-0",
          isEditing ? "" : ""
        )}>
          <div className="bg-[#161b22] border border-slate-700/30 rounded-xl overflow-hidden flex flex-col h-full">
            {/* Browser chrome */}
            <div className="bg-[#0d1117] border-b border-slate-700/30 px-4 py-2 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 bg-[#161b22] rounded-md px-3 py-1 border border-slate-700/20">
                <span className="text-[10px] font-mono text-slate-500">email-preview://vault</span>
              </div>
              {!isEditing && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-slate-600" />
                  <span className="text-[9px] font-mono text-slate-600">Preview</span>
                </div>
              )}
            </div>
            {/* Preview frame */}
            <div className="flex-1 bg-white min-h-0 flex items-start justify-center overflow-auto">
              <div className={cn(
                "transition-all duration-300 h-full",
                previewMode === "mobile" ? "w-[375px] max-w-full" : "w-full"
              )}>
                <iframe
                  srcDoc={renderedHtml}
                  title={`${template.title} preview`}
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* HTML source panel */}
        {htmlSourceVisible && (
          <div className="w-[380px] shrink-0 bg-[#161b22] border border-slate-700/30 rounded-xl overflow-hidden flex flex-col min-h-0">
            <div className="bg-[#0d1117] border-b border-slate-700/30 px-4 py-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">HTML Source</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setHighlightText(prev => !prev)}
                  className={`h-6 w-6 ${highlightText ? 'text-cyan-400' : 'text-slate-500'}`}
                  title={highlightText ? 'Highlight ON' : 'Highlight OFF'}
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyRaw}
                  className="h-6 w-6 text-slate-400 hover:text-cyan-400"
                  title="Copy HTML"
                >
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </div>
            <pre className="flex-1 overflow-auto p-4 text-[10px] font-mono text-slate-400 leading-relaxed custom-scrollbar whitespace-pre-wrap break-all">
              {highlightText ? highlightEditable(renderedHtml) : renderedHtml}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
