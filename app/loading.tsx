import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-amber-500/30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-amber-400 border-r-transparent border-b-emerald-500 border-l-transparent animate-spin"></div>
      </div>
      <h2 className="text-lg font-bold text-amber-400 tracking-wide">Municipality of Umingan</h2>
      <p className="text-xs text-slate-400 mt-1">Loading official municipal portal resources...</p>
    </div>
  );
}
