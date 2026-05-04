
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const VAULT_PIN = "1234567";

interface AuthScreenProps {
  onSuccess: () => void;
}

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const logoImage = PlaceHolderImages.find(img => img.id === 'brand-logo');
  const bgImage = PlaceHolderImages.find(img => img.id === 'login-bg');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === VAULT_PIN) {
      onSuccess();
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background Image with Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={bgImage.imageUrl} 
            alt="Background" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
            data-ai-hint={bgImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
          <div className="absolute inset-0 backdrop-blur-[4px]" />
        </div>
      )}

      <Card className="relative z-10 w-full max-w-md border-none shadow-2xl bg-card/60 backdrop-blur-2xl ring-1 ring-white/10">
        <CardHeader className="text-center space-y-4 pt-10 pb-6">
          <div className="mx-auto w-20 h-20 bg-white rounded-[6%] flex items-center justify-center ring-4 ring-primary/5 overflow-hidden">
            {logoImage && (
              <Image 
                src={logoImage.imageUrl} 
                alt="SMIC360 Logo" 
                width={80} 
                height={80} 
                className="object-contain"
                data-ai-hint={logoImage.imageHint}
              />
            )}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-headline tracking-tight text-foreground">SMIC360 Ltd</CardTitle>
            <CardDescription className="text-muted-foreground/80 font-medium">Enter your 7-digit secure PIN to access the vault.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="0000000"
                maxLength={7}
                value={pin}
                onChange={(e) => {
                  setError(false);
                  setPin(e.target.value.replace(/\D/g, ''));
                }}
                className="text-center text-3xl h-16 tracking-[1em] placeholder:tracking-normal placeholder:text-muted-foreground/30 font-bold bg-muted/40 border-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-primary"
                autoFocus
              />
            </div>
            
            {error && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 animate-in fade-in zoom-in duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Access Denied</AlertTitle>
                <AlertDescription>
                  The PIN you entered is incorrect. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/10 transition-all active:scale-95"
              disabled={pin.length < 7}
            >
              Unlock Vault
            </Button>
          </form>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/50">
            <ShieldCheck className="w-4 h-4" />
            <span>256-bit Client-side Security Enabled</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
