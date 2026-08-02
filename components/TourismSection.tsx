'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Star, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Info, 
  X, 
  CheckCircle2, 
  Navigation, 
  Calendar, 
  Share2,
  UtensilsCrossed,
  Trees,
  Landmark,
  ArrowRight
} from 'lucide-react';
import { TOURIST_SPOTS, TouristSpot } from '@/lib/umingan-data';

export const TourismSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [itineraryModalOpen, setItineraryModalOpen] = useState<boolean>(false);
  const [tripType, setTripType] = useState<'day' | 'weekend' | 'food'>('day');

  const categories = ['All', 'Nature & Adventure', 'Parks & Recreation', 'Cultural & Heritage', 'Food & Delicacies'];

  const filteredSpots = TOURIST_SPOTS.filter(spot => 
    selectedCategory === 'All' || spot.category === selectedCategory
  );

  return (
    <section className="py-12 bg-blue-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-blue-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-yellow-400 text-xs font-extrabold uppercase tracking-widest mb-1">
              <Compass className="w-4 h-4 text-yellow-400" />
              Discover Umingan, Pangasinan
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Local Tourism, Eco-Trails & Kanen Delicacies
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 font-medium">
              From the sea of clouds atop Mount Amor to refreshing mountain streams at Barat River and legendary coconut-baked Tupig.
            </p>
          </div>

          <button
            onClick={() => setItineraryModalOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-extrabold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer shrink-0 uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-blue-950" />
            <span>Generate Travel Itinerary</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-yellow-500 text-blue-950 shadow-md border border-yellow-400'
                  : 'bg-blue-900 text-blue-100 hover:bg-blue-800 border border-blue-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tourist Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className="group bg-blue-900 rounded-2xl border-2 border-blue-800 overflow-hidden hover:border-yellow-500 transition-all cursor-pointer flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={spot.image} 
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-yellow-500 text-blue-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-yellow-400 shadow-md">
                    {spot.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-blue-950/90 backdrop-blur-xs text-yellow-400 text-xs font-black px-2.5 py-1 rounded-md flex items-center gap-1 border border-yellow-500/30">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{spot.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-black text-white group-hover:text-yellow-400 transition-colors leading-tight uppercase">
                    {spot.name}
                  </h3>

                  <p className="text-xs text-blue-200 flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span className="truncate">{spot.location}</span>
                  </p>

                  <p className="text-xs text-blue-100/90 line-clamp-2 leading-relaxed font-normal">
                    {spot.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {spot.highlights.slice(0, 3).map((hl, i) => (
                      <span key={i} className="bg-blue-950 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-800 uppercase">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-blue-800/80 mt-3 flex items-center justify-between text-xs">
                <span className="text-blue-200 text-[11px] font-medium">
                  Fee: <strong className="text-yellow-400 font-bold">{spot.entranceFee}</strong>
                </span>
                <span className="text-yellow-400 font-extrabold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Details
                  <ArrowRight className="w-3.5 h-3.5 text-yellow-400" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Spot Detail Modal */}
        {selectedSpot && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 text-white max-w-3xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto border border-white/10">
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-2.5 py-0.5 rounded-md uppercase">
                    {selectedSpot.category}
                  </span>
                  <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {selectedSpot.rating} / 5.0 Rating
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">{selectedSpot.name}</h3>
                <p className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {selectedSpot.location}
                </p>
              </div>

              <div className="rounded-xl overflow-hidden max-h-72 bg-slate-800">
                <img src={selectedSpot.image} alt={selectedSpot.name} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/80 p-4 rounded-xl border border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block">Best Time To Visit:</span>
                  <span className="font-bold text-amber-300">{selectedSpot.bestTimeToVisit}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Entrance & Rates:</span>
                  <span className="font-bold text-emerald-300">{selectedSpot.entranceFee}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">Description & Highlights</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedSpot.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedSpot.highlights.map((h, i) => (
                    <span key={i} className="bg-emerald-950 text-emerald-300 text-xs font-medium px-3 py-1 rounded-lg border border-emerald-600/40">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-amber-950/60 p-4 rounded-xl border border-amber-500/40 text-xs space-y-1">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  Traveler Tip & Advisory:
                </span>
                <p className="text-slate-200">{selectedSpot.travelTips}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a 
                  href={`https://maps.google.com/?q=${selectedSpot.coordinates.lat},${selectedSpot.coordinates.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
                <button
                  onClick={() => setSelectedSpot(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Travel Itinerary Generator Modal */}
        {itineraryModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 text-white max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto border border-white/10">
              <button
                onClick={() => setItineraryModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  Custom Travel Route
                </div>
                <h3 className="text-xl font-bold text-white">Recommended Umingan Tour Itineraries</h3>
              </div>

              {/* Selector */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'day', label: '1-Day Eco-Trail' },
                  { id: 'weekend', label: 'Weekend Trek & Swim' },
                  { id: 'food', label: 'Kanen Food Tour' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTripType(t.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tripType === t.id ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Content output based on selection */}
              <div className="bg-slate-800/90 p-5 rounded-2xl border border-white/10 space-y-4 text-xs">
                {tripType === 'day' && (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-400 font-bold">05:30 AM</span>
                      <div>
                        <strong className="text-white block">Sunrise Trek at Mount Amor View Deck</strong>
                        <p className="text-slate-300">Watch the sea of clouds and mountain peak sunrise at Barangay Esperanza.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-400 font-bold">09:00 AM</span>
                      <div>
                        <strong className="text-white block">Hearty Ilocano Breakfast & Fresh Coconut Water</strong>
                        <p className="text-slate-300">Enjoy Pinakbet and hot coffee at the Mt. Amor Foothills eatery.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-400 font-bold">11:00 AM</span>
                      <div>
                        <strong className="text-white block">Barat River Eco-Park & Picnic Rafting</strong>
                        <p className="text-slate-300">Cool down in fresh river spillway waters and enjoy riverside cottage lunch.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-400 font-bold">04:30 PM</span>
                      <div>
                        <strong className="text-white block">Umingan Plaza & Fresh Hot Tupig Shopping</strong>
                        <p className="text-slate-300">Visit the Immaculate Conception Parish and buy authentic Tupig and Suman at the Public Market perimeter.</p>
                      </div>
                    </li>
                  </ul>
                )}

                {tripType === 'weekend' && (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="font-mono text-emerald-400 font-bold">DAY 1</span>
                      <div>
                        <strong className="text-white block">Salasa Caves & Nature Eco-Trail</strong>
                        <p className="text-slate-300">Explore natural limestone caverns with local guides. Spend the afternoon swimming at Barat River Spillway.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-emerald-400 font-bold">DAY 2</span>
                      <div>
                        <strong className="text-white block">Mount Amor Summit & Town Plaza Evening Fountain</strong>
                        <p className="text-slate-300">Early morning summit hike, followed by town heritage tour and evening musical fountain display at Umingan Plaza.</p>
                      </div>
                    </li>
                  </ul>
                )}

                {tripType === 'food' && (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-300 font-bold">SPOT 1</span>
                      <div>
                        <strong className="text-white block">Umingan Kanen Street Market</strong>
                        <p className="text-slate-300">Taste freshly grilled Tupig baked on coconut husk embers, Suman, Kalamay, and Patupat.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-300 font-bold">SPOT 2</span>
                      <div>
                        <strong className="text-white block">Barangay Agri-Farms & Fresh Honey Vendors</strong>
                        <p className="text-slate-300">Sample local wild honey, dragonfruit, and sweet organic corn from Alo-o and Prado farms.</p>
                      </div>
                    </li>
                  </ul>
                )}
              </div>

              <button
                onClick={() => setItineraryModalOpen(false)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Close Itinerary Planner
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
