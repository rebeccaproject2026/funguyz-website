import React from 'react';
import type { Metadata } from 'next';

const categorySeoData: Record<string, { title: string; description: string; keywords: string }> = {
  'magic-mushrooms': {
    title: 'Magic Mushroom Delivery Canada | Premium Strains | FunGuyz',
    description: 'Browse premium magic mushroom strains with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'magic mushroom delivery, mushroom delivery Canada, psilocybin mushrooms Canada, mushroom strains, FunGuyz'
  },
  'edibles': {
    title: 'Mushroom Edibles Delivery Canada | FunGuyz',
    description: 'Shop mushroom chocolates, gummies and infused edibles with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'mushroom edibles Canada, mushroom chocolate delivery, mushroom gummies Canada, edible delivery Canada'
  },
  'capsules': {
    title: 'Mushroom Capsules Delivery Canada | FunGuyz',
    description: 'Shop mushroom capsules, extracts and tinctures with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'mushroom capsules Canada, functional mushroom capsules, mushroom extracts, mushroom tinctures'
  },
  'microdose': {
    title: 'Microdose Capsules Delivery Canada | FunGuyz',
    description: 'Browse microdose capsules and blends with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'microdose capsules Canada, microdose delivery Canada, mushroom microdose, microdosing Canada'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = categorySeoData[slug.toLowerCase()] || {
    title: 'FunGuyz | Magic Mushroom Delivery Toronto & Canada',
    description: 'Shop premium magic mushrooms with fast delivery in Toronto, Mississauga, Brampton and the GTA.',
    keywords: 'magic mushrooms, funguyz'
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

export default function CategorySlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
