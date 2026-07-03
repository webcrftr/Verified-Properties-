/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Calendar, MessageCircle, Navigation } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

interface FloatingActionsProps {
  onNavigate: (path: string) => void;
}

export default function FloatingActions({ onNavigate }: FloatingActionsProps) {
  
  // WhatsApp welcome link
  const whatsappURL = `https://wa.me/917020913759?text=${encodeURIComponent(
    'Hi Mansi Gaikwad, I was browsing the Verified Properties website and would like to consult about your current properties in Naigaon/Vasai/Virar. Please share details.'
  )}`;

  return (
    <>
      {/* 1. FLOATING WHATSAPP BUTTON (Visible on all devices, floating above things) */}
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-40">
        <a
          href={whatsappURL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer border-2 border-white group animate-bounce"
          title="Chat with Mansi Gaikwad on WhatsApp"
        >
          {/* Custom chat icon */}
          <MessageCircle className="h-7 w-7 fill-white/10 text-white" />
          
          {/* Quick interactive tooltip on hover */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all bg-[#050B18] text-white font-mono uppercase tracking-widest text-[9px] px-3 py-1.5 whitespace-nowrap shadow-md border border-[#D4AF37]/20 rounded-none">
            Instant Chat 💬
          </span>
        </a>
      </div>

      {/* 2. PERSISTENT MOBILE STICKY CTA FOOTER (Fixed overlay exclusively on mobile screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-45 bg-[#050B18]/95 backdrop-blur-md border-t border-[#D4AF37]/25 block sm:hidden shadow-3xl px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          
          {/* Mobile Instant Call Hook */}
          <a
            href={`tel:+91${BUSINESS_DETAILS.phone}`}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-none active:scale-95 transition-transform"
          >
            <Phone className="h-4 w-4 text-[#D4AF37]" />
            <span>Call Now</span>
          </a>

          {/* Mobile Book Site Visit Toggle */}
          <button
            onClick={() => onNavigate('/book-site-visit')}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#D4AF37] text-[#050B18] font-bold text-xs uppercase tracking-widest rounded-none active:scale-95 transition-transform cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Book Visit</span>
          </button>

        </div>
      </div>
    </>
  );
}
