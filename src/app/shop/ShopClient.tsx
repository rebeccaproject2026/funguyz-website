'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { staticCategories } from '@/data/staticData';
import { Sparkles, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { MushroomLoader } from '@/components/MushroomLoader';

export default function ShopClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Read initial filter from URL if present (e.g. ?category=magic-mushrooms&subcategory=golden-teacher)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get('category') || params.get('filter');
      const subcategoryParam = params.get('subcategory');

      if (categoryParam) {
        if (categoryParam.toLowerCase() === 'best-sellers') {
          setSelectedCategory('Best Sellers');
        } else {
          // Normalize query parameter matching category names
          const matched = ['Magic Mushrooms', 'Edibles', 'Capsules', 'Microdose'].find(
            c => c.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase()
          );
          if (matched) {
            setSelectedCategory(matched);
          }
        }
      }

      if (subcategoryParam) {
        setSubcategoryFilter(subcategoryParam.replace(/-/g, ' '));
      }
    }
  }, []);

  const params = new URLSearchParams();
  if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
  if (subcategoryFilter) params.append('subcategory', subcategoryFilter);
  if (sortBy && sortBy !== 'default') params.append('sortBy', sortBy);

  const dynamicUrl = `/api/products?${params.toString()}`;
  const { data: prodData, isLoading: isLoadingProducts } = useSWR(dynamicUrl, fetcher);
  // const { data: catData, isLoading: isLoadingCategories } = useSWR('/api/categories', fetcher);

  const sortedProducts = prodData?.success ? prodData.products : [];
  // const dbCategories = catData?.success ? catData.categories : [];
  const dbCategories = staticCategories;

  const categoryTabs = ['All', 'Best Sellers', ...dbCategories.map((c: any) => c.name)];

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased">
      <Header />

      {/* Banner Section */}
      <section className="bg-gradient-to-tr from-[#fffdfb] via-[#fffbf9] to-[#fff5f0] border-b border-purple-100/50 py-12 md:py-16 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-[#ffe8db]/30 blur-[80px] pointer-events-none" />
        <div className="absolute right-[5%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#e0f2fe]/40 blur-[80px] pointer-events-none" />

        <div className="mx-auto max-w-3xl relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4fa3]/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ff4fa3]">
            <Sparkles className="h-3 w-3" /> Canada's #1 Premium Dispensary
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1b1533] uppercase">
            Our Shop Catalog
          </h1>
          <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-500 max-w-xl">
            Explore our premium, 100% lab-tested collection of dried magic mushrooms, delicious infused edibles, precise wellness capsules, and microdose formulations.
          </p>
        </div>
      </section>

      {/* Filters & Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        {/* Controls Bar */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-purple-100/40 pb-6">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0 flex-nowrap -mx-4 px-4 md:mx-0 md:px-0">
            {categoryTabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setSelectedCategory(tab);
                  setSubcategoryFilter('');
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', '/shop');
                  }
                }}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shrink-0 border ${selectedCategory === tab
                  ? 'bg-[#ff4fa3] text-white border-[#ff4fa3] shadow-md shadow-pink-100 hover:bg-[#ff4fa3]/95'
                  : 'bg-white text-slate-500 border-slate-200/80 hover:bg-slate-50 hover:text-[#1b1533]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sorting Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-between md:justify-end">
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 border rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${isFilterPanelOpen
                ? 'bg-pink-50 border-[#ff4fa3] text-[#ff4fa3] shadow-sm'
                : 'bg-white border-slate-200/80 text-slate-500 hover:bg-slate-50 hover:text-[#1b1533]'
                }`}
            >
              <SlidersHorizontal className={`h-3.5 w-3.5 transition-colors ${isFilterPanelOpen ? 'text-[#ff4fa3]' : 'text-slate-400'}`} />
              <span>Filters</span>
            </button>
            <div className="flex-1 md:flex-initial relative flex items-center justify-center bg-white border border-slate-200/80 rounded-2xl px-3 py-2.5 text-xs font-bold text-slate-500">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#7b5cff] mr-1.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-700 cursor-pointer pr-1 flex-1 md:flex-initial"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Product Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sidebar Drawer Filter Panel */}
        {isFilterPanelOpen && (
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] transition-opacity duration-300 animate-fade-in"
            onClick={() => setIsFilterPanelOpen(false)}
          >
            <div
              className="fixed inset-y-0 right-0 w-full max-w-[320px] sm:max-w-[360px] bg-[#fff8f3] shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out z-[10000] translate-x-0 animate-slide-in-right border-l border-pink-100/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-pink-100/40 bg-white flex items-center justify-between shrink-0">
                <div className="text-left">
                  <h2 className="text-sm font-black uppercase tracking-wider text-[#1b1533] logo-font">Filter Formulations</h2>
                  <p className="text-[12px] font-semibold text-slate-400 mt-0.5">Refine catalog by product type</p>
                </div>
                <button
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 text-slate-400 hover:bg-[#ff4fa3] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none">
                {/* Category Selection */}
                <div className="flex flex-col gap-2.5 text-left">
                  <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] border-b border-pink-100/50 pb-1.5 block">Category</span>
                  <div className="flex flex-col gap-1.5">
                    {categoryTabs.map(tab => {
                      const isActive = selectedCategory === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => {
                            setSelectedCategory(tab);
                            setSubcategoryFilter('');
                            if (typeof window !== 'undefined') {
                              window.history.pushState({}, '', '/shop');
                            }
                          }}
                          className={`text-left text-xs font-bold px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${isActive
                            ? 'bg-[#ff4fa3]/5 border-[#ff4fa3] text-[#ff4fa3] shadow-sm'
                            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-[#1b1533]'
                            }`}
                        >
                          <span>{tab}</span>
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#ff4fa3] animate-pulse" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subcategories Selection */}
                <div className="flex flex-col gap-2.5 text-left">
                  <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] border-b border-pink-100/50 pb-1.5 block">Formulation</span>

                  {selectedCategory === 'All' || selectedCategory === 'Best Sellers' ? (
                    <div className="space-y-4">
                      {dbCategories.map((cat: any) => (
                        <div key={cat.name} className="flex flex-col gap-2 text-left">
                          <span className="text-[12px] font-black uppercase tracking-wider text-slate-400">{cat.name}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.subcategories.map((subObj: any) => {
                              const sub = subObj.name || subObj;
                              const isActive = subcategoryFilter.toLowerCase() === sub.toLowerCase();
                              return (
                                <button
                                  key={sub}
                                  onClick={() => {
                                    if (isActive) {
                                      setSubcategoryFilter('');
                                      if (typeof window !== 'undefined') {
                                        window.history.pushState({}, '', '/shop');
                                      }
                                    } else {
                                      setSubcategoryFilter(sub);
                                      if (typeof window !== 'undefined') {
                                        const categorySlug = cat.slug;
                                        const subcategorySlug = sub.toLowerCase().replace(/\s+/g, '-');
                                        window.history.pushState({}, '', `/shop?category=${categorySlug}&subcategory=${subcategorySlug}`);
                                      }
                                    }
                                  }}
                                  className={`text-[12px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${isActive
                                    ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-sm'
                                    : 'bg-white border-slate-200/60 text-slate-500 hover:border-pink-200 hover:text-[#ff4fa3] hover:bg-pink-50/20'
                                    }`}
                                >
                                  {sub}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 text-left">
                      <span className="text-[12px] font-black uppercase tracking-wider text-slate-400">{selectedCategory} Formulations</span>
                      <div className="flex flex-wrap gap-1.5">
                        {dbCategories.find((c: any) => c.name === selectedCategory)?.subcategories.map((subObj: any) => {
                          const sub = subObj.name || subObj;
                          const isActive = subcategoryFilter.toLowerCase() === sub.toLowerCase();
                          return (
                            <button
                              key={sub}
                              onClick={() => {
                                if (isActive) {
                                  setSubcategoryFilter('');
                                  if (typeof window !== 'undefined') {
                                    window.history.pushState({}, '', '/shop');
                                  }
                                } else {
                                  setSubcategoryFilter(sub);
                                  if (typeof window !== 'undefined') {
                                    const catSlug = dbCategories.find((c: any) => c.name === selectedCategory)?.slug;
                                    const subcategorySlug = sub.toLowerCase().replace(/\s+/g, '-');
                                    window.history.pushState({}, '', `/shop?category=${catSlug}&subcategory=${subcategorySlug}`);
                                  }
                                }
                              }}
                              className={`text-[12px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${isActive
                                ? 'bg-[#ff4fa3] border-[#ff4fa3] text-white shadow-sm'
                                : 'bg-white border-slate-200/60 text-slate-500 hover:border-pink-200 hover:text-[#ff4fa3] hover:bg-pink-50/20'
                                }`}
                            >
                              {sub}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-pink-100/40 bg-white flex flex-col gap-3 shrink-0">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSubcategoryFilter('');
                    setSortBy('default');
                    if (typeof window !== 'undefined') {
                      window.history.pushState({}, '', '/shop');
                    }
                  }}
                  className="w-full inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-3 text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 hover:text-[#1b1533] transition-all duration-300 cursor-pointer logo-font"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-3.5 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 hover:bg-black hover:text-[#ff4fa3] hover:border-black transition-all duration-300 cursor-pointer logo-font"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {subcategoryFilter && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-400">Active Filter:</span>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 border border-pink-100 px-3 py-1 text-xs font-bold text-[#ff4fa3] shadow-sm">
              <span className="capitalize">{subcategoryFilter}</span>
              <button
                onClick={() => {
                  setSubcategoryFilter('');
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', '/shop');
                  }
                }}
                className="hover:text-black transition-colors focus:outline-none cursor-pointer p-0.5"
              >
                <X className="h-3 w-3 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* Results Count Banner */}
        <div className="mt-6 flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Showing {sortedProducts.length} premium formulations</span>
          <span>All products are lab tested</span>
        </div>

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="flex justify-center items-center py-20 w-full">
            <MushroomLoader className="scale-150" />
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="mt-8 grid gap-3 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((p: any, i: any) => (
              <ProductCard key={p._id || p[0]} p={p} i={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-12 px-4 rounded-3xl bg-white border border-slate-100 flex flex-col items-center gap-3">
            <Sparkles className="h-8 w-8 text-slate-300 animate-pulse" />
            <h3 className="text-lg font-bold text-[#1b1533] logo-font">No formulations found</h3>
            <p className="text-xs font-medium text-slate-400 max-w-sm">
              We couldn't find any products matching the current criteria. Please clear the filters to explore our complete dispensary collection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSubcategoryFilter('');
                setSortBy('default');
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', '/shop');
                }
              }}
              className="mt-2 rounded-2xl bg-[#ff4fa3] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-pink-100 hover:bg-black transition-all duration-300 cursor-pointer logo-font"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

      <Footer />
    </main>
  );
}
