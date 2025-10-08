import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import ArticleDetailPage from '@/configuration/TechNova/components/ArticleDetailPage';
import { getPostBySlug } from '@/lib/directus-queries';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headersList = await headers();
  const hostname = headersList.get('host') || '';
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  switch (hostname) {
    case process.env.DOMAIN_1:
      return <ArticleDetailPage article={post as any} />;
    
    case process.env.DOMAIN_2:
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Detail - Domain 2</h1>
            <p className="text-gray-600">Article detail page for Domain 2 coming soon...</p>
            <p className="text-gray-500 mt-2">Article: {post.title}</p>
          </div>
        </div>
      );
    
    default:
      return <ArticleDetailPage article={post as any} />;
  }
}