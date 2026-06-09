import { Metadata } from 'next';
import BlogDetailsClient from './BlogDetailsClient';

const seoMap: Record<string, { title: string; description: string; keywords: string }> = {
  "beginner-guide": {
    title: "Beginner Guide to Mushrooms Canada | FunGuyz",
    description: "Read the FunGuyz beginner guide for mushroom basics, strain education, product types, delivery options and responsible use.",
    keywords: "beginner mushroom guide, mushroom education Canada, mushroom strains, responsible use"
  },
  "microdose-guide": {
    title: "Microdose Guide Canada | Capsules & Blends | FunGuyz",
    description: "Learn about microdose capsules, blend types, product formats, routines and delivery options with the FunGuyz microdose guide.",
    keywords: "microdose guide Canada, microdose capsules, microdosing mushrooms, microdose blends"
  },
  "mushroom-strains": {
    title: "Mushroom Strains Guide Canada | FunGuyz",
    description: "Compare mushroom strains, potency levels, product formats and delivery options with the FunGuyz strain guide for Canada.",
    keywords: "mushroom strains Canada, strain guide, Golden Teacher, Penis Envy, mushroom delivery"
  },
  "wellness-articles": {
    title: "Mushroom Wellness Articles Canada | FunGuyz",
    description: "Explore mushroom wellness articles covering functional mushrooms, product education, routines and delivery options in Canada.",
    keywords: "mushroom wellness articles, functional mushrooms Canada, mushroom education, delivery Canada"
  },
  "research-and-studies": {
    title: "Mushroom Research & Studies Canada | FunGuyz",
    description: "Explore mushroom research summaries, studies, educational resources and responsible-use topics from FunGuyz Canada.",
    keywords: "mushroom research, mushroom studies Canada, psilocybin education, responsible use"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  const seo = seoMap[normalizedSlug];
  
  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
    };
  }

  return {
    title: 'Magic Mushroom Blog Canada | Guides & Delivery Tips | FunGuyz',
    description: 'Read FunGuyz guides on mushroom strains, microdosing, edibles, wellness topics, delivery tips and responsible use in Canada.',
    keywords: 'magic mushroom blog Canada, mushroom guides, microdose guide, mushroom delivery tips'
  };
}

export default function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogDetailsClient params={params} />;
}
