
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Edit3, Save, RotateCcw, Maximize2, Check, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmailTemplate } from '@/lib/templates';
import { Badge } from "@/components/ui/badge";
import { UserAccount } from '@/lib/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
}

export function TemplateCard({ template, currentUser, onUpdate, onReset, onDelete }: TemplateCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(template.title);
  const [category, setCategory] = useState(template.category);
  const [htmlContent, setHtmlContent] = useState(template.html);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const canEdit = currentUser.role === 'Admin' || currentUser.role === 'Manager';
  const canDelete = currentUser.role === 'Admin';

  useEffect(() => {
    setTitle(template.title);
    setCategory(template.category);
    setHtmlContent(template.html);
  }, [template]);

  const handleCopy = async () => {
    try {
      const type = "text/html";
      const blob = new Blob([htmlContent], { type });
      const data = [new ClipboardItem({
        [type]: blob,
        "text/plain": new Blob([htmlContent], { type: "text/plain" })
      })];
      
      await navigator.clipboard.write(data);
      
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      toast({
        title: "Success",
        description: "Template copied for direct paste into email client.",
      });
    } catch (err) {
      try {
        await navigator.clipboard.writeText(htmlContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast({
          title: "Code Copied",
          description: "HTML source copied to clipboard.",
        });
      } catch (fallbackErr) {
        toast({
          title: "Error",
          description: "Clipboard access denied.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = () => {
    onUpdate({ ...template, title, category, html: htmlContent });
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Changes committed to vault storage.",
    });
  };

  const handleReset = () => {
    onReset(template.id);
    setIsEditing(false);
    toast({
      title: "Reset",
      description: "Restored to factory standard.",
    });
  };

  const handleCancel = () => {
    setTitle(template.title);
    setCategory(template.category);
    setHtmlContent(template.html);
    setIsEditing(false);
  };

  return (
    <Card className="flex flex-col h-full bg-card/40 border-white/5 overflow-hidden ring-1 ring-white/5 hover:ring-white/10 transition-all group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1 flex-1">
          {!isEditing ? (
            <>
              <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
                {template.category}
              </Badge>
              <CardTitle className="text-xl font-headline font-semibold text-foreground line-clamp-1">{template.title}</CardTitle>
            </>
          ) : (
            <div className="space-y-3 pr-4">
               <div className="space-y-1">
                <Label className="text-[10px] uppercase text-muted-foreground">Category</Label>
                <Input 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="h-7 text-xs bg-muted/40 border-white/10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] uppercase text-muted-foreground">Title</Label>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="h-8 text-sm font-semibold bg-muted/40 border-white/10"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity self-start">
          {!isEditing && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-primary/10 hover:text-primary transition-colors h-8 w-8"
                    title="Full Preview"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-white border-none">
                  <DialogHeader className="p-4 border-b bg-background flex flex-row items-center justify-between space-y-0">
                    <DialogTitle className="text-foreground">{template.title} - Preview</DialogTitle>
                    <Button onClick={handleCopy} size="sm" className="gap-2 bg-primary text-primary-foreground">
                      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      Copy Rendered
                    </Button>
                  </DialogHeader>
                  <div className="flex-1 w-full bg-white">
                    <iframe 
                      srcDoc={htmlContent} 
                      title={`${template.title} full preview`}
                      className="w-full h-full border-none"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-destructive/10 hover:text-destructive transition-colors h-8 w-8"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Permanent Deletion?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will scrub "{template.title}" from the vault records.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-transparent border-white/10">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(template.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Confirm Deletion
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </>
          )}

          {canEdit && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => isEditing ? handleCancel() : setIsEditing(true)} 
              className="hover:bg-primary/10 hover:text-primary transition-colors h-8 w-8"
              title={isEditing ? "Discard" : "Modify"}
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 min-h-[350px] max-h-[450px] overflow-hidden p-0 border-y border-white/5 relative bg-muted/5">
        {isEditing ? (
          <Textarea 
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="w-full h-full resize-none font-code text-[11px] bg-transparent border-none focus-visible:ring-0 p-6 custom-scrollbar leading-relaxed text-muted-foreground"
            spellCheck={false}
          />
        ) : (
          <div className="w-full h-full overflow-auto custom-scrollbar bg-white rounded-none">
            <iframe 
              srcDoc={htmlContent} 
              title={template.title} 
              className="w-full h-full border-none"
              style={{ minHeight: '100%' }}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 pb-4">
        {isEditing ? (
          <Button 
            onClick={handleSave} 
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-10 font-medium"
          >
            <Save className="h-4 w-4" /> Commit Changes
          </Button>
        ) : (
          <Button 
            onClick={handleCopy}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-10 font-medium shadow-lg shadow-primary/10"
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            Copy Template
          </Button>
        )}
        
        {!isEditing && canEdit && (
          <Button 
            variant="outline" 
            onClick={handleReset} 
            className="bg-transparent border-white/10 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 h-10 px-3"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
