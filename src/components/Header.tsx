"use client";
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

import React, { useState } from 'react';
import {
  ChevronDown,
  Heart,
  Search,
  ShoppingCart,
  UserRound,
  X,
  Sparkles,
  Menu,
  Home,
  ShoppingBag,
  Cookie,
  Pill,
  Gauge,
  Gift,
  Sprout,
  Flame,
  Zap,
  Coffee,
  Brain,
  Smile,
  Sun,
  Moon,
  Dna,
  Award,
  Compass,
  MapPin,
  Globe,
  ShieldCheck,
  Mountain,
  Coins,
  Crown,
  Snowflake,
  Skull,
  Waves,
  Infinity,
  PartyPopper,
  Palmtree,
  Gem,
  Eye,
  Rocket,
  Activity,
  CloudSnow,
  Star,
  ShieldAlert,
  Egg,
  Candy,
  Citrus,
  Grid,
  Ticket,
  Leaf,
  Flower,
  CupSoda,
  Scale,
  PawPrint,
  Shield,
  Layers,
  Hammer,
  Truck,
  Package,
  Lock,
} from 'lucide-react';
import { Logo } from './Logo';
import { InfoPopup } from './InfoPopup';
import { MushroomLoader } from './MushroomLoader';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { getProductUrl } from '@/data/products';

function MushroomWithStarsIcon(props: React.ComponentProps<'svg'>) {
  return (
    <span className="relative flex items-center justify-center shrink-0">
      {/* Mushroom cap outline */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
        {...props}
      >
        {/* Cap */}
        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12H3Z" />
        {/* Stem */}
        <path d="M9 12V18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18V12" />
        {/* Cap spots */}
        <circle cx="8" cy="7" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="12" cy="6" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="16" cy="8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
      {/* Sparkles */}
      <span className="absolute -top-1.5 -right-1.5 text-[#ff4fa3] animate-pulse">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
          <path d="M12 2L14.8 8.4L21 9.3L16.2 13.9L17.7 20.3L12 17L6.3 20.3L7.8 13.9L3 9.3L9.2 8.4L12 2Z" />
        </svg>
      </span>
      <span className="absolute -top-0.5 -left-1.5 text-purple-400 scale-75 animate-pulse" style={{ animationDelay: '0.3s' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
          <path d="M12 2L14.8 8.4L21 9.3L16.2 13.9L17.7 20.3L12 17L6.3 20.3L7.8 13.9L3 9.3L9.2 8.4L12 2Z" />
        </svg>
      </span>
    </span>
  );
}

const categoryIconMap: Record<string, any> = {
  'Magic Mushrooms': MushroomWithStarsIcon,
  'Edibles': Cookie,
  'Capsules': Pill,
  'Microdose': Gauge,
};


function getDropdownGridCols(label: string): string {
  switch (label) {
    case 'Magic Mushrooms':
      return 'grid grid-cols-3 gap-x-4 gap-y-0.5 w-[640px]';
    case 'Edibles':
      return 'grid grid-cols-3 gap-x-6 gap-y-1.5 w-[720px]';
    case 'Capsules':
      return 'grid grid-cols-2 gap-x-6 gap-y-1.5 w-[520px]';
    case 'Microdose':
      return 'grid grid-cols-2 gap-x-4 gap-y-0.5 w-[440px]';
    default:
      return 'flex flex-col gap-0.5 w-48';
  }
}

function getSubcategoryIcon(sub: string, parentLabel: string) {
  const s = sub.toLowerCase();

  // --- Magic Mushrooms Explicit Curated Mappings ---
  if (parentLabel === 'Magic Mushrooms') {
    if (s.includes('teacher')) return Award;
    if (s.includes('pulaski')) return Compass;
    if (s.includes('texas')) return MapPin;
    if (s.includes('vietnamese')) return Globe;
    if (s.includes('b+')) return ShieldCheck;
    if (s.includes('mazatapec')) return Mountain;
    if (s.includes('albino treasure coast')) return Gem;
    if (s.includes('treasure coast')) return Coins;
    if (s.includes('cambodian')) return Crown;

    // Potency strains (making each separate one unique!)
    if (s === 'penis envy' || s.includes('penis envy')) return Flame;
    if (s.includes('golden penis envy')) return Sparkles;
    if (s.includes('blue meanies')) return Zap;
    if (s.includes('squat mak')) return Hammer;
    if (s.includes('thrasher')) return Skull;
    if (s.includes('jedi mind fuck')) return Brain;
    if (s.includes('melmac')) return Infinity;
    if (s.includes('tidal wave')) return Waves;
    if (s.includes('enigma')) return Skull;
    if (s.includes('hillbilly')) return Compass;
    if (s.includes('buffalo')) return Globe;

    // Albino Strains (making each separate one unique!)
    if (s.includes('albino penis envy') || s.includes('ape')) return Dna;
    if (s.includes('albino extra terrestrial')) return Rocket;
    if (s.includes('albino jedi mind fuck')) return Eye;
    if (s.includes('albino snow white')) return Snowflake;
    if (s.includes('albino sv-13')) return Activity;
    if (s.includes('aper')) return Star;
    if (s.includes('jack frost')) return CloudSnow;
    if (s.includes('yeti')) return Compass;
    if (s.includes('avalanche')) return ShieldAlert;
    if (s.includes('dino eggs')) return Egg;
    if (s.includes('full moon party')) return PartyPopper;
    if (s.includes('koh samui')) return Palmtree;
    if (s.includes('shakti')) return Heart;

    return Sprout;
  }

  // --- Edibles Explicit Curated Mappings ---
  if (parentLabel === 'Edibles') {
    if (s.includes('blue raspberry')) return Candy;
    if (s.includes('watermelon')) return Citrus;
    if (s.includes('strawberry')) return Heart;
    if (s.includes('peach')) return Smile;
    if (s.includes('tropical')) return Palmtree;
    if (s.includes('mixed berry')) return Sparkles;
    if (s.includes('mango')) return Citrus;
    if (s.includes('apple')) return Sprout;

    if (s.includes('milk chocolate')) return Grid;
    if (s.includes('dark chocolate')) return Moon;
    if (s.includes('cookies & cream')) return Cookie;
    if (s.includes('mint chocolate')) return Leaf;
    if (s.includes('salted caramel')) return Gem;
    if (s.includes('white chocolate')) return Sun;
    if (s.includes('chocolate')) return Grid;
    if (s.includes('s\'mores')) return Cookie;

    if (s.includes('chai')) return Coffee;
    if (s.includes('lemon ginger')) return CupSoda;
    if (s.includes('berry hibiscus')) return Flower;
    if (s.includes('relaxation')) return Smile;
    if (s.includes('energy')) return Zap;
    if (s.includes('hot chocolate')) return Coffee;

    return Cookie;
  }

  // --- Capsules Explicit Curated Mappings ---
  if (parentLabel === 'Capsules') {
    if (s.includes('teacher')) return Award;
    if (s.includes('penis envy')) return Flame;
    if (s.includes('blue meanies')) return Zap;
    if (s.includes('focus')) return Brain;
    if (s.includes('mood')) return Smile;
    if (s.includes('energy')) return Sun;
    if (s.includes('creative')) return Sparkles;
    if (s.includes('relax')) return Moon;
    if (s.includes('beginner')) return Compass;
    if (s.includes('balanced')) return Scale;
    if (s.includes('lion')) return PawPrint;
    if (s.includes('reishi')) return Sprout;
    if (s.includes('cordyceps')) return Activity;
    if (s.includes('chaga')) return Shield;
    if (s.includes('turkey')) return Layers;

    if (s.includes('tincture') || s.includes('extract')) return CupSoda;

    return Pill;
  }

  // --- Microdose Explicit Curated Mappings ---
  if (parentLabel === 'Microdose') {
    if (s.includes('teacher')) return Award;
    if (s.includes('penis envy')) return Flame;
    if (s.includes('blue meanies')) return Zap;
    if (s.includes('daily wellness') || s.includes('wellness')) return Activity;
    if (s.includes('focus') || s.includes('productivity')) return Brain;
    if (s.includes('creative') || s.includes('creativity')) return Sparkles;
    if (s.includes('mood')) return Smile;
    if (s.includes('energy')) return Sun;
    if (s.includes('relax')) return Moon;
    if (s.includes('beginner')) return Compass;
    if (s.includes('balanced')) return Scale;
    if (s.includes('lion')) return PawPrint;
    if (s.includes('stamets')) return Layers;
    if (s.includes('premium')) return Crown;

    return Gauge;
  }

  return Sparkles;
}

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalQuantity, setIsCartOpen, totalWishlistQuantity, setIsWishlistOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any | null>(null);

  const { data: catData, isLoading: isCatLoading } = useSWR('/api/categories', fetcher);
  const { data: annData, isLoading: isAnnLoading } = useSWR('/api/announcements', fetcher);

  const dbCategories = catData?.success ? catData.categories : [];
  const announcements = annData?.success ? annData.announcements : [];
  const isLoading = isCatLoading || isAnnLoading;

  const navItems = dbCategories.map((cat: any) => ({
    label: cat.name,
    hasDropdown: cat.subcategories && cat.subcategories.length > 0,
    icon: categoryIconMap[cat.name] || Sparkles,
    slug: cat.slug,
    subs: cat.subcategories || [],
  }));

  const toggleMobileCategory = (label: string) => {
    setExpandedMobileCategories(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?subcategory=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Dynamic icon mapping for the DB strings
  const getIconComponent = (name: string) => {
    if (name === 'Truck') return Truck;
    if (name === 'Package') return Package;
    if (name === 'PartyPopper') return PartyPopper;
    if (name === 'ShieldCheck') return ShieldCheck;
    if (name === 'Zap') return Zap;
    if (name === 'Lock') return Lock;
    if (name === 'Home') return Home;
    if (name === 'Heart') return Heart;
    if (name === 'MapPin') return MapPin;
    if (name === 'Gift') return Gift;
    if (name === 'Star') return Star;
    if (name === 'Flame') return Flame;
    return Sparkles;
  };

  const renderTrackItems = () => {
    return announcements.map((item: any, idx: any) => {
      const IconComponent = typeof item.iconName === 'string' ? getIconComponent(item.iconName) : (item.icon || Sparkles);
      return (
        <React.Fragment key={idx}>
          <div
            className="inline-flex items-center gap-1.5 text-white shrink-0 font-light cursor-pointer hover:underline hover:text-[#ff4fa3] transition-colors"
            onClick={() => {
              setSelectedAnnouncement(item);
              setIsInfoOpen(true);
            }}
            title={`Click for details on: ${item.text}`}
          >
            <IconComponent className="h-3.5 w-3.5 text-[#ff4fa3] shrink-0 stroke-[2.5]" />
            <span>{item.text}</span>
          </div>
          <span className="text-zinc-500 shrink-0 select-none">•</span>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[999999] bg-[#fffaf5] flex flex-col items-center justify-center">
          <MushroomLoader className="scale-150 mb-4" />
        </div>
      )}

      {/* 1. Announcement Bar */}
      <div className="bg-[#110d24] py-2 text-[12px] font-light text-white shadow-sm relative z-50 overflow-hidden select-none border-b border-white/5">
        <div className="flex whitespace-nowrap overflow-hidden marquee-container">
          {/* Track 1 */}
          <div className="inline-flex items-center gap-6 animate-custom-marquee pr-6 shrink-0">
            {renderTrackItems()}
          </div>
          {/* Track 2 (Seamless clone) */}
          <div className="inline-flex items-center gap-6 animate-custom-marquee pr-6 shrink-0" aria-hidden="true">
            {renderTrackItems()}
          </div>
        </div>
      </div>

      {/* 2. Main Header & Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-1.5 relative">
          {/* Mobile Header Layout (visible only on mobile) */}
          <div className="flex md:hidden items-center justify-between h-11 relative">
            {/* Left: Search & Account Icon Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#1b1533] hover:text-[#ff4fa3] focus:outline-none cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-5.5 w-5.5 stroke-[1.8]" />
              </button>
              <button
                onClick={() => window.location.href = '/my-account'}
                className="p-2 text-[#1b1533] hover:text-[#ff4fa3] focus:outline-none cursor-pointer"
                aria-label="Account"
              >
                <UserRound className="h-5.5 w-5.5 stroke-[1.8]" />
              </button>
            </div>

            {/* Center: Centered Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-[1.02] duration-200">
              <Logo />
            </div>

            {/* Right: Wishlist & Cart Icons */}
            <div className="flex items-center gap-1 text-[#1b1533]">
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-[#1b1533] hover:text-[#ff4fa3] transition-colors focus:outline-none cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="h-5.5 w-5.5 stroke-[1.8]" />
                {totalWishlistQuantity > 0 && (
                  <span className="absolute right-0.5 top-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-[#ff4fa3] text-[10px] font-black text-white shadow-md">
                    {totalWishlistQuantity}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#1b1533] hover:text-[#ff4fa3] transition-colors focus:outline-none cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5.5 w-5.5 stroke-[1.8]" />
                {totalQuantity > 0 && (
                  <span className="absolute right-0.5 top-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-[#ff4fa3] text-[10px] font-black text-white shadow-md">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Header Layout (visible only on desktop) */}
          <div className="hidden md:flex items-center justify-between gap-6">
            {/* Left Block: Logo + Navigation Menu */}
            <div className="flex items-center gap-12 flex-1">
              {/* Logo */}
              <div className="transition-transform hover:scale-[1.02] duration-200 shrink-0">
                <Logo />
              </div>

              <nav className="hidden items-center gap-6 text-[12.5px] font-black text-[#1b1533] md:flex relative">
                {navItems.map((item: any) => {
                  const categorySlug = item.slug || item.label.toLowerCase().replace(/\s+/g, '-');
                  const linkUrl = `/category/${categorySlug}`;
                  return (
                    <div key={item.label} className="relative group py-3">
                      <Link
                        href={linkUrl}
                        className="flex items-center gap-1.5 cursor-pointer transition-colors duration-200 text-[#1b1533]/85 hover:text-[#ff4fa3]"
                      >
                        <item.icon className="h-4 w-4 stroke-[2.2] text-[#ff4fa3] group-hover:scale-110 transition-transform duration-200" />
                        <span>{item.label}</span>
                        {item.hasDropdown ? (
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#ff4fa3] transition-colors" />
                        ) : null}
                      </Link>
                      {item.hasDropdown ? (
                        <div className={`absolute top-full -left-6 mt-1 bg-[#fff8f3] border border-pink-100/80 rounded-2xl p-4 shadow-[0_24px_80px_rgba(255,79,163,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto ${getDropdownGridCols(item.label)} before:content-[''] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2`}>
                          {(() => {
                            const hasGroupNames = item.subs.some((sub: any) => sub.groupName);
                            if (hasGroupNames) {
                              const grouped: Record<string, any[]> = {};
                              item.subs.forEach((sub: any) => {
                                const gName = sub.groupName || 'Other';
                                if (!grouped[gName]) grouped[gName] = [];
                                grouped[gName].push(sub);
                              });

                              return Object.entries(grouped).map(([gName, subItems], gIdx) => (
                                <div key={gIdx} className="flex flex-col gap-2">
                                  <h3 className="px-2 py-1 text-[11px] font-black uppercase tracking-wider text-[#ff4fa3]/80 border-b border-pink-100/30">
                                    {gName}
                                  </h3>
                                  <div className="flex flex-col gap-0.5">
                                    {subItems.map((sub, sIdx) => {
                                      const SubIcon = getSubcategoryIcon(sub.name, item.label);
                                      return (
                                        <Link
                                          key={sIdx}
                                          href={getProductUrl(sub.name, item.label)}
                                          className="group/item px-2 py-1.5 rounded-lg text-[12px] font-bold text-[#1b1533]/80 hover:text-[#ff4fa3] hover:bg-pink-50/40 transition-all duration-150 text-left whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-1.5"
                                          title={sub.name}
                                        >
                                          <SubIcon className="h-4 w-4 stroke-[2] text-slate-400 group-hover/item:text-[#ff4fa3] group-hover/item:scale-110 transition-all duration-200 shrink-0" />
                                          <span className="truncate">{sub.name}</span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              ));
                            } else {
                              return item.subs.map((sub: any, sIdx: number) => {
                                const SubIcon = getSubcategoryIcon(sub.name, item.label);
                                return (
                                  <Link
                                    key={sIdx}
                                    href={getProductUrl(sub.name, item.label)}
                                    className="group/item px-2 py-1.5 rounded-lg text-[12px] font-bold text-[#1b1533]/80 hover:text-[#ff4fa3] hover:bg-pink-50/40 transition-all duration-150 text-left whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-1.5"
                                    title={sub.name}
                                  >
                                    <SubIcon className="h-4 w-4 stroke-[2] text-slate-400 group-hover/item:text-[#ff4fa3] group-hover/item:scale-110 transition-all duration-200 shrink-0" />
                                    <span className="truncate">{sub.name}</span>
                                  </Link>
                                );
                              });
                            }
                          })()}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {/* Separate Bundles Menu Link */}
                <div className="relative group py-3">
                  <Link
                    href="/bundles"
                    className="flex items-center gap-1.5 cursor-pointer transition-colors duration-200 text-[#1b1533]/85 hover:text-[#ff4fa3]"
                  >
                    <Gift className="h-4 w-4 stroke-[2.2] text-[#ff4fa3] group-hover:scale-110 transition-transform duration-200" />
                    <span>Bundles</span>
                  </Link>
                </div>
                {/* Separate Coupons Menu Link */}
                <div className="relative group py-3">
                  <Link
                    href="/coupons"
                    className="flex items-center gap-1.5 cursor-pointer transition-colors duration-200 text-[#1b1533]/85 hover:text-[#ff4fa3]"
                  >
                    <Ticket className="h-4 w-4 stroke-[2.2] text-[#ff4fa3] group-hover:scale-110 transition-transform duration-200" />
                    <span>Coupons</span>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Right Block: Action Items */}
            <div className="flex items-center gap-8 text-[#1b1533] shrink-0">
              <IconAction
                icon={<Search className="h-5.5 w-5.5 stroke-[1.8]" />}
                label="Search"
                onClick={() => setIsSearchOpen(true)}
              />
              <IconAction
                icon={<UserRound className="h-5.5 w-5.5 stroke-[1.8]" />}
                label="Account"
                onClick={() => window.location.href = '/my-account'}
              />
              <IconAction
                icon={<Heart className="h-5.5 w-5.5 stroke-[1.8]" />}
                label="Wishlist"
                badge={totalWishlistQuantity.toString()}
                onClick={() => setIsWishlistOpen(true)}
              />
              <IconAction
                icon={<ShoppingCart className="h-5.5 w-5.5 stroke-[1.8]" />}
                label="Cart"
                badge={totalQuantity.toString()}
                onClick={() => setIsCartOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] transition-opacity duration-300 animate-fade-in md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-full max-w-[300px] bg-[#fff8f3] shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out z-[10000] translate-x-0 animate-slide-in-left border-r border-pink-100/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-pink-100/40 bg-white flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 text-slate-400 hover:bg-[#ff4fa3] hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable items) */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 scrollbar-none">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 focus-within:border-[#ff4fa3] focus-within:ring-2 focus-within:ring-pink-50 transition-all shadow-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#1b1533] outline-none placeholder:text-slate-400"
                  placeholder="Search catalog..."
                />
                <button type="submit" className="text-[#ff4fa3] hover:scale-110 transition-transform">
                  <Search className="h-4 w-4 stroke-[2]" />
                </button>
              </form>

              {/* Navigation Categories Accordion */}
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Categories</span>
                {navItems.map((item: any) => {
                  const categorySlug = item.slug || item.label.toLowerCase().replace(/\s+/g, '-');
                  const isExpanded = !!expandedMobileCategories[item.label];
                  const subcategories = item.subs || [];

                  return (
                    <div key={item.label} className="flex flex-col">
                      <button
                        onClick={() => toggleMobileCategory(item.label)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-bold text-[#1b1533] hover:bg-pink-50/40 hover:text-[#ff4fa3] transition-all text-left"
                      >
                        <span className="flex items-center gap-2">
                          <item.icon className="h-4.5 w-4.5 stroke-[2] text-[#ff4fa3]" />
                          <span>{item.label}</span>
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#ff4fa3]' : ''}`} />
                      </button>
                      {isExpanded && (
                        <div className="pl-4 pr-2 flex flex-col gap-2 mt-1 border-l-2 border-pink-100/40 ml-5 text-left">                          {(() => {
                          const hasGroupNames = item.subs.some((sub: any) => sub.groupName);
                          if (hasGroupNames) {
                            const grouped: Record<string, any[]> = {};
                            item.subs.forEach((sub: any) => {
                              const gName = sub.groupName || 'Other';
                              if (!grouped[gName]) grouped[gName] = [];
                              grouped[gName].push(sub);
                            });

                            return Object.entries(grouped).map(([gName, subItems], gIdx) => (
                              <div key={gIdx} className="flex flex-col gap-1.5">
                                <h4 className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#ff4fa3]/80 bg-pink-50/50 rounded-lg">
                                  {gName}
                                </h4>
                                {subItems.map((sub, sIdx) => {
                                  const SubIcon = getSubcategoryIcon(sub.name, item.label);
                                  return (
                                    <Link
                                      key={sIdx}
                                      href={getProductUrl(sub.name, item.label)}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="group/item flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#1b1533]/80 hover:text-[#ff4fa3] hover:bg-pink-50/40 transition-all active:scale-[0.98]"
                                    >
                                      <SubIcon className="h-4 w-4 stroke-[2.2] text-slate-400 group-hover/item:text-[#ff4fa3] transition-colors shrink-0" />
                                      <span className="text-[13px] font-bold truncate">{sub.name}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            ));
                          } else {
                            return item.subs.map((sub: any, sIdx: number) => {
                              const SubIcon = getSubcategoryIcon(sub.name, item.label);
                              return (
                                <Link
                                  key={sIdx}
                                  href={getProductUrl(sub.name, item.label)}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="group/item flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#1b1533]/80 hover:text-[#ff4fa3] hover:bg-pink-50/40 transition-all active:scale-[0.98]"
                                >
                                  <SubIcon className="h-4 w-4 stroke-[2.2] text-slate-400 group-hover/item:text-[#ff4fa3] transition-colors shrink-0" />
                                  <span className="text-[13px] font-bold truncate">{sub.name}</span>
                                </Link>
                              );
                            });
                          }
                        })()}
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Separate Bundles link */}
                <Link
                  href="/bundles"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-bold text-[#1b1533] hover:bg-pink-50/40 hover:text-[#ff4fa3] transition-all text-left"
                >
                  <Gift className="h-4.5 w-4.5 stroke-[2] text-[#ff4fa3]" />
                  <span>Bundles</span>
                </Link>
              </div>

              {/* General Links */}
              <div className="flex flex-col gap-1 border-t border-pink-100/30 pt-4">
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Quick Links</span>
                <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-bold text-[#1b1533]/85 hover:text-[#ff4fa3] hover:bg-pink-50/40 transition-all">FAQ</Link>
                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-bold text-[#1b1533]/85 hover:text-[#ff4fa3] hover:bg-pink-50/40 transition-all">Blog</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-bold text-[#1b1533]/85 hover:text-[#ff4fa3] hover:bg-pink-50/40 transition-all">Contact Us</Link>
                <Link href="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-bold text-[#1b1533]/85 hover:text-[#ff4fa3] hover:bg-pink-50/40 transition-all">Track Order</Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-pink-100/40 bg-white flex flex-col gap-2">
              <span className="text-[12px] font-black uppercase tracking-widest text-slate-400">Customer Support</span>
              <a href="mailto:hello@funguyz.ca" className="text-xs font-bold text-slate-700 hover:text-[#ff4fa3]">hello@funguyz.ca</a>
              <span className="text-[12px] font-semibold text-slate-400 mt-1">🇨🇦 Sourced in Canada</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_24px_rgba(27,21,51,0.08)] flex items-center justify-around px-1 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+12px)] select-none">
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center active:scale-95 transition-all w-[72px] h-12 gap-1 ${(pathname === '/shop' || pathname.startsWith('/shop/') || pathname.startsWith('/category/') || pathname.startsWith('/product/')) ? 'text-[#ff4fa3]' : 'text-slate-500 hover:text-[#ff4fa3]'}`}
        >
          <ShoppingBag className="h-5 w-5 stroke-[2]" />
          <span className="text-[10.5px] font-black uppercase tracking-widest whitespace-nowrap leading-none">Shop</span>
        </Link>
        <Link
          href="/bundles"
          className={`flex flex-col items-center justify-center active:scale-95 transition-all w-[72px] h-12 gap-1 ${(pathname === '/bundles' || pathname.startsWith('/bundles/')) ? 'text-[#ff4fa3]' : 'text-slate-500 hover:text-[#ff4fa3]'}`}
        >
          <Gift className="h-5 w-5 stroke-[2]" />
          <span className="text-[10.5px] font-black uppercase tracking-widest whitespace-nowrap leading-none">Bundles</span>
        </Link>
        <Link
          href="/coupons"
          className={`flex flex-col items-center justify-center active:scale-95 transition-all w-[72px] h-12 gap-1 ${(pathname === '/coupons' || pathname.startsWith('/coupons/')) ? 'text-[#ff4fa3]' : 'text-slate-500 hover:text-[#ff4fa3]'}`}
        >
          <Ticket className="h-5 w-5 stroke-[2]" />
          <span className="text-[10.5px] font-black uppercase tracking-widest whitespace-nowrap leading-none">Coupons</span>
        </Link>
        <button
          onClick={() => setIsMobileCategoryOpen(true)}
          className={`flex flex-col items-center justify-center active:scale-95 transition-all w-[72px] h-12 gap-1 cursor-pointer focus:outline-none ${isMobileCategoryOpen ? 'text-[#ff4fa3]' : 'text-slate-500 hover:text-[#ff4fa3]'}`}
        >
          <Grid className={`h-5 w-5 stroke-[2] ${isMobileCategoryOpen ? 'animate-pulse' : ''}`} />
          <span className={`text-[10.5px] font-black uppercase tracking-widest whitespace-nowrap leading-none ${isMobileCategoryOpen ? 'animate-pulse' : ''}`}>Category</span>
        </button>
      </div>



      {/* Mobile Category Bottom Sheet */}
      {isMobileCategoryOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] transition-opacity duration-300 animate-fade-in md:hidden"
          onClick={() => setIsMobileCategoryOpen(false)}
        >
          <div
            className="fixed inset-x-0 bottom-0 max-h-[82vh] bg-[#fff8f3]/95 backdrop-blur-md rounded-t-[32px] border-t border-pink-100 shadow-[0_-16px_48px_rgba(27,21,51,0.15)] flex flex-col transition-transform duration-500 ease-out z-[10000] translate-y-0 animate-slide-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bottom Sheet Drag Indicator & Header */}
            <div className="pt-3.5 pb-4 px-6 border-b border-pink-100/40 bg-white/50 flex flex-col items-center gap-3 shrink-0 rounded-t-[32px]">
              <div className="w-12 h-1.5 bg-slate-300/80 rounded-full" />
              <div className="flex items-center justify-between w-full mt-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🍄</span>
                  <div className="text-left">
                    <h2 className="text-base font-black tracking-tight text-[#1b1533] uppercase logo-font">Browse Categories</h2>
                    <p className="text-[12px] font-semibold text-slate-400">Select a formulation to explore</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileCategoryOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 text-slate-400 hover:bg-[#ff4fa3] hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Categories List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none pb-24">
              <div className="grid grid-cols-2 gap-3.5">
                {navItems.map((item: any, idx: any) => {
                  const categorySlug = item.slug || item.label.toLowerCase().replace(/\s+/g, '-');
                  const linkUrl = `/category/${categorySlug}`;
                  const subcategories = item.subs || [];

                  // Specific styles for cards
                  let bgGradient = "from-[#f3efff] to-white border-purple-100";
                  let iconBg = "bg-purple-50 text-[#7b5cff]";
                  if (item.label === 'Edibles') {
                    bgGradient = "from-[#fff0f6] to-white border-pink-100";
                    iconBg = "bg-pink-50 text-[#ff4fa3]";
                  } else if (item.label === 'Capsules') {
                    bgGradient = "from-[#eef9ff] to-white border-sky-100";
                    iconBg = "bg-sky-50 text-sky-500";
                  } else if (item.label === 'Microdose') {
                    bgGradient = "from-[#f0fdf4] to-white border-emerald-100";
                    iconBg = "bg-emerald-50 text-emerald-500";
                  }

                  return (
                    <div
                      key={item.label}
                      className={`rounded-2xl border bg-gradient-to-br ${bgGradient} p-3.5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 min-h-[140px]`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`p-2 rounded-xl ${iconBg} shadow-sm shrink-0`}>
                          <item.icon className="h-5 w-5 stroke-[2.2]" />
                        </div>
                        <Link
                          href={linkUrl}
                          onClick={() => setIsMobileCategoryOpen(false)}
                          className="text-[12px] font-black uppercase tracking-wider text-[#ff4fa3] bg-pink-50/50 hover:bg-[#ff4fa3] hover:text-white px-2 py-1 rounded-lg transition-all border border-pink-100/50 logo-font shrink-0"
                        >
                          View
                        </Link>
                      </div>

                      <div className="mt-4 text-left">
                        <Link
                          href={linkUrl}
                          onClick={() => setIsMobileCategoryOpen(false)}
                          className="text-[13px] font-black text-[#1b1533] hover:text-[#ff4fa3] transition-colors leading-none tracking-tight block logo-font"
                        >
                          {item.label}
                        </Link>

                        {/* Subcategory short links (show top 3) */}
                        {subcategories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {subcategories.slice(0, 3).map((sub: string, sIdx: number) => {
                              const productUrl = getProductUrl(sub, item.label);
                              return (
                                <Link
                                  key={sIdx}
                                  href={productUrl}
                                  onClick={() => setIsMobileCategoryOpen(false)}
                                  className="text-[10px] font-bold text-slate-500 hover:text-[#ff4fa3] bg-white/85 px-1.5 py-0.5 rounded border border-slate-100 truncate max-w-[80px]"
                                  title={sub}
                                >
                                  {sub.split(' ')[0]}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Special full-width Quick Links / Featured promo row inside category sheet */}
              <div className="bg-gradient-to-r from-[#ff4fa3]/5 to-[#7b5cff]/5 border border-pink-100/40 rounded-2.5xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3 text-left">
                  <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg shrink-0">
                    ✨
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#1b1533] uppercase logo-font">Browse All Formulations</h3>
                    <p className="text-[12px] font-semibold text-slate-400">Discover Canada's best dispensary deals</p>
                  </div>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileCategoryOpen(false)}
                  className="bg-[#ff4fa3] text-white hover:bg-black text-[12px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all shadow-md shadow-pink-100 logo-font shrink-0"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Pop-up Modal for Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[999] flex items-start justify-center pt-24 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-[#fff8f3] border border-pink-100/80 rounded-2xl p-6 shadow-[0_32px_120px_rgba(255,79,163,0.18)] text-[#1b1533] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button X */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#ff4fa3] transition-colors p-1.5 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-[#ff4fa3] flex items-center justify-center text-lg text-white">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3]">Search Catalog</span>
                <h3 className="text-xs font-bold text-slate-400">FunGuyz Store</h3>
              </div>
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 bg-white border border-purple-200 rounded-full px-5 py-3 focus-within:border-[#ff4fa3] focus-within:ring-4 focus-within:ring-pink-50 transition-all shadow-sm">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#1b1533] outline-none placeholder:text-slate-400"
                placeholder="Type your search here..."
              />
              <button type="submit" className="rounded-full p-1 text-[#ff4fa3] hover:scale-110 transition-transform">
                <Search className="h-5 w-5 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Pop-up Modal for Announcement Info */}
      <InfoPopup
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        announcement={selectedAnnouncement}
      />
    </>
  );
}

function IconAction({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center gap-1 text-[12px] font-bold text-slate-700 hover:text-[#ff4fa3] transition-colors duration-200 focus:outline-none cursor-pointer"
    >
      <span className="relative p-1 text-slate-700 group-hover:text-[#ff4fa3] transition-colors duration-200">
        {icon}
        {badge && badge !== '0' ? (
          <span className="absolute -right-2 -top-1.5 grid h-5.5 w-5.5 place-items-center rounded-full bg-[#ff4fa3] text-[10px] font-black text-white shadow-md shadow-pink-200">
            {badge}
          </span>
        ) : null}
      </span>
      <span className="hidden sm:block text-[12px] font-bold text-slate-700 group-hover:text-[#ff4fa3] transition-colors duration-200">
        {label}
      </span>
    </button>
  );
}
