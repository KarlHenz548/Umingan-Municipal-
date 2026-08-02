'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
  ArrowRight,
  Search
} from 'lucide-react';
import { TOURIST_SPOTS, TouristSpot } from '@/lib/umingan-data';

export const TourismSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Nature & Adventure');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [itineraryModalOpen, setItineraryModalOpen] = useState<boolean>(false);
  const [tripType, setTripType] = useState<'day' | 'weekend' | 'food'>('day');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  const categoryCards = [
    {
      id: 'Nature & Adventure',
      title: 'Nature & Adventure',
      subtitle: 'Trekking trails, peaks, waterfalls, rivers & adventure farms',
      icon: Trees,
      badgeColor: 'bg-emerald-500 text-slate-950 border-emerald-400',
      activeBorder: 'border-emerald-400 bg-emerald-950/60 text-white',
      inactiveBorder: 'border-blue-900 bg-blue-900/50 hover:bg-blue-900/80 text-blue-100',
      count: TOURIST_SPOTS.filter(s => s.category === 'Nature & Adventure').length
    },
    {
      id: 'Parks & Recreation',
      title: 'Parks & Recreation',
      subtitle: 'Town plazas, heritage landmarks, churches & family parks',
      icon: Landmark,
      badgeColor: 'bg-yellow-500 text-blue-950 border-yellow-400',
      activeBorder: 'border-yellow-400 bg-yellow-950/60 text-white',
      inactiveBorder: 'border-blue-900 bg-blue-900/50 hover:bg-blue-900/80 text-blue-100',
      count: TOURIST_SPOTS.filter(s => s.category === 'Parks & Recreation').length
    },
    {
      id: 'Local Dining',
      title: 'Local Dining',
      subtitle: 'Hot Tupig markets, garden cafés, kambingan & native eateries',
      icon: UtensilsCrossed,
      badgeColor: 'bg-orange-500 text-slate-950 border-orange-400',
      activeBorder: 'border-orange-400 bg-amber-950/60 text-white',
      inactiveBorder: 'border-blue-900 bg-blue-900/50 hover:bg-blue-900/80 text-blue-100',
      count: TOURIST_SPOTS.filter(s => s.category === 'Local Dining').length
    }
  ];

  const filteredSpots = TOURIST_SPOTS.filter(spot => {
    const matchesCategory = selectedCategory === 'All' || spot.category === selectedCategory;
    const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Limit shown items when showAllItems is false to keep page compact
  const visibleSpots = showAllItems ? filteredSpots : filteredSpots.slice(0, 3);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setShowAllItems(false); // Reset to compact view on category change
  };

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

        {/* Interactive Category Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between space-y-3 relative overflow-hidden group shadow-md ${
                  isSelected ? cat.activeBorder : cat.inactiveBorder
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl border ${isSelected ? 'bg-yellow-500 text-blue-950 border-yellow-400' : 'bg-blue-950 text-yellow-400 border-blue-800'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${cat.badgeColor}`}>
                    {cat.count} Spots
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-blue-200 mt-1 font-medium leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-yellow-400 gap-1 pt-1 uppercase tracking-wider">
                  <span>{isSelected ? 'Currently Viewing' : 'Click to Explore Category'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Bar (Search + Quick Reset) */}
        <div className="bg-blue-900/60 p-4 rounded-2xl border border-blue-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${selectedCategory === 'All' ? 'all spots' : selectedCategory}...`}
              className="w-full bg-blue-950 text-white placeholder-blue-300 text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border border-blue-700 focus:outline-none focus:border-yellow-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-blue-300 font-bold uppercase tracking-wider whitespace-nowrap">Category:</span>
            {['All', 'Nature & Adventure', 'Parks & Recreation', 'Local Dining'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-yellow-500 text-blue-950 font-black shadow-xs'
                    : 'bg-blue-950 text-blue-200 hover:text-white border border-blue-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tourist Spots Grid */}
        {filteredSpots.length === 0 ? (
          <div className="bg-blue-900/40 border-2 border-dashed border-blue-800 rounded-2xl p-8 text-center space-y-3">
            <Compass className="w-10 h-10 text-yellow-400 mx-auto" />
            <h3 className="text-sm font-black uppercase text-white">No spots found</h3>
            <p className="text-xs text-blue-200">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="bg-yellow-500 text-blue-950 font-extrabold text-xs px-4 py-2 rounded-xl uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleSpots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className="group bg-blue-900 rounded-2xl border-2 border-blue-800 overflow-hidden hover:border-yellow-500 transition-all cursor-pointer flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <Image 
                        src={spot.image} 
                        alt={spot.name}
                        fill
                        unoptimized
                        referrerPolicy="no-referrer"
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

            {/* Show More / Show Less Toggle Button to prevent overly long page */}
            {filteredSpots.length > 3 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="bg-blue-900 hover:bg-yellow-500 hover:text-blue-950 text-yellow-400 border-2 border-yellow-500 font-extrabold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
                >
                  <span>
                    {showAllItems 
                      ? 'Collapse List (Show Top 3)' 
                      : `View All ${filteredSpots.length} Spots in ${selectedCategory}`}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${showAllItems ? '-rotate-90' : 'rotate-90'}`} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Spot Detail Modal */}
        {selectedSpot && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-blue-950 text-white max-w-3xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto border-2 border-yellow-500">
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-blue-200 hover:text-white hover:bg-blue-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-500 text-blue-950 font-black text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {selectedSpot.category}
                  </span>
                  <span className="text-yellow-400 text-xs font-black flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    {selectedSpot.rating} / 5.0 Rating
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{selectedSpot.name}</h3>
                <p className="text-xs text-blue-200 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                  {selectedSpot.location}
                </p>
              </div>

              <div className="relative rounded-xl overflow-hidden h-64 bg-blue-900 border border-blue-800">
                <Image src={selectedSpot.image} alt={selectedSpot.name} fill unoptimized referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-900/90 p-4 rounded-xl border border-blue-800 text-xs">
                <div>
                  <span className="text-blue-300 font-medium block">Best Time To Visit:</span>
                  <span className="font-extrabold text-yellow-400">{selectedSpot.bestTimeToVisit}</span>
                </div>
                <div>
                  <span className="text-blue-300 font-medium block">Entrance & Rates:</span>
                  <span className="font-extrabold text-yellow-300">{selectedSpot.entranceFee}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Description & Key Highlights</h4>
                <p className="text-xs text-blue-100 leading-relaxed font-normal">{selectedSpot.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedSpot.highlights.map((h, i) => (
                    <span key={i} className="bg-blue-900 text-yellow-300 text-xs font-bold px-3 py-1 rounded-lg border border-yellow-500/40 uppercase">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-900/80 p-4 rounded-xl border border-yellow-500/40 text-xs space-y-1">
                <span className="font-extrabold text-yellow-400 flex items-center gap-1 uppercase tracking-wider">
                  <Info className="w-4 h-4 text-yellow-400" />
                  Traveler Advisory & Local Tips:
                </span>
                <p className="text-blue-100 font-medium">{selectedSpot.travelTips}</p>
              </div>

              <div className="pt-4 border-t border-blue-800 flex items-center justify-between">
                <a 
                  href={`https://maps.google.com/?q=${selectedSpot.coordinates.lat},${selectedSpot.coordinates.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 uppercase tracking-wider shadow-md"
                >
                  <Navigation className="w-4 h-4 text-blue-950" />
                  <span>Open in Google Maps</span>
                </a>
                <button
                  onClick={() => setSelectedSpot(null)}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer border border-blue-700 uppercase"
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
                        <strong className="text-white block">Sunrise Trek at Mount Amorong & VIEWtiful DECK</strong>
                        <p className="text-slate-300">Catch 360-degree panoramic sunrise views from Sitio Tebag viewing platform or Mount Amorong peak.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-400 font-bold">09:30 AM</span>
                      <div>
                        <strong className="text-white block">Dela Peña Farm Grape Picking & ATV Ride</strong>
                        <p className="text-slate-300">Experience green grape picking in San Juan and open-terrain ATV riding.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-400 font-bold">01:00 PM</span>
                      <div>
                        <strong className="text-white block">Diket Falls Trek & Sinabaan River Wading</strong>
                        <p className="text-slate-300">Cool off with a boulder trail trek to Diket Falls or relax at Sinabaan Riverbank cottages.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-amber-400 font-bold">05:00 PM</span>
                      <div>
                        <strong className="text-white block">Umingan Plaza & Fresh Hot Tupig Market</strong>
                        <p className="text-slate-300">Visit Immaculate Conception Parish and enjoy fresh coconut-grilled Tupig at the town center.</p>
                      </div>
                    </li>
                  </ul>
                )}

                {tripType === 'weekend' && (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="font-mono text-emerald-400 font-bold">DAY 1</span>
                      <div>
                        <strong className="text-white block">Garden Lake Resort Camping & ATV Adventure</strong>
                        <p className="text-slate-300">Enjoy unlimited ATV riding in Luna Este, boodle fights, and campsite bonfires.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-emerald-400 font-bold">DAY 2</span>
                      <div>
                        <strong className="text-white block">Dela Peña Grape Picking & VIEWtiful DECK Sunset</strong>
                        <p className="text-slate-300">Experience green grape picking and natural spring pools in San Juan, then cap off the trip at VIEWtiful DECK in Sitio Tebag.</p>
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
