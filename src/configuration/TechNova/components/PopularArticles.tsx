import React from 'react';
import Link from 'next/link';
import { getPopularArticles } from '@/lib/directus-queries';

export default async function PopularArticles() {
  const articles = await getPopularArticles(6);
  const displayArticles = Array.isArray(articles) ? articles : [];

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (!content) return '';
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  // Guard when there is no data
  if (displayArticles.length === 0) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Popular Articles</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">All</button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600">AI</button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600">Mobile</button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600">Reviews</button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600">Gadgets</button>
            </div>
          </div>

          <div className="text-gray-400">Chưa có bài viết phổ biến</div>
        </div>
      </section>
    );
  }

  const hero = displayArticles[0];
  const rightOne = displayArticles[1];
  const rightTwo = displayArticles[2];
  const bottomCards = displayArticles.slice(3, 6);

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Popular Articles</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">All</button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600">AI</button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600">Mobile</button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600">Reviews</button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600">Gadgets</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article - Left Side (2/3 width) */}
          <div className="lg:col-span-2">
            <Link href={`/${hero.slug}`}>
              <div className="rounded-2xl overflow-hidden h-full border border-gray-700 hover:border-blue-500 transition-all duration-300 relative cursor-pointer">
                {hero.featured_images?.[0]?.images_id?.path ? (
                  <img
                    src={`/${hero.featured_images[0].images_id.path.replace(/^\//, '')}`}
                    alt={hero.featured_images[0].images_id.alt_text || hero.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
                )}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[400px]">
                  {/* Category Tag */}
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-medium">
                      ⭐ Editor's Pick
                    </span>
                  </div>
                  {/* Category */}
                  <div className="mb-2">
                    <span className="text-blue-300 text-sm font-medium">
                      {hero.categories?.name || 'General'}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {hero.title}
                  </h3>
                  {/* Excerpt */}
                  <p className="text-gray-200 mb-6 leading-relaxed text-lg">
                    {hero.excerpt || getExcerpt(hero.content)}
                  </p>
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {(hero.author_id?.name || 'A').split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{hero.author_id?.name || 'Admin'}</p>
                      <p className="text-gray-300 text-xs">{formatDate(hero.published_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Side Articles (1/3 width) */}
          <div className="space-y-6">
            {rightOne && (
              <Link href={`/${rightOne.slug}`}>
                <div className="rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 relative cursor-pointer">
                  {rightOne.featured_images?.[0]?.images_id?.path ? (
                    <img
                      src={`/${rightOne.featured_images[0].images_id.path.replace(/^\//, '')}`}
                      alt={rightOne.featured_images[0].images_id.alt_text || rightOne.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
                  )}
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative z-10 p-6 min-h-[200px] flex flex-col justify-end">
                    <div className="mb-2">
                      <span className="text-blue-300 text-sm font-medium">
                        {rightOne.categories?.name || 'General'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 leading-tight line-clamp-2 min-h-[56px]">
                      {rightOne.title}
                    </h4>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-3 min-h-[72px]">
                      {rightOne.excerpt || getExcerpt(rightOne.content)}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {(rightOne.author_id?.name || 'A').split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-gray-300 text-xs">{rightOne.author_id?.name || 'Admin'} • {formatDate(rightOne.published_at)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {rightTwo && (
              <Link href={`/${rightTwo.slug}`}>
                <div className="rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 relative cursor-pointer">
                  {rightTwo.featured_images?.[0]?.images_id?.path ? (
                    <img
                      src={`/${rightTwo.featured_images[0].images_id.path.replace(/^\//, '')}`}
                      alt={rightTwo.featured_images[0].images_id.alt_text || rightTwo.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500" />
                  )}
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative z-10 p-6 min-h-[200px] flex flex-col justify-end">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-medium">
                        🔥 Trending
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 leading-tight line-clamp-2 min-h-[56px]">
                      {rightTwo.title}
                    </h4>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-3 min-h-[72px]">
                      {rightTwo.excerpt || getExcerpt(rightTwo.content)}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {(rightTwo.author_id?.name || 'A').split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-gray-300 text-xs">{rightTwo.author_id?.name || 'Admin'} • {formatDate(rightTwo.published_at)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Row - 3 Equal Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {bottomCards.map((article) => (
            <Link key={article.id} href={`/${article.slug}`}>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                <div className="mb-3">
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full font-medium">
                    {article.categories?.name || 'General'}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 leading-tight line-clamp-2 min-h-[56px]">
                  {article.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 min-h-[72px]">
                  {article.excerpt || getExcerpt(article.content)}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {(article.author_id?.name || 'A').split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs">{article.author_id?.name || 'Admin'} • {formatDate(article.published_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Link href="/articles">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
              Load More Articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}