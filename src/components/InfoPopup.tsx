"use client";

import React from 'react';
import { X } from 'lucide-react';

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  announcementText: string | null;
}

export function InfoPopup({ isOpen, onClose, announcementText }: InfoPopupProps) {
  if (!isOpen || !announcementText) return null;

  // Keyword-based mapping to generate specific titles and descriptions matching the screenshot's style
  const getAnnouncementDetail = (text: string) => {
    const t = text.toLowerCase();
    
    if (t.includes('ottawa')) {
      return {
        title: "Ottawa Magic Mushroom Delivery Same-Day",
        description: "Same-day express delivery is available in Ottawa and surrounding regions. Fast, safe, and discreet drop-offs within 2-4 hours of placing your order."
      };
    }
    
    if (t.includes('toronto') || t.includes('gta') || t.includes('peel') || t.includes('halton') || t.includes('barrie') || t.includes('mississauga') || t.includes('brampton') || t.includes('oakville')) {
      return {
        title: "GTA Magic Mushroom Delivery Same-Day",
        description: "Same-day express delivery is available in Toronto, Mississauga, Brampton, Oakville, Barrie, and surrounding Peel, Halton, York, Durham, and Simcoe regions. Fast, safe, and discreet drop-offs within 2-4 hours of placing your order."
      };
    }
    
    if (t.includes('delivery') || t.includes('delivered') || t.includes('door')) {
      return {
        title: "Local Same-Day Courier Delivery",
        description: "We offer fast, safe, and discreet local courier delivery directly to your door in our active delivery zones. Deliveries typically arrive within 2-4 hours of order placement."
      };
    }
    
    if (t.includes('shipping') || t.includes('package') || t.includes('packaging') || t.includes('canada')) {
      return {
        title: "Discreet Canada-Wide Shipping",
        description: "We ship securely to all provinces and territories across Canada using Canada Post Express. Every order is double vacuum-sealed in scent-free packaging, ensuring 100% privacy."
      };
    }
    
    if (t.includes('save') || t.includes('launch') || t.includes('offer') || t.includes('live') || t.includes('20%')) {
      return {
        title: "New Store Launch Offer - Save 20%",
        description: "Celebrate our grand opening! Register now to save 20% on your first order. Use the coupon code LAUNCH20 at checkout. Priority cleanroom fulfillment begins on our launch day."
      };
    }
    
    if (t.includes('secure') || t.includes('checkout') || t.includes('private') || t.includes('trusted') || t.includes('privacy')) {
      return {
        title: "100% Private & Secure Checkout",
        description: "Your privacy is our priority. We accept secure Interac e-Transfers, keeping bank statements clean and profiles anonymous. All client data is hosted on isolated, encrypted servers."
      };
    }

    // Default Fallback
    return {
      title: "Official FunGuyz Announcement",
      description: text
    };
  };

  const { title, description } = getAnnouncementDetail(announcementText);

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 font-sans select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[480px] rounded-[28px] bg-[#fffaf5] text-[#1b1533] border border-pink-100/40 shadow-2xl p-6 sm:p-7 flex flex-col gap-5 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4.5 right-4.5 text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Top Header Row */}
        <div className="flex items-center gap-3.5 text-left">
          {/* Square Icon Container */}
          <div className="h-12 w-12 rounded-2xl bg-[#f0daf7] flex items-center justify-center border border-purple-200/40 shrink-0 shadow-sm">
            <span className="text-2xl">🍄</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">
              Announcement Detail
            </span>
            <span className="text-xs font-black text-[#564e70] uppercase logo-font mt-1 leading-none">
              FunGuyz Store
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[18px] sm:text-[20px] font-black text-[#1b1533] logo-font leading-snug text-left mt-1">
          {title}
        </h2>

        {/* Description Container Box */}
        <div className="bg-white border border-[#fff1eb] rounded-2xl p-4 sm:p-5 text-left text-[12px] sm:text-[13px] font-semibold text-[#4e4666] leading-relaxed shadow-[inset_0_2px_8px_rgba(255,79,163,0.02)]">
          <p>{description}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full h-12 sm:h-[48px] inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] hover:bg-[#ff3897] text-white font-black text-xs uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer logo-font shadow-md shadow-pink-500/10 mt-1"
        >
          Understand & Close
        </button>
      </div>
    </div>
  );
}
