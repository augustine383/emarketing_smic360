
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, ShieldCheck, Lock, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { UserAccount, getStoredUsers } from '@/lib/auth';

interface AuthScreenProps {
  onLogin: (user: UserAccount) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logoImage = PlaceHolderImages.find(img => img.id === 'brand-logo');
  const bgImage = PlaceHolderImages.find(img => img.id === 'login-bg');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (pin.length < 7 || !username) return;

    setIsSubmitting(true);
    setError(false);
    
    const users = getStoredUsers();
    const foundUser = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.pin === pin
    );

    setTimeout(() => {
      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError(true);
        setPin("");
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-background">
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

      <Card className="relative z-10 w-full max-w-md border-none shadow-2xl bg-card/80 backdrop-blur-2xl ring-1 ring-white/10">
        <CardHeader className="text-center space-y-4 pt-10 pb-6">
          <div className="mx-auto w-24 h-24 bg-white rounded-[6%] flex items-center justify-center ring-4 ring-primary/5 shadow-xl overflow-hidden">
            {logoImage ? (
              <Image 
                src={logoImage.imageUrl} 
                alt="SMIC360 Logo" 
                width={96} 
                height={96} 
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                 <Lock className="w-8 h-8 text-primary" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-headline font-bold tracking-tight text-foreground">SMIC360 Vault</CardTitle>
            <CardDescription className="text-muted-foreground/90 font-medium px-4">Authorized Access Only. Please sign in.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-muted/40 border-none ring-1 ring-white/10 focus-visible:ring-primary"
                  autoFocus
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="7-Digit PIN"
                  maxLength={7}
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 7) setPin(val);
                  }}
                  className="pl-10 bg-muted/40 border-none ring-1 ring-white/10 focus-visible:ring-primary tracking-widest"
                />
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 animate-in fade-in zoom-in duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Access Denied</AlertTitle>
                <AlertDescription>
                  Invalid credentials. Access is restricted to SMIC360 personnel.
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95"
              disabled={pin.length < 7 || !username || isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Unlock Vault"}
            </Button>
          </form>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/40">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Enterprise Encryption</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
