"use client";

import React from 'react';
import { X } from 'lucide-react';

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: any | null;
}

export function InfoPopup({ isOpen, onClose, announcement }: InfoPopupProps) {
  if (!isOpen || !announcement) return null;


  const title = announcement.detailsTitle || "Official FunGuyz Announcement";
  const description = announcement.detailsContent || announcement.text;


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
