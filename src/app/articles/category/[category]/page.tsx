import { headers } from 'next/headers';
import { getArticlesByCategory, getCategoryBySlug } from '@/lib/directus-queries';
import CategoryPage from '@/configuration/TechNova/components/CategoryPage';
import NotFoundPage from '@/configuration/TechNova/components/NotFoundPage';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; 
  const categoryInfo = await getCategoryBySlug(category);
  return {
    title: categoryInfo?.name ?? 'Not Found',
    description: categoryInfo?.description ?? 'Demo multi-domain layout - Category Detail',
  };
}
export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const headersList = await headers();
  const hostname = headersList.get('host') || '';

  switch (hostname) {
    case process.env.DOMAIN_1:
      // Fetch data từ Directus
      const [articles, categoryInfo] = await Promise.all([
        getArticlesByCategory(category, 1, 12),
        getCategoryBySlug(category)
      ]);

      // Kiểm tra nếu không tìm thấy category
      if (!categoryInfo) {
        return <NotFoundPage type="category" slug={category} />;
      }

      return <CategoryPage articles={articles as any} categoryInfo={categoryInfo as any} categorySlug={category} />;
    
    case process.env.DOMAIN_2:
      // Kiểm tra category có tồn tại không cho Domain 2
      const domain2CategoryInfo = await getCategoryBySlug(category);
      if (!domain2CategoryInfo) {
        return <NotFoundPage type="category" slug={category} />;
      }

      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Category: {category} - Domain 2</h1>
            <p className="text-gray-600">Category page for Domain 2 coming soon...</p>
          </div>
        </div>
      );
    
    default:
      const defaultArticles = await getArticlesByCategory(category, 1, 12);
      const defaultCategoryInfo = await getCategoryBySlug(category);
      
      // Kiểm tra nếu không tìm thấy category
      if (!defaultCategoryInfo) {
        return <NotFoundPage type="category" slug={category} />;
      }

      return <CategoryPage articles={defaultArticles as any} categoryInfo={defaultCategoryInfo as any} categorySlug={category} />;
  }
}