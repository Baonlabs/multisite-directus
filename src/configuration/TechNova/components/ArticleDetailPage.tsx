import React from 'react';
import Link from 'next/link';
import { ArticleDetailPageProps } from '@/configuration/Shared/schema';

export default function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Breadcrumb */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link 
              href={`/articles/category/${article.category_id.slug}`}
              className="hover:text-white transition-colors text-white"
            >
              {article.category_id.name}
            </Link>
            <span>/</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Link
                  href={`/articles/category/${article.category_id.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {article.category_id.name}
                </Link>
                <span className="text-gray-400 text-sm">
                  {formatDate(article.published_at)}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.Tags_id.id}
                      href={`/articles/tag/${tag.Tags_id.slug}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      #{tag.Tags_id.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            {article.featured_image && (
              <div className="mb-8">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="text-gray-300 leading-relaxed"
              />
            </div>

            {/* Social Sharing */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Chia sẻ bài viết</h3>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <span>Facebook</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  <span>Twitter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <span>LinkedIn</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Popular Tags */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer">
                    #AI
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer">
                    #Machine Learning
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer">
                    #Technology
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer">
                    #Innovation
                  </span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">AI Weekly Digest</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get the latest AI insights delivered to your inbox every week.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}