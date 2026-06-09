import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Magic Mushrooms Online Canada | FunGuyz',
  description: 'Shop mushrooms, edibles, capsules and microdose products with fast delivery across Toronto, the GTA and Canada-wide shipping.',
  keywords: 'shop magic mushrooms Canada, mushroom delivery Canada, buy mushrooms online, FunGuyz shop',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
