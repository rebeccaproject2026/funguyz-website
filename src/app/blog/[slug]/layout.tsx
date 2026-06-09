import React from 'react';
import type { Metadata } from 'next';

const seoMap: Record<string, { title: string; description: string; keywords: string }> = {
  "beginner-guide": {
    "title": "Beginner Guide to Mushrooms Canada | FunGuyz",
    "description": "Read the FunGuyz beginner guide for mushroom basics, strain education, product types, delivery options and responsible use.",
    "keywords": "beginner mushroom guide, mushroom education Canada, mushroom strains, responsible use"
  },
  "microdose-guide": {
    "title": "Microdose Guide Canada | Capsules & Blends | FunGuyz",
    "description": "Learn about microdose capsules, blend types, product formats, routines and delivery options with the FunGuyz microdose guide.",
    "keywords": "microdose guide Canada, microdose capsules, microdosing mushrooms, microdose blends"
  },
  "mushroom-strains": {
    "title": "Mushroom Strains Guide Canada | FunGuyz",
    "description": "Compare mushroom strains, potency levels, product formats and delivery options with the FunGuyz strain guide for Canada.",
    "keywords": "mushroom strains Canada, strain guide, Golden Teacher, Penis Envy, mushroom delivery"
  },
  "wellness-articles": {
    "title": "Mushroom Wellness Articles Canada | FunGuyz",
    "description": "Explore mushroom wellness articles covering functional mushrooms, product education, routines and delivery options in Canada.",
    "keywords": "mushroom wellness articles, functional mushrooms Canada, mushroom education, delivery Canada"
  },
  "research-and-studies": {
    "title": "Mushroom Research & Studies Canada | FunGuyz",
    "description": "Explore mushroom research summaries, studies, educational resources and responsible-use topics from FunGuyz Canada.",
    "keywords": "mushroom research, mushroom studies Canada, psilocybin education, responsible use"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = seoMap[slug] || { title: 'FunGuyz', description: '', keywords: '' };
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
