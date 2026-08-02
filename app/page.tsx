'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { NewsSection } from '@/components/NewsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TourismSection } from '@/components/TourismSection';
import { BarangayDirectorySection } from '@/components/BarangayDirectorySection';
import { EmergencySection } from '@/components/EmergencySection';
import { GrievanceDeskModal } from '@/components/GrievanceDeskModal';
import { AiCitizenAssistantModal } from '@/components/AiCitizenAssistantModal';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  const [grievanceOpen, setGrievanceOpen] = useState<boolean>(false);

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        onOpenGrievance={() => setGrievanceOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onNavigateTab={handleNavigateTab}
              onOpenAiAssistant={() => setAiAssistantOpen(true)}
            />
            <NewsSection />
            <ServicesSection />
            <TourismSection />
            <BarangayDirectorySection />
            <EmergencySection />
          </>
        )}

        {activeTab === 'news' && <NewsSection />}
        {activeTab === 'services' && <ServicesSection />}
        {activeTab === 'tourism' && <TourismSection />}
        {activeTab === 'barangays' && <BarangayDirectorySection />}
        {activeTab === 'emergency' && <EmergencySection />}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
        onOpenGrievance={() => setGrievanceOpen(true)}
      />

      {/* Modals */}
      <GrievanceDeskModal
        isOpen={grievanceOpen}
        onClose={() => setGrievanceOpen(false)}
      />

      <AiCitizenAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />
    </div>
  );
}
