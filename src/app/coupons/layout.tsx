import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Magic Mushroom Coupons Canada | Deals & Delivery | FunGuyz',
  description: 'Find mushroom coupons, product deals and delivery offers for FunGuyz shoppers across Toronto, the GTA and Canada.',
  keywords: 'mushroom coupons Canada, mushroom deals, mushroom delivery offers, FunGuyz coupons',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
