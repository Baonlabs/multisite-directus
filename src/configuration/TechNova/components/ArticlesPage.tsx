import React from 'react';
import Link from 'next/link';
import { Article, ArticlesPageProps } from '@/configuration/Shared/schema';

export default function ArticlesPage({ articles = [], categories = [], tags = [] }: ArticlesPageProps) {
  // Use database categories if available, otherwise fallback to hardcoded ones
  const displayCategories = categories.length > 0 ? [
    { id: 'all', name: 'All AI', active: true, slug: 'all' },
    ...categories.map(cat => ({ id: cat.id, name: cat.name, active: false, slug: cat.slug }))
  ] : [
    { id: 'all', name: 'All AI', active: true, slug: 'all' },
    { id: 'tech', name: 'Tech', slug: 'tech' },
    { id: 'phone', name: 'Phone', slug: 'phone' },
    { id: 'vision', name: 'Computer Vision', slug: 'computer-vision' },
    { id: 'nlp', name: 'NLP', slug: 'nlp' },
    { id: 'robotics', name: 'Robotics', slug: 'robotics' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  // Use real articles if available, otherwise fallback to sample data
  const displayArticles = articles.length > 0 ? articles : [
    {
      id: '1',
      title: "The Future of Neural Networks",
      content: "Exploring how neural learning architectures are evolving to solve complex problems in artificial intelligence.",
      slug: "future-neural-networks",
      published_at: "2024-12-15",
      date_created: "2024-12-15",
      category_id: { id: '1', name: "Machine Learning", slug: "machine-learning" },
      tags: []
    },
    {
      id: '2',
      title: "AI in Medical Imaging",
      content: "How computer vision is revolutionizing medical diagnosis and patient care worldwide.",
      slug: "ai-medical-imaging",
      published_at: "2024-12-14",
      date_created: "2024-12-14",
      category_id: { id: '2', name: "Computer Vision", slug: "computer-vision" },
      tags: []
    }
  ];

  // Use database tags if available, otherwise fallback to hardcoded ones
  const popularTags = tags.length > 0 ? tags.map(tag => `#${tag.name}`) : [
    '#Iphone',
    '#Samsung',
    '#NeuralNetworks',
    '#ComputerVision',
    '#Robotics',
    '#AIEthics',
    '#QuantumAI'
  ];

  const trendingTopics = [
    {
      id: 1,
      title: "GPT-5 Rumors: What to Expect",
      category: "News",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Computer Vision Breakthrough",
      category: "Research",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Tesla Bot Updates",
      category: "Robotics",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 text-white py-20 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-white/20 text-white text-sm rounded-full font-medium backdrop-blur-sm">
              🤖 Artificial Intelligence
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            AI & Machine Learning
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Explore the fascinating world of artificial intelligence, from neural networks to 
            machine learning algorithms that are reshaping our future.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">124</div>
              <div className="text-gray-300 text-sm">Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold">45k</div>
              <div className="text-gray-300 text-sm">Readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15</div>
              <div className="text-gray-300 text-sm">Authors</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {displayCategories.map((category) => (
                <Link key={category.id} href={`/articles/category/${category.slug}`}>
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category.active
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
                </Link>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {displayArticles.map((article) => (
                <Link key={article.id} href={`/${article.slug}`}>
                  <article className="w-full bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 h-48 relative">
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-blue-300 text-sm font-medium">
                          {article.category_id.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {article.excerpt || getExcerpt(article.content)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              A
                            </span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Admin</p>
                            <p className="text-gray-500 text-xs">
                              {formatDate(article.published_at)}
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
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">12</button>
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
                  <Link key={index} href={`/articles/tag/${tag.replace('#', '').toLowerCase()}`}>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-blue-600 hover:text-white cursor-pointer transition-colors">
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending in AI */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Trending in AI</h3>
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

            {/* AI Weekly Digest */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">AI Weekly Digest</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get the latest AI breakthroughs and insights delivered weekly.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 rounded-lg border border-white/30 focus:border-white/50 focus:outline-none backdrop-blur-sm"
                />
                <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                  Subscribe to AI Updates
                </button>
              </div>
              <p className="text-xs text-blue-200 mt-3">
                Join 1,000+ AI enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}