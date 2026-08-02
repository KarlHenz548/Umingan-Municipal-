'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  ExternalLink,
  Heart
} from 'lucide-react';
import { TOWN_DETAILS } from '@/lib/umingan-data';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenGrievance: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenGrievance
}) => {
  return (
    <footer className="bg-blue-950 text-blue-100 border-t-4 border-yellow-500 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Address */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-blue-900 font-extrabold border-2 border-yellow-500 shadow-md text-center leading-none p-1 shrink-0">
                <span className="text-[9px] font-black uppercase text-blue-950 tracking-tight">UMINGAN</span>
                <span className="text-[7px] font-bold text-yellow-600 mt-0.5">SEAL 1811</span>
              </div>
              <div>
                <h3 className="text-base font-black text-white leading-tight uppercase tracking-tight">MUNICIPALITY OF UMINGAN</h3>
                <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider">Province of Pangasinan • Zip 2443</p>
              </div>
            </div>

            <p className="text-xs text-blue-200 leading-relaxed font-normal">
              &quot;{TOWN_DETAILS.tagline}&quot; — Serving 58 barangays with transparent e-governance, agricultural development, and environmental protection.
            </p>

            <div className="space-y-2 text-xs text-blue-200">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{TOWN_DETAILS.hallAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{TOWN_DETAILS.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{TOWN_DETAILS.email}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Direct Portal Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-yellow-400 border-b border-blue-800 pb-2">
              e-Government Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-blue-200 font-medium">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-yellow-400 transition-colors">
                  Home Portal Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('news')} className="hover:text-yellow-400 transition-colors">
                  Executive Orders & Advisories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('services')} className="hover:text-yellow-400 transition-colors">
                  Business Permit (BPLO) Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('services')} className="hover:text-yellow-400 transition-colors">
                  Real Property Tax (RPT) Assessor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('services')} className="hover:text-yellow-400 transition-colors">
                  e-Permit Application Status Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGrievance()} className="hover:text-yellow-300 transition-colors text-yellow-400 font-bold">
                  Sumbong at Mungkahi Feedback Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tourism & Barangays */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-yellow-400 border-b border-blue-800 pb-2">
              Tourism & Barangays
            </h4>
            <ul className="space-y-2 text-xs text-blue-200 font-medium">
              <li>
                <button onClick={() => onNavigateTab('tourism')} className="hover:text-yellow-400 transition-colors">
                  Mount Amor Peak & View Deck
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tourism')} className="hover:text-yellow-400 transition-colors">
                  Barat River Eco-Park Spillway
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tourism')} className="hover:text-yellow-400 transition-colors">
                  Salasa Natural Caverns
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tourism')} className="hover:text-yellow-400 transition-colors">
                  Kanen Delicacies (Tupig, Suman, Kalamay)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('barangays')} className="hover:text-yellow-400 transition-colors">
                  Directory of 58 Barangay Captains
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('emergency')} className="hover:text-red-300 transition-colors text-red-400 font-bold">
                  MDRRMO Rescue 911 Hotlines
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official National Portals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-yellow-400 border-b border-blue-800 pb-2">
              National Agencies
            </h4>
            <ul className="space-y-2 text-xs text-blue-200 font-medium">
              <li>
                <a href="https://pangasinan.gov.ph" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <span>Pangasinan Capitol</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://dilg.gov.ph" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <span>DILG Region I</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://bagong.pagasa.dost.gov.ph" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>DOST-PAGASA</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a href="https://da.gov.ph" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Department of Agriculture</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-3">
          <p>© {new Date().getFullYear()} Local Government Unit of Umingan, Pangasinan. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Official Government Web Portal
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
