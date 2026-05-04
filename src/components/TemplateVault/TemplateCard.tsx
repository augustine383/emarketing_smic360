"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Edit3, Save, RotateCcw, Eye, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmailTemplate } from '@/lib/templates';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TemplateCardProps {
  template: EmailTemplate;
  onUpdate: (updatedTemplate: EmailTemplate) => void;
  onReset: (id: string) => void;
}

export function TemplateCard({ template, onUpdate, onReset }: TemplateCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [htmlContent, setHtmlContent] = useState(template.html);
  const { toast } = useToast();

  useEffect(() => {
    setHtmlContent(template.html);
  }, [template.html]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      toast({
        title: "Copied!",
        description: "HTML content copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy content.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    onUpdate({ ...template, html: htmlContent });
    setIsEditing(false);
    toast({
      title: "Saved",
      description: "Changes saved to local vault.",
    });
  };

  const handleReset = () => {
    onReset(template.id);
    setIsEditing(false);
    toast({
      title: "Reset Complete",
      description: "Template restored to defaults.",
    });
  };

  return (
    <Card className="flex flex-col h-full bg-card/40 border-white/5 overflow-hidden ring-1 ring-white/5 hover:ring-white/10 transition-all group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-muted-foreground border-muted-foreground/20">
            {template.category}
          </Badge>
          <CardTitle className="text-xl font-headline font-semibold text-foreground">{template.title}</CardTitle>
        </div>
        <div className="flex gap-1">
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
            <DialogContent className="max-w-4xl w-[90vw] h-[80vh] flex flex-col p-0 overflow-hidden bg-white border-none">
              <DialogHeader className="p-4 border-b bg-background">
                <DialogTitle className="text-foreground">{template.title} - Full Preview</DialogTitle>
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

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditing(!isEditing)} 
            className="hover:bg-primary/10 hover:text-primary transition-colors h-8 w-8"
            title={isEditing ? "Show Preview" : "Edit HTML"}
          >
            {isEditing ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCopy} 
            className="hover:bg-primary/10 hover:text-primary transition-colors h-8 w-8"
            title="Copy Raw HTML"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 min-h-[300px] max-h-[400px] overflow-hidden p-0 border-y border-white/5 relative bg-muted/10">
        {isEditing ? (
          <Textarea 
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="w-full h-full resize-none font-code text-xs bg-transparent border-none focus-visible:ring-0 p-4 custom-scrollbar"
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
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-9 text-xs"
          >
            <Save className="h-3.5 w-3.5" /> Save Changes
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="flex-1 border-white/10 text-muted-foreground h-9 text-xs cursor-default hover:bg-transparent"
          >
            Standard Template
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={handleReset} 
          className="bg-transparent border-white/10 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 h-9 px-3"
          title="Reset to Default"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
