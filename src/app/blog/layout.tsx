import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Magic Mushroom Blog Canada | Guides & Delivery Tips | FunGuyz',
  description: 'Read FunGuyz guides on mushroom strains, microdosing, edibles, wellness topics, delivery tips and responsible use in Canada.',
  keywords: 'magic mushroom blog Canada, mushroom guides, microdose guide, mushroom delivery tips',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
