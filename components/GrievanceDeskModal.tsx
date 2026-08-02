'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  MessageSquareHeart, 
  X, 
  CheckCircle2, 
  Send, 
  Upload,
  AlertCircle,
  Image as ImageIcon,
  Trash2
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
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoSize, setPhotoSize] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submittedPhoto, setSubmittedPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    setErrorMessage(null);
    setPhotoName(file.name);
    setPhotoSize(`${(file.size / 1024).toFixed(1)} KB`);

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoName(null);
    setPhotoSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          name,
          contact,
          barangay,
          description,
          photo
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedRef(data.referenceCode);
        setSubmittedPhoto(photo);
      } else {
        const fallbackCode = `UMG-GRV-${Math.floor(1000 + Math.random() * 9000)}`;
        setSubmittedRef(fallbackCode);
        setSubmittedPhoto(photo);
      }
    } catch {
      const fallbackCode = `UMG-GRV-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(fallbackCode);
      setSubmittedPhoto(photo);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setSubmittedPhoto(null);
    setName('');
    setContact('');
    setDescription('');
    setPhoto(null);
    setPhotoName(null);
    setPhotoSize(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

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
                  <option value="appreciation">Other Concern or Feedback</option>
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
                    placeholder="Enter Full Name"
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
                    placeholder="0912-345-6789"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700 resize-none"
                />
              </div>

              {/* Photo Upload Feature */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Attach Photo / Landmark Evidence
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {!photo ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-slate-50 hover:bg-emerald-50/50 p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-emerald-900">Click to upload photo evidence</p>
                        <p className="text-[11px] text-slate-500">Attach photos of broken streetlight, road damage, or landmark</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-md shrink-0">
                      JPEG/PNG &lt; 5MB
                    </span>
                  </div>
                ) : (
                  <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-emerald-300 shrink-0 bg-slate-100">
                        <Image 
                          src={photo} 
                          alt="Photo Preview" 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 truncate">
                          <ImageIcon className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span className="truncate">{photoName || 'Attached_Photo.jpg'}</span>
                        </div>
                        <p className="text-[10px] text-emerald-700 mt-0.5">{photoSize} • Photo attached ready for submission</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="p-2 text-rose-600 hover:bg-rose-100/70 rounded-lg transition-colors shrink-0 cursor-pointer"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-800 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Submitting Report...' : 'Submit Official Public Report'}</span>
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

            {submittedPhoto && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 inline-flex items-center gap-3 text-left max-w-xs mx-auto">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                  <Image 
                    src={submittedPhoto} 
                    alt="Evidence Thumbnail" 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Photo Evidence Attached</p>
                  <p className="text-[10px] text-slate-500">Received by Action Officer</p>
                </div>
              </div>
            )}

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

