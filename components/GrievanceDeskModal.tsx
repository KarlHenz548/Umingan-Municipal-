'use client';

import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  X, 
  CheckCircle2, 
  Send, 
  Upload, 
  ShieldCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { BARANGAYS } from '@/lib/umingan-data';

interface GrievanceDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrievanceDeskModal: React.FC<GrievanceDeskModalProps> = ({
  isOpen,
  onClose
}) => {
  const [category, setCategory] = useState<string>('streetlight');
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [barangay, setBarangay] = useState<string>('Poblacion East');
  const [description, setDescription] = useState<string>('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `UMG-GRV-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(randomCode);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setName('');
    setContact('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 max-w-xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedRef ? (
          <>
            <div>
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                <MessageSquareHeart className="w-4 h-4 text-emerald-700" />
                Sumbong at Mungkahi Desk
              </div>
              <h3 className="text-xl font-bold text-slate-900">Umingan Citizen Feedback & Concern Desk</h3>
              <p className="text-xs text-slate-600 mt-1">
                Report community issues (streetlights, drainage, garbage, road repairs) directly to the Office of the Mayor & Action Officers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Concern Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700"
                >
                  <option value="streetlight">Broken Streetlight / Electrical Line</option>
                  <option value="road">Road Potholes, Canal & Drainage Maintenance</option>
                  <option value="garbage">Garbage / Solid Waste Collection Request</option>
                  <option value="health">Health, Sanitation & Stray Animal Concern</option>
                  <option value="appreciation">Commendation or General Public Suggestion</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="0917-000-0000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Barangay Location
                </label>
                <select
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700"
                >
                  {BARANGAYS.map(b => (
                    <option key={b.name} value={b.name}>Barangay {b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Explanation / Landmark Location
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue, street name, nearest landmark..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-700" />
                  Attach Photo / Landmark Evidence (Optional)
                </span>
                <span className="text-[10px] text-slate-400">JPEG/PNG up to 5MB</span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Submit Official Public Report</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-900 font-mono font-bold text-xs px-3 py-1 rounded-md">
                Tracking Ref: {submittedRef}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Report Successfully Submitted!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                Thank you <strong>{name}</strong>. Your feedback for <strong>Barangay {barangay}</strong> has been routed to the Municipal Action Desk. You will receive SMS updates on contact number <strong>{contact}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 border border-slate-200">
              <p className="font-semibold text-slate-900">Standard Resolution Timeframe:</p>
              <p className="text-slate-600 mt-0.5">Streetlights & Small Repairs: 24 to 48 Hours • Drainage/Roads: 3 to 5 Business Days.</p>
            </div>

            <button
              onClick={handleReset}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
            >
              Done / Return to Portal
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
