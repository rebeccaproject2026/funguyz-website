import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Microdose Guide Canada | Capsules & Blends | FunGuyz",
  description: "Learn about microdose capsules, blend types, product formats, routines and delivery options with the FunGuyz microdose guide.",
  keywords: "microdose guide Canada, microdose capsules, microdosing mushrooms, microdose blends"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
