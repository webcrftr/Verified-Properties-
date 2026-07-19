/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, ClipboardCheck, Trash2, ShieldCheck, Mail, Phone, Calendar, Search, RefreshCw, Layers } from 'lucide-react';
import { Inquiry, SiteVisit } from '../types';

interface AdminLeadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLeadsDrawer({ isOpen, onClose }: AdminLeadsDrawerProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [activeTab, setActiveTab] = useState<'inquiry' | 'visit'>('inquiry');
  const [searchTerm, setSearchTerm] = useState('');

  // Read logs from local storage on mount
  const fetchLogs = () => {
    try {
      const storedInquiries = JSON.parse(localStorage.getItem('verified_properties_inquiries') || '[]');
      const storedVisits = JSON.parse(localStorage.getItem('verified_properties_site_visits') || '[]');
      setInquiries(storedInquiries);
      setSiteVisits(storedVisits);
    } catch (e) {
      console.error('Error fetching logs:', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle state
  const handleInquiryStatus = (id: string, newStatus: 'new' | 'contacted' | 'archived') => {
    const updated = inquiries.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setInquiries(updated);
    localStorage.setItem('verified_properties_inquiries', JSON.stringify(updated));
  };

  const handleVisitStatus = (id: string, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    const updated = siteVisits.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setSiteVisits(updated);
    localStorage.setItem('verified_properties_site_visits', JSON.stringify(updated));
  };

  // Erase individual record
  const handleDeleteInquiry = (id: string) => {
    const remaining = inquiries.filter((it) => it.id !== id);
    setInquiries(remaining);
    localStorage.setItem('verified_properties_inquiries', JSON.stringify(remaining));
  };

  const handleDeleteVisit = (id: string) => {
    const remaining = siteVisits.filter((it) => it.id !== id);
    setSiteVisits(remaining);
    localStorage.setItem('verified_properties_site_visits', JSON.stringify(remaining));
  };

  // Bulk reset for developers/testers to start fresh
  const handleResetSimulator = () => {
    if (window.confirm('Clear all submitted inquiries and site visits from local storage?')) {
      localStorage.setItem('verified_properties_inquiries', '[]');
      localStorage.setItem('verified_properties_site_visits', '[]');
      setInquiries([]);
      setSiteVisits([]);
    }
  };

  const filteredInquiries = inquiries.filter((it) =>
    it.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (it.propertyName && it.propertyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredVisits = siteVisits.filter((it) =>
    it.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    it.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex justify-end">
      {/* Drawer Board Layout */}
      <div className="bg-[#FFFFFF]/90 backdrop-blur-md max-w-2xl w-full h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E7E1D9] text-[#1E1E1E] rounded-[18px]">
        
        {/* Header Board */}
        <div className="bg-[#FAFAF8] p-6 text-[#1E1E1E] flex items-center justify-between border-b border-[#E7E1D9]">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-[#C4514F]/10 border border-[#C4514F]/30 text-[#C4514F]">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-light font-serif">Consultant CRM - Leads log</h3>
              <p className="text-[10px] text-[#5B5B5B]/50 uppercase tracking-widest font-mono">Viewing Real-Time Client Applications</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 bg-[#F5EFE7] border border-[#E7E1D9] text-[#1E1E1E] hover:bg-[#B13E3B] hover:text-[#1E1E1E] cursor-pointer"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="bg-[#FAFAF8] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#E7E1D9]">
          
          <div className="flex gap-2 w-full sm:w-auto bg-[#F5EFE7] p-1 border border-[#E7E1D9]">
            <button
              onClick={() => {
                setActiveTab('inquiry');
                setSearchTerm('');
              }}
              className={`flex-grow sm:flex-grow-0 px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'inquiry'
                  ? 'bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300'
                  : 'text-[#5B5B5B] hover:text-[#1E1E1E]'
              }`}
            >
              Enquires ({inquiries.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('visit');
                setSearchTerm('');
              }}
              className={`flex-grow sm:flex-grow-0 px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'visit'
                  ? 'bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300'
                  : 'text-[#5B5B5B] hover:text-[#1E1E1E]'
              }`}
            >
              Site Visits ({siteVisits.length})
            </button>
          </div>

          <div className="relative w-full sm:w-48">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#C4514F] h-3.5 w-3.5" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FFFFFF]/90 backdrop-blur-md text-xs text-[#1E1E1E] border border-[#E7E1D9] focus:border-[#C4514F] focus:outline-none placeholder-white/30 font-medium"
            />
          </div>

        </div>

        {/* Core leads listings center scroll */}
        <div className="bg-[#FAFAF8] flex-grow overflow-y-auto p-6 space-y-5">
          
          {/* Header instructions */}
          <div className="p-4 bg-[#C4514F]/5 border border-[#E7E1D9] text-[#C4514F] text-[10px] uppercase font-mono tracking-wider leading-relaxed">
            💡 <strong>Simulation Workspace:</strong> This workspace acts as a real database for Mansi Gaikwad’s leads. Submitting forms on the home-screen will inject them here instantly. Data remains 100% locally saved on your browser local storage keys.
          </div>

          {activeTab === 'inquiry' ? (
            /* Inquiry listings grid */
            filteredInquiries.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFFFF]/90 backdrop-blur-md border border-dashed border-[#E7E1D9] p-6 text-[#5B5B5B]/50">
                <Layers className="h-8 w-8 text-[#1E1E1E]/20 mx-auto mb-3" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B5B5B]">No Enquiries Logged</h4>
                <p className="text-[11px] text-[#5B5B5B]/50 mt-1 max-w-xs mx-auto">
                  Submit a property inquiry form on the front page to see listings populate here.
                </p>
              </div>
            ) : (
              filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-[#FFFFFF]/90 backdrop-blur-md p-5 border border-[#E7E1D9] hover:border-[#C4514F]/35 relative group space-y-4 rounded-[18px]"
                >
                  {/* Title and Top Row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold tracking-wide font-serif text-[#1E1E1E]">{inq.clientName}</h4>
                        <span className={`text-[8px] px-2 py-0.5 font-bold uppercase border ${
                          inq.status === 'new'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/25'
                            : inq.status === 'contacted'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                            : 'bg-[#F5EFE7] text-[#5B5B5B] border-[#E7E1D9]'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-[9px] text-[#C4514F] font-mono mt-0.5 uppercase tracking-wider">{inq.timestamp}</p>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1 text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Target Asset Indicator */}
                  {inq.propertyName && (
                    <div className="px-3 py-2 bg-[#F5EFE7] text-[#1E1E1E] text-[11px] border border-[#E7E1D9]/50 font-mono uppercase tracking-wider max-w-full truncate">
                      🏢 Asset: <span className="font-semibold text-[#C4514F]">{inq.propertyName}</span>
                    </div>
                  )}

                  {/* Message body contents */}
                  <div className="text-xs text-[#5B5B5B] bg-[#FAFAF8] p-3 border border-[#E7E1D9]/50 italic font-serif">
                    "{inq.message}"
                  </div>

                  {/* Action buttons bar */}
                  <div className="border-t border-[#E7E1D9] pt-3 flex flex-wrap gap-3 items-center justify-between text-[11px]">
                    <div className="flex items-center gap-3 text-[#5B5B5B]/50 font-mono text-[10px] uppercase tracking-wider">
                      <a href={`tel:+91${inq.clientPhone}`} className="flex items-center gap-1 hover:text-[#C4514F] font-semibold">
                        <Phone className="h-3 w-3" />
                        <span>+91 {inq.clientPhone}</span>
                      </a>
                      {inq.clientEmail && (
                        <a href={`mailto:${inq.clientEmail}`} className="flex items-center gap-1 hover:text-[#C4514F] font-semibold truncate max-w-[120px]">
                          <Mail className="h-3 w-3" />
                          <span>{inq.clientEmail}</span>
                        </a>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'contacted')}
                        className="px-2 py-1 bg-[#FAFAF8] hover:border-[#C4514F] text-[#1E1E1E] font-bold text-[8px] uppercase tracking-wider border border-[#E7E1D9] cursor-pointer"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'archived')}
                        className="px-2 py-1 bg-[#FAFAF8] hover:border-[#C4514F] text-[#5B5B5B] font-bold text-[8px] uppercase tracking-wider border border-[#E7E1D9] cursor-pointer"
                      >
                        Archive
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )
          ) : (
            /* Site visits listings */
            filteredVisits.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFFFF]/90 backdrop-blur-md border border-dashed border-[#E7E1D9] p-6 text-[#5B5B5B]/50">
                <Calendar className="h-8 w-8 text-[#1E1E1E]/20 mx-auto mb-3" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B5B5B]">No Visits Arranged</h4>
                <p className="text-[11px] text-[#5B5B5B]/50 mt-1 max-w-xs mx-auto">
                  Submit a "Schedule Site Visit" request inside the popup model to see records reflect here.
                </p>
              </div>
            ) : (
              filteredVisits.map((vst) => (
                <div
                  key={vst.id}
                  className="bg-[#FFFFFF]/90 backdrop-blur-md p-5 border border-[#E7E1D9] hover:border-[#C4514F]/35 relative group space-y-4 rounded-[18px]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold tracking-wide font-serif text-[#1E1E1E]">{vst.clientName}</h4>
                        <span className={`text-[8px] px-2 py-0.5 font-bold uppercase border ${
                          vst.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                            : vst.status === 'confirmed'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/25'
                            : vst.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                        }`}>
                          {vst.status}
                        </span>
                      </div>
                      <p className="text-[9px] text-[#5B5B5B]/50 font-mono mt-0.5 uppercase tracking-wider">Submitted: {vst.timestamp}</p>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteVisit(vst.id)}
                        className="p-1 text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Visit Slot indicators */}
                  <div className="grid grid-cols-2 gap-2 bg-[#FAFAF8] p-3 border border-[#E7E1D9]/50 text-[11px] font-mono text-[#1E1E1E]">
                    <div>
                      <span className="text-[8px] uppercase text-[#1E1E1E]/30 block tracking-wider">Target Property</span>
                      <span className="truncate block font-semibold text-[#C4514F]">{vst.propertyName}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-[#1E1E1E]/30 block tracking-wider">Visit Slot Schedule</span>
                      <span className="truncate block font-semibold text-[#1E1E1E]">📅 {vst.visitDate} | {vst.visitTime.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Operational status transition buttons */}
                  <div className="border-t border-[#E7E1D9] pt-3 flex flex-wrap gap-2 items-center justify-between text-[11px]">
                    <a href={`tel:+91${vst.clientPhone}`} className="flex items-center gap-1 hover:text-[#C4514F] font-bold text-[#5B5B5B]/50 font-mono uppercase text-[10px] tracking-wider">
                      <Phone className="h-3 w-3" />
                      <span>+91 {vst.clientPhone}</span>
                    </a>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleVisitStatus(vst.id, 'confirmed')}
                        className="px-2 py-0.5 bg-[#FAFAF8] text-[#5B5B5B] hover:text-[#1E1E1E] border border-[#E7E1D9] hover:border-[#C4514F] text-[8px] uppercase font-bold tracking-wider cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleVisitStatus(vst.id, 'completed')}
                        className="px-2 py-0.5 bg-[#FAFAF8] text-emerald-400 hover:text-emerald-300 border border-[#E7E1D9] hover:border-emerald-500 text-[8px] uppercase font-bold tracking-wider cursor-pointer"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleVisitStatus(vst.id, 'cancelled')}
                        className="px-2 py-0.5 bg-[#FAFAF8] text-rose-400 hover:text-rose-300 border border-[#E7E1D9] hover:border-rose-500 text-[8px] uppercase font-bold tracking-wider cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )
          )}

        </div>

        {/* Bottom Actions Frame */}
        <div className="p-4 bg-[#FFFFFF]/90 backdrop-blur-md border-t border-[#E7E1D9] flex items-center justify-between">
          <button
            onClick={handleResetSimulator}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Database Simulator</span>
          </button>
          
          <div className="text-[9px] font-mono text-[#1E1E1E]/30 tracking-wider flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Consulting Dashboard v1.2</span>
          </div>
        </div>

      </div>
    </div>
  );
}
