'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  MapPin, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface TimelineStep {
  title: string;
  desc: string;
  time: string;
  icon: React.ComponentType<any>;
}

export default function TrackOrderPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  const mockTimeline: TimelineStep[] = [
    {
      title: 'Order Confirmed',
      desc: 'Ontario cleanroom batch selected and genetic purity validated.',
      time: '9:14 AM EST',
      icon: CheckCircle2
    },
    {
      title: 'Sanitary Packaging',
      desc: 'Double vacuum-sealed in odorless medical bags and secured inside a generic cardboard envelope.',
      time: '10:45 AM EST',
      icon: Package
    },
    {
      title: 'Dispatched to Courier',
      desc: 'Courier dropped off parcel to Canada Post main terminal.',
      time: '2:15 PM EST',
      icon: Truck
    },
    {
      title: 'In Transit',
      desc: 'Canada Post Express Delivery tracking active. En route to destination city hub.',
      time: '4:30 PM EST',
      icon: Clock
    },
    {
      title: 'Out For Delivery',
      desc: 'Dispatched to local courier driver for final drop-off.',
      time: 'Pending Delivery',
      icon: MapPin
    }
  ];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim().length > 3) {
      setIsSearched(true);
    }
  };

  const handleDemoClick = () => {
    setTrackingCode('FG-10492');
    setIsSearched(true);
  };

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased font-sans">
      <Header />

      {/* 1. Category-Style Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#fffbf8] via-[#fffcfb] to-[#fff3ec] border-b border-purple-100/50 py-16 px-4 md:px-8 min-h-[350px] flex items-center">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[90px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[90px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10 grid gap-10 md:grid-cols-[1.3fr_1fr] items-center w-full">
          
          {/* Left Hero Block */}
          <div className="flex flex-col items-start text-left gap-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <a href="/" className="hover:text-[#ff4fa3] transition-colors">Home</a>
              <span>&gt;</span>
              <span className="text-slate-600">Track Order</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Real-Time Logistics</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                Track Your <br />
                <span className="text-[#ff4fa3]">Order Live</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Enter your unique tracking code below to watch your secure, double vacuum-sealed package progress from Ontario cleanrooms directly to your door.
            </p>

            <button 
              onClick={() => document.getElementById('tracking-engine-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black transition-colors duration-200 logo-font border-b-2 border-transparent hover:border-black pb-0.5"
            >
              Start Tracking &rarr;
            </button>

          </div>

          {/* Right Hero Block: Floating Stamp Card */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-6 shadow-[0_24px_70px_rgba(255,79,163,0.12)] max-w-xs text-left space-y-3">
              <span className="text-2xl">📦</span>
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font">Discreet Courier Seals</h3>
              <p className="text-[10px] font-semibold text-slate-400 leading-normal">
                Every transaction includes insured Canada Post Express Delivery tracking. Double-sealed, completely scent-free generic envelope shipping.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Tracking Search Box */}
      <section id="tracking-engine-section" className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        
        <div className="bg-white border border-slate-100 rounded-[36px] p-6 md:p-10 shadow-sm text-center space-y-6">
          <div className="max-w-md mx-auto space-y-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Enter Code</span>
            <h2 className="text-xl md:text-2xl font-black text-[#1b1533] uppercase logo-font">Logistics Tracking System</h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">Input your Order ID or tracking code (e.g. FG-10492) below to visualize your package shipment transit history.</p>
          </div>

          <form onSubmit={handleTrackSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2.5 bg-[#fff8f3] border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-[#ff4fa3] focus-within:bg-white transition-all">
              <Search className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <input 
                type="text"
                required
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="e.g. FG-10492"
                className="w-full bg-transparent text-xs md:text-sm font-semibold text-[#1b1533] outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-8 py-3.5 text-xs font-black uppercase tracking-wider hover:bg-black hover:text-[#ff4fa3] hover:border-black transition-all duration-200 cursor-pointer logo-font shrink-0"
            >
              Track Package
            </button>
          </form>

          {/* Quick Demo Trigger */}
          <div className="text-[10px] font-semibold text-slate-400">
            Don't have a tracking code yet? Click{' '}
            <button 
              onClick={handleDemoClick}
              className="text-[#ff4fa3] hover:underline font-black cursor-pointer"
            >
              Use Demo Code FG-10492
            </button>{' '}
            to preview the tracker timeline.
          </div>
        </div>

        {/* 3. Interactive Timeline Progress Deck */}
        {isSearched && (
          <div className="mt-12 bg-white border border-slate-100 rounded-[36px] p-6 md:p-10 shadow-sm space-y-8 text-left animate-scale-up">
            
            {/* Timeline Header summary card */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1">
                <span className="text-[8px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Ontario Dispatch Hub</span>
                <h3 className="text-base font-black uppercase text-[#1b1533] logo-font">Tracking ID: {trackingCode}</h3>
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-right">
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Est. Arrival</span>
                  <strong className="block text-xs font-black text-emerald-600 logo-font mt-1">Tomorrow (Express)</strong>
                </div>
                <div className="h-10 w-px bg-slate-100" />
                <div>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</span>
                  <strong className="block text-xs font-black text-[#ff4fa3] logo-font mt-1 uppercase tracking-wide">In Transit</strong>
                </div>
              </div>
            </div>

            {/* Vertical timeline steps mapping */}
            <div className="relative border-l border-slate-100 ml-5 pl-8 space-y-8 py-2">
              {mockTimeline.map((step, idx) => {
                const StepIcon = step.icon;
                const isPending = step.time === 'Pending Delivery';
                
                return (
                  <div key={idx} className="relative">
                    {/* Ring dot icon container */}
                    <div className={`absolute -left-[45px] top-0 h-8 w-8 rounded-full border flex items-center justify-center shadow-sm transition-colors ${
                      isPending 
                        ? 'bg-white border-slate-200 text-slate-400' 
                        : 'bg-[#ff4fa3] border-[#ff4fa3] text-white'
                    }`}>
                      <StepIcon className="h-4 w-4 stroke-[2.2]" />
                    </div>

                    <div className="space-y-1 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className={`text-xs md:text-sm font-black uppercase logo-font ${
                          isPending ? 'text-slate-400' : 'text-[#1b1533]'
                        }`}>
                          {step.title}
                        </h4>
                        <span className={`text-[10px] font-bold ${
                          isPending ? 'text-slate-400' : 'text-[#ff4fa3]'
                        }`}>
                          {step.time}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold leading-relaxed text-slate-400 max-w-xl">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </section>

      {/* 4. Tracking FAQ Accordion */}
      <section className="bg-white border-t border-b border-purple-100/30 py-16 px-4 md:px-8">
        <div className="mx-auto max-w-4xl space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Tracking Help</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Shipping & Tracking FAQs</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Get answers to the most common delivery tracking, cleanroom dispatch, and discrete transit questions.</p>
          </div>

          <div className="space-y-4 divide-y divide-purple-100/40 border border-purple-100/30 bg-[#fffdfb] rounded-3xl p-6 shadow-sm text-left">
            {[
              { q: 'How long does dispatch take after order placement?', a: 'Orders are processed in our secure facility immediately. Payment confirmation typically completes in 1-2 hours. Once payment clears, package vacuum-sealing and dispatch takes place within 4 hours.' },
              { q: 'Where do I find my tracking code?', a: 'Your tracking code is automatically generated and emailed to your registered address as soon as Canada Post scans the parcel at the Ontario distribution hub.' },
              { q: 'Why is my tracking code showing as inactive?', a: 'When Canada Post receives the mail parcel, it can take up to 4-6 hours for their distribution hubs to scan the sorting tags and update the status in their database. Please check back later in the evening.' },
              { q: 'What happens if my package is lost or delayed by Canada Post?', a: 'Every parcel shipped by the FunGuyz store carries full transit insurance. If your package is confirmed lost by Canada Post, we replace it instantly with express delivery.' }
            ].map((faq, idx) => (
              <div key={idx} className={`pt-4 first:pt-0 ${activeFaqIdx === idx ? 'pb-2' : ''}`}>
                <button
                  onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none py-1"
                >
                  <strong className="text-xs md:text-sm font-black text-[#1b1533] uppercase logo-font group-hover:text-[#ff4fa3] transition-colors flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-[#ff4fa3] shrink-0 stroke-[2.2]" /> {faq.q}
                  </strong>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 group-hover:text-[#ff4fa3] transition-transform duration-300 shrink-0 stroke-[2.5] ${
                    activeFaqIdx === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${
                  activeFaqIdx === idx ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-xs font-semibold leading-relaxed text-slate-500 pl-7 bg-white/40 p-3.5 rounded-xl border border-pink-50/20 shadow-inner">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Related Links Section */}
      <section className="bg-[#fff8f3] py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Support Desk</span>
            <h3 className="text-2xl font-black text-[#1b1533] uppercase logo-font">Related Support Links</h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: 'Frequently Asked', url: '/faq', desc: 'Read general crop dosage and order billing queries.', icon: '💡' },
              { name: 'Shipping Policy', url: '/info/shipping-policy', desc: 'Detailed transit guidelines and pricing schedules.', icon: '🚚' },
              { name: 'Contact Support', url: '/contact', desc: 'Open a ticket with a client care specialist.', icon: '✉️' }
            ].map((link, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="h-11 w-11 rounded-2xl bg-[#fff8f3] flex items-center justify-center text-2xl border border-slate-50">
                  {link.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-[8px] font-black uppercase text-slate-400 logo-font leading-none">Support</h4>
                  <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font leading-tight">{link.name}</h3>
                  <p className="text-[10px] font-semibold text-slate-400 leading-relaxed line-clamp-3">{link.desc}</p>
                </div>
                <a 
                  href={link.url}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-50 text-slate-800 border border-slate-200/80 py-3 text-xs font-black uppercase tracking-wider group-hover:bg-[#ff4fa3] group-hover:text-white group-hover:border-[#ff4fa3] transition-all duration-200 cursor-pointer gap-1.5 logo-font"
                >
                  Explore Support <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter */}
      <Newsletter />

      <Footer />
    </main>
  );
}
