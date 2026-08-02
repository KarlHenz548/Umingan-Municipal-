'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  FileText, 
  Search, 
  Calendar, 
  User, 
  Download, 
  ChevronRight, 
  X, 
  Filter, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  Building2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { MUNICIPAL_NEWS, NewsArticle } from '@/lib/umingan-data';

export const NewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  const categories = [
    'All', 
    'Executive Order', 
    'Public Advisory', 
    'Infrastructure', 
    'Agriculture', 
    'Health & Safety', 
    'Culture & Events'
  ];

  const filteredNews = MUNICIPAL_NEWS.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.docRef && article.docRef.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Limit initial grid to 6 items to keep the layout concise and organized like Barangay section
  const visibleNews = showAllItems ? filteredNews : filteredNews.slice(0, 6);

  const featuredArticle = MUNICIPAL_NEWS.find(a => a.featured) || MUNICIPAL_NEWS[0];

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setShowAllItems(false); // Reset expansion on category change
  };

  const handleSimulateDownload = (docRef?: string) => {
    const filename = docRef ? `LGU_Umingan_${docRef}.pdf` : `LGU_Umingan_Official_Notice.pdf`;
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* LGU Updates Header & Quick Stats Banner */}
        <div className="bg-blue-950 text-white rounded-2xl p-6 sm:p-8 border-2 border-yellow-500 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-yellow-500 text-blue-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Official LGU Portal
                </span>
                <span className="bg-blue-900 text-yellow-300 text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md border border-blue-700">
                  2026 Bulletins
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
                Official LGU Updates, Executive Orders & Advisories
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                Office of the Municipal Mayor • Sangguniang Bayan Resolutions • Municipal Memorandums
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs text-yellow-400 font-bold block">Verified LGU Archive</span>
              <span className="text-[11px] text-blue-300">{MUNICIPAL_NEWS.length} Published Decrees & Advisories</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-blue-900/60 p-3 rounded-xl border border-blue-800">
              <span className="text-[10px] text-yellow-400 font-extrabold uppercase block">Executive Orders</span>
              <span className="text-lg font-black text-white">
                {MUNICIPAL_NEWS.filter(n => n.category === 'Executive Order').length} Decrees
              </span>
            </div>
            <div className="bg-blue-900/60 p-3 rounded-xl border border-blue-800">
              <span className="text-[10px] text-yellow-400 font-extrabold uppercase block">Public Advisories</span>
              <span className="text-lg font-black text-white">
                {MUNICIPAL_NEWS.filter(n => n.category === 'Public Advisory').length} Notices
              </span>
            </div>
            <div className="bg-blue-900/60 p-3 rounded-xl border border-blue-800">
              <span className="text-[10px] text-yellow-400 font-extrabold uppercase block">Infrastructure Projects</span>
              <span className="text-lg font-black text-white">
                {MUNICIPAL_NEWS.filter(n => n.category === 'Infrastructure').length} Updates
              </span>
            </div>
            <div className="bg-blue-900/60 p-3 rounded-xl border border-blue-800">
              <span className="text-[10px] text-yellow-400 font-extrabold uppercase block">Agriculture & Health</span>
              <span className="text-lg font-black text-white">
                {MUNICIPAL_NEWS.filter(n => n.category === 'Agriculture' || n.category === 'Health & Safety').length} Memos
              </span>
            </div>
          </div>
        </div>

        {/* Header Control Box: Title, Search, and Category Badges */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-blue-950 text-xs font-extrabold uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4 text-yellow-600" />
                Organized Municipal Archive
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                {selectedCategory === 'All' ? 'All LGU Advisories & Updates' : `${selectedCategory} Bulletins`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Filter municipal updates by category, search executive order numbers, or download official memorandum PDFs.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAllItems(false);
                }}
                placeholder="Search keywords, E.O. number, or topic..."
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

          {/* Category Filter Tabs with Item Count Badges (Matching Barangay Directory Style) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-blue-900" />
              <span>Filter by Category:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map(cat => {
                const count = cat === 'All' 
                  ? MUNICIPAL_NEWS.length 
                  : MUNICIPAL_NEWS.filter(n => n.category === cat).length;
                const isSelected = selectedCategory === cat;
                
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-950 text-yellow-400 border border-blue-900 shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>{cat}</span>
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

        {/* Download Success Banner */}
        {downloadSuccess && (
          <div className="bg-blue-950 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-md flex items-center justify-between border-l-4 border-yellow-500 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Official memo document <strong>{downloadSuccess}</strong> prepared for download.</span>
            </div>
            <span className="text-[10px] bg-yellow-500 text-blue-950 font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
              Official Document
            </span>
          </div>
        )}

        {/* Featured Hero Article (Shown on 'All' category when no active search) */}
        {!searchQuery && selectedCategory === 'All' && featuredArticle && (
          <div className="bg-white rounded-2xl border-2 border-blue-900 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:shadow-lg transition-shadow">
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[360px]">
              <Image 
                src={featuredArticle.image} 
                alt={featuredArticle.title}
                fill
                unoptimized
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-yellow-500 text-blue-950 text-[11px] font-black px-3 py-1 rounded-md shadow-md uppercase tracking-wider border border-yellow-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Featured LGU Decree
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-slate-50/70">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                  <span className="bg-blue-950 text-yellow-400 font-extrabold px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider">
                    {featuredArticle.category}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-blue-900" />
                    {featuredArticle.date}
                  </span>
                  {featuredArticle.docRef && (
                    <span className="font-mono text-xs font-bold text-blue-950 bg-amber-100 px-2 py-0.5 rounded-md">
                      {featuredArticle.docRef}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-blue-950 leading-snug hover:text-blue-700 transition-colors uppercase">
                  {featuredArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-4">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider truncate">
                  Issued by: {featuredArticle.author}
                </span>
                <button
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                >
                  <span>Read Full Bulletin</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-950" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Organized Bulletins Grid */}
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center space-y-3">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-black uppercase text-slate-800">No LGU advisories or updates found</h3>
            <p className="text-xs text-slate-600">Try clearing your search keyword or selecting another category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="bg-blue-950 text-yellow-400 font-extrabold text-xs px-4 py-2 rounded-xl uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleNews.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-900 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
                  onClick={() => setActiveArticle(article)}
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <Image 
                        src={article.image} 
                        alt={article.title}
                        fill
                        unoptimized
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="bg-blue-950 text-yellow-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-yellow-500/40 shadow-xs">
                          {article.category}
                        </span>
                        {article.docRef && (
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-xs">
                            {article.docRef}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-blue-900" />
                        <span className="font-semibold text-slate-600">{article.date}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-950 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                    <span className="text-[11px] text-slate-500 font-medium truncate pr-2">
                      {article.author}
                    </span>
                    <span className="text-xs text-blue-950 font-extrabold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                      Read
                      <ChevronRight className="w-3.5 h-3.5 text-yellow-600" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More / Show Less Toggle Button (Identical to Barangay Directory) */}
            {filteredNews.length > 6 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="bg-blue-950 hover:bg-blue-900 text-yellow-400 border-2 border-yellow-500 font-black text-xs px-6 py-3 rounded-xl transition-all cursor-pointer uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
                >
                  <span>
                    {showAllItems 
                      ? 'Collapse List (Show Top 6)' 
                      : `View All ${filteredNews.length} Advisories & Updates in ${selectedCategory === 'All' ? 'Umingan' : selectedCategory}`}
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

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 max-w-3xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                <span className="bg-blue-950 text-yellow-400 font-extrabold px-2.5 py-0.5 rounded-md text-[10px] uppercase">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {activeArticle.date}
                </span>
                {activeArticle.docRef && (
                  <span className="bg-amber-100 text-amber-900 font-mono font-bold px-2 py-0.5 rounded-md text-[11px]">
                    Ref: {activeArticle.docRef}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-black text-slate-900 leading-snug">
                {activeArticle.title}
              </h2>

              <p className="text-xs text-slate-500 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-blue-900" />
                Issued by: <strong className="text-slate-800">{activeArticle.author}</strong>
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden h-64 bg-slate-100">
              <Image 
                src={activeArticle.image} 
                alt={activeArticle.title}
                fill
                unoptimized
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="bg-blue-50/70 p-4 rounded-xl border-l-4 border-blue-900 text-xs font-medium text-slate-800">
                <strong className="text-blue-950">Executive Summary:</strong> {activeArticle.summary}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{activeArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleSimulateDownload(activeArticle.docRef)}
                className="w-full sm:w-auto bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-yellow-400" />
                <span>Download Official Memorandum PDF</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Close Bulletin
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
