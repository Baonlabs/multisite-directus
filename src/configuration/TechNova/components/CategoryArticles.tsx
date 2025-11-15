import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArticlesByCategory, getCategoryBySlug } from '@/lib/directus-queries';

export default async function CategoryArticles({ categorySlug, limit = 6 }: { categorySlug: string; limit?: number }) {
  // Fetch articles by category and optional category info for header
  const [articles, categoryInfo] = await Promise.all([
    getArticlesByCategory(categorySlug, 1, limit),
    getCategoryBySlug(categorySlug)
  ]);

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

  const truncateTitle = (text: string, maxLength: number = 80) => {
    if (!text) return '';
    const trimmed = text.trim();
    return trimmed.length > maxLength
      ? trimmed.substring(0, maxLength) + '...'
      : trimmed;
  };

  const sanitizeImagePath = (p?: string) => (p || '').replace(/^\/+/, '');

  // Guard when there is no data
  if (displayArticles.length === 0) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Decorative line above header */}
          <div className="flex items-center mb-4">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-white/20 to-white/10" />
          </div>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">{categoryInfo?.name || `Category: ${categorySlug}`}</h2>
            <div className="flex gap-2">
              <Link href="/articles">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Tất cả bài viết</button>
              </Link>
            </div>
          </div>

          <div className="text-gray-400">Chưa có bài viết trong danh mục này</div>
        </div>
      </section>
    );
  }

  const hero = displayArticles[0];
  const rightOne = displayArticles[1];
  const rightTwo = displayArticles[2];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {/* Decorative line above header */}
        <div className="flex items-center mb-4">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-white/20 to-white/10" />
        </div>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">{categoryInfo?.name || `Category: ${categorySlug}`}</h2>
          <div className="flex gap-2">
            <Link
              href={`/articles/category/${categorySlug}`}
              className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold uppercase tracking-wide text-sm"
            >
              <span>Load more</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                <path d="M3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article - Left Side (2/3 width) */}
          <div className="lg:col-span-2">
            <Link href={`/${hero.slug}`}>
              <div className="rounded-2xl overflow-hidden h-full border border-gray-700 hover:border-blue-500 transition-all duration-300 relative cursor-pointer">
                {hero.featured_images?.[0]?.images_id?.path ? (
                  <Image
                    src={`/${sanitizeImagePath(hero.featured_images[0].images_id.path)}`}
                    alt={hero.featured_images[0].images_id.alt_text || hero.title}
                    fill
                    sizes="(min-width:1024px) 66vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
                )}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[400px]">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="text-blue-300 text-sm font-medium">
                      {hero.categories?.name || categoryInfo?.name || 'General'}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {truncateTitle(hero.title, 80)}
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
                    <Image
                      src={`/${sanitizeImagePath(rightOne.featured_images[0].images_id.path)}`}
                      alt={rightOne.featured_images[0].images_id.alt_text || rightOne.title}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
                  )}
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative z-10 p-6 min-h-[200px] flex flex-col justify-end">
                    <div className="mb-2">
                      <span className="text-blue-300 text-sm font-medium">
                        {rightOne.categories?.name || categoryInfo?.name || 'General'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 leading-tight line-clamp-2 min-h-[56px]">
                      {truncateTitle(rightOne.title, 60)}
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
                    <Image
                      src={`/${sanitizeImagePath(rightTwo.featured_images[0].images_id.path)}`}
                      alt={rightTwo.featured_images[0].images_id.alt_text || rightTwo.title}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover"
                      unoptimized
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
                      {truncateTitle(rightTwo.title, 60)}
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

        {/* Bottom Row - Equal Cards (kept commented as in original) */}
        {/* <div className="grid md:grid-cols-3 gap-6 mt-8">
          {bottomCards.map((article: any) => (
            <Link key={article.id} href={`/${article.slug}`}>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                <div className="mb-3">
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full font-medium">
                    {article.categories?.name || categoryInfo?.name || 'General'}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 leading-tight line-clamp-2 min-h-[56px]">
                  {truncateTitle(article.title, 60)}
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
        </div> */}

        {/* View More (kept commented as in original) */}
        {/* <div className="text-center mt-12">
          <Link href={`/articles/category/${categorySlug}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
              Load More Articles
            </button>
          </Link>
        </div> */}
      </div>
    </section>
  );
}

