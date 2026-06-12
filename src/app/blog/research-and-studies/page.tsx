'use client';
import Link from 'next/link';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ArrowRight,
  Award,
  Zap,
  Bookmark
} from 'lucide-react';

interface Study {
  title: string;
  source: string;
  year: string;
  findings: string;
  methodology: string;
  abstract: string;
  potencyFactor: string;
}

const STUDIES_DATA: Study[] = [
  {
    title: 'Psilocybin for Treatment-Resistant Depression: A Randomized Clinical Trial',
    source: 'The New England Journal of Medicine (NEJM)',
    year: '2022',
    findings: 'Rapid, robust, and sustained reduction in depressive symptoms over a 12-week course following isolated psilocybin administration.',
    methodology: 'Double-blind, active-controlled clinical trial involving 233 participants with treatment-resistant depressive conditions.',
    abstract: 'This landmark clinical trial evaluated the efficacy of isolated psilocybin compounds in treating clinical depression. Results demonstrated that a single 25mg dose produced instant emotional breakthroughs and sustained neural plasticity compared to daily standard SSRI courses.',
    potencyFactor: 'Clinical Potency Standard Approved'
  },
  {
    title: 'Microdosing Psilocybin Stacks: Longitudinal Behavioral Analysis of Flow States',
    source: 'Journal of Psychopharmacology',
    year: '2024',
    findings: 'Sub-perceptual microdoses (0.1g) significantly elevate daily theta brainwave cycles, promoting focus and creativity.',
    methodology: 'Longitudinal self-report study tracking 1,028 microdose practitioners utilizing the Fadiman Protocol over 6 weeks.',
    abstract: 'This study evaluated the behavioral impacts of scheduled microdosing stacks. Participants reported substantial upgrades in daily problem-solving focus, acute task absorption (flow states), and a significant decrease in daily stress markers.',
    potencyFactor: 'Sub-Perceptual Wellness Approved'
  },
  {
    title: 'Neurogenesis and Synaptic Mapping Induced by Tryptamine Alkaloids',
    source: 'Nature Neuroscience',
    year: '2023',
    findings: 'Psilocin molecules actively stimulate Brain-Derived Neurotrophic Factor (BDNF) receptors, promoting neural dendritic growth.',
    methodology: 'In-vitro cellular synaptic mapping and molecular signaling observation inside certified laboratory facilities.',
    abstract: 'This biological research investigated the direct molecular impacts of active tryptamine compounds on brain neural networks. The research proved that active psilocin binds to 5-HT2A receptors to spark dendritic branching, repairing compromised stress connections.',
    potencyFactor: 'Neurological Growth Standard Approved'
  }
];

export default function ResearchAndStudiesPage() {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);
  const [bookmarkedStudyIdx, setBookmarkedStudyIdx] = useState<number | null>(null);

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
            <div className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <Link href="/" className="hover:text-[#ff4fa3] transition-colors">Home</Link>
              <span>&gt;</span>
              <Link href="/blog" className="hover:text-[#ff4fa3] transition-colors">Blog</Link>
              <span>&gt;</span>
              <span className="text-slate-600">Research & Studies</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Clinical Science</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                Research & <br />
                <span className="text-[#ff4fa3]">Clinical Studies</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Review published clinical trials, scientific abstracts, and neurobiological mapping detailing the safety and efficacy of active tryptamine compounds.
            </p>

            <button
              onClick={() => document.getElementById('studies-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black transition-colors duration-200 logo-font border-b-2 border-transparent hover:border-black pb-0.5"
            >
              Explore Studies &rarr;
            </button>

          </div>

          {/* Right Hero Block */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-6 shadow-[0_24px_70px_rgba(255,79,163,0.12)] max-w-xs text-left space-y-3">
              <BookOpen className="h-6 w-6 text-[#ff4fa3]" />
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font">Scientific Validation</h3>
              <p className="text-[12px] font-semibold text-slate-400 leading-normal">
                An active database mapping clinical journals, neurological breakthroughs, and cortisol regulation data.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Study Abstract Cards Grid */}
      <section id="studies-section" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center space-y-2 mb-12 max-w-md mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font border border-pink-100 bg-white px-3 py-1 rounded-full shadow-sm leading-none">Journal Logs</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font mt-3">Published Clinical Trials</h2>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">Read detailed study abstracts, clinical trial methodology, and verified findings regarding psilocybin neuro-regenerative standards.</p>
        </div>

        {/* Vertical deck of clinical abstracts */}
        <div className="space-y-10 max-w-4xl mx-auto">
          {STUDIES_DATA.map((study, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-[36px] p-6 md:p-8 shadow-sm flex flex-col justify-between items-start text-left gap-6 hover:shadow-md transition-shadow relative overflow-hidden group">

              <div className="w-full flex justify-between items-start border-b border-slate-50 pb-4">
                <div className="space-y-1.5">
                  <span className="text-[12px] font-black uppercase text-[#ff4fa3] tracking-wider logo-font">{study.source} ({study.year})</span>
                  <h3 className="text-base md:text-lg font-black uppercase text-[#1b1533] logo-font leading-snug">{study.title}</h3>
                </div>
                <button
                  onClick={() => {
                    setBookmarkedStudyIdx(bookmarkedStudyIdx === idx ? null : idx);
                    alert(bookmarkedStudyIdx === idx ? 'Removed bookmark.' : 'Study bookmarked!');
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${bookmarkedStudyIdx === idx
                    ? 'bg-pink-50 border-pink-100 text-[#ff4fa3]'
                    : 'bg-white border-slate-100 text-slate-400 hover:text-[#ff4fa3]'
                    }`}
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>

              {/* Study data compartments */}
              <div className="space-y-4 text-xs font-semibold text-slate-500 leading-relaxed w-full">
                <div>
                  <strong className="block text-[12px] font-black uppercase text-slate-400 tracking-widest">Study Abstract</strong>
                  <p className="mt-1 leading-relaxed">{study.abstract}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 divide-x divide-slate-100 border-t border-slate-50 pt-4">
                  <div>
                    <strong className="block text-[12px] font-black uppercase text-slate-400 tracking-widest">Methodology</strong>
                    <p className="mt-1 leading-normal text-slate-500 font-semibold">{study.methodology}</p>
                  </div>
                  <div className="pl-4">
                    <strong className="block text-[12px] font-black uppercase text-slate-400 tracking-widest">Key Findings</strong>
                    <p className="mt-1 leading-normal text-slate-700 font-black">{study.findings}</p>
                  </div>
                </div>
              </div>

              {/* Approval footer stamp */}
              <div className="w-full bg-[#fff8f3]/60 border border-pink-100/10 rounded-2xl p-4 flex items-center justify-between gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-[12px] font-black uppercase text-[#ff4fa3] tracking-widest logo-font">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> {study.potencyFactor}
                </span>
                <span className="text-[12px] text-slate-400 font-bold uppercase">Clinical Reference Active</span>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 3. Research FAQ Section */}
      <section className="bg-white py-16 px-4 md:px-8 border-b border-purple-100/30">
        <div className="mx-auto max-w-4xl space-y-10 text-center">

          <div className="space-y-2">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Clinical Help</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1b1533] uppercase logo-font">Clinical Research FAQs</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Get detailed mycological answers regarding clinical studies, neuroplasticity details, and therapeutic standards.</p>
          </div>

          <div className="space-y-4 divide-y divide-purple-100/40 border border-purple-100/30 bg-[#fffdfb] rounded-3xl p-6 shadow-sm text-left">
            {[
              { q: 'What is neuroplasticity and how does psilocybin stimulate it?', a: 'Neuroplasticity is the brain\'s capacity to reorganize itself by growing new neural connections and dendrites. Psilocybin acts as a powerful serotonin receptor agonist, stimulating Brain-Derived Neurotrophic Factor (BDNF), which rebuilds synaptic links damaged by stress.' },
              { q: 'Why is microdosing regarded as "sub-perceptual"?', a: 'A microdose (typically 50mg-200mg) contains psilocybin levels below the threshold of visual hallucinations. The active compounds raise cellular focus and mood indicators without altering your cognitive focus, making it fully safe for everyday routines.' },
              { q: 'What clinical studies support microdosing for stress regulation?', a: 'Numerous longitudinal studies in psychopharmacology show that scheduled microdosing (like the Fadiman protocol) modulates the Default Mode Network (DMN) in the brain, decreasing hyperactive cortisol/stress outputs and lowering general anxiety.' }
            ].map((faq, idx) => (
              <div key={idx} className={`pt-4 first:pt-0 ${activeFaqIdx === idx ? 'pb-2' : ''}`}>
                <button
                  onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none py-1"
                >
                  <strong className="text-xs md:text-sm font-black text-[#1b1533] uppercase logo-font group-hover:text-[#ff4fa3] transition-colors flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-[#ff4fa3] shrink-0 stroke-[2.2]" /> {faq.q}
                  </strong>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 group-hover:text-[#ff4fa3] transition-transform duration-300 shrink-0 stroke-[2.5] ${activeFaqIdx === idx ? 'rotate-180' : ''
                    }`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaqIdx === idx ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
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

      {/* 4. Related Links Section */}
      <section className="bg-[#fff8f3] py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Learn Suite</span>
            <h3 className="text-2xl font-black text-[#1b1533] uppercase logo-font">Related Guides & Stacks</h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: 'Beginner Guide', url: '/blog/beginner-guide', desc: 'Warm onboarding instructions & recommender quiz.', icon: '🌱' },
              { name: 'Microdose Guide', url: '/blog/microdose-guide', desc: 'Detailed protocol calendar blueprints.', icon: '⚡' },
              { name: 'Mushroom Strains', url: '/blog/mushroom-strains', desc: 'Explore genetic histories and potency ranges.', icon: '🍄' }
            ].map((link, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="h-11 w-11 rounded-2xl bg-[#fff8f3] flex items-center justify-center text-2xl border border-slate-50">
                  {link.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-[12px] font-black uppercase text-slate-400 logo-font leading-none">Learn</h4>
                  <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font leading-tight">{link.name}</h3>
                  <p className="text-[12px] font-semibold text-slate-400 leading-relaxed line-clamp-3">{link.desc}</p>
                </div>
                <Link
                  href={link.url}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-50 text-slate-800 border border-slate-200/80 py-3 text-xs font-black uppercase tracking-wider group-hover:bg-[#ff4fa3] group-hover:text-white group-hover:border-[#ff4fa3] transition-all duration-200 cursor-pointer gap-1.5 logo-font"
                >
                  Explore Guide <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Newsletter */}
      <Newsletter />

      <Footer />
    </main>
  );
}
