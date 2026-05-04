"use client";

import React, { useState } from 'react';
import { AuthScreen } from '@/components/TemplateVault/AuthScreen';
import { Dashboard } from '@/components/TemplateVault/Dashboard';

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (!isAuthorized) {
    return <AuthScreen onSuccess={() => setIsAuthorized(true)} />;
  }

  return <Dashboard />;
}
