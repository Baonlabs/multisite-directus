import { headers } from 'next/headers';
import { getArticlesByTag, getTagBySlug } from '@/lib/directus-queries';
import TagPage from '@/configuration/TechNova/components/TagPage';
import NotFoundPage from '@/configuration/TechNova/components/NotFoundPage';

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params; 
  const tagInfo = await getTagBySlug(tag);
  return {
    title: tagInfo?.name ?? 'Not Found',
    description: tagInfo?.description ?? 'Demo multi-domain layout - Tag Detail',
  };
}
export default async function Tag({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const headersList = await headers();
  const hostname = headersList.get('host') || '';

  switch (hostname) {
    case process.env.DOMAIN_1:
      // Fetch data từ Directus
      const [articles, tagInfo] = await Promise.all([
        getArticlesByTag(tag, 1, 12),
        getTagBySlug(tag)
      ]);

      // Kiểm tra nếu không tìm thấy tag
      if (!tagInfo) {
        return <NotFoundPage type="tag" slug={tag} />;
      }

      return <TagPage articles={articles as any} tagInfo={tagInfo as any} tagSlug={tag} />;
    
    case process.env.DOMAIN_2:
      // Kiểm tra tag có tồn tại không cho Domain 2
      const domain2TagInfo = await getTagBySlug(tag);
      if (!domain2TagInfo) {
        return <NotFoundPage type="tag" slug={tag} />;
      }

      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Tag: {tag} - Domain 2</h1>
            <p className="text-gray-600">Tag page for Domain 2 coming soon...</p>
          </div>
        </div>
      );
    
    default:
      const defaultArticles = await getArticlesByTag(tag, 1, 12);
      const defaultTagInfo = await getTagBySlug(tag);
      
      // Kiểm tra nếu không tìm thấy tag
      if (!defaultTagInfo) {
        return <NotFoundPage type="tag" slug={tag} />;
      }

      return <TagPage articles={defaultArticles as any} tagInfo={defaultTagInfo as any} tagSlug={tag} />;
  }
}