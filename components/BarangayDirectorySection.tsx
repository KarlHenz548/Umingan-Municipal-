'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Users, 
  Search, 
  User, 
  Building, 
  Briefcase, 
  Filter, 
  Copy, 
  Check,
  X,
  ArrowRight,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { BARANGAYS, MUNICIPAL_OFFICIALS } from '@/lib/umingan-data';

export const BarangayDirectorySection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  const zones = [
    'All', 
    'Poblacion District', 
    'Northern Agricultural Plains', 
    'Central Plains', 
    'Southern Foothills', 
    'Eastern Upland', 
    'Western Riverlands'
  ];

  const filteredBarangays = BARANGAYS.filter(b => {
    const matchesZone = selectedZone === 'All' || b.zone === selectedZone;
    const matchesSearch = searchQuery === '' || 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.captain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.mainLivelihood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  // Limit initial grid to 6 items to keep the page concise and clean
  const visibleBarangays = showAllItems ? filteredBarangays : filteredBarangays.slice(0, 6);

  const handleZoneSelect = (z: string) => {
    setSelectedZone(z);
    setShowAllItems(false); // Reset to compact view on zone change
  };

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
                <Image 
                  src={official.image} 
                  alt={official.name}
                  width={56}
                  height={56}
                  unoptimized
                  referrerPolicy="no-referrer"
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

        {/* Header & Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-blue-900 text-xs font-bold uppercase tracking-wider mb-1">
                <Users className="w-4 h-4 text-yellow-600" />
                Barangay Governance Directory
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                {BARANGAYS.length} Barangays of Umingan
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
                placeholder="Search barangay name, captain, livelihood..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-700 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Zone Filter Tabs with Count */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-blue-900" />
              <span>Filter by Zone:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {zones.map(z => {
                const count = z === 'All' 
                  ? BARANGAYS.length 
                  : BARANGAYS.filter(b => b.zone === z).length;
                const isSelected = selectedZone === z;
                
                return (
                  <button
                    key={z}
                    onClick={() => handleZoneSelect(z)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-950 text-yellow-400 border border-blue-900 shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>{z}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-yellow-500 text-blue-950' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Barangay Grid */}
        {filteredBarangays.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center space-y-3">
            <Building className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-black uppercase text-slate-800">No barangays found</h3>
            <p className="text-xs text-slate-600">Try clearing your search keyword or selecting another zone.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedZone('All'); }}
              className="bg-blue-950 text-yellow-400 font-extrabold text-xs px-4 py-2 rounded-xl uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBarangays.map((b, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-blue-800 transition-all space-y-4 flex flex-col justify-between"
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

            {/* Show More / Show Less Toggle Button */}
            {filteredBarangays.length > 6 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="bg-blue-950 hover:bg-blue-900 text-yellow-400 border-2 border-yellow-500 font-black text-xs px-6 py-3 rounded-xl transition-all cursor-pointer uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
                >
                  <span>
                    {showAllItems 
                      ? 'Collapse List (Show Top 6)' 
                      : `View All ${filteredBarangays.length} Barangays in ${selectedZone === 'All' ? 'Umingan' : selectedZone}`}
                  </span>
                  {showAllItems ? (
                    <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transition-transform" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

