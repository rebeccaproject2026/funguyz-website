'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
      <Header />

      {/* Contact Header Banner */}
      <section className="bg-gradient-to-tr from-[#fffdfb] via-[#fffbf9] to-[#fff5f0] border-b border-purple-100/50 py-16 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[80px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[80px] pointer-events-none" />
        
        <div className="mx-auto max-w-3xl relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4fa3]/5 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#ff4fa3]">
            <Sparkles className="h-3 w-3" /> Customer Support Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1b1533] uppercase logo-font">
            Contact Us
          </h1>
          <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-xl">
            Have questions about microdose dosage cycles, shipping tracking, or discrete packaging? Our wellness specialists are available 7 days a week!
          </p>
        </div>
      </section>

      {/* Main Grid Layout */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        
        {submitted && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-700 text-xs font-bold uppercase tracking-wider logo-font">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>Thank you! Your support ticket has been opened successfully. We will reply within 2-4 hours.</span>
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          
          {/* Left Column: Intake Contact Form */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font mb-2">Send Us A Message</h2>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-6">We answer all inquiries within 4 hours</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Your Name
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Naveen Kumar"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                  />
                </label>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Email Address
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. hello@metaverse.ca"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                  />
                </label>
              </div>

              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Subject
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we assist you?"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50"
                />
              </label>

              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Detailed Message
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry in detail..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-pink-50/50 resize-none"
                />
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font"
              >
                <Send className="h-4 w-4" /> Send Secure Message
              </button>
            </form>
          </div>

          {/* Right Column: Contact info cards */}
          <div className="space-y-6">
            
            {/* Quick contact Details card */}
            <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-[#1b1533] uppercase logo-font">Get In Touch</h2>
              
              <div className="space-y-5">
                {/* Tracking Orders */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3] shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Tracking Orders</span>
                    <a href="mailto:hello@funguyz.ca" className="text-sm font-black text-[#1b1533] hover:text-[#ff4fa3] logo-font mt-0.5 block">hello@funguyz.ca</a>
                  </div>
                </div>

                {/* General Inquiry */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">General Inquiry</span>
                    <a href="mailto:info@funguyz.ca" className="text-sm font-black text-[#1b1533] hover:text-purple-500 logo-font mt-0.5 block">info@funguyz.ca</a>
                  </div>
                </div>

                {/* Order Department */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Order Department</span>
                    <a href="mailto:sales@funguyz.ca" className="text-sm font-black text-[#1b1533] hover:text-indigo-500 logo-font mt-0.5 block">sales@funguyz.ca</a>
                  </div>
                </div>

                {/* Active hours */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Support Timings</span>
                    <strong className="text-xs font-semibold text-slate-600 mt-0.5 block">Mon - Sun: 9AM - 9PM EST</strong>
                  </div>
                </div>

                {/* Logistics */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Dispensary Hub</span>
                    <strong className="text-xs font-semibold text-slate-600 mt-0.5 block">Toronto & Ottawa Metros, Canada</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Chat Support Card */}
            <div className="bg-gradient-to-tr from-[#fffbf8] to-[#fff5f0] border border-pink-100/60 rounded-[32px] p-6 shadow-sm flex items-center justify-between gap-6 group hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 text-left">
                <div className="h-10 w-10 rounded-xl bg-white border border-pink-100 flex items-center justify-center text-[#ff4fa3] shrink-0 mt-0.5 relative">
                  <MessageSquare className="h-5 w-5 stroke-[2.2]" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <b className="block text-xs font-black text-[#1b1533] uppercase logo-font">Live Chat Assistance</b>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">
                    Chat live with a mycological wellness consultant. Real-time guidance on microdose routines, product selection, and shipping updates.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => alert('Opening live chat container... Our specialists are online!')}
                className="rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-3.5 px-6 text-xs font-black uppercase tracking-wider hover:bg-black hover:text-[#ff4fa3] hover:border-black transition-all duration-200 cursor-pointer logo-font shrink-0"
              >
                Chat Now
              </button>
            </div>

            {/* Safety Assurance Banner */}
            <div className="border border-pink-100 bg-[#fffdfd] rounded-[32px] p-6 flex items-start gap-4 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3] shrink-0 mt-0.5">
                <ShieldCheck className="h-5.5 w-5.5" />
              </div>
              <div>
                <b className="block text-xs font-black text-[#1b1533] uppercase logo-font">100% Secure & Anonymous</b>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">
                  We use encrypted email channels and isolated servers to guarantee customer details are completely safe and wiped periodically. We guarantee safe, unmarked cardboard drop-offs Canada-wide.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
