"use client";

import React, { useState } from 'react';
import { Mail, MapPin, ShieldCheck, ChevronDown, X, Send, HelpCircle } from 'lucide-react';
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
  const [isSupportOpen, setIsSupportOpen] = useState(false);

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
                <span>24/7 Online Ordering</span>
                <span>Delivery Available 9AM–11PM</span>
                <span>7 Days A Week</span>
              </div>
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
      {isSupportOpen && (
        <SupportModal onClose={() => setIsSupportOpen(false)} />
      )}
    </footer>
  );
}

interface SupportModalProps {
  onClose: () => void;
}

function SupportModal({ onClose }: SupportModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'Product',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#1b1533] border border-purple-500/20 rounded-[32px] p-6 md:p-8 shadow-[0_24px_80px_rgba(123,92,255,0.15)] text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/60 hover:text-[#ff4fa3] transition-colors p-2 hover:bg-white/5 rounded-full cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#ff4fa3] to-[#7b5cff] flex items-center justify-center text-lg text-white shadow-md shadow-pink-500/10 shrink-0">
            <HelpCircle className="h-5.5 w-5.5" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-black tracking-tight text-white uppercase logo-font">Submit Support Ticket</h3>
            <p className="text-[10px] font-bold text-[#2fdfff] uppercase tracking-wider">Average response time: 2-4 hours</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-black text-white uppercase logo-font">Ticket Opened Successfully</h4>
              <p className="text-xs text-white/60 mt-1">Our support agents have received your inquiry. Check your email for updates.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4.5 text-left">
            <div className="grid gap-4.5 sm:grid-cols-2">
              <label className="block text-[11px] font-black uppercase tracking-wider text-white/50">
                Your Name
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-white/30 outline-none focus:border-[#ff4fa3] focus:bg-white/[0.07] transition-all"
                />
              </label>
              <label className="block text-[11px] font-black uppercase tracking-wider text-white/50">
                Email Address
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-white/30 outline-none focus:border-[#ff4fa3] focus:bg-white/[0.07] transition-all"
                />
              </label>
            </div>

            <div className="grid gap-4.5 sm:grid-cols-2">
              <label className="block text-[11px] font-black uppercase tracking-wider text-white/50">
                Phone Number
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 (416) 555-0199"
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-white/30 outline-none focus:border-[#ff4fa3] focus:bg-white/[0.07] transition-all"
                />
              </label>
              <label className="block text-[11px] font-black uppercase tracking-wider text-white/50">
                Support Category
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-white outline-none focus:border-[#ff4fa3] focus:bg-white/[0.07] transition-all"
                >
                  <option value="Product" className="bg-[#1b1533] text-white">Product Question</option>
                  <option value="Checkout" className="bg-[#1b1533] text-white">Checkout Help</option>
                  <option value="Payment" className="bg-[#1b1533] text-white">Payment & E-Transfer</option>
                  <option value="Shipping" className="bg-[#1b1533] text-white">Shipping & Tracking</option>
                  <option value="Other" className="bg-[#1b1533] text-white">Other Inquiry</option>
                </select>
              </label>
            </div>

            <label className="block text-[11px] font-black uppercase tracking-wider text-white/50">
              Subject
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What can we help you with?"
                className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-white/30 outline-none focus:border-[#ff4fa3] focus:bg-white/[0.07] transition-all"
              />
            </label>

            <label className="block text-[11px] font-black uppercase tracking-wider text-white/50">
              Detailed Description
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your issue in detail..."
                className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-white/30 outline-none focus:border-[#ff4fa3] focus:bg-white/[0.07] transition-all resize-none"
              />
            </label>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-3.5 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-900/20 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer gap-2 logo-font"
            >
              <Send className="h-4 w-4" /> Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
