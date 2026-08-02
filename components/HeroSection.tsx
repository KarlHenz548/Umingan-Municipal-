'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Users, 
  FileCheck, 
  Calculator, 
  Sprout, 
  ArrowRight, 
  HeartHandshake, 
  X, 
  MapPin, 
  Award,
  ChevronRight,
  FileText
} from 'lucide-react';
import { TOWN_DETAILS } from '@/lib/umingan-data';

interface HeroSectionProps {
  onNavigateTab: (tab: string, subSection?: string) => void;
  onOpenAiAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateTab,
  onOpenAiAssistant
}) => {
  const [mayorModalOpen, setMayorModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const queryLower = searchQuery.toLowerCase();
    if (queryLower.includes('permit') || queryLower.includes('tax') || queryLower.includes('bplo') || queryLower.includes('civil')) {
      onNavigateTab('services');
    } else if (queryLower.includes('mount') || queryLower.includes('river') || queryLower.includes('tour') || queryLower.includes('hotel') || queryLower.includes('tupig')) {
      onNavigateTab('tourism');
    } else if (queryLower.includes('barangay') || queryLower.includes('captain')) {
      onNavigateTab('barangays');
    } else if (queryLower.includes('emergency') || queryLower.includes('fire') || queryLower.includes('police') || queryLower.includes('rescue')) {
      onNavigateTab('emergency');
    } else {
      onNavigateTab('news');
    }
  };

  const quickServices = [
    { title: 'Business Permits (BPLO)', desc: 'Renew or apply for new business licenses online', tab: 'services', icon: FileCheck, color: 'bg-emerald-600' },
    { title: 'Real Property Tax Calculator', desc: 'Assess annual land & building tax dues', tab: 'services', icon: Calculator, color: 'bg-amber-600' },
    { title: 'Civil Registry & Certs', desc: 'Request birth, marriage & death certificates', tab: 'services', icon: FileText, color: 'bg-blue-600' },
    { title: 'Farmers RSBSA Registration', desc: 'Seed subsidies, fuel vouchers & agri assistance', tab: 'services', icon: Sprout, color: 'bg-green-700' },
    { title: 'Tourist Spots & Kanen Guide', desc: 'Explore Mount Amor, Barat River & local treats', tab: 'tourism', icon: Compass, color: 'bg-teal-600' },
    { title: `${TOWN_DETAILS.barangayCount} Barangays Directory`, desc: 'Contact numbers & barangay captains list', tab: 'barangays', icon: Users, color: 'bg-indigo-600' }
  ];

  return (
    <div className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white overflow-hidden border-b-2 border-blue-800">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/umingan_mountain_landscape/1920/1080" 
          alt="Umingan Pangasinan Landscape"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/85 to-indigo-950/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-blue-950 border border-yellow-400 px-3.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest shadow-md">
              <ShieldCheck className="w-4 h-4 text-blue-950" />
              <span>Official Digital Gateway • Umingan Pangasinan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase">
              Sulong Umingan: <br />
              <span className="text-yellow-400">
                The Development Masterplan 2025
              </span>
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Advancing sustainable infrastructure, transparent digital public services, business permit licensing, and celebrating Mount Amor, Barat River, and our rich Kanen cultural heritage.
            </p>

            {/* Portal Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
              <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-yellow-500">
                <Search className="w-5 h-5 text-blue-900 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search permits, tax calculators, tourism spots, barangays..."
                  className="w-full bg-transparent px-3 py-2 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-semibold focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 text-yellow-400 font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5 text-yellow-400" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-blue-200 font-medium px-1">
                <span className="text-yellow-400 font-bold uppercase tracking-wider">Popular:</span>
                <button type="button" onClick={() => onNavigateTab('services')} className="hover:text-yellow-300 hover:underline">Business Permit</button> •
                <button type="button" onClick={() => onNavigateTab('services')} className="hover:text-yellow-300 hover:underline">Real Property Tax</button> •
                <button type="button" onClick={() => onNavigateTab('tourism')} className="hover:text-yellow-300 hover:underline">Mount Amor Trek</button> •
                <button type="button" onClick={() => onNavigateTab('emergency')} className="hover:text-yellow-300 hover:underline">Rescue Hotlines</button>
              </div>
            </form>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-blue-800/80">
              <div className="bg-blue-900/80 p-3.5 rounded-xl border border-blue-700/60 shadow-md">
                <p className="text-2xl font-black text-yellow-400">58</p>
                <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">Active Barangays</p>
              </div>
              <div className="bg-blue-900/80 p-3.5 rounded-xl border border-blue-700/60 shadow-md">
                <p className="text-2xl font-black text-white">1st Class</p>
                <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">LGU Classification</p>
              </div>
              <div className="bg-blue-900/80 p-3.5 rounded-xl border border-blue-700/60 shadow-md">
                <p className="text-2xl font-black text-yellow-300">1811</p>
                <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">Year Founded</p>
              </div>
              <div className="bg-blue-900/80 p-3.5 rounded-xl border border-blue-700/60 shadow-md">
                <p className="text-2xl font-black text-yellow-400">580m</p>
                <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">Mt. Amor Peak</p>
              </div>
            </div>
          </div>

          {/* Mayor's Welcome Card & Assistant Launcher */}
          <div className="lg:col-span-5 space-y-4">
            {/* Mayor Card */}
            <div className="bg-blue-900/90 p-6 rounded-2xl border-2 border-yellow-500 shadow-2xl space-y-4 text-white">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                  alt={TOWN_DETAILS.mayor} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 shadow-md shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-extrabold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-yellow-400" />
                    Office of the Municipal Mayor (2026)
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {TOWN_DETAILS.mayor}
                  </h3>
                  <p className="text-xs text-blue-200 font-semibold">Municipal Mayor, Umingan, Pangasinan</p>
                </div>
              </div>

              <blockquote className="text-xs text-blue-100 italic bg-blue-950/70 p-3.5 rounded-xl border-l-4 border-yellow-400 leading-relaxed font-normal">
                &quot;Our 2026 administration is dedicated to delivering transparent digital governance, upgrading agricultural infrastructure, and celebrating Umingan&apos;s eco-tourism treasures.&quot;
              </blockquote>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setMayorModalOpen(true)}
                  className="flex-1 bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl border border-blue-600 transition-all flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider"
                >
                  <span>Mayor&apos;s Desk</span>
                  <ChevronRight className="w-3.5 h-3.5 text-yellow-400" />
                </button>
                <button
                  onClick={onOpenAiAssistant}
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer shrink-0 uppercase tracking-wider"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-950" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </div>

            {/* Quick Emergency Status Banner */}
            <div className="bg-blue-950 border border-blue-800 p-4 rounded-2xl flex items-center justify-between text-xs shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse shrink-0" />
                <div>
                  <span className="font-extrabold text-yellow-400 uppercase tracking-wider block text-[11px]">LGU Operations Active</span>
                  <span className="text-blue-200 text-[11px]">All 58 Barangay Halls open. MDRRMO on alert.</span>
                </div>
              </div>
              <button 
                onClick={() => onNavigateTab('emergency')}
                className="text-yellow-400 hover:text-white font-bold uppercase text-[10px] tracking-wider underline cursor-pointer shrink-0"
              >
                View Status
              </button>
            </div>
          </div>

        </div>

        {/* Quick E-Services Grid Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              Direct e-Government Services & Information Portals
            </h2>
            <button 
              onClick={() => onNavigateTab('services')}
              className="text-xs text-emerald-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigateTab(service.tab)}
                  className="group bg-slate-800/80 hover:bg-slate-800 border border-white/10 hover:border-amber-400/50 p-4 rounded-xl transition-all duration-200 cursor-pointer flex items-start gap-3 shadow-md"
                >
                  <div className={`${service.color} text-white p-2.5 rounded-xl shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1">
                      {service.title}
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Mayor's Message Modal */}
      {mayorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setMayorModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                alt={TOWN_DETAILS.mayor} 
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-900 shadow-md"
              />
              <div>
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider block">2026 Message from the Mayor</span>
                <h3 className="text-lg font-bold text-slate-900">{TOWN_DETAILS.mayor}</h3>
                <p className="text-xs text-slate-500">Municipal Mayor • Municipality of Umingan, Pangasinan</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-normal">
              <p className="font-semibold text-slate-900">
                &quot;Mga kababayan at mga bisita ng Bayan ng Umingan,
              </p>
              <p>
                Welcome to our official municipal web portal! As we stride towards a modern, progressive, and resilient Umingan, 
                our local government is committed to bringing our public services closer to every family, farmer, business owner, and visitor.
              </p>
              <p>
                Umingan is blessed with vast fertile agricultural lands, hardworking citizens, and majestic eco-tourism treasures like Mount Amor, 
                Barat River, and Salasa Caves. Through this digital platform, you can now assess real property taxes, process business permits, 
                view local weather advisories, and interact with our AI Citizen Assistant 24/7.
              </p>
              <p>
                Sama-sama tayong magsumikap para sa mas masagana at ligtas na Umingan. Mabanglo at Marayang Araw sa inyong lahat!&quot;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Office of the Mayor, Municipal Hall, Umingan</span>
              </div>
              <button
                onClick={() => setMayorModalOpen(false)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
