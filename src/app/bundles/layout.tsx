import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Magic Mushroom Bundles Delivery Canada | FunGuyz',
  description: 'Save with mushroom bundles, combo packs and curated product deals. Fast delivery across Toronto, the GTA and Canada-wide shipping.',
  keywords: 'mushroom bundles Canada, mushroom deals, magic mushroom bundles, delivery Canada',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
