
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
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#0a0e17]">
      {/* Background */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.imageUrl}
            alt="Background"
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/40 via-[#0a0e17]/70 to-[#0a0e17]" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>
      )}

      <Card className="relative z-10 w-full max-w-md border border-slate-700/30 bg-[#161b22]/90 backdrop-blur-xl overflow-hidden">
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <CardHeader className="text-center space-y-4 pt-10 pb-6">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl opacity-20 blur-md" />
            <div className="relative w-full h-full bg-[#0d1117] rounded-xl border border-cyan-500/20 flex items-center justify-center overflow-hidden">
              {logoImage ? (
                <Image
                  src={logoImage.imageUrl}
                  alt="SMIC360 Logo"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              ) : (
                <Lock className="w-8 h-8 text-cyan-400" />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              SMIC360 <span className="text-cyan-400">Vault</span>
            </CardTitle>
            <CardDescription className="text-slate-400 font-mono text-xs uppercase tracking-widest">
              Authorized Access Only
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-[#0d1117] border border-slate-700/50 text-white font-mono focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/50"
                  autoFocus
                  aria-label="Username"
                  autoComplete="username"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="password"
                  placeholder="7-Digit PIN"
                  maxLength={7}
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 7) setPin(val);
                  }}
                  className="pl-10 bg-[#0d1117] border border-slate-700/50 text-white font-mono tracking-[0.3em] focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/50"
                  aria-label="7-digit PIN"
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-500/5 border-red-500/20 animate-in fade-in zoom-in duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs font-bold">ACCESS DENIED</AlertTitle>
                <AlertDescription className="text-xs font-mono">
                  Invalid credentials. Access is restricted to SMIC360 personnel.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-11 text-sm font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 text-black hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
              disabled={pin.length < 7 || !username || isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Unlock Vault"}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Enterprise Encryption</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
