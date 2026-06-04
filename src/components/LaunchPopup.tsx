"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Copy, Mail, Shield, MapPin, Gift, Phone } from 'lucide-react';

export function LaunchPopup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [emailVal, setEmailVal] = useState<string>('');
  const [phoneVal, setPhoneVal] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const dismissedAtStr = localStorage.getItem('funguyz_launch_popup_dismissed_at');
    const subbed = localStorage.getItem('funguyz_launch_popup_submitted') === 'true';
    
    if (subbed) {
      setSubmitted(true);
      setIsOpen(false);
      setIsDismissed(false);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isOpen) {
      return;
    }

    const oneHour = 3600000;

    if (dismissedAtStr) {
      const dismissedAt = parseInt(dismissedAtStr, 10);
      const elapsed = Date.now() - dismissedAt;

      if (elapsed >= oneHour) {
        setIsDismissed(false);
        timerRef.current = setTimeout(() => {
          setIsOpen(true);
        }, 2000);
      } else {
        setIsDismissed(true);
        const remaining = oneHour - elapsed;
        timerRef.current = setTimeout(() => {
          setIsDismissed(false);
          setIsOpen(true);
        }, remaining);
      }
    } else {
      timerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, isDismissed, submitted]);

  const handleDismiss = () => {
    setIsOpen(false);
    setIsDismissed(true);
    localStorage.setItem('funguyz_launch_popup_dismissed_at', Date.now().toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailVal.trim();
    const phone = phoneVal.trim();

    if (!email && !phone) {
      setErrorMsg('Please enter either your email or phone number.');
      return;
    }

    const isEmailValid = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false;
    const isPhoneValid = phone ? (/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/.test(phone) || (phone.replace(/\D/g, '').length >= 10)) : false;

    if (email && !isEmailValid && phone && !isPhoneValid) {
      setErrorMsg('Please enter a valid email address and phone number.');
      return;
    }

    if (email && !isEmailValid) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (phone && !isPhoneValid) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
    localStorage.setItem('funguyz_launch_popup_submitted', 'true');
    const contactInfo = [email ? `Email: ${email}` : '', phone ? `Phone: ${phone}` : ''].filter(Boolean).join(' | ');
    localStorage.setItem('funguyz_launch_popup_contact', contactInfo);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('LAUNCH20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If closed but user dismissed and not yet submitted, render sticky bottom banner
  if (!isOpen && isDismissed && !submitted) {
    return (
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-[998] bg-[#0c0a1a]/95 backdrop-blur-md border-t border-pink-500/20 px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.6)] animate-slide-in-up select-none font-sans">
        <style dangerouslySetInnerHTML={{__html: `
          main {
            padding-bottom: 60px !important;
          }
          @media (max-width: 767px) {
            main {
              padding-bottom: 130px !important;
            }
          }
        `}} />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-transparent pointer-events-none" />
        <div className="flex items-center gap-2.5 text-center md:text-left relative z-10">
          <span className="flex h-2 w-2 shrink-0 rounded-full bg-pink-500 animate-pulse" />
          <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-300 leading-normal">
            🍁 <span className="text-white font-extrabold uppercase logo-font tracking-wider mr-1 text-[#ff4fa3]">Grand Opening Coming Soon:</span> 
            We are launching our new site for secure Canada-Wide delivery & shipping! Pre-order now to secure <b className="text-[#ff4fa3] font-black">20% OFF</b>.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => setIsOpen(true)}
            className="h-8.5 sm:h-9.5 px-4 sm:px-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#ff4fa3] to-[#7b5cff] text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all cursor-pointer logo-font gap-1.5 shadow-md shadow-pink-500/10"
          >
            <span>Claim 20% Off</span>
            <Gift className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 select-none font-sans">
      {/* Outer Modal Container: Responsive height limits, scroll overflow bounds, and scaled padding */}
      <div className="relative w-full max-w-[450px] max-h-[94vh] overflow-y-auto scrollbar-none rounded-[28px] sm:rounded-[32px] bg-[#0c0a1a]/95 text-white border border-pink-500/20 shadow-[0_0_60px_rgba(255,79,163,0.15),0_0_100px_rgba(123,92,255,0.1)] p-5 sm:p-9 flex flex-col items-center text-center gap-4 sm:gap-5.5 animate-scale-up">
        
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#ff4fa3]/15 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#7b5cff]/10 blur-[60px] pointer-events-none" />

        {/* Close button top-right */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/10 border border-slate-700/50 rounded-full cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        </button>

        {!submitted ? (
          <>
            {/* Header Icon Composition with Sparkles and Badges */}
            <div className="relative mt-1 sm:mt-2 shrink-0">
              {/* Star Badge */}
              <div className="absolute -top-1 -right-1 z-10 w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-amber-400 border-2 border-[#0c0a1a] flex items-center justify-center text-[8px] sm:text-[9.5px] text-[#0c0a1a] font-extrabold shadow-sm animate-pulse">
                ★
              </div>

              {/* Floating Sparkles & Confetti Background Elements */}
              <div className="absolute -left-5 -top-2 text-purple-400 text-xs animate-bounce">✦</div>
              <div className="absolute -right-5 top-5 text-pink-400 text-xs animate-pulse">✦</div>
              <div className="absolute left-8 -top-5 text-yellow-300 text-[10px]">✨</div>
              <div className="absolute -left-3 bottom-2 w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
              <div className="absolute -right-3 bottom-3 w-1 h-1 rounded-full bg-pink-500 animate-pulse" />

              {/* Main Rounded Bell Card */}
              <div className="h-13 w-13 sm:h-15 sm:w-15 rounded-[15px] sm:rounded-[18px] bg-gradient-to-tr from-[#ff4fa3] to-[#7b5cff] flex items-center justify-center shadow-lg shadow-pink-500/10 text-white">
                <svg className="h-6 w-6 sm:h-6.5 sm:w-6.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </div>
            </div>

            {/* Announcement Badge */}
            <div className="border border-[#ff4fa3]/30 bg-[#ff4fa3]/5 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none shrink-0">
              <span>✦</span>
              <span>Grand Opening</span>
              <span>✦</span>
            </div>

            {/* Headline Block */}
            <div className="space-y-1.5 shrink-0">
              <h2 className="text-2xl sm:text-3.5xl font-black uppercase tracking-tight leading-none logo-font">
                <span className="text-white block">Canada-Wide</span>
                <span className="text-[20px] sm:text-[28px] block mt-1.5 sm:mt-2">
                  <span className="text-[#ff4fa3]">Delivery</span> <span className="text-white">&</span> <span className="text-[#00d8ff]">Shipping</span>
                </span>
              </h2>

              {/* LAUNCH! line with custom Left & Right Accent Wings */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {/* Left Accent Wing */}
                <svg className="h-3.5 w-5 sm:h-4 sm:w-6 text-pink-500 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M18 12c-4-2-8-2-12 0M16 16c-3-1.5-6-1.5-9 0" />
                </svg>
                
                <h3 className="text-3.5xl sm:text-4.5xl font-extrabold tracking-wider text-white logo-font leading-none uppercase">
                  LAUNCH!
                </h3>

                {/* Right Accent Wing */}
                <svg className="h-3.5 w-5 sm:h-4 sm:w-6 text-pink-500 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M6 12c4-2 8-2 12 0M8 16c3-1.5 6-1.5 9 0" />
                </svg>
              </div>
            </div>

            {/* Glowing Separator Icon */}
            <div className="flex justify-center shrink-0">
              <div className="h-8 w-8 rounded-full border border-purple-500/20 bg-[#7b5cff]/10 flex items-center justify-center text-[#ff4fa3] shadow-[0_0_15px_rgba(123,92,255,0.2)]">
                <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
            </div>

            {/* Description: Scaled font size to fit smaller viewports */}
            <p className="text-[11.5px] sm:text-[13px] font-semibold leading-relaxed text-slate-300 max-w-sm shrink-0">
              We are launching our new site for secure delivery & shipping across Canada soon! Enter your details below to get notified of our grand opening experience and secure <b className="text-[#ff4fa3] font-black">20% OFF</b> your first pre-order.
            </p>

            {/* Form Input Section */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 shrink-0">
              <div className="relative w-full flex items-center">
                <Mail className="absolute left-4 h-4.5 w-4.5 text-slate-400 stroke-[2]" />
                <input
                  type="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-11 sm:h-12 rounded-2xl border border-slate-700 bg-slate-900/35 pl-11 pr-5 text-[11px] sm:text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-500/10 transition-all text-white placeholder:text-slate-500"
                />
              </div>

              <div className="relative w-full flex items-center">
                <Phone className="absolute left-4 h-4.5 w-4.5 text-slate-400 stroke-[2]" />
                <input
                  type="tel"
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full h-11 sm:h-12 rounded-2xl border border-slate-700 bg-slate-900/35 pl-11 pr-5 text-[11px] sm:text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-500/10 transition-all text-white placeholder:text-slate-500"
                />
              </div>

              {errorMsg && (
                <span className="text-[11px] font-bold text-red-400 block text-left px-1.5">
                  ⚠️ {errorMsg}
                </span>
              )}

              <button
                type="submit"
                className="w-full h-11 sm:h-12 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff4fa3] via-[#a855f7] to-[#7b5cff] text-white font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-pink-500/15 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer logo-font gap-2"
              >
                <span>Claim 20% Off & Notify Me</span>
                <svg className="h-4 w-4 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>

            {/* Divider line */}
            <div className="w-full h-px bg-slate-800/40 my-0.5 shrink-0" />

            {/* Trust Indicators block: Responsive flex alignment inside columns */}
            <div className="grid grid-cols-3 divide-x divide-slate-800/60 w-full text-center items-center shrink-0">
              
              {/* Secure Shipping */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-0.5">
                <Shield className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#ff4fa3] stroke-[1.8] shrink-0" />
                <div className="text-center sm:text-left leading-none shrink-0">
                  <span className="block text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest">Secure</span>
                  <span className="block text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-0">Shipping</span>
                </div>
              </div>

              {/* Across Canada */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-0.5">
                <MapPin className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#00d8ff] stroke-[1.8] shrink-0" />
                <div className="text-center sm:text-left leading-none shrink-0">
                  <span className="block text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest">Across</span>
                  <span className="block text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-0">Canada</span>
                </div>
              </div>

              {/* Exclusive Offers */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-0.5">
                <Gift className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#a855f7] stroke-[1.8] shrink-0" />
                <div className="text-center sm:text-left leading-none shrink-0">
                  <span className="block text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest">Exclusive</span>
                  <span className="block text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-0">Offers</span>
                </div>
              </div>

            </div>

            {/* Dismiss link */}
            <button
              onClick={handleDismiss}
              className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-400 transition-colors duration-200 cursor-pointer logo-font border-b border-dashed border-slate-600/50 pb-0.5 shrink-0"
            >
              No thanks, just browsing
            </button>
          </>
        ) : (
          <>
            {/* Success State Visuals */}
            <div className="h-13 w-13 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-md mt-2 shrink-0">
              <Check className="h-5.5 w-5.5 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-emerald-400 logo-font block">
                VIP Access Guaranteed
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight logo-font mt-1">
                Welcome To The Club!
              </h2>
            </div>

            <p className="text-[11.5px] sm:text-[13px] font-semibold leading-relaxed text-slate-300 max-w-xs">
              Thank you! We will reach out to you with our exclusive grand opening experience. Here is your 20% off pre-order discount code:
            </p>

            {/* Coupon Code Dotted Container */}
            <div className="border-2 border-dashed border-[#ff4fa3]/40 bg-[#ff4fa3]/5 rounded-2xl p-4 flex items-center justify-between w-full mt-2">
              <div className="text-left">
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Pre-Order Discount Code</span>
                <strong className="block text-base sm:text-lg font-black tracking-widest text-[#ff4fa3] logo-font mt-0.5">LAUNCH20</strong>
              </div>
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-white text-[#1b1533] hover:bg-[#ff4fa3] hover:text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm shrink-0 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600 stroke-[2.5]" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Dismiss CTA */}
            <button
              onClick={handleDismiss}
              className="w-full h-11 sm:h-12 inline-flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[11px] sm:text-xs uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all cursor-pointer logo-font mt-3"
            >
              Continue to Site
            </button>
          </>
        )}
      </div>
    </div>
  );
}
