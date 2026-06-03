import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="bg-[#fff8f3] py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute left-[10%] top-[20%] w-[350px] h-[350px] rounded-full bg-[#ff4fa3]/8 blur-[100px] pointer-events-none" />
      <div className="absolute right-[10%] bottom-[20%] w-[350px] h-[350px] rounded-full bg-[#7b5cff]/8 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="bg-white/80 backdrop-blur-md border border-pink-100/70 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(255,79,163,0.06)] text-center space-y-6 relative overflow-hidden">
          
          {/* Subtle micro-animations using animate-pulse */}
          <div className="absolute top-6 left-6 text-[#ff4fa3] opacity-20 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="absolute bottom-6 right-6 text-[#7b5cff] opacity-20 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] bg-pink-50/80 px-3 py-1.5 rounded-full border border-pink-100/50 inline-block logo-font">
              Stay in the Loop
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black text-[#1b1533] uppercase tracking-tight logo-font">
              Subscribe To Our <span className="bg-gradient-to-r from-[#ff4fa3] to-[#7b5cff] bg-clip-text text-transparent">Newsletter</span>
            </h2>
            <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto leading-relaxed">
              Join over 50,000+ Canadian subscribers. Receive clinical dosage guides, promotion discount coupons, and rare strain drop alerts directly to your inbox.
            </p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} 
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mt-6"
          >
            <div className="flex-grow relative flex items-center">
              <Mail className="absolute left-4 h-4 w-4 text-slate-400" />
              <input 
                type="email" 
                required
                placeholder="Enter your email address..."
                className="w-full rounded-2xl bg-white border border-slate-200 pl-11 pr-5 py-4 text-xs font-semibold text-[#1b1533] outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-[#ff4fa3]/10 placeholder:text-slate-400 shadow-sm transition-all"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-[#ff4fa3] to-[#7b5cff] text-white border-0 px-8 py-4 text-xs font-black uppercase tracking-wider hover:opacity-90 hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-200 cursor-pointer logo-font shrink-0"
            >
              Join Club
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
