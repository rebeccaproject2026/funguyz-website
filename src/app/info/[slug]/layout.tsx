import React from 'react';

const infoPages = [
  'shipping-policy',
  'payment-methods',
  'returns-and-refunds',
  'cookie-policy',
  'privacy-policy',
  'responsible-use',
  'legal-disclaimer',
  'age-verification',
  'terms-and-conditions'
];

export function generateStaticParams() {
  return infoPages.map((slug) => ({ slug }));
}

export default function InfoSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
