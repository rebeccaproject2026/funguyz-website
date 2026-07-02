import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package, Truck, CheckCircle2, MapPin, RefreshCcw } from 'lucide-react';
import { OrderRecord, FunguyzUser } from '@/context/AuthContext';

interface OrderDetailViewProps {
  order: OrderRecord;
  currentUser: FunguyzUser | null;
  onClose: () => void;
}

export function OrderDetailView({ order, currentUser, onClose }: OrderDetailViewProps) {
  const timelineSteps = [
    { id: 'placed', label: 'Order Placed', icon: CheckCircle2, date: order.date },
    { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle2, date: order.date },
    { id: 'processing', label: 'Order Processed', icon: Package, date: order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? order.date : 'Pending' },
    { id: 'shipped', label: 'Shipped', icon: Truck, date: order.status === 'shipped' || order.status === 'delivered' ? order.date : 'Pending' },
    { id: 'delivered', label: 'Delivered', icon: Package, date: order.status === 'delivered' ? order.date : 'Pending' }
  ];

  let currentStepIndex = 1; // placed, confirmed
  if (order.status === 'processing') currentStepIndex = 2;
  if (order.status === 'shipped') currentStepIndex = 3;
  if (order.status === 'delivered') currentStepIndex = 4;
  if (order.status === 'cancelled') currentStepIndex = -1;

  // Calculate pricing breakdown dynamically
  const parsedGrandTotal = parseFloat(order.grandTotal.replace(/[^0-9.]/g, '')) || 0;
  const itemSubtotal = order.items?.reduce((acc, item: any) => {
    const rawPrice = item.priceAtPurchase !== undefined ? item.priceAtPurchase : item.price;
    const priceNum = typeof rawPrice === 'number' ? rawPrice : parseFloat(String(rawPrice || '0').replace(/[^0-9.]/g, ''));
    return acc + (priceNum * (item.quantity || 1));
  }, 0) || 0;

  const estimatedShipping = parsedGrandTotal - itemSubtotal;

  let shippingDisplay = 'FREE';
  let discountDisplay: string | null = null;

  if (estimatedShipping > 0) {
    shippingDisplay = `$${estimatedShipping.toFixed(2)}`;
  } else if (estimatedShipping < -0.05) {
    discountDisplay = `-$${Math.abs(estimatedShipping).toFixed(2)}`;
  }

  const totalItemsCount = order.items?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#fffdfb]">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-[#ff4fa3] hover:bg-pink-50 transition-colors">
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          <div>
            <h2 className="text-lg font-black text-[#1b1533] uppercase logo-font tracking-wide">
              {order.orderId}
            </h2>
            <p className="text-[12px] font-semibold text-slate-400 mt-0.5">Placed on {order.date}</p>
          </div>
        </div>
        <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm ${order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
          order.status === 'cancelled' ? 'bg-red-500/10 text-red-600 border border-red-500/20' :
            'bg-amber-500/10 text-amber-600 border border-amber-500/20'
          }`}>
          {order.status}
        </span>
      </div>

      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-[#fffcfb]">

        {/* Timeline Section */}
        {order.status !== 'cancelled' && (
          <div className="border border-slate-100 rounded-3xl p-6 bg-white shadow-sm">
            <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font mb-8">Order Timeline</h3>
            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="relative min-w-[600px] px-2">
                <div className="absolute top-5 left-[5%] right-[5%] h-1 bg-slate-100 z-0 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ff4fa3] transition-all duration-1000" style={{ width: currentStepIndex === 0 ? '0%' : currentStepIndex === 1 ? '25%' : currentStepIndex === 2 ? '50%' : currentStepIndex === 3 ? '75%' : '100%' }}></div>
                </div>

                <div className="flex justify-between relative z-10 w-full">
                {timelineSteps.map((step, idx) => {
                  const isCompleted = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;
                  return (
                    <div key={step.id} className="flex flex-col items-center w-24 text-center gap-2 bg-white pt-1">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 bg-white ${isCompleted ? 'border-[#ff4fa3] text-[#ff4fa3] shadow-md shadow-pink-100/50' : 'border-slate-200 text-slate-300'}`}>
                        <step.icon className={`h-5 w-5 ${isCompleted && !isCurrent ? 'fill-[#ff4fa3] text-white' : ''}`} />
                      </div>
                      <div>
                        <span className={`block text-[10px] font-black uppercase  mb-1 ${isCurrent ? 'text-[#ff4fa3]' : isCompleted ? 'text-[#1b1533]' : 'text-slate-400'}`}>{step.label}</span>
                        <span className="block text-[10px] font-semibold text-slate-400 leading-tight">{step.date}</span>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Details Section */}
        <div className="border border-slate-100 rounded-3xl bg-white shadow-sm flex flex-col p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font">Order Details</h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{totalItemsCount} Items Total</span>
          </div>

          <div className="space-y-4">
            {order.items?.map((item: any, idx) => {
              const rawPrice = item.priceAtPurchase !== undefined ? item.priceAtPurchase : item.price;
              const formattedPrice = rawPrice !== undefined && rawPrice !== null && rawPrice !== ''
                ? (typeof rawPrice === 'number'
                  ? `$${rawPrice.toFixed(2)}`
                  : (String(rawPrice).startsWith('$') ? rawPrice : `$${rawPrice}`))
                : 'N/A';

              return (
                <div key={idx} className="flex items-center gap-5 p-4 rounded-2xl bg-[#faf9f8] border border-slate-100 hover:border-[#ff4fa3]/20 transition-colors">
                  <div className="h-20 w-20 shrink-0 rounded-xl bg-black overflow-hidden relative shadow-sm">
                    <img src={item.imageSrc || '/images/placeholder.webp'} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="font-bold text-[#1b1533] text-sm truncate">{item.title}</p>
                    {item.category && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-2">{item.category}</p>}
                    <div>
                      <span className="inline-block bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        QTY: {item.quantity || 1}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 self-start pt-1">
                    <p className="font-black text-[#1b1533] text-sm">{formattedPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <div className="flex justify-between text-sm font-bold text-slate-500">
              <span>Subtotal</span>
              <span className="text-[#1b1533]">${itemSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-500 pb-4 border-b border-slate-100">
              <span>Shipping</span>
              <span className={shippingDisplay === 'FREE' ? 'text-emerald-500' : 'text-[#1b1533]'}>{shippingDisplay}</span>
            </div>
            {discountDisplay && (
              <div className="flex justify-between text-sm font-bold text-emerald-500 pb-4 border-b border-slate-100">
                <span>Discount / Coupon</span>
                <span>{discountDisplay}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1">
              <span className="text-base font-black text-[#1b1533] uppercase logo-font">Total</span>
              <span className="text-xl font-black text-[#ff4fa3]">{order.grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Address and Tracking Footer */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-slate-100 rounded-3xl p-6 bg-white shadow-sm">
            <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-[#ff4fa3]" /> Shipping Address
            </h3>
            {currentUser?.addresses?.[0] ? (
              <div>
                <p className="font-bold text-[#1b1533] text-sm mb-3">
                  {currentUser.addresses[0].firstName || currentUser.firstName} {currentUser.addresses[0].lastName || currentUser.lastName}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {currentUser.addresses[0].street} {currentUser.addresses[0].city} <br />
                  {currentUser.addresses[0].postalCode} {currentUser.addresses[0].province}
                </p>
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-1 text-xs font-semibold text-slate-500">
                  <p>Phone: <span className="text-[#1b1533]">{currentUser.phone || 'N/A'}</span></p>
                  <p>Email: <span className="text-[#1b1533]">{currentUser.email}</span></p>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-sm font-semibold">Address details unavailable.</p>
            )}
          </div>

          <div className="border border-slate-100 rounded-3xl p-6 bg-white shadow-sm flex flex-col justify-center text-center">
            <h3 className="text-sm font-black text-[#1b1533] uppercase logo-font flex items-center justify-center gap-2 mb-3">
              <Package className="h-4 w-4 text-[#ff4fa3]" /> Need Help?
            </h3>
            <p className="text-[12px] font-semibold text-slate-500 mb-5 leading-relaxed">
              Have an issue with your order? Our support team is here to help you out.
            </p>
            <a href="mailto:hello@funguyzdelivery.ca" className="inline-flex justify-center w-full py-3.5 rounded-2xl bg-slate-50 text-[#1b1533] border border-slate-200 text-xs font-black uppercase tracking-wider shadow-sm hover:bg-[#1b1533] hover:text-white hover:border-[#1b1533] transition-all duration-300">
              Contact Support
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
