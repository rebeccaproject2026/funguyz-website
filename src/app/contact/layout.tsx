import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact FunGuyz | Mushroom Delivery Support Canada',
  description: 'Contact FunGuyz for order help, delivery updates, shipping questions and customer support across Canada.',
  keywords: 'contact FunGuyz, mushroom delivery support, order support Canada, shipping help',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
