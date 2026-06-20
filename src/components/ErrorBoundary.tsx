"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[calc(100vh-16px)] bg-canvas flex items-center justify-center p-6">
          <div className="border-2 border-ink bg-canvas p-8 text-center max-w-md">
            <div className="w-16 h-16 mx-auto border-2 border-primary bg-primary/10 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-lg font-black uppercase mb-2">
              SYSTEM ERROR
            </h2>
            <p className="font-body text-sm text-ink/60 mb-4">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-ink text-on-primary font-button text-xs font-bold uppercase tracking-wider border-2 border-ink hover:bg-primary hover:border-primary rounded-none"
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
