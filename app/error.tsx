'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-100">Portal Application Error</h2>
      <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
        We encountered a temporary issue while processing your request. Please try refreshing the portal view.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 px-5 rounded-xl transition-colors cursor-pointer shadow-md"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Reload Portal View</span>
      </button>
    </div>
  );
}
