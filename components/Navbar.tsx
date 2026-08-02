'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Sparkles, 
  Search, 
  ShieldAlert, 
  ShieldCheck,
  Calendar, 
  Clock, 
  Menu, 
  X,
  FileText,
  Compass,
  Users,
  AlertTriangle,
  HelpCircle,
  MessageSquareHeart
} from 'lucide-react';
import { TOWN_DETAILS } from '@/lib/umingan-data';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiAssistant: () => void;
  onOpenGrievance: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiAssistant,
  onOpenGrievance,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phTime, setPhTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Manila',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setPhTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Building2 },
    { id: 'news', label: 'Municipal Updates', icon: FileText },
    { id: 'services', label: 'e-Services & Permits', icon: Building2 },
    { id: 'tourism', label: 'Tourism & Culture', icon: Compass },
    { id: 'barangays', label: 'Barangays', icon: Users },
    { id: 'emergency', label: 'Emergency & MDRRMO', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-40 bg-blue-900 text-white border-b-4 border-yellow-500 shadow-lg">
      {/* Top Banner Bar */}
      <div className="bg-blue-950 text-blue-100 text-xs py-1.5 px-4 sm:px-6 border-b border-blue-800/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 font-semibold text-yellow-400">
              <MapPin className="w-3.5 h-3.5" />
              {TOWN_DETAILS.name}, {TOWN_DETAILS.province} (Zip: {TOWN_DETAILS.zipCode})
            </span>
            <span className="hidden md:inline text-blue-400/60">•</span>
            <span className="hidden md:flex items-center gap-1 text-blue-200">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              PST: <span className="font-mono text-white font-semibold">{phTime || 'Loading time...'}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenGrievance}
              className="flex items-center gap-1 text-blue-100 hover:text-yellow-300 transition-colors cursor-pointer bg-blue-900/80 hover:bg-blue-800 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border border-blue-700"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-yellow-400" />
              Citizen Concern Desk
            </button>

            <button 
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-yellow-300 hover:text-yellow-200 transition-colors cursor-pointer bg-blue-950 hover:bg-blue-900 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-yellow-500/60 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              Admin Login
            </button>

            <a 
              href="tel:0755749111" 
              className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded-full text-[11px] uppercase tracking-wider transition-colors shadow-xs"
            >
              <PhoneCall className="w-3 h-3 animate-pulse" />
              MDRRMO Hotline 911
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-4 cursor-pointer group"
        >
          {/* Logo Emblem Seal */}
          <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-blue-900 font-extrabold border-2 border-yellow-500 shadow-md group-hover:scale-105 transition-transform text-center leading-none p-1 shrink-0">
            <span className="text-[9px] font-black uppercase text-blue-950 tracking-tight">UMINGAN</span>
            <span className="text-[7px] font-bold text-yellow-600 mt-0.5">SEAL 1811</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-none group-hover:text-yellow-400 transition-colors">
                MUNICIPALITY OF UMINGAN
              </h1>
              <span className="hidden sm:inline-block bg-yellow-500 text-blue-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Official Portal
              </span>
            </div>
            <p className="text-[11px] text-blue-100/90 font-medium uppercase tracking-widest mt-1">
              Province of Pangasinan • <span className="text-yellow-400 italic font-semibold">&quot;{TOWN_DETAILS.tagline}&quot;</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-blue-950 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer border border-yellow-300"
          >
            <Sparkles className="w-4 h-4 text-blue-950 animate-spin-slow" />
            <span>Lingkod-Umingan AI</span>
          </button>

         
           
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-white hover:bg-blue-800 focus:outline-hidden"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-yellow-400" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Desktop Navigation Tabs */}
      <nav className="hidden lg:block bg-blue-950 text-white border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                    isActive 
                      ? 'text-yellow-400 bg-blue-900 border-b-2 border-yellow-400 font-extrabold' 
                      : 'text-blue-100 hover:text-yellow-400 hover:bg-blue-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-400' : 'text-blue-300'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 py-2">
            <button
              onClick={onOpenAiAssistant}
              className="text-blue-100 hover:text-yellow-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 rounded-lg border border-yellow-500/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Ask AI Citizen Assistant</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-950 text-white border-b border-yellow-500 p-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-left ${
                  isActive ? 'bg-yellow-500 text-blue-950 font-extrabold' : 'text-blue-100 hover:bg-blue-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-blue-800 space-y-2">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-blue-950" />
              2026 LGU Admin Portal Login
            </button>
            <button
              onClick={() => {
                onOpenAiAssistant();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-900 text-yellow-300 hover:bg-blue-800 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-blue-700"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Ask Lingkod-Umingan AI
            </button>
            <button
              onClick={() => {
                onOpenGrievance();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-900 text-blue-100 hover:text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-blue-700"
            >
              <MessageSquareHeart className="w-4 h-4 text-yellow-400" />
              Submit Citizen Feedback
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
