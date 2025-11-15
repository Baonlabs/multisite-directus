import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SimpleArticle } from '@/configuration/Shared/schema/entities';
import { CategoryPageProps } from '@/configuration/Shared/schema/props';

export default function CategoryPage({ articles, categoryInfo, categorySlug }: CategoryPageProps) {
  const fallbackArticles: SimpleArticle[] = [
    {
      id: '1',
      title: "Sample Article in Category",
      excerpt: "This is a sample article for the category page.",
      author: "Sample Author",
      date_created: "2024-01-01",
      published_at: "2024-01-01",
      slug: "sample-article",
      category: { name: categorySlug, slug: categorySlug }
    }
  ];

  const displayArticles = articles && articles.length > 0 ? articles : fallbackArticles;
  const categoryName = categoryInfo?.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  const categoryDescription = categoryInfo?.description || `Explore articles in the ${categoryName} category`;

  const popularTags = [
    '#MachineLearning',
    '#DeepLearning',
    '#NeuralNetworks',
    '#ComputerVision',
    '#Robotics',
    '#AIEthics',
    '#QuantumAI'
  ];

  // const trendingTopics = [
  //   {
  //     id: 1,
  //     title: "Latest in " + categoryName,
  //     category: "News",
  //     readTime: "3 min read"
  //   },
  //   {
  //     id: 2,
  //     title: categoryName + " Breakthrough",
  //     category: "Research",
  //     readTime: "5 min read"
  //   },
  //   {
  //     id: 3,
  //     title: "Future of " + categoryName,
  //     category: "Analysis",
  //     readTime: "4 min read"
  //   }
  // ];

  const truncateTitle = (text: string, maxLength: number = 60) => {
    if (!text) return '';
    const trimmed = text.trim();
    return trimmed.length > maxLength
      ? trimmed.substring(0, maxLength) + '...'
      : trimmed;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 text-white py-20 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-white/20 text-white text-sm rounded-full font-medium backdrop-blur-sm">
              📂 Category
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {categoryDescription}
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{displayArticles.length}</div>
              <div className="text-gray-300 text-sm">Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold">2.5k</div>
              <div className="text-gray-300 text-sm">Readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">8</div>
              <div className="text-gray-300 text-sm">Authors</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {displayArticles.map((article) => (
                <Link key={article.id} href={`/${article.slug}`}>
                  <article className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                    {article.featured_images?.[0]?.images_id ? (
                      <div className="h-48 relative">
                        <Image
                          src={`/${article.featured_images[0].images_id.path.replace(/^\//, '')}`}
                          alt={article.featured_images[0].images_id.alt_text || article.title}
                          fill
                          sizes="(min-width:768px) 50vw, 100vw"
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="text-blue-300 text-sm font-medium">
                            {article.category?.name || categoryName}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 h-48 relative">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="text-blue-300 text-sm font-medium">
                            {article.category?.name || categoryName}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight line-clamp-2 min-h-[56px]">
                        {truncateTitle(article.title, 60)}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 min-h-[72px]">
                        {article.excerpt || "No excerpt available"}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {article.author ? article.author.split(' ').map(n => n[0]).join('') : 'A'}
                            </span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{article.author || 'Anonymous'}</p>
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
            <div className="flex justify-center items-center gap-2 mt-12">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                ← Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">2</button>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">5</button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Next →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Tags */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Trending in Category */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Trending in {categoryName}</h3>
              <div className="space-y-4">
                {articles.map((topic) => (
                  <div key={topic.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-medium text-sm leading-tight mb-1">
                        {truncateTitle(topic.title as any, 60)}
                      </h4>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">{categoryName} Updates</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get the latest {categoryName.toLowerCase()} articles and insights delivered weekly.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 rounded-lg border border-white/30 focus:border-white/50 focus:outline-none backdrop-blur-sm"
                />
                <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                  Subscribe to Updates
                </button>
              </div>
              <p className="text-xs text-blue-200 mt-3">
                Join 500+ {categoryName.toLowerCase()} enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}