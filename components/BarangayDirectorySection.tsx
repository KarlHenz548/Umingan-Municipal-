'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  PhoneCall, 
  User, 
  Building, 
  Briefcase, 
  Filter, 
  Copy, 
  Check 
} from 'lucide-react';
import { BARANGAYS, MUNICIPAL_OFFICIALS, TOWN_DETAILS } from '@/lib/umingan-data';

export const BarangayDirectorySection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const zones = ['All', 'Poblacion District', 'Northern Agricultural Plains', 'Central Plains', 'Southern Foothills', 'Eastern Upland', 'Western Riverlands'];

  const filteredBarangays = BARANGAYS.filter(b => {
    const matchesZone = selectedZone === 'All' || b.zone === selectedZone;
    const matchesSearch = searchQuery === '' || 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.captain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.mainLivelihood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  const handleCopy = (contact: string) => {
    navigator.clipboard.writeText(contact);
    setCopiedContact(contact);
    setTimeout(() => setCopiedContact(null), 2500);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* 2026 Municipal Officials Banner */}
        <div className="bg-blue-950 text-white rounded-2xl p-6 sm:p-8 border-2 border-yellow-500 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800 pb-4">
            <div>
              <span className="bg-yellow-500 text-blue-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                2026 Municipal Leadership
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-2">
                Executive Officials of Umingan, Pangasinan
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                Headquarters at Municipal Hall, Poblacion West • Founded 1811
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs text-yellow-400 font-bold block">1st Class Municipality</span>
              <span className="text-[11px] text-blue-300">{BARANGAYS.length} Barangays • Zip Code 2443</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MUNICIPAL_OFFICIALS.map((official, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                  i === 0 
                    ? 'bg-blue-900/90 border-yellow-500 shadow-lg md:col-span-2 lg:col-span-1' 
                    : 'bg-blue-900/50 border-blue-800'
                }`}
              >
                <img 
                  src={official.image} 
                  alt={official.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-yellow-400 shadow-md shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider block">
                    {official.position}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {official.name}
                  </h3>
                  <p className="text-[11px] text-blue-200 leading-snug font-medium">
                    {official.committee}
                  </p>
                  {official.quote && (
                    <p className="text-[10px] text-yellow-200/90 italic pt-1 border-t border-blue-800/60 mt-1 line-clamp-2">
                      &quot;{official.quote}&quot;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-900 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-yellow-600" />
              Barangay Governance Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {BARANGAYS.length} Barangays of Umingan, Pangasinan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Search barangay captains, hall locations, main livelihoods, and official contact numbers.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search barangay name or captain..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-700 shadow-xs"
            />
          </div>
        </div>

        {/* Zone Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          {zones.map(z => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedZone === z
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {z}
            </button>
          ))}
        </div>

        {/* Barangay Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBarangays.map((b, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                    {b.zone}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Pop: {b.population}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">Barangay {b.name}</h3>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5 font-medium">
                    <User className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Captain: <strong className="text-slate-900">{b.captain}</strong></span>
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <p className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Livelihood: <strong>{b.mainLivelihood}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span className="truncate">Hall: {b.hallLocation}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-800">{b.contact}</span>
                <button
                  onClick={() => handleCopy(b.contact)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {copiedContact === b.contact ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Contact</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
