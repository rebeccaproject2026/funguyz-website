import { Metadata } from 'next';
import ShopClient from './ShopClient';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const filter = resolvedParams?.filter || resolvedParams?.category;

  if (filter === 'best-sellers') {
    return {
      title: 'Best Selling Mushrooms Canada | Fast Delivery | FunGuyz',
      description: 'Explore best-selling mushrooms, edibles and microdose products with fast delivery across Toronto, the GTA and Canada.',
      keywords: 'best selling mushrooms Canada, popular mushroom strains, mushroom delivery Canada',
    };
  }

  return {
    title: 'Shop Magic Mushrooms Online Canada | FunGuyz',
    description: 'Shop mushrooms, edibles, capsules and microdose products with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'shop magic mushrooms Canada, mushroom delivery Canada, buy mushrooms online, FunGuyz shop',
  };
}

export default function ShopPage() {
  return <ShopClient />;
}
