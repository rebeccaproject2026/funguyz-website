'use client';
import Link from 'next/link';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingBag, Heart, X, Trash2, Plus, Minus, ArrowRight, Check, ShoppingCart } from 'lucide-react';
import { useAuth } from './AuthContext';
import { imageMap, getFallbackImage } from '@/data/imageMap';

interface CartItem {
  id: string;
  title: string;
  category: string;
  price: string;
  quantity: number;
  imageSrc: string;
}

interface WishlistItem {
  id: string; // The database _id
  title: string;
  category: string;
  price: string;
  imageSrc: string;
  slug?: string;
}

interface ToastState {
  visible: boolean;
  productTitle: string;
  productImage: string;
  productPrice: string;
  type: 'cart' | 'wishlist' | 'remove_wishlist';
}

interface AppliedCoupon {
  code: string;
  discount: number;
  label: string;
  type: 'percent' | 'shipping';
  minOrder?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (product: { title: string; category: string; price: string; imageSrc: string }, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  totalQuantity: number;
  totalWishlistQuantity: number;
  subtotal: number;
  // Coupon
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string, currentSubtotal?: number) => { success: boolean; message: string };
  removeCoupon: () => void;
  VALID_COUPONS: Record<string, { discount: number; label: string; type: 'percent' | 'shipping'; minOrder?: number }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Valid coupon codes — single source of truth (must match /coupons page)
const VALID_COUPONS: Record<string, { discount: number; label: string; type: 'percent' | 'shipping'; minOrder?: number }> = {
  'LAUNCH20':    { discount: 0.20, label: '20% Off',       type: 'percent'  },
  'BULK25':      { discount: 0.25, label: '25% Off',       type: 'percent',  minOrder: 500  },
  'FREESHIP200': { discount: 0,    label: 'Free Delivery & Free Shipping',  type: 'shipping', minOrder: 200  },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    productTitle: '',
    productImage: '',
    productPrice: '',
    type: 'cart',
  });
  const { isLoggedIn, currentUser } = useAuth();

  // Local Storage & DB Persistence for Wishlist
  useEffect(() => {
    const hydrateWishlist = async () => {
      let idsToHydrate: string[] = [];

      if (isLoggedIn && currentUser) {
        // Fetch from backend
        try {
          const res = await fetch('/api/wishlist');
          if (res.ok) {
            const data = await res.json();
            idsToHydrate = (data.wishlist || []).map((item: any) => typeof item === 'object' ? item._id : item);
            
            // Merge logic: check if local storage has items not in DB
            const storedWish = localStorage.getItem('funguyz_wishlist');
            if (storedWish) {
              const localIds = JSON.parse(storedWish) as string[];
              if (localIds.length > 0) {
                // Merge
                await fetch('/api/wishlist', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ productIds: localIds })
                });
                localStorage.removeItem('funguyz_wishlist'); // clear after merge
                // Re-fetch after merge
                const newRes = await fetch('/api/wishlist');
                const newData = await newRes.json();
                idsToHydrate = (newData.wishlist || []).map((item: any) => typeof item === 'object' ? item._id : item);
              }
            }
          }
        } catch (e) {
          console.error('Failed to fetch wishlist', e);
        }
      } else {
        // Not logged in, read from local storage
        if (typeof window !== 'undefined') {
          const storedWish = localStorage.getItem('funguyz_wishlist');
          if (storedWish) {
            try { 
              idsToHydrate = JSON.parse(storedWish) as string[];
            } catch (e) { console.error(e); }
          }
        }
      }

      // Read from global product cache or API to hydrate full objects
      const cachedString = sessionStorage.getItem('globalRelatedProducts');
      if (cachedString) {
         const allProducts = JSON.parse(cachedString);
         const hydratedItems = idsToHydrate.map(id => {
           const found = allProducts.find((p: any) => p._id === id || p.title === id || p.name === id);
           const title = found ? (found.title || found.name) : id;
           const categoryName = found ? (found.category?.name || 'Category') : 'Magic Mushrooms';
           const imageSrc = imageMap[title] || getFallbackImage(categoryName);
           
           if (found) {
             return {
               id: found._id || id, // Prefer true _id if found, fallback to stored id
               title: title,
               category: categoryName,
               price: typeof found.price === 'number' ? `$${found.price.toFixed(2)}` : found.price,
               imageSrc: imageSrc,
               slug: found.slug
             };
           }
           // If not found in cache, we can't fully hydrate, but we should NOT drop it!
           // Let's return a dummy object just so isWishlisted still works.
           return {
             id: id,
             title: title,
             category: categoryName,
             price: '$0.00',
             imageSrc: imageSrc
           };
         }) as WishlistItem[];
         setWishlistItems(hydratedItems);
      } else {
         // If global cache isn't ready yet, at least hydrate the IDs so isWishlisted works!
         // We can still try to use the imageMap if the id happens to be the title!
         const basicItems = idsToHydrate.map(id => {
             const imageSrc = imageMap[id] || getFallbackImage('Magic Mushrooms');
             return {
               id: id,
               title: id,
               category: 'Magic Mushrooms', // We don't know the real category
               price: '$0.00',
               imageSrc: imageSrc
             };
         });
         setWishlistItems(basicItems);
      }
    };

    hydrateWishlist();
  }, [isLoggedIn, currentUser]);

  // Local Storage Persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('funguyz_cart');
      if (storedCart) {
        try { setCartItems(JSON.parse(storedCart)); } catch (e) { console.error(e); }
      }
      const storedCoupon = localStorage.getItem('funguyz_coupon');
      if (storedCoupon) {
        try { setAppliedCoupon(JSON.parse(storedCoupon)); } catch (e) { console.error(e); }
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    if (typeof window !== 'undefined') {
      localStorage.setItem('funguyz_cart', JSON.stringify(items));
    }
  };

  const saveWishlist = (items: WishlistItem[]) => {
    setWishlistItems(items);
    if (!isLoggedIn && typeof window !== 'undefined') {
      const ids = items.map(i => i.id);
      localStorage.setItem('funguyz_wishlist', JSON.stringify(ids));
    }
  };

  const addToCart = (product: { title: string; category: string; price: string; imageSrc: string }, qty: number = 1) => {
    const existing = cartItems.find(item => item.id === product.title);
    let newItems: CartItem[] = [];
    
    if (existing) {
      newItems = cartItems.map(item =>
        item.id === product.title ? { ...item, quantity: item.quantity + qty } : item
      );
    } else {
      newItems = [
        ...cartItems,
        {
          id: product.title,
          title: product.title,
          category: product.category,
          price: product.price,
          quantity: qty,
          imageSrc: product.imageSrc,
        },
      ];
    }

    saveCart(newItems);

    // Fire Bottom-Right Toast notification
    setToast({
      visible: true,
      productTitle: product.title,
      productImage: product.imageSrc,
      productPrice: product.price,
      type: 'cart',
    });
  };

  const removeFromCart = (id: string) => {
    const newItems = cartItems.filter(item => item.id !== id);
    saveCart(newItems);
  };

  const updateQuantity = (id: string, delta: number) => {
    const newItems = cartItems
      .map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);
    
    saveCart(newItems);
  };

  const clearCart = () => {
    saveCart([]);
    // Also clear coupon on order completion
    setAppliedCoupon(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('funguyz_coupon');
    }
  };

  const applyCoupon = (code: string, currentSubtotal?: number): { success: boolean; message: string } => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return { success: false, message: 'Please enter a coupon code.' };
    if (VALID_COUPONS[normalized]) {
      const couponDef = VALID_COUPONS[normalized];
      // Check minimum order requirement
      if (couponDef.minOrder && (currentSubtotal ?? subtotal) < couponDef.minOrder) {
        return { success: false, message: `This coupon requires a minimum order of $${couponDef.minOrder}. Your current subtotal is $${(currentSubtotal ?? subtotal).toFixed(2)}.` };
      }
      const coupon: AppliedCoupon = { code: normalized, ...couponDef };
      setAppliedCoupon(coupon);
      if (typeof window !== 'undefined') {
        localStorage.setItem('funguyz_coupon', JSON.stringify(coupon));
      }
      return { success: true, message: `Coupon "${normalized}" applied — ${couponDef.label}!` };
    }
    return { success: false, message: 'Invalid coupon code. Please try again.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('funguyz_coupon');
    }
  };

  const getTrueId = (idOrTitle: string) => {
    if (/^[0-9a-fA-F]{24}$/.test(idOrTitle)) return idOrTitle;
    if (typeof window !== 'undefined') {
       const cachedString = sessionStorage.getItem('globalRelatedProducts');
       if (cachedString) {
          try {
             const allProducts = JSON.parse(cachedString);
             const found = allProducts.find((p: any) => p.title === idOrTitle || p.name === idOrTitle);
             if (found) return found._id;
          } catch(e) {}
       }
    }
    return idOrTitle;
  };

  // Toggle Wishlist handler
  const toggleWishlist = async (product: WishlistItem) => {
    const trueId = getTrueId(product.id);
    product.id = trueId; // overwrite with true id
    
    const isPresent = wishlistItems.some(item => item.id === trueId || item.title === product.title);
    let newItems: WishlistItem[];
    if (isPresent) {
      newItems = wishlistItems.filter(item => item.id !== trueId && item.title !== product.title);
      saveWishlist(newItems);
      if (isLoggedIn && /^[0-9a-fA-F]{24}$/.test(trueId)) {
         fetch(`/api/wishlist?productId=${trueId}`, { method: 'DELETE' }).catch(console.error);
      }
      setToast({
        visible: true,
        productTitle: product.title,
        productImage: product.imageSrc,
        productPrice: product.price,
        type: 'remove_wishlist',
      });
    } else {
      newItems = [...wishlistItems, product];
      saveWishlist(newItems);
      if (isLoggedIn && /^[0-9a-fA-F]{24}$/.test(trueId)) {
         fetch('/api/wishlist', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ productId: trueId })
         }).catch(console.error);
      }
      setToast({
        visible: true,
        productTitle: product.title,
        productImage: product.imageSrc,
        productPrice: product.price,
        type: 'wishlist',
      });
    }
  };

  const removeFromWishlist = (id: string) => {
    const trueId = getTrueId(id);
    const newItems = wishlistItems.filter(item => item.id !== trueId && item.title !== id);
    saveWishlist(newItems);
    if (isLoggedIn && /^[0-9a-fA-F]{24}$/.test(trueId)) {
       fetch(`/api/wishlist?productId=${trueId}`, { method: 'DELETE' }).catch(console.error);
    }
  };

  const isWishlisted = (id: string) => {
    const trueId = getTrueId(id);
    return wishlistItems.some(item => item.id === trueId || item.title === id);
  };

  // Toast Auto-Hide after 5 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, toast.productTitle]);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistQuantity = wishlistItems.length;
  
  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace('$', ''));
    return acc + numericPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        totalQuantity,
        totalWishlistQuantity,
        subtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        VALID_COUPONS,
      }}
    >
      {children}

      {/* 1. WooCommerce-style slide-out Cart Sidebar Drawer */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-[440px] bg-[#fff8f3] shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out z-[10000] translate-x-0 animate-slide-in-right border-l border-pink-100/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-pink-100/40 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black uppercase tracking-tight text-[#1b1533] logo-font">YOUR CART</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">({totalQuantity} Items added)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 text-slate-400 hover:bg-[#ff4fa3] hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable items) */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scrollbar-none">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="group/cart bg-white p-4 rounded-3xl border border-slate-100/80 shadow-[0_4px_20px_rgba(27,21,51,0.01)] flex gap-4 items-center relative hover:shadow-[0_10px_25px_rgba(123,92,255,0.03)] transition-all duration-300">
                    
                    {/* Item Image Container */}
                    <div className="h-20 w-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-0 overflow-hidden shrink-0 relative">
                      <img src={item.imageSrc} alt={item.title} className="h-full w-full object-contain" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff4fa3] leading-none">{item.category}</span>
                      <h4 className="text-[13px] font-bold text-[#1b1533] leading-tight truncate logo-font">{item.title}</h4>
                      <span className="text-xs font-black text-[#1b1533]/90">{item.price}</span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-1 py-0.5">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-lg text-slate-400 hover:bg-white hover:text-[#1b1533] transition-all cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-black text-[#1b1533] px-2.5 min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-lg text-slate-400 hover:bg-white hover:text-[#ff4fa3] transition-all cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Icon Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#ff4fa3]/10 hover:text-[#ff4fa3] transition-all duration-200 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
                  <div className="h-16 w-16 rounded-full bg-slate-50 border flex items-center justify-center text-slate-300">
                    🛒
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#1b1533] logo-font">Your cart is empty</h4>
                    <p className="text-xs text-slate-400 max-w-[240px] mt-1">Add premium organic formulations from our catalog to get started.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      if (typeof window !== 'undefined') {
                        window.location.href = '/shop';
                      }
                    }}
                    className="mt-2 rounded-2xl bg-[#ff4fa3] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-pink-100 hover:bg-black transition-all duration-300 cursor-pointer logo-font"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-pink-100/40 bg-white shadow-[0_-8px_30px_rgba(27,21,51,0.02)]">
                {/* Pricing Summary */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Shipping</span>
                    <span className="text-[#ff4fa3] font-black">$20.00 FLAT RATE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase tracking-tight text-[#1b1533] logo-font">Subtotal</span>
                    <span className="text-xl font-black text-[#ff4fa3] logo-font">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA Links */}
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font"
                  >
                    Proceed to Checkout <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                  <Link 
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-white text-slate-700 border border-slate-200 py-3.5 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:bg-slate-50 hover:text-[#1b1533] hover:border-slate-300 cursor-pointer logo-font"
                  >
                    View Shopping Cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. WooCommerce-style slide-out Wishlist Sidebar Drawer */}
      {isWishlistOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsWishlistOpen(false)}
        >
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-[440px] bg-[#fff8f3] shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out z-[10000] translate-x-0 animate-slide-in-right border-l border-pink-100/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-pink-100/40 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff4fa3]">
                  <Heart className="h-5 w-5 fill-[#ff4fa3] text-[#ff4fa3]" />
                </div>
                <div>
                  <h2 className="text-lg font-black uppercase tracking-tight text-[#1b1533] logo-font">YOUR WISHLIST</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">({totalWishlistQuantity} Items saved)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 text-slate-400 hover:bg-[#ff4fa3] hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable wishlist items) */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scrollbar-none">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => (
                  <div key={item.id} className="group/cart bg-white p-4 rounded-3xl border border-slate-100/80 shadow-[0_4px_20px_rgba(27,21,51,0.01)] flex gap-4 items-center relative hover:shadow-[0_10px_25px_rgba(123,92,255,0.03)] transition-all duration-300">
                    
                    {/* Item Image Container */}
                    <div className="h-20 w-16 rounded-xl bg-slate-100/50 border border-slate-100 flex items-center justify-center p-0 overflow-hidden shrink-0 relative">
                      <img src={item.imageSrc} alt={item.title} className="h-full w-full object-cover" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400 leading-none">{item.category}</span>
                      <h4 className="text-[13px] font-bold text-[#1b1533] leading-tight truncate logo-font">{item.title}</h4>
                      <span className="text-xs font-black text-[#1b1533]/90">{item.price}</span>

                      {/* Direct Add to Cart Action */}
                      <button 
                        onClick={() => {
                          addToCart({ title: item.title, category: item.category, price: item.price, imageSrc: item.imageSrc });
                          removeFromWishlist(item.id);
                          setIsWishlistOpen(false);
                          setIsCartOpen(true);
                        }}
                        className="mt-1.5 px-3.5 py-2 bg-[#ff4fa3] text-white border border-[#ff4fa3] rounded-xl text-[12px] font-black uppercase tracking-wider shadow-sm transition-all hover:bg-black hover:text-[#ff4fa3] hover:border-black flex items-center gap-1.5 self-start cursor-pointer logo-font"
                      >
                        <ShoppingCart className="h-3 w-3" /> Add to Cart
                      </button>
                    </div>

                    {/* Delete Icon Button */}
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#ff4fa3]/10 hover:text-[#ff4fa3] transition-all duration-200 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
                  <div className="h-16 w-16 rounded-full bg-slate-50 border flex items-center justify-center text-slate-300">
                    💖
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#1b1533] logo-font">Your wishlist is empty</h4>
                    <p className="text-xs text-slate-400 max-w-[240px] mt-1">Tap the heart icons on products you love to build your collection.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsWishlistOpen(false);
                      if (typeof window !== 'undefined') {
                        window.location.href = '/shop';
                      }
                    }}
                    className="mt-2 rounded-2xl bg-[#ff4fa3] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-pink-100 hover:bg-black transition-all duration-300 cursor-pointer logo-font"
                  >
                    Start Browsing
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {wishlistItems.length > 0 && (
              <div className="p-6 border-t border-pink-100/40 bg-white">
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-white text-slate-700 border border-slate-200 py-4 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:bg-slate-50 hover:text-[#1b1533] hover:border-slate-300 cursor-pointer logo-font"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Premium Bottom-Right Slide-in Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-[99999] max-w-sm w-full bg-white border border-slate-100/90 rounded-[28px] p-4 shadow-[0_20px_50px_rgba(27,21,51,0.12)] flex gap-4 items-center justify-between translate-y-0 opacity-100 transition-all duration-300 animate-slide-in-up overflow-hidden">
          
          {/* Toast Image */}
          <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-0 shrink-0 relative overflow-hidden">
            <img src={toast.productImage} alt={toast.productTitle} className="h-full w-full object-contain" />
          </div>

          {/* Toast Content Details */}
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <span className="inline-flex items-center gap-1 text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] leading-none">
              <Check className="h-3 w-3 stroke-[3]" /> 
              {toast.type === 'cart' ? 'Added to Cart! 🛒' : toast.type === 'wishlist' ? 'Added to Wishlist! 💖' : 'Removed from Wishlist!'}
            </span>
            <h4 className="text-[12.5px] font-bold text-[#1b1533] leading-tight truncate logo-font mt-0.5">{toast.productTitle}</h4>
            <span className="text-[12px] font-black text-slate-400">{toast.productPrice}</span>
          </div>

          {/* WooCommerce-Style "View" Button inside Toast! */}
          {toast.type !== 'remove_wishlist' && (
            <a 
              href={toast.type === 'cart' ? '/cart' : '#'}
              onClick={(e) => {
                if (toast.type === 'wishlist') {
                  e.preventDefault();
                  setToast(prev => ({ ...prev, visible: false }));
                  setIsWishlistOpen(true);
                }
              }}
              className="px-3 py-1.5 bg-[#ff4fa3] text-white hover:bg-black hover:text-[#ff4fa3] border border-[#ff4fa3] hover:border-black transition-all rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0 logo-font cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              View {toast.type === 'cart' ? 'Cart' : 'List'}
            </a>
          )}

          {/* Close Toast button */}
          <button 
            onClick={() => setToast(prev => ({ ...prev, visible: false }))}
            className="p-1 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-black transition-all cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Animating Countdown Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
            <div 
              className={`h-full bg-gradient-to-r ${toast.type === 'remove_wishlist' ? 'from-slate-400 to-slate-500' : 'from-[#ff4fa3] to-[#7b5cff]'} animate-toast-progress`} 
              style={{ animationDuration: '5s' }}
            />
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
