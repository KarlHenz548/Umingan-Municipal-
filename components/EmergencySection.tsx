'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Flame, 
  Siren, 
  HeartPulse, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  CloudRain, 
  Sun,
  CloudSun,
  CloudLightning,
  Thermometer,
  Wind,
  Droplets,
  MapPin, 
  Info,
  Building,
  Briefcase,
  Eye
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '@/lib/umingan-data';

interface LiveWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
  source?: string;
  isLive: boolean;
  lastUpdated: string;
}

export const EmergencySection: React.FC = () => {
  const [weather, setWeather] = useState<LiveWeather>({
    temp: 31,
    feelsLike: 35,
    humidity: 78,
    windSpeed: 12,
    weatherCode: 2,
    condition: 'Partly Cloudy with Localized Afternoon Showers',
    source: 'OpenWeatherMap Telemetry',
    isLive: false,
    lastUpdated: 'Loading live telemetry...'
  });
  const [isFetchingWeather, setIsFetchingWeather] = useState<boolean>(false);

  // Fetch real-time weather for Umingan, Pangasinan via OpenWeatherMap API Route (/api/weather)
  const fetchLiveWeather = useCallback(async () => {
    setIsFetchingWeather(true);
    try {
      const res = await fetch('/api/weather');
      if (res.ok) {
        const data = await res.json();
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setWeather({
          temp: data.temp,
          feelsLike: data.feelsLike,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
          weatherCode: data.mainCondition === 'Clear' ? 0 : data.mainCondition === 'Clouds' ? 2 : 80,
          condition: data.condition,
          source: data.source || 'OpenWeatherMap API',
          isLive: data.isLive ?? true,
          lastUpdated: `Live Sync ${timeStr}`
        });
      }
    } catch (err) {
      console.warn('Weather API endpoint error:', err);
    } finally {
      setIsFetchingWeather(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncWeather = async () => {
      if (isMounted) {
        await fetchLiveWeather();
      }
    };

    syncWeather();

    // Auto-sync real-time weather telemetry every 3 minutes (180,000 ms)
    const interval = setInterval(() => {
      syncWeather();
    }, 180000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fetchLiveWeather]);

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
            Emergency Hotlines & Local Weather Bulletins
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            24/7 active emergency response teams, live PAGASA weather telemetry, and designated evacuation centers.
          </p>
        </div>

        {/* Live Weather Advisory Card / Real-Time Summary Widget */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-6 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Widget Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <CloudRain className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Local PAGASA / MDRRMO Weather Bulletin
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-yellow-500" />
                  <span>Umingan, Pangasinan (Lat 15.9238° N, Long 120.8410° E)</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800/80 shadow-xs">
                Weather Live
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {weather.lastUpdated}
              </span>
            </div>
          </div>

          {/* Main Summary Hero Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Left: Temp & Weather Icon */}
            <div className="md:col-span-5 flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-white/5">
              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 shrink-0">
                {weather.weatherCode === 0 ? (
                  <Sun className="w-10 h-10 text-amber-400 animate-spin-slow" />
                ) : weather.weatherCode >= 1 && weather.weatherCode <= 3 ? (
                  <CloudSun className="w-10 h-10 text-yellow-400" />
                ) : weather.weatherCode >= 80 ? (
                  <CloudLightning className="w-10 h-10 text-rose-400" />
                ) : (
                  <CloudRain className="w-10 h-10 text-blue-400" />
                )}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                    {weather.temp}°C
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    ({Math.round((weather.temp * 9) / 5 + 32)}°F)
                  </span>
                </div>
                <p className="text-xs font-semibold text-amber-400 mt-0.5 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Feels Like: <strong>{weather.feelsLike}°C</strong></span>
                </p>
              </div>
            </div>

            {/* Right: Weather Description & Forecast Note */}
            <div className="md:col-span-7 space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800 text-[11px] font-bold uppercase tracking-wider">
                Current Condition
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                {weather.condition}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                MDRRMO live weather telemetry for Eastern Pangasinan agricultural plains and foothills. Light to moderate localized rain showers monitored.
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 relative z-10">
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Temperature</span>
                <span className="font-extrabold text-white text-sm">{weather.temp}°C</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Heat Index</span>
                <span className="font-extrabold text-white text-sm">{weather.feelsLike}°C</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
              <Droplets className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Humidity</span>
                <span className="font-extrabold text-white text-sm">{weather.humidity}%</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
              <Wind className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Wind Speed</span>
                <span className="font-extrabold text-white text-sm">{weather.windSpeed} km/h</span>
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
