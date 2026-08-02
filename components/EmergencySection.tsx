'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Flame, 
  Siren, 
  HeartPulse, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Waves, 
  CloudRain, 
  MapPin, 
  Info,
  Building,
  Briefcase
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '@/lib/umingan-data';

export const EmergencySection: React.FC = () => {
  const [riverLevel, setRiverLevel] = useState<number>(1.8); // meters
  const [waterStatus, setWaterStatus] = useState<'Normal' | 'Alert' | 'Warning'>('Normal');

  return (
    <section className="py-12 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Title */}
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            MDRRMO Umingan Disaster Operations Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Emergency Hotlines, Flood Gauges & Weather Bulletins
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            24/7 active emergency response teams, Barat River water level monitoring, and designated evacuation centers.
          </p>
        </div>

        {/* Live Weather & River Telemetry Gauges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* River Telemetry Meter */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase">
                <Waves className="w-4 h-4" />
                Barat River Telemetry Water Level Gauge
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                Status: {waterStatus}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-4xl font-black text-white font-mono">{riverLevel.toFixed(1)} <span className="text-sm font-normal text-slate-400">meters</span></p>
                <p className="text-xs text-slate-300 mt-1">Barat River Spillway Monitor (Barangay Barat)</p>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-1">
                <p>Normal Level: &lt; 2.5m</p>
                <p className="text-amber-400">Alert Level: 2.5m - 4.0m</p>
                <p className="text-rose-400">Critical Evac Level: &gt; 4.0m</p>
              </div>
            </div>

            <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden relative">
              <div 
                className="bg-teal-400 h-full transition-all duration-500" 
                style={{ width: `${(riverLevel / 5.0) * 100}%` }} 
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Updated: Just Now</span>
              <span>Telemetry Sensor #04 (MDRRMO)</span>
            </div>
          </div>

          {/* Weather Advisory Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                <CloudRain className="w-4 h-4" />
                Local PAGASA / MDRRMO Weather Bulletin
              </span>
              <span className="text-slate-400 text-xs">Umingan Area</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Partly Cloudy with Light Afternoon Showers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Light to moderate localized thunderstorms expected over eastern mountainous barangays (Esperanza, Salasa) late afternoon. No typhoon Signal in effect for Pangasinan.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
              <div className="bg-slate-900 p-2 rounded-xl border border-white/5">
                <span className="text-slate-400 text-[10px] block">Temperature</span>
                <span className="font-bold text-white">31°C</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-white/5">
                <span className="text-slate-400 text-[10px] block">Humidity</span>
                <span className="font-bold text-white">78%</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-white/5">
                <span className="text-slate-400 text-[10px] block">Wind Speed</span>
                <span className="font-bold text-white">12 km/h</span>
              </div>
            </div>
          </div>

        </div>

        {/* Emergency Hotlines Directory */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-rose-400" />
            24/7 Official Emergency Hotline Numbers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMERGENCY_CONTACTS.map((contact, idx) => (
              <div 
                key={idx}
                className="bg-slate-800 p-5 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between hover:border-rose-400/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-600/30">
                      {contact.available}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">{contact.office}</h4>
                  
                  <div className="space-y-1 text-xs text-slate-300">
                    <p className="font-mono text-amber-300 font-bold text-sm">{contact.hotline}</p>
                    {contact.landline && <p className="font-mono text-slate-400">{contact.landline}</p>}
                    <p className="text-[11px] text-slate-400 truncate">{contact.address}</p>
                  </div>
                </div>

                <a 
                  href={`tel:${contact.hotline.replace(/\s+/g, '')}`}
                  className="w-full bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                  <span>Call Emergency Hotline Now</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Evacuation Centers & Go Bag Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-white/10">
          <div className="lg:col-span-6 bg-slate-800 p-6 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              Primary Designated Evacuation Centers
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="bg-slate-900 p-3 rounded-xl flex items-center justify-between border border-white/5">
                <div>
                  <strong className="text-white block">Umingan Civic Center & Auditorium</strong>
                  <span>Poblacion West (Capacity: 1,200 persons)</span>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">Ready</span>
              </li>
              <li className="bg-slate-900 p-3 rounded-xl flex items-center justify-between border border-white/5">
                <div>
                  <strong className="text-white block">Barangay Barat Gymnasium & Covered Court</strong>
                  <span>Bgy. Barat (Capacity: 600 persons)</span>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">Ready</span>
              </li>
              <li className="bg-slate-900 p-3 rounded-xl flex items-center justify-between border border-white/5">
                <div>
                  <strong className="text-white block">Alo-o Central Elementary School Gym</strong>
                  <span>Bgy. Alo-o (Capacity: 800 persons)</span>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">Ready</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-slate-800 p-6 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Emergency Go-Bag (Handa 72-Hour Kit)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clean Drinking Water (1L/person)</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ready-to-eat Canned Goods</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>First Aid Kit & Maintenance Meds</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Flashlight & Battery Radio</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
