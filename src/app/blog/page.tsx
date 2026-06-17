'use client';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Loader2
} from 'lucide-react';

interface BlogPost {
  _id?: string;
  title: string;
  desc: string;
  category: string;
  date: string;
  time: string;
  image: string;
  slug: string;
  featured?: boolean;
}



const QUICK_LINKS = [
  { label: "Beginner Guide", slug: "/blog/beginner-guide" },
  { label: "Microdose Guide", slug: "/blog/microdose-guide" },
  { label: "Mushroom Strains", slug: "/blog/mushroom-strains" },
  { label: "Wellness Articles", slug: "/blog/wellness-articles" },
  { label: "Research & Studies", slug: "/blog/research-and-studies" }
];

const POSTS_PER_PAGE = 4;

export default function BlogHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const [dbBlogs, setDbBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.success && data.blogs) {
          setDbBlogs(data.blogs);
        }
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Reset pagination when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  // Map Dynamic DB Data to match the exact schema of our old static objects
  const mappedBlogs: BlogPost[] = dbBlogs.map(dbPost => ({
    _id: dbPost._id,
    title: dbPost.title || 'Untitled',
    desc: dbPost.desc || dbPost.excerpt || '',
    category: dbPost.category || dbPost.category?.name || 'Uncategorized',
    date: dbPost.publishedAt ? new Date(dbPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date',
    time: dbPost.readTime || `${dbPost.readingTime || 5} min read`,
    image: dbPost.image || dbPost.featuredImage || '/images/blog_2.webp',
    slug: dbPost.slug,
    featured: dbPost.title?.includes('Microdosing') // Fallback logic since our initial seed didn't include `featured: true` flag in the schema directly
  }));

  // Filter blog posts based on category and search query
  const filteredPosts = mappedBlogs.filter(post => {
    const title = post.title || '';
    const desc = post.desc || '';
    const category = post.category || 'Uncategorized';

    const matchesSearch = searchQuery.trim() === '' ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];

  // If we are searching or filtering by category, we show all results in the grid and don't separate the featured post
  const standardPosts = (searchQuery !== '' || activeCategory !== 'all')
    ? filteredPosts
    : filteredPosts.filter(p => p.title !== featuredPost?.title);

  // Pagination Logic
  const totalPages = Math.ceil(standardPosts.length / POSTS_PER_PAGE);
  const currentPosts = standardPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  // Restore exact static categories as requested by user
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
            <div className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest text-slate-400 logo-font leading-none">
              <Link href="/" className="hover:text-[#ff4fa3] transition-colors">Home</Link>
              <span>&gt;</span>
              <span className="text-slate-600">Blog Hub</span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font">Educational Curation</span>
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
              <p className="text-[12px] font-semibold text-slate-400 leading-normal">
                Publishing safe clinical guides and botanical research flushes monitored by certified mycological practitioners.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="mx-auto max-w-7xl px-4 py-32 md:px-8 flex justify-center">
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-[#ff4fa3]" />
            <span className="text-xs font-bold uppercase tracking-widest logo-font">Loading Archives...</span>
          </div>
        </section>
      )}

      {/* 2. Featured Article Banner (Only show when not filtering by search and data is loaded) */}
      {!isLoading && !searchQuery && activeCategory === 'all' && featuredPost && (
        <section className="mx-auto max-w-7xl px-4 pt-16 md:px-8">
          <div className="text-left mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font border border-pink-100 bg-white px-3 py-1 rounded-full shadow-sm">Featured Read</span>
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
              <span className="rounded bg-[#ff4fa3]/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ff4fa3]">
                {featuredPost.category}
              </span>
              <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-[#1b1533] logo-font leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-400 line-clamp-3">
                {featuredPost.desc}
              </p>

              {/* Author and read time */}
              <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold text-slate-400 border-b border-slate-100 pb-4 w-full">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#ff4fa3]" /> {featuredPost.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#ff4fa3]" /> {featuredPost.time}</span>
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-[#ff4fa3]" /> Cultivation Team</span>
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff4fa3] text-white py-3.5 px-6 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-[#ff4fa3] hover:border-black cursor-pointer logo-font shadow-sm shadow-pink-100"
              >
                Read Article <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* 3. Main Blog Hub Section with search, categories and sidebar */}
      {!isLoading && (
        <section id="blog-grid-section" className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-10 lg:grid-cols-[2.5fr_1fr] items-start">

          {/* Left Column: Live search, categories and articles grid */}
          <div className="space-y-10">

            {/* Live Search and category buttons */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

              {/* Category tabs */}
              <div className="flex gap-2 overflow-x-auto scrollbar-none flex-nowrap w-full md:w-auto pb-2 md:pb-0">
                {categories.map((cat: any) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat.toLowerCase())}
                    className={`rounded-2xl px-4 py-2.5 text-[12px] font-black uppercase tracking-wider logo-font transition-all duration-200 border cursor-pointer shrink-0 ${activeCategory === cat.toLowerCase()
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
            {currentPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {currentPosts.map((post, idx) => (
                  <div key={post._id || idx} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm flex flex-col justify-between items-start text-left gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">

                    {/* Article cover */}
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-2 w-full">
                      <span className="inline-block rounded bg-[#ff4fa3]/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">
                        {post.category}
                      </span>
                      <h3 className="text-base font-black uppercase text-[#1b1533] logo-font leading-snug line-clamp-2 group-hover:text-[#ff4fa3] transition-colors">{post.title}</h3>
                      <p className="text-[12px] font-semibold leading-relaxed text-slate-400 line-clamp-3">{post.desc}</p>
                    </div>

                    {/* Reading details and CTA */}
                    <div className="border-t border-slate-100 pt-4 mt-auto w-full flex items-center justify-between text-[12px] font-bold text-slate-400">
                      <div className="flex gap-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[12px] font-black uppercase tracking-wider text-[#ff4fa3] hover:underline logo-font flex items-center gap-1"
                      >
                        Read Guide <ChevronRight className="h-3 w-3 stroke-[2.5]" />
                      </Link>
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

            {/* Dynamic Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-[#1b1533] hover:border-[#ff4fa3] logo-font cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  const isActive = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-xl border px-4 py-2 text-xs font-black logo-font cursor-pointer ${isActive
                          ? 'border-[#ff4fa3] bg-[#ff4fa3]/5 text-[#ff4fa3]'
                          : 'border-slate-200 bg-white text-[#1b1533] hover:border-[#ff4fa3]'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-[#1b1533] hover:border-[#ff4fa3] logo-font cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
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
                    <Link
                      href={link.slug}
                      className="flex items-center justify-between hover:text-[#ff4fa3] transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-[#ff4fa3] shrink-0" />
                    </Link>
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
              <p className="text-[12px] text-slate-400 leading-relaxed font-semibold">
                Our clinical research and wellness guides are cross-referenced with medical studies to assure complete dosage safety, clean genetic cultivation, and pure biological flushes.
              </p>
            </div>

            {/* Secure Assurance capsule */}
            <div className="border border-pink-100 bg-[#fffdfd] rounded-[28px] p-5 flex items-start gap-3.5 shadow-sm text-left">
              <ShieldCheck className="h-5.5 w-5.5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <b className="block text-[12px] font-black text-[#1b1533] uppercase logo-font">100% Insured Deliveries</b>
                <p className="text-[12px] text-slate-400 mt-1 font-semibold leading-relaxed">
                  Enjoy guaranteed scent-free envelopes Canada-wide. Fully insured transit protection.
                </p>
              </div>
            </div>

          </aside>

        </section>
      )}

      {/* 4. Newsletter Section */}
      <Newsletter />

      <Footer />
    </main>
  );
}
