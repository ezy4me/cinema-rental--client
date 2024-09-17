import CategorySection from '@/components/features/CategorySection/CategorySection';
import ContactSection from '@/components/features/ContactSection/ContactSection';
import HeroSection from '@/components/features/HeroSection/HeroSection';
import { getCategories } from '@/services/category.api';

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="page">
      <HeroSection />
      <CategorySection categories={categories} />
      <ContactSection />
    </div>
  );
}
