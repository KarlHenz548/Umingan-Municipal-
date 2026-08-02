'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Calendar, 
  User, 
  Download, 
  Share2, 
  Tag, 
  ChevronRight, 
  X, 
  Filter, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { MUNICIPAL_NEWS, NewsArticle } from '@/lib/umingan-data';

export const NewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = ['All', 'Executive Order', 'Infrastructure', 'Agriculture', 'Public Advisory', 'Health & Safety', 'Culture & Events'];

  const filteredNews = MUNICIPAL_NEWS.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = MUNICIPAL_NEWS.find(a => a.featured) || MUNICIPAL_NEWS[0];

  const handleSimulateDownload = (docRef?: string) => {
    const filename = docRef ? `LGU_Umingan_${docRef}.pdf` : `LGU_Umingan_Official_Notice.pdf`;
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-900 text-xs font-extrabold uppercase tracking-widest mb-1">
              <FileText className="w-4 h-4 text-yellow-500" />
              Official LGU Updates & Advisories
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight uppercase">
              Municipal Bulletins & Executive Orders
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Stay informed with official municipal decrees, infrastructure milestones, agricultural advisories, and community news.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-blue-900 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter news or E.O. number..."
              className="w-full bg-white border-2 border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-yellow-500 shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Download Success Banner */}
        {downloadSuccess && (
          <div className="bg-blue-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-md flex items-center justify-between animate-in fade-in border-l-4 border-yellow-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>Official memo document <strong>{downloadSuccess}</strong> prepared for download.</span>
            </div>
            <span className="text-[10px] text-yellow-400 uppercase tracking-widest font-extrabold">Official Record</span>
          </div>
        )}

        {/* Featured Hero Article */}
        {!searchQuery && selectedCategory === 'All' && (
          <div className="bg-white rounded-2xl border-2 border-blue-900 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:shadow-lg transition-shadow">
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[380px]">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-yellow-500 text-blue-950 text-[11px] font-extrabold px-3 py-1 rounded-md shadow-md uppercase tracking-wider border border-yellow-400">
                Featured Bulletin
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-slate-50">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="bg-blue-900 text-yellow-400 font-extrabold px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider">
                    {featuredArticle.category}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-blue-900" />
                    {featuredArticle.date}
                  </span>
                </div>

                <h3 className="text-xl font-black text-blue-950 leading-snug hover:text-blue-700 transition-colors uppercase">
                  {featuredArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                  {featuredArticle.docRef ? `Memo: ${featuredArticle.docRef}` : `By ${featuredArticle.author}`}
                </span>
                <button
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Read Full Bulletin</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-950" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-blue-900 shrink-0 ml-1" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-yellow-400 shadow-sm border border-yellow-500/50'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-900 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
              onClick={() => setActiveArticle(article)}
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-blue-900 text-yellow-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-yellow-500/40">
                    {article.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-blue-900" />
                    <span>{article.date}</span>
                    {article.docRef && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-blue-900 font-bold">{article.docRef}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  {article.author}
                </span>
                <span className="text-xs text-blue-900 font-extrabold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read
                  <ChevronRight className="w-3.5 h-3.5 text-yellow-500" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No news articles found</h3>
            <p className="text-xs text-slate-500">Try adjusting your category selection or search keywords.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs text-emerald-800 font-bold underline"
            >
              Reset Filters
            </button>
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
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {activeArticle.date}
                </span>
                {activeArticle.docRef && (
                  <span className="bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded-md">
                    Ref: {activeArticle.docRef}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                {activeArticle.title}
              </h2>

              <p className="text-xs text-slate-500 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                Issued by: <strong className="text-slate-700">{activeArticle.author}</strong>
              </p>
            </div>

            <div className="rounded-xl overflow-hidden max-h-72 bg-slate-100">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-emerald-700 text-xs font-medium text-slate-800">
                <strong>Executive Summary:</strong> {activeArticle.summary}
              </div>

              <p>{activeArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleSimulateDownload(activeArticle.docRef)}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Official Memorandum PDF</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Close Bulletin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
