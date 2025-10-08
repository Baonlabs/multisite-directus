import { headers } from 'next/headers';
import { getAllArticles, getCategories, getAllTags } from '@/lib/directus-queries';
import ArticlesPage from '@/configuration/TechNova/components/ArticlesPage';

export default async function Page() {
  const headersList = await headers();
  const hostname = headersList.get('host') || '';

  // Fetch data from database
  const [articles, categories, tags] = await Promise.all([
    getAllArticles(),
    getCategories(),
    getAllTags()
  ]);

  switch (hostname) {
    case process.env.DOMAIN_1:
      return <ArticlesPage articles={articles as any} categories={categories as any} tags={tags as any} />;
    case process.env.DOMAIN_2:
      return <div>Domain 2 Articles Page</div>;
    default:
      return <ArticlesPage articles={articles as any} categories={categories as any} tags={tags as any} />;
  }
}