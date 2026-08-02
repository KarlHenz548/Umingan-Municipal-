'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Calculator, 
  FileCheck, 
  Search, 
  FileText, 
  Sprout, 
  HeartHandshake, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Download, 
  Sparkles,
  Info,
  DollarSign,
  ClipboardList,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bplo' | 'rpt' | 'tracker' | 'civil' | 'agri'>('bplo');

  // BPLO State
  const [businessCategory, setBusinessCategory] = useState<string>('retail');
  const [grossSales, setGrossSales] = useState<number>(500000);
  const [bploResult, setBploResult] = useState<{
    mayorsPermit: number;
    sanitaryFee: number;
    fireFee: number;
    garbageFee: number;
    totalFee: number;
  } | null>(null);

  // RPT State
  const [propertyType, setPropertyType] = useState<string>('residential');
  const [marketValue, setMarketValue] = useState<number>(1000000);
  const [rptResult, setRptResult] = useState<{
    assessedValue: number;
    basicTax: number;
    sefTax: number;
    totalTax: number;
    discountedTax: number;
  } | null>(null);

  // Tracker State
  const [trackingCode, setTrackingCode] = useState<string>('UMG-2026-8942');
  const [trackingData, setTrackingData] = useState<{
    code: string;
    businessName: string;
    applicant: string;
    dateSubmitted: string;
    currentStep: number;
    status: string;
    notes: string;
  } | null>({
    code: 'UMG-2026-8942',
    businessName: 'Mt. Amor Agri Trading & Cold Storage',
    applicant: 'Eduardo M. Santos',
    dateSubmitted: 'July 24, 2026',
    currentStep: 3,
    status: 'Sanitary & Fire Inspection in Progress',
    notes: 'Inspector assigned for Bgy. Alo-o site visit on July 30, 2026.'
  });

  // Calculate BPLO Fees
  const handleCalculateBPLO = (e: React.FormEvent) => {
    e.preventDefault();
    let baseRate = 0.01;
    if (businessCategory === 'manufacturing' || businessCategory === 'agri') baseRate = 0.008;
    if (businessCategory === 'pawnshop') baseRate = 0.015;

    const mayorsPermit = Math.max(1200, Math.round(grossSales * baseRate));
    const sanitaryFee = 350;
    const fireFee = Math.round(mayorsPermit * 0.1);
    const garbageFee = grossSales > 1000000 ? 1200 : 600;
    const totalFee = mayorsPermit + sanitaryFee + fireFee + garbageFee;

    setBploResult({
      mayorsPermit,
      sanitaryFee,
      fireFee,
      garbageFee,
      totalFee
    });
  };

  // Calculate RPT Dues
  const handleCalculateRPT = (e: React.FormEvent) => {
    e.preventDefault();
    let assessmentLevel = 0.20; // Residential
    if (propertyType === 'commercial') assessmentLevel = 0.40;
    if (propertyType === 'agricultural') assessmentLevel = 0.40;
    if (propertyType === 'industrial') assessmentLevel = 0.50;

    const assessedValue = Math.round(marketValue * assessmentLevel);
    const basicTax = Math.round(assessedValue * 0.01); // 1% Basic RPT
    const sefTax = Math.round(assessedValue * 0.01);   // 1% SEF
    const totalTax = basicTax + sefTax;
    const discountedTax = Math.round(totalTax * 0.80); // 20% early bird discount

    setRptResult({
      assessedValue,
      basicTax,
      sefTax,
      totalTax,
      discountedTax
    });
  };

  // Handle Search Tracking Code
  const handleSearchCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.toUpperCase().includes('104')) {
      setTrackingData({
        code: trackingCode.toUpperCase(),
        businessName: 'Umingan Heritage Bakery & Cafe',
        applicant: 'Maria Clara Cruz',
        dateSubmitted: 'July 26, 2026',
        currentStep: 4,
        status: 'Tax Assessment Approved - Ready for Payment',
        notes: 'Assessment fees verified at BPLO Counter 2.'
      });
    } else {
      setTrackingData({
        code: trackingCode.toUpperCase(),
        businessName: 'Barat River Resort & Eatery',
        applicant: 'Roberto Aquino',
        dateSubmitted: 'July 20, 2026',
        currentStep: 5,
        status: 'Mayor\'s Permit & License Issued',
        notes: 'Official Permit #2026-0812 ready for pick up at Municipal Hall.'
      });
    }
  };

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="border-b-2 border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-blue-900 text-xs font-extrabold uppercase tracking-widest mb-1">
            <Building2 className="w-4 h-4 text-yellow-500" />
            LGU Umingan e-Services Portal
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight uppercase">
            Online Permits, Tax Calculators & Application Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Process municipal clearances, compute estimated business and real property taxes, and monitor your clearance approval status in real-time.
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab('bplo')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'bplo'
                ? 'bg-blue-900 text-yellow-400 shadow-sm border border-yellow-500/50'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4 text-yellow-500" />
            <span>Business Permit Calculator (BPLO)</span>
          </button>

          <button
            onClick={() => setActiveTab('rpt')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'rpt'
                ? 'bg-blue-900 text-yellow-400 shadow-sm border border-yellow-500/50'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4 text-yellow-500" />
            <span>Real Property Tax (RPT) Assessor</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-blue-900 text-yellow-400 shadow-sm border border-yellow-500/50'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-yellow-500" />
            <span>e-Permit Application Status Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('civil')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'civil'
                ? 'bg-blue-900 text-yellow-400 shadow-sm border border-yellow-500/50'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-yellow-500" />
            <span>Civil Registry & Certificates</span>
          </button>

          <button
            onClick={() => setActiveTab('agri')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'agri'
                ? 'bg-blue-900 text-yellow-400 shadow-sm border border-yellow-500/50'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <Sprout className="w-4 h-4 text-yellow-500" />
            <span>Farmers RSBSA & Senior/PWD Desk</span>
          </button>
        </div>

        {/* Tab Content 1: BPLO Calculator */}
        {activeTab === 'bplo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-700" />
                  Mayor&apos;s Business Permit Tax Estimator
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Enter your business type and annual gross capital/sales to compute approximate regulatory fees under Umingan Tax Ordinance.
                </p>
              </div>

              <form onSubmit={handleCalculateBPLO} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Line of Business / Industry
                  </label>
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700"
                  >
                    <option value="retail">General Retail & Sari-Sari Store / Grocery</option>
                    <option value="agri">Agro-Processing, Cold Storage & Rice Mill</option>
                    <option value="restaurant">Food Service, Eatery & Catering</option>
                    <option value="manufacturing">Manufacturing & Processing</option>
                    <option value="pawnshop">Financial Services, Pawnshop & Lending</option>
                    <option value="services">Professional & Personal Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Declared Annual Gross Sales or Initial Capitalization (₱ PHP)
                  </label>
                  <input
                    type="number"
                    value={grossSales}
                    onChange={(e) => setGrossSales(Number(e.target.value))}
                    step="10000"
                    min="10000"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Example: ₱500,000 for standard retail shop.</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-amber-300" />
                  <span>Calculate Estimated Permit Fees</span>
                </button>
              </form>

              {/* Required Checklist */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-emerald-700" />
                  Checklist of Required Documents (BPLO Umingan)
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Barangay Business Clearance
                  </li>
                  <li className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    DTI / SEC / CDA Registration
                  </li>
                  <li className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Occupancy & Zoning Clearance
                  </li>
                  <li className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Sanitary Permit & Fire Safety Cert
                  </li>
                </ul>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-8 rounded-2xl border border-emerald-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Assessment Summary</span>
                <h3 className="text-xl font-bold text-white mt-1">Estimated Tax Breakdown</h3>
              </div>

              {bploResult ? (
                <div className="space-y-4">
                  <div className="space-y-2 text-xs font-medium border-b border-white/10 pb-4">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Mayor&apos;s Permit Base Fee:</span>
                      <span className="font-mono font-bold text-white">₱{bploResult.mayorsPermit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Sanitary Inspection Fee:</span>
                      <span className="font-mono font-bold text-white">₱{bploResult.sanitaryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Fire Safety Inspection Fee:</span>
                      <span className="font-mono font-bold text-white">₱{bploResult.fireFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Garbage & Waste Disposal Fee:</span>
                      <span className="font-mono font-bold text-white">₱{bploResult.garbageFee.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-900/80 p-4 rounded-xl border border-emerald-500/40">
                    <span className="text-[11px] text-emerald-200 uppercase tracking-wider block font-bold">Total Estimated Due:</span>
                    <p className="text-3xl font-black text-amber-300 font-mono mt-1">
                      ₱{bploResult.totalFee.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-1">
                      *Subject to final verification by BPLO Treasury at Municipal Hall.
                    </p>
                  </div>

                  <div className="pt-2 text-xs text-slate-300 space-y-2">
                    <p className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      Ready to Process Online?
                    </p>
                    <p>
                      You can schedule an appointment or submit scanned clearances to the BPLO Officer via our online queuing desk.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <Calculator className="w-12 h-12 text-emerald-400/50 mx-auto" />
                  <p className="text-xs text-slate-300">
                    Fill in your declared annual sales and click <strong>Calculate Estimated Permit Fees</strong> to view your itemized breakdown.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 2: Real Property Tax Assessor */}
        {activeTab === 'rpt' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-700" />
                  Real Property Tax (Amillaramiento) Assessor
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Compute estimated annual land and building property taxes under the Municipal Assessor&apos;s Office guidelines.
                </p>
              </div>

              <form onSubmit={handleCalculateRPT} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Property Classification
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700"
                  >
                    <option value="residential">Residential Land & House (20% Assessment Level)</option>
                    <option value="agricultural">Agricultural / Farm / Rice Land (40% Assessment Level)</option>
                    <option value="commercial">Commercial Building & Lot (40% Assessment Level)</option>
                    <option value="industrial">Industrial Facility (50% Assessment Level)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Declared Fair Market Value (₱ PHP)
                  </label>
                  <input
                    type="number"
                    value={marketValue}
                    onChange={(e) => setMarketValue(Number(e.target.value))}
                    step="50000"
                    min="50000"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">As stated in your official Tax Declaration certificate.</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-amber-300" />
                  <span>Compute RPT Assessment & Discount</span>
                </button>
              </form>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-900">
                <span className="font-bold flex items-center gap-1 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Early Bird Discount Incentive:
                </span>
                <p>
                  Property owners who pay their full annual Real Property Tax on or before <strong>January 31</strong> receive an immediate <strong>20% discount</strong> on basic tax dues!
                </p>
              </div>
            </div>

            {/* RPT Results */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-8 rounded-2xl border border-emerald-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">RPT Calculation</span>
                <h3 className="text-xl font-bold text-white mt-1">Annual Tax Statement</h3>
              </div>

              {rptResult ? (
                <div className="space-y-4">
                  <div className="space-y-2 text-xs font-medium border-b border-white/10 pb-4">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Assessed Value (Taxable Base):</span>
                      <span className="font-mono font-bold text-white">₱{rptResult.assessedValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Basic RPT (1%):</span>
                      <span className="font-mono font-bold text-white">₱{rptResult.basicTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Special Education Fund (SEF 1%):</span>
                      <span className="font-mono font-bold text-white">₱{rptResult.sefTax.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-amber-400/40 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold">Standard Annual Tax:</span>
                      <span className="font-mono font-bold text-slate-300 line-through">₱{rptResult.totalTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-amber-300 font-bold uppercase text-[11px]">With 20% Early Bird Discount:</span>
                      <span className="text-2xl font-black text-amber-300 font-mono">
                        ₱{rptResult.discountedTax.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Tax payments can be remitted directly at the Municipal Treasurer&apos;s Office or authorized Landbank e-Payment channels.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <Calculator className="w-12 h-12 text-emerald-400/50 mx-auto" />
                  <p className="text-xs text-slate-300">
                    Input declared property market value and click <strong>Compute RPT Assessment</strong> to view tax dues and early bird savings.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 3: Application Status Tracker */}
        {activeTab === 'tracker' && (
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-8">
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-700" />
                Real-Time e-Permit Application Status Tracker
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Enter your official Application Tracking Reference Number (e.g., <code>UMG-2026-8942</code> or <code>UMG-2026-104</code>) to view clearance progress.
              </p>
            </div>

            <form onSubmit={handleSearchCode} className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Enter Code (e.g. UMG-2026-8942)"
                className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700 uppercase"
              />
              <button
                type="submit"
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Track Status</span>
              </button>
            </form>

            {trackingData && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-md">
                      Ref: {trackingData.code}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">{trackingData.businessName}</h4>
                    <p className="text-xs text-slate-500">Applicant: {trackingData.applicant} • Filed: {trackingData.dateSubmitted}</p>
                  </div>
                  <div className="bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold text-center">
                    {trackingData.status}
                  </div>
                </div>

                {/* Step Progress Visualizer */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-700">Clearance Approval Pipeline:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {[
                      { step: 1, title: 'Document Filing', label: 'Received' },
                      { step: 2, title: 'BPLO Evaluation', label: 'Reviewed' },
                      { step: 3, title: 'Sanitary & Fire', label: 'Inspected' },
                      { step: 4, title: 'Tax Clearance', label: 'Assessed' },
                      { step: 5, title: 'Mayor\'s Permit', label: 'Issued' }
                    ].map((s) => {
                      const isComplete = s.step < trackingData.currentStep;
                      const isCurrent = s.step === trackingData.currentStep;
                      return (
                        <div 
                          key={s.step} 
                          className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                            isComplete 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                              : isCurrent 
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-sm' 
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold">
                            {isComplete && <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
                            <span>Step {s.step}</span>
                          </div>
                          <p className="text-xs font-bold leading-tight">{s.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 border-l-4 border-emerald-700">
                  <strong>Department Officer Notes:</strong> {trackingData.notes}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 4: Civil Registry */}
        {activeTab === 'civil' && (
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                Local Civil Registrar Request Desk
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Official guidelines and appointment scheduling for municipal vital records.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Birth Certificate (SECPA)', fee: '₱150', time: '24-48 Hours', reqs: ['Valid Government ID', 'Barangay Residency Cert', 'Authorization letter if representative'] },
                { title: 'Marriage Certificate', fee: '₱150', time: '24-48 Hours', reqs: ['Contracting Parties IDs', 'Marriage License Record Number', 'LCR Form 3'] },
                { title: 'Death Certificate', fee: '₱100', time: 'Same Day Processing', reqs: ['Physician / Attending Health Officer Cert', 'Barangay Death Report', 'Informant ID'] }
              ].map((cert, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                      Processing: {cert.time}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{cert.title}</h4>
                    <p className="text-lg font-black text-emerald-800 font-mono">Fee: {cert.fee}</p>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <p className="text-[11px] font-bold text-slate-700">Requirements:</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {cert.reqs.map((r, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`To request ${cert.title}, please visit Counter 1, Civil Registrar Office, Umingan Municipal Hall.`)}
                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Schedule Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 5: Farmer RSBSA & Senior/PWD */}
        {activeTab === 'agri' && (
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-700" />
                Agricultural RSBSA Registry & Social Welfare Portals
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Registry System for Basic Sectors in Agriculture (RSBSA) and Senior Citizen / PWD Social Assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Farmers Desk */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-800 p-3 rounded-xl">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Farmers & Fisherfolk RSBSA Desk</h4>
                    <p className="text-xs text-slate-500">Municipal Agriculture Office (MAO Umingan)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Registered RSBSA farmers are eligible for government hybrid seed subsidies, fertilizer vouchers, fuel cards, PCIC crop insurance, and calamity aid during weather disturbances.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-slate-800">Requirements for Registration:</p>
                  <p className="text-slate-600">• 2x2 ID Photo, Barangay Certification of Farm Lot, Valid ID</p>
                </div>
              </div>

              {/* Senior & PWD Desk */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-800 p-3 rounded-xl">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Senior Citizen & PWD ID Desk</h4>
                    <p className="text-xs text-slate-500">Municipal Social Welfare & Development (MSWD)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Register for OSCA Senior Citizen cards and PWD ID booklets to enjoy statutory 20% discounts, medical assistance, and quarterly social pension disbursements.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-slate-800">Requirements for Registration:</p>
                  <p className="text-slate-600">• Birth Certificate copy, Barangay Residency, Medical Certificate (for PWD)</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
