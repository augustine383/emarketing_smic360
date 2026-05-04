
"use client";

import React, { useState, useEffect } from 'react';
import { AuthScreen } from '@/components/TemplateVault/AuthScreen';
import { Dashboard } from '@/components/TemplateVault/Dashboard';
import { UserAccount, SESSION_STORAGE_KEY } from '@/lib/auth';

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

  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  if (isLoading) return <div className="min-h-screen bg-background" />;

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
}
