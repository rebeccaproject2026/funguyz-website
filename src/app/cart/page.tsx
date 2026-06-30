'use client';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { getProductUrl } from '@/data/products';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Lock,
  RotateCcw,
  Tag,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const { data: prodData } = useSWR('/api/products', fetcher);
  const dbProducts = prodData?.success ? prodData.products : [];

  const baseProducts = dbProducts;

  // Coupon handling logic
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const result = await applyCoupon(couponCode, subtotal);
    if (result.success) {
      setCouponCode('');
      setCouponSuccess(result.message);
    } else {
      setCouponError(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponSuccess('');
    setCouponError('');
  };

  // Calculate pricing metrics
  const isShippingCoupon = appliedCoupon?.type === 'shipping';
  const discountAmount = appliedCoupon && !isShippingCoupon
    ? subtotal * appliedCoupon.discount
    : 0.00;
  const shippingCost = isShippingCoupon ? 0 : 20.00;

  const taxAmount = 0.00; // No tax
  const totalAmount = subtotal - discountAmount + shippingCost + taxAmount;

  return (
    <main className="bg-[#fff8f3] text-[#1b1533] min-h-screen selection:bg-[#ff4fa3] selection:text-white antialiased font-sans">
      <Header />

      {/* WooCommerce Flow Progress */}
      <div className="bg-slate-50 border-b border-slate-100/50 py-6 px-4 md:px-8 select-none font-poppins overflow-x-hidden">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-[#ff4fa3] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/shop" className="hover:text-[#ff4fa3] transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600">Shopping Cart</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-5 text-[11px] sm:text-xs font-black uppercase tracking-widest logo-font">
            <span className="text-[#ff4fa3] flex items-center gap-1.5 border-b-2 border-[#ff4fa3] pb-1">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ff4fa3] text-white text-[10px] px-1.5">1</span>
              Shopping Cart
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-400 flex items-center gap-1.5 pb-1">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-200 text-slate-500 text-[10px] px-1.5">2</span>
              Checkout Details
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-400   flex items-center gap-1.5 pb-1">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-200 text-slate-500 text-[10px] px-1.5">3</span>
              Order Complete
            </span>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <h1 className="text-3xl md:text-4xl font-black uppercase text-[#1b1533] logo-font leading-none tracking-tight mb-8 select-none">
          Your Cart
        </h1>

        {cartItems.length > 0 ? (
          /* Simple Two-Column Layout */
          <div className="grid gap-8 lg:grid-cols-3 items-start">

            {/* Left Column: Product List (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Product List Table Card */}
              <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">

                {/* Desktop Headers */}
                <div className="hidden md:grid grid-cols-12 gap-4 border-b border-slate-100 px-8 py-5 text-[12px] font-black uppercase tracking-widest text-slate-400 select-none">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => {
                    const weightMatch = item.title.match(/\(([^)]+)\)/);
                    const weightTag = weightMatch ? weightMatch[1] : null;
                    const cleanTitle = weightTag ? item.title.replace(/\s*\([^)]+\)/, '') : item.title;

                    const priceNum = parseFloat(item.price.replace('$', ''));
                    const itemSubtotal = priceNum * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-4 px-4 md:px-8 py-6 border-b last:border-b-0 md:border-b-0 group/row"
                      >
                        {/* Image & Details - Desktop / Mobile Wrapper */}
                        <div className="w-full md:col-span-6 flex items-start md:items-center gap-4 relative">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute -left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-300 hover:text-[#ff4fa3] hover:bg-pink-50/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer hidden md:flex items-center justify-center shrink-0 z-10"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 p-1.5 overflow-hidden flex items-center justify-center shrink-0 shadow-sm ml-0 md:ml-6 relative">
                            <Image src={item.imageSrc} alt={item.title} fill sizes="64px" className="object-contain pointer-events-none p-1.5" />
                          </div>

                          <div className="flex-1 flex flex-col text-left min-w-0">
                            <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] leading-none mb-1 font-poppins">{item.category}</span>
                            <h3 className="font-bold text-[#1b1533] text-sm md:text-base leading-snug truncate md:normal-case logo-font hover:text-[#ff4fa3] transition-colors">
                              <Link href={getProductUrl(cleanTitle, item.category)}>
                                {cleanTitle}
                              </Link>
                            </h3>
                            {weightTag && (
                              <span className="inline-flex mt-1 text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md self-start font-poppins">
                                {weightTag}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price - hidden/transformed on Mobile */}
                        <div className="hidden md:block md:col-span-2 text-center">
                          <span className="text-sm font-bold text-slate-600 font-poppins">{item.price}</span>
                        </div>

                        {/* Quantity controls & Remove button row on Mobile, standard on Desktop */}
                        <div className="w-full md:col-span-2 flex items-center justify-between md:justify-center gap-3">
                          <div className="flex items-center border border-slate-200/80 bg-white rounded-xl p-1 shadow-sm h-9 shrink-0 font-poppins">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="grid h-7 w-7 place-items-center rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-[#ff4fa3] transition-all cursor-pointer"
                            >
                              <Minus className="h-3 w-3 stroke-[2.5]" />
                            </button>
                            <span className="text-xs font-black text-[#1b1533] px-3">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="grid h-7 w-7 place-items-center rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-[#ff4fa3] transition-all cursor-pointer"
                            >
                              <Plus className="h-3 w-3 stroke-[2.5]" />
                            </button>
                          </div>

                          {/* Mobile-Only Delete Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex md:hidden items-center justify-center p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Subtotal - Mobile Inline Layout, Desktop standard column */}
                        <div className="w-full md:col-span-2 flex md:block items-center justify-between border-t border-slate-100 md:border-t-0 pt-3 md:pt-0 mt-1 md:mt-0 text-right">
                          <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest md:hidden">Price / Subtotal</span>
                          <span className="text-sm font-black text-[#1b1533] logo-font">
                            <span className="md:hidden text-slate-400 font-semibold mr-2">({item.quantity} × {item.price})</span>
                            ${itemSubtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Row controls */}
                <div className="bg-slate-50/50 px-6 md:px-8 py-5 border-t border-slate-100 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 font-poppins">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1 sm:w-56">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="w-full pl-9 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white outline-none focus:border-[#ff4fa3] focus:ring-2 focus:ring-pink-50/50 transition-all text-[#1b1533] uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl bg-[#1b1533] hover:bg-[#ff4fa3] text-white px-5 py-2.5 text-[12px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer logo-font shrink-0"
                    >
                      Apply Coupon
                    </button>
                  </form>

                  <button
                    onClick={clearCart}
                    className="rounded-xl border border-slate-200 hover:border-[#ff4fa3] hover:text-[#ff4fa3] bg-white px-5 py-2.5 text-[12px] font-black uppercase tracking-wider text-slate-500 shadow-sm transition-all duration-200 cursor-pointer logo-font flex items-center justify-center gap-1.5 self-end md:self-auto"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Clear Cart
                  </button>
                </div>
              </div>

              {/* Alerts */}
              {couponError && (
                <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4 text-xs font-semibold text-red-600 flex items-center gap-2.5 animate-fade-in font-poppins">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-500" />
                  <span>{couponError}</span>
                </div>
              )}

              {couponSuccess && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs font-semibold text-emerald-700 flex items-center gap-2.5 animate-fade-in font-poppins">
                  <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-600" />
                  <span>{couponSuccess}</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs font-semibold text-emerald-700 flex items-center justify-between gap-2.5 animate-fade-in font-poppins">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied! {appliedCoupon.label}</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-[12px] font-black uppercase tracking-wider text-emerald-800 hover:underline cursor-pointer ml-4"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Cart Totals (1/3 width) */}
            <div className="lg:col-span-1">

              {/* Structured Totals Card */}
              <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#1b1533] logo-font border-b border-slate-100 pb-4 select-none">
                  Cart Totals
                </h3>

                <div className="space-y-4 text-xs font-semibold font-poppins">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Subtotal</span>
                    <strong className="text-sm font-bold text-[#1b1533] font-poppins">${subtotal.toFixed(2)}</strong>
                  </div>

                  {/* Discount */}
                  {appliedCoupon && !isShippingCoupon && (
                    <div className="flex justify-between items-center text-emerald-600 bg-emerald-50/50 px-3 py-2.5 rounded-xl border border-emerald-100/50">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" /> Discount ({appliedCoupon.label})
                      </span>
                      <strong className="text-sm font-bold">-${discountAmount.toFixed(2)}</strong>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Shipping</span>
                    {isShippingCoupon ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-black text-sm">
                        <Tag className="h-3.5 w-3.5" /> FREE
                      </span>
                    ) : (
                      <strong className="text-sm font-bold text-[#ff4fa3]">$20.00 Flat Rate</strong>
                    )}
                  </div>
                  {/* Total */}
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline select-none">
                    <span className="text-sm font-black uppercase text-[#1b1533] logo-font">Total</span>
                    <strong className="text-2xl font-black text-[#ff4fa3] logo-font">${totalAmount.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font text-center"
                >
                  <ShieldCheck className="h-4.5 w-4.5" /> Proceed to Checkout
                </Link>

                {/* Assurance Badges */}
                <div className="flex items-center justify-center gap-2 text-[12px] text-slate-400 font-bold uppercase tracking-wider select-none font-poppins pt-2">
                  <Lock className="h-3.5 w-3.5 text-slate-300" />
                  <span>Secure 256-bit SSL Checkout</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty state catalog up-sell */
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm text-center flex flex-col items-center justify-center gap-6 relative overflow-hidden animate-fade-in select-none">
              <div className="absolute left-[30%] top-[-20%] w-[300px] h-[300px] rounded-full bg-[#ff4fa3]/5 blur-[90px] pointer-events-none" />
              <div className="absolute right-[30%] bottom-[-20%] w-[300px] h-[300px] rounded-full bg-[#7b5cff]/5 blur-[90px] pointer-events-none" />

              <div className="h-20 w-20 rounded-[30px] bg-pink-50/60 border border-pink-100/80 flex items-center justify-center text-[#ff4fa3] shadow-sm animate-float z-10">
                <ShoppingBag className="h-9 w-9 stroke-[1.8]" />
              </div>

              <div className="space-y-2 z-10">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-[#1b1533] logo-font leading-none">
                  Your Shopping Cart is Empty
                </h2>
                <p className="text-xs md:text-sm font-semibold text-slate-400 max-w-sm mx-auto leading-relaxed font-poppins">
                  Choose from our premium adaptations, gummies, and clinical strains to elevate your wellness journey.
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-2xl bg-[#ff4fa3] text-white border border-[#ff4fa3] px-10 py-4 text-xs font-black uppercase tracking-wider shadow-md shadow-pink-100 transition-all duration-300 hover:bg-black hover:text-[#ff4fa3] hover:border-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer gap-2 logo-font z-10"
              >
                Browse Our Shop <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col gap-1.5 text-center sm:text-left select-none">
                <span className="text-[12px] font-black uppercase tracking-widest text-[#ff4fa3] logo-font leading-none">Curated Discovery</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-[#1b1533] logo-font leading-none">Popular E-Commerce Formulations</h3>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {baseProducts.slice(0, 4).map((p: any, i: any) => (
                  <ProductCard key={p._id || p[0]} p={p} i={i} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
