import React from 'react';
import Link from 'next/link';
import { SimpleArticle, Tag, TagPageProps } from '@/configuration/Shared/schema';

export default function TagPage({ articles, tagInfo, tagSlug }: TagPageProps) {
  const fallbackArticles: SimpleArticle[] = [
    {
      id: '1',
      title: "Sample Article with Tag",
      excerpt: "This is a sample article for the tag page.",
      author: "Sample Author",
      date_created: "2024-01-01",
      published_at: "2024-01-01",
      slug: "sample-article",
      category: { name: 'General', slug: 'general' },
      tags: [{ name: tagSlug, slug: tagSlug }]
    }
  ];

  const displayArticles = articles && articles.length > 0 ? articles : fallbackArticles;
  const tagName = tagInfo?.name || tagSlug.charAt(0).toUpperCase() + tagSlug.slice(1);
  const tagDescription = tagInfo?.description || `Explore articles tagged with ${tagName}`;

  const relatedTags = [
    '#MachineLearning',
    '#DeepLearning',
    '#NeuralNetworks',
    '#ComputerVision',
    '#Robotics',
    '#AIEthics',
    '#QuantumAI'
  ];

  const trendingTopics = [
    {
      id: 1,
      title: "Latest in " + tagName,
      category: "News",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: tagName + " Trends",
      category: "Analysis",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Advanced " + tagName,
      category: "Tutorial",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-teal-600 to-blue-500 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="mb-4 sm:mb-6">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 text-white text-xs sm:text-sm rounded-full font-medium backdrop-blur-sm">
              🏷️ Tag
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            #{tagName}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            {tagDescription}
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{displayArticles.length}</div>
              <div className="text-gray-300 text-xs sm:text-sm">Articles</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">1.8k</div>
              <div className="text-gray-300 text-xs sm:text-sm">Readers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">12</div>
              <div className="text-gray-300 text-xs sm:text-sm">Authors</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Articles Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {displayArticles.map((article) => (
                <Link key={article.id} href={`/${article.slug}`}>
                  <article className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-300 cursor-pointer">
                    {article.featured_images?.[0]?.images_id ? (
                      <div className="h-40 sm:h-48 relative">
                        <img
                          src={`/${article.featured_images[0].images_id.path.replace(/^\//, '')}`}
                          alt={article.featured_images[0].images_id.alt_text || article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <span className="px-2 sm:px-3 py-1 text-xs rounded-full font-medium bg-white/20 text-white">
                            #{tagName}
                          </span>
                        </div>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                          <span className="text-green-300 text-xs sm:text-sm font-medium">
                            {article.category?.name || 'General'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-green-600 to-teal-600 h-40 sm:h-48 relative">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <span className="px-2 sm:px-3 py-1 text-xs rounded-full font-medium bg-white/20 text-white">
                            #{tagName}
                          </span>
                        </div>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                          <span className="text-green-300 text-xs sm:text-sm font-medium">
                            {article.category?.name || 'General'}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight line-clamp-2 min-h-[56px]">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3 min-h-[72px]">
                        {article.excerpt || "No excerpt available"}
                      </p>
                      
                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-7 sm:w-8 h-7 sm:h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {article.author ? article.author.split(' ').map(n => n[0]).join('') : 'A'}
                            </span>
                          </div>
                          <div>
                            <p className="text-white text-xs sm:text-sm font-medium">{article.author || 'Anonymous'}</p>
                            <p className="text-gray-500 text-xs">
                              {article.date_created ? new Date(article.date_created).toLocaleDateString() : 'No date'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 sm:mt-12 px-4">
              <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm">
                ← Previous
              </button>
              <button className="px-3 sm:px-4 py-2 bg-teal-600 text-white rounded-lg text-xs sm:text-sm">1</button>
              <button className="px-3 sm:px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 text-xs sm:text-sm">2</button>
              <button className="px-3 sm:px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 text-xs sm:text-sm">3</button>
              <span className="px-1 sm:px-2 text-gray-500 text-xs sm:text-sm">...</span>
              <button className="px-3 sm:px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 text-xs sm:text-sm">5</button>
              <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm">
                Next →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Tags */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Related Tags</h3>
              <div className="flex flex-wrap gap-2">
                {relatedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-green-600 hover:text-white cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Trending with Tag */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Trending with #{tagName}</h3>
              <div className="space-y-4">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-medium text-sm leading-tight mb-1">
                        {topic.title}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {topic.category} • {topic.readTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tag Newsletter */}
            <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">#{tagName} Updates</h3>
              <p className="text-green-100 text-sm mb-4">
                Stay updated with the latest articles tagged #{tagName.toLowerCase()}.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 rounded-lg border border-white/30 focus:border-white/50 focus:outline-none backdrop-blur-sm"
                />
                <button className="w-full bg-white text-green-600 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                  Follow Tag
                </button>
              </div>
              <p className="text-xs text-green-200 mt-3">
                Join 300+ #{tagName.toLowerCase()} followers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}