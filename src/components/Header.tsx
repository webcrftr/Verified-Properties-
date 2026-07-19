/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck, Mail } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '/services' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isLinkActive = (itemPath: string) => {
    // Exact match or ends with match for robustness
    if (itemPath === '/') {
      return currentPath === '/' || currentPath === '/index' || currentPath === '';
    }
    return currentPath === itemPath || currentPath.replace('.html', '') === itemPath;
  };

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    onNavigate(path);
  };

  return (
    <header
      id="app-header"
      className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300"
    >
      {/* 1. TOP TICKER REGISTRATION BAR */}
      <div className="bg-[#FAFAF8] border-b border-[#E7E1D9]/50 py-1.5 text-[#5B5B5B] text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#5B5B5B]/90">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-[#1E1E1E]">MahaRERA Agent Reg No:</span>
            <span className="text-[#C4514F] font-mono font-bold tracking-wider">{BUSINESS_DETAILS.reraNo}</span>
          </div>
          
          <div className="flex items-center gap-4 text-[#5B5B5B] font-mono text-[9px] sm:text-xs">
            <a href={`tel:+91${BUSINESS_DETAILS.phone}`} className="hover:text-[#1E1E1E] transition-colors flex items-center gap-1">
              <span>📞 +91 {BUSINESS_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & NAVIGATION ROW */}
      <div className={`transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E7E1D9] py-2.5'
          : 'bg-[#FAFAF8]/80 backdrop-blur-sm border-b border-[#E7E1D9]/50 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Group */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer select-none group" 
              onClick={() => handleLinkClick('/')}
            >
              <div className="bg-[#C4514F] h-10 w-10 flex items-center justify-center font-bold font-serif text-[#FAFAF8] text-lg shadow-md transition-transform group-hover:scale-105">
                VP
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-extrabold tracking-widest text-[#1E1E1E] leading-none uppercase font-sans">
                  VERIFIED PROPERTIES
                </span>
                <span className="text-[7.5px] sm:text-[8px] tracking-[0.16em] text-[#C4514F] uppercase font-mono mt-1 whitespace-nowrap">
                  REAL ESTATE & INVESTMENT CONSULTANT
                </span>
              </div>
            </div>

            {/* Desktop Navigation Linkages */}
            <div className="hidden lg:flex items-center gap-6">
              <nav className="flex items-center gap-5">
                {navItems.map((item) => {
                  const active = isLinkActive(item.path);
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleLinkClick(item.path)}
                      className={`text-xs font-bold uppercase tracking-widest transition-all cursor-pointer relative py-1 bg-transparent ${
                        active 
                          ? 'text-[#C4514F]' 
                          : 'text-[#1E1E1E] hover:text-[#C4514F]'
                      }`}
                    >
                      {item.name}
                      {/* Active line transition indicator */}
                      <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C4514F] transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 hover:w-full'
                      }`}></span>
                    </button>
                  );
                })}
              </nav>

              <div className="h-5 w-px bg-[#F5EFE7]"></div>

              {/* Status "Speak to Mansi" */}
              <div className="flex items-center gap-1.5 font-sans select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B5B5B]">
                  Speak to Mansi
                </span>
              </div>

              {/* Callback Button CTA */}
              <button
                onClick={() => handleLinkClick('/enquiry')}
                className="px-4 py-2 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-extrabold text-[10px] uppercase tracking-widest transition-colors cursor-pointer shadow-sm"
              >
                REQUEST CALL BACK
              </button>
            </div>

            {/* Mobile Layout Widgets */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex items-center gap-1 leading-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-bold text-[#5B5B5B] uppercase tracking-widest leading-none">Mansi</span>
              </div>

              <button
                onClick={() => handleLinkClick('/enquiry')}
                className="px-2.5 py-1.5 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 text-[9px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Enquire
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 px-1.5 border border-[#E7E1D9] text-[#1E1E1E] hover:bg-[#F5EFE7] hover:border-[#C4514F]/50 cursor-pointer"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden animate-fade-in fixed inset-x-0 top-[100px] bg-[#FAFAF8] border-b border-[#E7E1D9] shadow-2xl py-6 px-4 flex flex-col gap-5 z-40 max-h-[calc(100vh-100px)] overflow-y-auto">
          {/* Main Links */}
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.path)}
                  className={`py-3 px-4 uppercase tracking-wider text-left font-bold text-xs transition-all border bg-transparent cursor-pointer ${
                    active
                      ? 'bg-[#C4514F]/10 text-[#C4514F] border-[#C4514F]/40'
                      : 'bg-[#F5EFE7] text-[#EEF4F8] hover:text-[#C4514F] border-[#E7E1D9]/50 hover:border-[#C4514F]/20'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="h-px bg-[#F5EFE7]"></div>

          {/* Contact Details & Actions */}
          <div className="flex flex-col gap-3">
            <a
              href={`tel:+91${BUSINESS_DETAILS.phone}`}
              className="flex items-center justify-between px-4 py-3 bg-[#C4514F] text-white hover:bg-[#B13E3B] transition-colors duration-300 font-bold uppercase text-xs tracking-wider"
            >
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Call Mansi Gaikwad</span>
              </div>
              <span className="text-xs">+91 {BUSINESS_DETAILS.phone}</span>
            </a>

            <a
              href={`mailto:${BUSINESS_DETAILS.email}`}
              className="flex items-center gap-3 px-4 py-3 bg-[#F5EFE7] border border-[#E7E1D9] text-[#1E1E1E] text-xs"
            >
              <Mail className="h-4 w-4 text-[#C4514F]" />
              <span className="truncate">{BUSINESS_DETAILS.email}</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
}
