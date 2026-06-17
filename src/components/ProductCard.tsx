import Link from 'next/link';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductUrl } from '@/data/products';
import { imageMap, getFallbackImage } from '@/data/imageMap';

const badgeColors: Record<string, string> = {
  'top rated': 'text-emerald-700 bg-emerald-50/80 border-emerald-100/40',
  'best seller': 'text-amber-700 bg-amber-50/80 border-amber-100/40',
  'premium': 'text-purple-700 bg-purple-50/80 border-purple-100/40',
  'daily': 'text-sky-700 bg-sky-50/80 border-sky-100/40',
  'wellness': 'text-pink-700 bg-pink-50/80 border-pink-100/40',
  'rare': 'text-indigo-700 bg-indigo-50/80 border-indigo-100/40',
  'smooth': 'text-rose-700 bg-rose-50/80 border-rose-100/40',
  'focus': 'text-violet-700 bg-violet-50/80 border-violet-100/40',
};

export function ProductCard({ p, i = 0 }: { p: any; i?: number }) {
  // Extract dynamic details (handles both legacy array and DB API object)
  const isArray = Array.isArray(p);
  const title = (isArray ? p[0] : p.name) || '';
  const category = isArray ? p[1] : (p.category?.name || 'Magic Mushrooms');
  
  const priceNum = isArray 
    ? parseFloat(p[2].replace('$', '')) 
    : (p.price || (Array.isArray(p.pricing) && p.pricing.length > 0 ? p.pricing[0].price : 0));
  const price = `$${priceNum.toFixed(2)}`;
  
  const badge = isArray ? p[4] : (p.tags?.[0] || '');
  const id = isArray ? p[0] : (p._id || title);
  const slug = isArray ? '' : p.slug;

  // DO NOT TOUCH IMAGES CODE - Strictly mapped from static `imageMap`
  const imageSrc = imageMap[title] || getFallbackImage(category);
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(id);

  // Hardcode exact review numbers matching the reference
  const reviewCounts: Record<string, number> = {
    'Golden Teacher': 125,
    'Penis Envy': 99,
    'Blue Raspberry Gummies': 154,
    'Golden Teacher Capsules': 82,
    'Microdose Daily Blend': 34,
  };
  const reviews = isArray ? (p[6] || 48) : (p.reviewsList ? p.reviewsList.length : (p.reviewStats?.count ?? 0));

  // Dynamically calculate natural-looking previous prices ending in .99
  const originalPrice = '$' + (Math.round(priceNum * 1.25) - 0.01).toFixed(2);

  // Dynamic potency indicator mapping matching premium severity scale
  const getPotencyData = (title: string, category: string, idx: number) => {
    // Specific ranges for known catalog products
    if (title.includes('Penis Envy')) {
      return {
        pctRange: '75% - 90%',
        tier: 'VERY STRONG',
        percent: 90,
        color: '#dc2626',      // Red
      };
    }
    if (title.includes('Jack Frost')) {
      return {
        pctRange: '50% - 70%',
        tier: 'STRONG',
        percent: 70,
        color: '#ea580c',      // Orange
      };
    }
    if (title.includes('Golden Teacher')) {
      if (title.includes('Capsules')) {
        return {
          pctRange: '20% - 35%',
          tier: 'MODERATE',
          percent: 45,
          color: '#84cc16',      // Lime Green
        };
      }
      return {
        pctRange: '35% - 45%',
        tier: 'MODERATE',
        percent: 45,
        color: '#84cc16',      // Lime Green
      };
    }
    if (title.includes('Blue Raspberry Gummies') || title.includes('Gummies')) {
      return {
        pctRange: '10% - 23%',
        tier: 'MILD',
        percent: 25,
        color: '#16a34a',      // Green
      };
    }
    if (title.includes('Milk Chocolate') || title.includes('Chocolate')) {
      return {
        pctRange: '12% - 25%',
        tier: 'MILD',
        percent: 25,
        color: '#16a34a',      // Green
      };
    }
    if (title.includes('Daily') || title.includes('Microdose')) {
      return {
        pctRange: '0% - 10%',
        tier: 'MILD',
        percent: 15,
        color: '#16a34a',      // Green
      };
    }
    if (title.includes('Focus')) {
      return {
        pctRange: '20% - 35%',
        tier: 'MODERATE',
        percent: 45,
        color: '#84cc16',      // Lime Green
      };
    }

    // Dynamic rotation fallbacks based on index so everything is diverse and unique
    const rem = idx % 4;
    if (rem === 0) {
      return {
        pctRange: '15% - 25%',
        tier: 'MILD',
        percent: 25,
        color: '#16a34a',
      };
    } else if (rem === 1) {
      return {
        pctRange: '30% - 45%',
        tier: 'MODERATE',
        percent: 45,
        color: '#84cc16',
      };
    } else if (rem === 2) {
      return {
        pctRange: '55% - 70%',
        tier: 'STRONG',
        percent: 70,
        color: '#ea580c',
      };
    } else {
      return {
        pctRange: '80% - 95%',
        tier: 'VERY STRONG',
        percent: 90,
        color: '#dc2626',
      };
    }
  };

  const potency = getPotencyData(title, category, i);

  return (
    <div className="group flex flex-col justify-between h-full bg-white p-2 sm:p-3 rounded-[24px] sm:rounded-[32px] border border-slate-100/80 shadow-[0_8px_30px_rgba(27,21,51,0.02)] hover:shadow-[0_20px_45px_rgba(123,92,255,0.08)] hover:-translate-y-1 transition-all duration-300 w-full relative">
      {/* Floating Heart Wishlist Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist({ id, title, category, price, imageSrc, slug });
        }}
        className="absolute right-3 top-3 sm:right-6 sm:top-6 z-20 h-7.5 w-7.5 rounded-full bg-white/85 border border-slate-100 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-[#ff4fa3] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer group/wish"
      >
        <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${wishlisted ? 'fill-[#ff4fa3] text-[#ff4fa3] scale-110' : 'text-slate-400 group-hover/wish:text-[#ff4fa3]'
          }`} />
        {/* Smooth sliding tooltip */}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[12px] font-bold uppercase tracking-widest text-white bg-black rounded-lg opacity-0 pointer-events-none group-hover/wish:opacity-100 group-hover/wish:translate-y-0 translate-y-1 transition-all duration-200 shadow-md whitespace-nowrap logo-font z-50">
          {wishlisted ? 'Remove' : 'Wishlist'}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
        </span>
      </button>

      {/* Inner Image Container with Pure White Background (Clickable Link!) */}
      <Link
        href={getProductUrl(title, category)}
        className="relative aspect-[4/5] w-full overflow-hidden bg-white flex items-center justify-center rounded-2xl sm:rounded-3xl border border-slate-100/50 cursor-pointer block"
      >
        {badge ? (
          <span className={`absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full border px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-md z-10 ${badgeColors[badge.toLowerCase()] || 'text-slate-700 bg-slate-50 border-slate-100'
            }`}>
            {badge}
          </span>
        ) : null}
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover pointer-events-none transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1 rounded-2xl sm:rounded-3xl"
          loading="lazy"
        />
      </Link>

      {/* Content Details Block */}
      <div className="p-1.5 sm:p-3 flex flex-col gap-1 sm:gap-1.5 mt-1 w-full">
        {/* Category string */}
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 leading-none">{category}</span>

        {/* Title (Clickable Link!) */}
        <h3 className="font-bold text-[13px] sm:text-base md:text-[17px] text-[#1b1533] leading-snug tracking-tight hover:text-[#ff4fa3] transition-colors duration-200 line-clamp-2 logo-font">
          <Link href={getProductUrl(title, category)} className="cursor-pointer">
            {title}
          </Link>
        </h3>

        {/* Rating Row */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[12px] sm:text-xs md:text-[13px] font-semibold text-amber-500 leading-none">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, star) => (
              <Star key={star} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current text-amber-400 stroke-none" />
            ))}
          </div>
          <span className="text-slate-400 font-bold ml-0.5">({reviews})</span>
        </div>

        {/* Potency Section Redesign */}
        {(() => {
          const getPotencyColors = (tier: string) => {
            const t = tier.toUpperCase();
            if (t.includes('MILD')) {
              return { bg: '#F0FDF4', text: '#16A34A' };
            }
            if (t.includes('STRONG')) {
              if (t.includes('VERY')) {
                return { bg: '#FEF2F2', text: '#DC2626' };
              }
              return { bg: '#FFF0EA', text: '#EA580C' };
            }
            // MODERATE
            return { bg: '#FFF3E6', text: '#F59E0B' };
          };
          const colors = getPotencyColors(potency.tier);
          const progressPercent = potency.percent;
          return (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mt-3 gap-2 sm:gap-0 select-none">
              {/* Left Column */}
              <div className="flex sm:flex-col justify-between sm:justify-between items-center sm:items-start w-full sm:w-auto h-auto sm:h-[38px]">
                <span className="text-[12px] sm:text-[12px] font-black text-slate-400 uppercase tracking-widest leading-none font-poppins">POTENCY</span>
                <span className="text-[12px] sm:text-[15px] font-black text-[#1b1533] font-poppins leading-none whitespace-nowrap">{potency.pctRange}</span>
              </div>

              {/* Right Column */}
              <div className="flex sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto h-auto sm:h-[38px] text-left sm:text-right gap-1.5 sm:gap-0">
                <span
                  className="text-[10px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full leading-none font-poppins"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                  {potency.tier}
                </span>

                {/* Solid Continuous Progress Bar */}
                <div className="w-full sm:w-[105px] h-1.5 sm:h-2 bg-[#EAEAF0] rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#ff4fa3] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })()}

        {/* Pricing & Cart Button */}
        <div className="mt-1 flex items-center justify-between w-full">
          <div className="flex items-baseline gap-1 sm:gap-1.5">
            <span className="text-[14px] sm:text-[17px] md:text-[19px] font-black text-[#1b1533] logo-font">{price}</span>
            <span className="text-[12px] sm:text-xs md:text-sm font-semibold text-slate-400 line-through">{originalPrice}</span>
          </div>
          <button
            onClick={() => addToCart({ title, category, price, imageSrc })}
            className="relative group/btn grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-xl sm:rounded-2xl bg-[#ff4fa3] text-white shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            {/* Smooth sliding tooltip */}
            <span className="absolute bottom-full right-0 mb-2 px-2.5 py-1 text-[12px] font-bold uppercase tracking-widest text-white bg-black rounded-lg opacity-0 pointer-events-none group-hover/btn:opacity-100 group-hover/btn:translate-y-0 translate-y-1 transition-all duration-200 shadow-md whitespace-nowrap logo-font z-30">
              Add to Cart
              {/* Caret Down Arrow */}
              <span className="absolute top-full right-3 sm:right-4 border-4 border-transparent border-t-black" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductVisual({ kind, index = 0 }: { kind: string; index?: number }) {
  if (kind === 'Edibles') {
    return <img src="/images/cat_edibles.webp" className="h-full w-full object-contain pointer-events-none" alt={kind} loading="lazy" />;
  }
  if (kind === 'Capsules') {
    return <img src="/images/cat_capsules.webp" className="h-full w-full object-contain pointer-events-none" alt={kind} loading="lazy" />;
  }
  if (kind === 'Microdose') {
    return <img src="/images/cat_microdose.webp" className="h-full w-full object-contain pointer-events-none" alt={kind} loading="lazy" />;
  }
  return <img src="/images/cat_mushrooms.webp" className="h-full w-full object-contain pointer-events-none" alt={kind} loading="lazy" />;
}
