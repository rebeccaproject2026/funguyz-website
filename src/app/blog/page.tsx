'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  BookOpen,
  Compass,
  Award,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface BlogPost {
  title: string;
  desc: string;
  category: string;
  date: string;
  time: string;
  image: string;
  slug: string;
  featured?: boolean;
}

const ALL_BLOG_POSTS: BlogPost[] = [
  {
    title: 'The Art of Microdosing: A Beginner’s Guide',
    desc: 'Everything you need to know about starting a sub-perceptual psilocybin microdose routine safely to enhance daily wellness, clear brain fog, and raise theta wave concentration.',
    category: 'Guides',
    date: 'May 28, 2026',
    time: '5 min read',
    image: '/images/blog_1.webp',
    slug: 'the-art-of-microdosing-a-beginners-guide',
    featured: true
  },
  {
    title: 'Psilocybin and Neuroplasticity: The Science',
    desc: 'How magic mushrooms stimulate new neural pathways and receptor connections in the prefrontal cortex.',
    category: 'Science',
    date: 'May 20, 2026',
    time: '8 min read',
    image: '/images/blog_2.webp',
    slug: 'psilocybin-and-neuroplasticity-the-science'
  },
  {
    title: 'Setting Your Intentions: Psychedelic Journeys',
    desc: 'Why set and setting are crucial for a positive and transformational experience during spiritual trips.',
    category: 'Mindset',
    date: 'May 15, 2026',
    time: '6 min read',
    image: '/images/blog_3.webp',
    slug: 'setting-your-intentions-psychedelic-journeys'
  },
  {
    title: 'Integrating Your Psychedelic Experience',
    desc: 'Essential tips for carrying the insights and emotional breakthroughs of your journey into everyday life.',
    category: 'Therapy',
    date: 'May 10, 2026',
    time: '5 min read',
    image: '/images/blog_4.webp',
    slug: 'integrating-your-psychedelic-experience'
  },
  {
    title: 'A Deep Dive Into Golden Teacher Strains',
    desc: 'Exploring the genetic origin, potency characteristics, and spiritual introspection profiles of the beloved Golden Teacher.',
    category: 'Guides',
    date: 'May 05, 2026',
    time: '7 min read',
    image: '/images/blog_1.webp',
    slug: 'golden-teacher-strains-deep-dive'
  },
  {
    title: 'Clinical Studies on Microdosing & Stress',
    desc: 'Reviewing recent clinical research abstracts demonstrating psilocybin efficacy in regulating cortisol levels.',
    category: 'Science',
    date: 'Apr 28, 2026',
    time: '9 min read',
    image: '/images/blog_2.webp',
    slug: 'clinical-studies-microdosing-stress'
  }
];

const QUICK_LINKS = [
  { label: "Beginner Guide", slug: "/blog/beginner-guide" },
  { label: "Microdose Guide", slug: "/blog/microdose-guide" },
  { label: "Mushroom Strains", slug: "/blog/mushroom-strains" },
  { label: "Wellness Articles", slug: "/blog/wellness-articles" },
  { label: "Research & Studies", slug: "/blog/research-and-studies" }
];

export default function BlogHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter blog posts based on category and search query
  const filteredPosts = ALL_BLOG_POSTS.filter(post => {
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = ALL_BLOG_POSTS.find(p => p.featured) || ALL_BLOG_POSTS[0];
  const standardPosts = filteredPosts.filter(p => !p.featured || searchQuery !== '');

  const categories = ['all', 'Guides', 'Science', 'Mindset', 'Therapy'];

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
              <span className="text-slate-600">Blog Hub</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Educational Curation</span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1b1533] uppercase tracking-tight logo-font leading-none">
                FunGuyz Research <br />
                <span className="text-[#ff4fa3]">& Blog Hub</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-md">
              Explore safe onboarding guidelines, clinical science updates regarding brain neuroplasticity, strain genetic characteristics, and lifestyle integration articles.
            </p>

            <button 
              onClick={() => document.getElementById('blog-grid-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-black uppercase tracking-wider text-[#ff4fa3] hover:text-black transition-colors duration-200 logo-font border-b-2 border-transparent hover:border-black pb-0.5"
            >
              Explore Stacks &rarr;
            </button>

          </div>

          {/* Right Hero Block */}
          <div className="relative flex justify-center items-center select-none animate-float hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4fa3]/10 to-[#7b5cff]/15 rounded-[40px] rotate-3 scale-95 blur-sm" />
            <div className="relative bg-white/70 backdrop-blur-md border border-pink-100/60 rounded-[40px] p-6 shadow-[0_24px_70px_rgba(255,79,163,0.12)] max-w-xs text-left space-y-3">
              <BookOpen className="h-6 w-6 text-[#ff4fa3]" />
              <h3 className="text-xs font-black uppercase text-[#1b1533] logo-font">Scientific Database</h3>
              <p className="text-[10px] font-semibold text-slate-400 leading-normal">
                Publishing safe clinical guides and botanical research flushes monitored by certified mycological practitioners.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Featured Article Banner (Only show when not filtering by search) */}
      {!searchQuery && activeCategory === 'all' && (
        <section className="mx-auto max-w-7xl px-4 pt-16 md:px-8">
          <div className="text-left mb-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font border border-pink-100 bg-white px-3 py-1 rounded-full shadow-sm">Featured Read</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-[44px] p-6 md:p-8 shadow-sm grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center hover:shadow-md transition-shadow group">
            
            {/* Featured Image */}
            <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-slate-100 shadow-sm relative">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Featured Info */}
            <div className="flex flex-col items-start gap-4 text-left">
              <span className="rounded bg-[#ff4fa3]/5 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[#ff4fa3]">
                {featuredPost.category}
              </span>
              <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-[#1b1533] logo-font leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-400">
                {featuredPost.desc}
              </p>

              {/* Author and read time */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-4 w-full">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#ff4fa3]" /> {featuredPost.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#ff4fa3]" /> {featuredPost.time}</span>
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-[#ff4fa3]" /> Cultivation Team</span>
              </div>

              <a 
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff4fa3] text-white py-3.5 px-6 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer logo-font shadow-sm shadow-pink-100"
              >
                Read Article <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </a>
            </div>

          </div>
        </section>
      )}

      {/* 3. Main Blog Hub Section with search, categories and sidebar */}
      <section id="blog-grid-section" className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-10 lg:grid-cols-[2.5fr_1fr] items-start">
        
        {/* Left Column: Live search, categories and articles grid */}
        <div className="space-y-10">
          
          {/* Live Search and category buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none flex-nowrap w-full md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-2xl px-4 py-2.5 text-[11px] font-black uppercase tracking-wider logo-font transition-all duration-200 border cursor-pointer shrink-0 ${
                    activeCategory === cat
                      ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-md shadow-pink-100'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-[#ff4fa3] hover:text-[#ff4fa3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="w-full md:max-w-xs flex items-center gap-2.5 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-[#ff4fa3] transition-all">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research logs..."
                className="w-full bg-transparent text-xs font-semibold text-[#1b1533] outline-none placeholder:text-slate-400"
              />
            </div>

          </div>

          {/* Grid of articles */}
          {standardPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {standardPosts.map((post, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  
                  {/* Article cover */}
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" 
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <span className="inline-block rounded bg-[#ff4fa3]/5 px-2.5 py-0.5 text-[8.5px] font-bold uppercase tracking-widest text-[#ff4fa3]">
                      {post.category}
                    </span>
                    <h3 className="text-base font-black uppercase text-[#1b1533] logo-font leading-snug line-clamp-2 group-hover:text-[#ff4fa3] transition-colors">{post.title}</h3>
                    <p className="text-[11px] font-semibold leading-relaxed text-slate-400 line-clamp-3">{post.desc}</p>
                  </div>

                  {/* Reading details and CTA */}
                  <div className="border-t border-slate-100 pt-4 mt-auto w-full flex items-center justify-between text-[9px] font-bold text-slate-400">
                    <div className="flex gap-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                    <a 
                      href={`/blog/${post.slug}`}
                      className="text-[9px] font-black uppercase tracking-wider text-[#ff4fa3] hover:underline logo-font flex items-center gap-1"
                    >
                      Read Guide <ChevronRight className="h-3 w-3 stroke-[2.5]" />
                    </a>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-[36px] space-y-3">
              <span className="text-3xl">🔍</span>
              <h4 className="text-sm font-black uppercase text-[#1b1533] logo-font">No Research Logs Found</h4>
              <p className="text-xs text-slate-400 font-semibold max-w-xs mx-auto">Try clearing your search filters or browse other general categories.</p>
            </div>
          )}

          {/* Simple Mock Pagination */}
          {filteredPosts.length > 4 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-[#1b1533] hover:border-[#ff4fa3] logo-font cursor-pointer">Prev</button>
              <button className="rounded-xl border border-[#ff4fa3] bg-[#ff4fa3]/5 px-4 py-2 text-xs font-black text-[#ff4fa3] logo-font">1</button>
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-[#1b1533] hover:border-[#ff4fa3] logo-font cursor-pointer">2</button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-[#1b1533] hover:border-[#ff4fa3] logo-font cursor-pointer">Next</button>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Sidebar Quick Links & Trust Stamp */}
        <aside className="space-y-6 lg:sticky lg:top-24 text-left">
          
          {/* Quick Guides List */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1b1533] logo-font border-b border-slate-50 pb-2 flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#ff4fa3]" /> Wellness Directories
            </h4>
            <ul className="space-y-3 text-xs font-bold text-slate-400">
              {QUICK_LINKS.map((link, idx) => (
                <li key={idx} className="border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  <a 
                    href={link.slug} 
                    className="flex items-center justify-between hover:text-[#ff4fa3] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-[#ff4fa3] shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Stamp Card */}
          <div className="bg-gradient-to-tr from-[#fffbf8] to-[#fff5f0] border border-pink-100/50 rounded-[32px] p-6 shadow-sm space-y-3">
            <div className="h-8 w-8 rounded-xl bg-white border border-pink-100 flex items-center justify-center text-[#ff4fa3] shadow-sm">
              <Award className="h-4.5 w-4.5 stroke-[2.2]" />
            </div>
            <h4 className="text-xs font-black uppercase text-[#1b1533] logo-font">Clinical Quality Standards</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
              Our clinical research and wellness guides are cross-referenced with medical studies to assure complete dosage safety, clean genetic cultivation, and pure biological flushes.
            </p>
          </div>

          {/* Secure Assurance capsule */}
          <div className="border border-pink-100 bg-[#fffdfd] rounded-[28px] p-5 flex items-start gap-3.5 shadow-sm text-left">
            <ShieldCheck className="h-5.5 w-5.5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <b className="block text-[10px] font-black text-[#1b1533] uppercase logo-font">100% Insured Deliveries</b>
              <p className="text-[9.5px] text-slate-400 mt-1 font-semibold leading-relaxed">
                Enjoy guaranteed scent-free envelopes Canada-wide. Fully insured transit protection.
              </p>
            </div>
          </div>

        </aside>

      </section>

      {/* 4. Newsletter Section */}
      <Newsletter />

      <Footer />
    </main>
  );
}
