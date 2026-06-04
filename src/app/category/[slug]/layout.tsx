import React from 'react';

const categories = [
  'magic-mushrooms',
  'edibles',
  'capsules',
  'microdose'
];

export function generateStaticParams() {
  return categories.map((slug) => ({
    slug,
  }));
}

export default function CategorySlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
