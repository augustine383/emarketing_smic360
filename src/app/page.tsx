
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AuthScreen } from '@/components/TemplateVault/AuthScreen';
import { Dashboard } from '@/components/TemplateVault/Dashboard';
import { UserAccount, SESSION_STORAGE_KEY } from '@/lib/auth';
import { useSessionTimeout } from '@/hooks/use-session-timeout';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_STORAGE_KEY);
    if (session) {
      try {
        setCurrentUser(JSON.parse(session));
      } catch (e) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  useSessionTimeout(handleLogout);

  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  };

  if (isLoading) return <div className="min-h-screen bg-[#0a0e17]" />;

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
}
