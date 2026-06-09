"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { X, Check, Copy, Mail, Shield, MapPin, Gift, Phone, Lock, Truck, Zap, Heart, ShieldCheck, User } from 'lucide-react';

export function LaunchPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [usernameVal, setUsernameVal] = useState<string>('');
  const [emailVal, setEmailVal] = useState<string>('');
  const [phoneVal, setPhoneVal] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subbed = localStorage.getItem('funguyz_launch_popup_submitted') === 'true';
    if (subbed) {
      setSubmitted(true);
    }

    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-launch-popup', handleOpen);
    return () => {
      window.removeEventListener('open-launch-popup', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (submitted) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isOpen) {
      return;
    }

    const dismissedAtStr = localStorage.getItem('funguyz_launch_popup_dismissed_at');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameVal.trim();
    const email = emailVal.trim();
    const phone = phoneVal.trim();

    if (!username) {
      setErrorMsg('Please enter your full name.');
      return;
    }

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

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, phone }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setErrorMsg('');
      setSubmitted(true);
      localStorage.setItem('funguyz_launch_popup_submitted', 'true');
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('LAUNCH20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Do not render popup on checkout pages
  if (pathname === '/checkout' || pathname === '/checkout/') return null;

  // If closed but user dismissed and not yet submitted, render sticky bottom banner
  if (!isOpen && isDismissed && !submitted) {
    if (pathname !== '/') return null;
    return (
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-[998] bg-[#0c0a1a]/95 backdrop-blur-md border-t border-pink-500/20 px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.6)] animate-slide-in-up select-none font-sans">
        <style dangerouslySetInnerHTML={{
          __html: `
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
        <div className="flex items-center gap-3 text-center md:text-left relative z-10">
          <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff4fa3] animate-pulse" />
          <p className="text-[12px] sm:text-xs font-semibold tracking-wide text-slate-300 leading-normal flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="text-sm">🍄</span>
            <span className="text-[#ff4fa3] font-black uppercase logo-font tracking-wider">NEW DELIVERY & SHIPPING SITE LAUNCHING JUNE 25!</span>
            <span>Early birds get <b className="text-[#ff4fa3] font-black">20% OFF</b> when you register now.</span>
            <span className="text-slate-600 px-0.5 font-normal">|</span>
            <span>Delivery First.</span>
            <span className="text-slate-600 px-0.5 font-normal">|</span>
            <span>Shipping Next.</span>
            <span className="text-slate-600 px-0.5 font-normal">|</span>
            <span>Discreet. Fast. Secure.</span>
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => setIsOpen(true)}
            className="h-8.5 sm:h-9.5 px-4 sm:px-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#ff4fa3] to-[#7b5cff] text-white font-black text-[11px] sm:text-[12px] uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all cursor-pointer logo-font gap-2 shadow-md shadow-pink-500/10"
          >
            <span>REGISTER & SAVE 20%</span>
            <Gift className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 select-none font-sans">
      <div className="relative w-full max-w-[490px] max-h-[96vh] overflow-y-auto scrollbar-none rounded-[28px] bg-[#0c0a1a]/98 text-white border border-[#ff4fa3]/30 shadow-[0_0_80px_rgba(255,79,163,0.15),0_0_120px_rgba(123,92,255,0.1)] p-3.5 sm:p-6 flex flex-col items-center text-center gap-2 sm:gap-4 animate-scale-up">
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#ff4fa3]/15 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#7b5cff]/10 blur-[60px] pointer-events-none" />

        {/* Close button top-right */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 border border-slate-800/80 rounded-full cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {!submitted ? (
          <>
            {/* Header Graphics & Title Block */}
            <div className="w-full shrink-0 mt-1 relative min-h-[80px] sm:min-h-[140px] flex flex-col items-center justify-center px-2 sm:px-14">
              {/* Left Neon Mushroom Graphic */}
              <div className="absolute left-1 top-1/2 -translate-y-1/2 select-none pointer-events-none filter drop-shadow-[0_0_5px_rgba(255,79,163,0.6)] hidden sm:block shrink-0">
                <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 32C12 20 20 12 32 12C44 12 52 20 52 32H12Z" stroke="#ff4fa3" strokeWidth="3" />
                  <path d="M26 32V48C26 50 28 52 32 52C36 52 38 50 38 48V32" stroke="#00d8ff" strokeWidth="3" />
                  <circle cx="24" cy="22" r="2.5" fill="#ff4fa3" />
                  <circle cx="38" cy="24" r="2.5" fill="#ff4fa3" />
                  <circle cx="30" cy="28" r="2" fill="#ff4fa3" />
                  <path d="M8 46C8 40 12 36 18 36C24 36 28 40 28 46H8Z" stroke="#00d8ff" strokeWidth="2" />
                  <path d="M15 46V52C15 53 16 54 18 54C20 54 21 53 21 52V46" stroke="#ff4fa3" strokeWidth="2" />
                </svg>
              </div>

              {/* Title & Badge */}
              <div className="flex flex-col items-center w-full">
                <div className="border border-[#ff4fa3] bg-[#ff4fa3]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 text-[8.5px] sm:text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none shrink-0 mb-1.5 sm:mb-3 shadow-[0_0_10px_rgba(255,79,163,0.12)]">
                  <span>🚚</span>
                  <span>NEW DELIVERY & SHIPPING SITE</span>
                </div>
                <span className="text-[9.5px] sm:text-[11px] font-black tracking-widest text-slate-400 uppercase logo-font block">
                  = COMING SOON =
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none logo-font text-white mt-1">
                  JUNE 25<span className="lowercase text-xl align-super font-bold">TH</span>
                </h2>
                <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight leading-none logo-font mt-2 flex flex-col items-center">
                  <span className="text-[#ff4fa3] drop-shadow-[0_0_8px_rgba(255,79,163,0.5)]">WE DELIVER.</span>
                  <span className="text-[#00d8ff] drop-shadow-[0_0_8px_rgba(0,216,255,0.5)] mt-0.5 flex items-center gap-1">
                    YOU ENJOY. <span className="text-rose-500 text-sm sm:text-lg">❤️</span>
                  </span>
                </h3>
              </div>

              {/* Right Neon Delivery Van */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2 select-none pointer-events-none filter drop-shadow-[0_0_5px_rgba(168,85,247,0.6)] hidden sm:block shrink-0">
                <svg className="w-20 h-14" viewBox="0 0 100 60" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 20H15M2 28H20M8 36H15" stroke="#ff4fa3" strokeWidth="2" />
                  <path d="M25 40V18C25 16.5 26.5 15 28 15H75C76.5 15 78 16.5 78 18V22L88 28V40H25Z" stroke="#d946ef" strokeWidth="2.5" />
                  <path d="M78 22H86V28L78 28V22Z" stroke="#00d8ff" strokeWidth="2" />
                  <circle cx="38" cy="44" r="5" stroke="#00d8ff" strokeWidth="2" />
                  <circle cx="70" cy="44" r="5" stroke="#00d8ff" strokeWidth="2" />
                  <g transform="translate(32, 22)">
                    <rect x="0" y="0" width="34" height="12" rx="3" fill="#000" stroke="#ff4fa3" strokeWidth="1" />
                    <text x="3" y="9" fill="#00d8ff" fontSize="6.5" fontWeight="900" fontFamily="system-ui" letterSpacing="0.5">FUNGUYZ</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Description */}
            <p className="text-[10.5px] sm:text-xs font-semibold leading-relaxed text-slate-300 max-w-sm shrink-0 hidden sm:block">
              Our new delivery and shipping site goes live on <span className="text-[#ff4fa3] font-bold">June 25th!</span>
            </p>

            {/* 4 Feature Columns: Hidden on mobile, 4 columns inline on tablet/desktop */}
            <div className="hidden sm:grid grid-cols-4 divide-x divide-slate-800/40 w-full pt-0.5 shrink-0">
              {[
                { title: 'DELIVERY PRIORITY', desc: 'Fast delivery to your door', icon: '🚚', color: 'from-[#ff4fa3] to-pink-600', textColors: 'text-[#ff4fa3]' },
                { title: 'DISCREET SHIPPING', desc: 'Private packaging, always', icon: '🔒', color: 'from-[#00d8ff] to-cyan-600', textColors: 'text-[#00d8ff]' },
                { title: 'CANADA-WIDE COVERAGE', desc: 'From coast to coast', icon: 'maple', color: 'from-[#7b5cff] to-indigo-600', textColors: 'text-[#7b5cff]' },
                { title: 'MADE WITH LOVE', desc: 'For our community, by our team', icon: '❤️', color: 'from-rose-500 to-[#ff4fa3]', textColors: 'text-rose-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center px-1">
                  <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg text-white text-sm shrink-0`}>
                    {item.icon === 'maple' ? (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.1 11.2c-.4-.4-1-.3-1.4.1l-1.3 1.4c-.2-.4-.6-.8-1-1l1.6-4.5c.2-.5 0-1-.4-1.3-.4-.3-1-.2-1.3.2L16 10.3c-.5-.1-1 0-1.4.3l.5-5.3c0-.5-.4-1-.9-1.1s-1 .2-1.1.7L12 9.5 10.9 4.9c-.1-.5-.6-.9-1.1-.7s-.9.4-.9.9l.5 5.3c-.4-.3-.9-.4-1.4-.3L4.7 6.1c-.3-.4-.9-.5-1.3-.2-.4.3-.6.8-.4 1.3l1.6 4.5c-.4.2-.8.6-1 1L2.3 11.3c-.4-.4-1-.5-1.4-.1s-.5 1-.1 1.4l3.1 3.1c.4.4 1 .4 1.4 0l.7-.7c.1.5.5.9 1 1l-1.2 3.4c-.2.5 0 1 .4 1.3.2.1.4.2.6.2.3 0 .6-.1.8-.3l2.5-3.3v4.1c0 .6.4 1 1 1s1-.4 1-1v-4.1l2.5 3.3c.3.4.9.5 1.3.2.4-.3.6-.8.4-1.3l-1.2-3.4c.5-.1.9-.5 1-1l.7.7c.2.2.5.3.7.3s.5-.1.7-.3l3.1-3.1c.4-.4.4-1.1 0-1.5z" />
                      </svg>
                    ) : item.icon === '🔒' ? (
                      <Lock className="h-4 w-4 text-white" />
                    ) : (
                      <span>{item.icon}</span>
                    )}
                  </div>
                  <strong className={`block text-[7px] sm:text-[8.5px] font-black uppercase tracking-wider text-center mt-2 ${item.textColors} logo-font leading-tight`}>{item.title}</strong>
                  <span className="hidden sm:block text-[8.5px] font-semibold text-slate-400 text-center leading-normal mt-0.5">{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Offer Box with neon pink border */}
            <div className="w-full border border-[#ff4fa3]/30 bg-[#ff4fa3]/5 p-4 sm:p-4.5 rounded-[20px] flex flex-col gap-2.5 relative shadow-[inset_0_0_15px_rgba(255,79,163,0.02)] mt-1 shrink-0">
              <div className="flex items-center justify-between gap-2 w-full px-1">
                {/* Neon Bird */}
                <div className="shrink-0 text-[#ff4fa3] filter drop-shadow-[0_0_4px_rgba(255,79,163,0.8)] hidden sm:block">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </div>

                <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#ff4fa3] logo-font text-center flex-1">
                  EARLY BIRDS GET 20% OFF!
                </span>

                {/* Neon Heart */}
                <div className="shrink-0 text-[#ff4fa3] filter drop-shadow-[0_0_4px_rgba(255,79,163,0.8)] hidden sm:block">
                  <Heart className="h-5 h-5 fill-none stroke-current" />
                </div>
              </div>

              <p className="text-[10.5px] sm:text-[11px] font-semibold leading-relaxed text-slate-400 text-center max-w-xs mx-auto -mt-1">
                Register now and be the first to shop on June 25th & receive <b className="text-[#ff4fa3] font-black">20% OFF</b> your first order.
              </p>

              {/* Form Input Section */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5 shrink-0">
                <div className="relative w-full flex items-center">
                  <User className="absolute left-4.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={usernameVal}
                    onChange={(e) => setUsernameVal(e.target.value)}
                    placeholder="Full Name"
                    className="w-full h-10 sm:h-11 rounded-xl border border-slate-700 bg-slate-950/60 pl-11 pr-5 text-[11.5px] sm:text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-500/10 transition-all text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="relative w-full flex items-center">
                  <Mail className="absolute left-4.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    placeholder="Email Address"
                    className="w-full h-10 sm:h-11 rounded-xl border border-slate-700 bg-slate-950/60 pl-11 pr-5 text-[11.5px] sm:text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-500/10 transition-all text-white placeholder:text-slate-500"
                  />
                </div>

                <div className="relative w-full flex items-center">
                  <Phone className="absolute left-4.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phoneVal}
                    onChange={(e) => setPhoneVal(e.target.value)}
                    placeholder="Phone Number (Optional)"
                    className="w-full h-10 sm:h-11 rounded-xl border border-slate-700 bg-slate-950/60 pl-11 pr-5 text-[11.5px] sm:text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-500/10 transition-all text-white placeholder:text-slate-500"
                  />
                </div>

                {errorMsg && (
                  <span className="text-[11px] font-bold text-red-400 block text-left px-1.5">
                    ⚠️ {errorMsg}
                  </span>
                )}

                <button
                  type="submit"
                  className="w-full h-10 sm:h-11 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#ff4fa3] via-[#a855f7] to-[#7b5cff] text-white font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-pink-500/15 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer logo-font gap-2 mt-1"
                >
                  <span>YES! NOTIFY ME & SEND MY 20% OFF</span>
                  <span className="text-sm font-normal">➔</span>
                </button>
              </form>
            </div>

            {/* Divider line */}
            <div className="w-full h-px bg-slate-800/40 my-0.5 shrink-0" />

            {/* Trust Indicators block: 4 column layout */}
            <div className="grid grid-cols-4 divide-x divide-slate-800/60 w-full text-center items-center shrink-0">
              {[
                { text: 'SECURE CHECKOUT', icon: Lock, color: 'text-emerald-500' },
                { text: 'FAST FULFILLMENT', icon: Zap, color: 'text-pink-500' },
                { text: 'PRIVATE & DISCREET', icon: ShieldCheck, color: 'text-[#00d8ff]' },
                { text: 'EXCLUSIVE OFFER', icon: Gift, color: 'text-[#a855f7]' }
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex flex-col items-center justify-center gap-1 px-0.5">
                    <IconComp className={`h-4 w-4 ${item.color} shrink-0`} />
                    <span className="text-[7.5px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest leading-tight">{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Disclaimer */}
            <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-slate-500 -mt-1 shrink-0">
              <span>🍄</span>
              <span>No spam. Just early access & exclusive offers.</span>
              <span>🍄</span>
            </div>

            {/* Dismiss link */}
            <button
              onClick={handleDismiss}
              className="text-[10px] sm:text-[10.5px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-400 transition-colors duration-200 cursor-pointer logo-font border-b border-dashed border-slate-600/50 pb-0.5 shrink-0"
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
              <span className="text-[12px] sm:text-[12px] font-black uppercase tracking-widest text-emerald-400 logo-font block">
                VIP Access Guaranteed
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight logo-font mt-1">
                Welcome To The Club!
              </h2>
            </div>

            <p className="text-[12px] sm:text-[13px] font-semibold leading-relaxed text-slate-300 max-w-xs">
              Thank you! We will reach out to you with our exclusive grand opening experience. Here is your 20% off pre-order discount code:
            </p>

            {/* Coupon Code Dotted Container */}
            <div className="border-2 border-dashed border-[#ff4fa3]/40 bg-[#ff4fa3]/5 rounded-2xl p-4 flex items-center justify-between w-full mt-2">
              <div className="text-left">
                <span className="block text-[12px] font-bold text-slate-400 uppercase tracking-widest">Pre-Order Discount Code</span>
                <strong className="block text-base sm:text-lg font-black tracking-widest text-[#ff4fa3] logo-font mt-0.5">LAUNCH20</strong>
              </div>
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-white text-[#1b1533] hover:bg-[#ff4fa3] hover:text-white rounded-xl text-[12px] sm:text-[12px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm shrink-0 flex items-center gap-1"
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
              className="w-full h-11 sm:h-12 inline-flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[12px] sm:text-xs uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all cursor-pointer logo-font mt-3"
            >
              Continue to Site
            </button>
          </>
        )}
      </div>
    </div>
  );
}
