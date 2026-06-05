import React from 'react';

const blogPostsData = [
  { slug: 'the-art-of-microdosing-a-beginners-guide' },
  { slug: 'psilocybin-and-neuroplasticity-the-science' },
  { slug: 'setting-your-intentions-psychedelic-journeys' },
  { slug: 'integrating-your-psychedelic-experience' }
];


export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
