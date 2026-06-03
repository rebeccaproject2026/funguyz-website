"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Phone, ShieldCheck, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

type FooterColumn = [title: string, links: string[]];

const cols: FooterColumn[] = [
  ['SHOP', ['Edibles', 'Bundles', 'Capsules', 'Microdose', 'Best Sellers', 'Magic Mushrooms']],
  ['SUPPORT', ['FAQ', 'Contact Us', 'Track Order', 'Shipping Policy', 'Payment Methods', 'Returns & Refunds']],
  ['LEARN', ['Blog', 'Beginner Guide', 'Microdose Guide', 'Mushroom Strains', 'Wellness Articles', 'Research & Studies']],
  ['LEGAL', ['Cookie Policy', 'Privacy Policy', 'Responsible Use', 'Legal Disclaimer', 'Age Verification', 'Terms & Conditions']],
];

export function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  return (
    <footer className="bg-[#1b1533] text-white border-t border-purple-950/20 pt-16 pb-24 md:pb-8 relative">
      {/* Visual background glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#7b5cff]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 lg:grid-cols-[1.4fr_repeat(4,1fr)_1.2fr]">
        {/* Brand Info */}
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="max-w-xs text-xs font-semibold leading-6 text-white/60">
            Your trusted Canadian source for premium magic mushrooms, edibles,
            capsules & microdose products. Quality, purity & experience.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#instagram" className="text-white/60 hover:text-white transition-colors duration-200">
              <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#facebook" className="text-white/60 hover:text-white transition-colors duration-200">
              <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#tiktok" className="text-white/60 hover:text-white transition-colors duration-200">
              <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
            <a href="#twitter" className="text-white/60 hover:text-white transition-colors duration-200">
              <svg className="h-4.5 w-4.5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Dynamic Columns */}
        {cols.map(([title, links]) => {
          const isOpen = !!openSections[title];
          return (
            <div key={title} className="flex flex-col gap-3.5 border-b border-white/5 pb-4 md:border-none md:pb-0 md:gap-5">
              {/* Column Title button on mobile, label on desktop */}
              <button
                onClick={() => toggleSection(title)}
                className="w-full flex items-center justify-between text-left focus:outline-none md:pointer-events-none group cursor-pointer"
              >
                <h4 className="text-xs font-black uppercase tracking-wider text-[#2fdfff]">{title}</h4>
                <ChevronDown className={`h-4 w-4 text-[#2fdfff]/60 transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180 text-[#ff4fa3]' : ''}`} />
              </button>

              <ul className={`md:block space-y-3.5 text-xs font-semibold text-white/50 ${isOpen ? 'block' : 'hidden'}`}>
                {links.map((item) => {
                  const getFooterLink = (colTitle: string, linkItem: string): string => {
                    const norm = linkItem.toLowerCase();
                    if (colTitle === 'SHOP') {
                      if (norm === 'best sellers') return '/shop?filter=best-sellers';
                      if (norm === 'bundles') return '/bundles';
                      return `/category/${norm.replace(/\s+/g, '-')}`;
                    }
                    if (colTitle === 'SUPPORT') {
                      if (norm === 'faq') return '/faq';
                      if (norm === 'contact us') return '/contact';
                      if (norm === 'track order') return '/track-order';
                      return `/info/${norm.replace(/\s+/g, '-').replace('&', 'and')}`;
                    }
                    if (colTitle === 'LEARN') {
                      if (norm === 'blog') return '/blog';
                      if (norm === 'beginner guide') return '/blog/beginner-guide';
                      if (norm === 'microdose guide') return '/blog/microdose-guide';
                      if (norm === 'mushroom strains') return '/blog/mushroom-strains';
                      if (norm === 'wellness articles') return '/blog/wellness-articles';
                      if (norm === 'research & studies') return '/blog/research-and-studies';
                      return '/blog';
                    }
                    if (colTitle === 'LEGAL') {
                      return `/info/${norm.replace(/\s+/g, '-').replace('&', 'and')}`;
                    }
                    return '#';
                  };

                  return (
                    <li key={item}>
                      <a href={getFooterLink(title, item)} className="hover:text-[#ff4fa3] transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* Contact Info */}
        <div className="flex flex-col gap-5">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#2fdfff]">CONTACT US</h4>
          <ul className="space-y-4.5 text-xs font-semibold text-white/60">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#2fdfff] shrink-0" />
              <a href="mailto:hello@funguyz.ca" className="hover:text-white transition-colors">hello@funguyz.ca</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-[#2fdfff] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 text-[11px] leading-relaxed text-white/60">
                <span>10am-10pm Mon-Thr</span>
                <span>10am-11pm fri-sat</span>
                <span>11am - 10pm sun</span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#2fdfff] shrink-0" />
              <span>+1 (888) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-sm select-none">🇨🇦</span>
              <span>Canada</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/5 pt-8 px-6 relative z-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 w-full text-center md:text-left">
          
          {/* Copyright & Credentials Line (Left) */}
          <div className="flex flex-col sm:flex-row items-center gap-x-3 gap-y-1.5 text-xs font-semibold text-white/40">
            <span>© 2026 FunGuyz. All Rights Reserved.</span>
            <span className="hidden sm:inline h-3.5 w-px bg-white/10" />
            <span>
              Sourced from <a href="https://mushroomexpert.com" target="_blank" rel="noreferrer" className="text-[#ff4fa3] hover:underline font-black">MushroomExpert.com</a>
            </span>
          </div>

          {/* Translucent 19+ Age Warning Capsule (Right) */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-red-500/5 border border-red-500/15 px-4 py-1.5 text-xs text-red-400/90 shadow-sm shrink-0">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 border border-red-500/30 text-[9px] font-black text-red-500">19+</span>
            <span className="font-semibold tracking-wide">This site is intended for adults 19 years and older. Please consume responsibly.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
