import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Magic Mushroom FAQ Canada | Delivery & Orders | FunGuyz',
  description: 'Find answers about mushroom delivery, shipping, payments, orders, products and customer support across Canada.',
  keywords: 'mushroom FAQ, mushroom delivery questions, FunGuyz support, shipping questions',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
