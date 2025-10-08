import React from 'react';
import Link from 'next/link';

export default function PopularArticles() {
  const articles = [
    {
      id: 1,
      title: "Quantum Computing: Breaking the Barriers",
      excerpt: "How quantum processors are revolutionizing computation and solving previously impossible problems.",
      author: "Dr. Sarah Kim",
      readTime: "8 min read",
      date: "Dec 12",
      category: "Quantum Computing",
      categoryTag: "⭐ Editor's Pick",
      image: "🔬",
      featured: true,
      bgImage: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    },
    {
      id: 2,
      title: "iPhone 16 Pro Review",
      excerpt: "Apple's latest flagship delivers unprecedented performance.",
      author: "Mike Johnson",
      readTime: "5 min",
      category: "Mobile",
      image: "📱",
      bgImage: "bg-gradient-to-br from-blue-600 to-purple-600"
    },
    {
      id: 3,
      title: "Neural Networks Explained",
      excerpt: "Understanding the building blocks of artificial intelligence.",
      author: "Emma Davis",
      readTime: "7 min",
      category: "AI",
      categoryTag: "🔥 Trending",
      image: "🧠",
      bgImage: "bg-gradient-to-br from-orange-500 to-red-500"
    },
    {
      id: 4,
      title: "VR Headsets 2024",
      excerpt: "The best virtual reality experiences available today.",
      author: "James Wilson",
      readTime: "6 min",
      category: "Gadgets",
      image: "🥽",
      bgImage: "bg-gradient-to-br from-indigo-600 to-purple-600"
    },
    {
      id: 5,
      title: "Tesla Model S Plaid",
      excerpt: "Electric performance redefined with ludicrous speed.",
      author: "Lisa Park",
      readTime: "4 min",
      category: "Reviews",
      image: "🚗",
      bgImage: "bg-gradient-to-br from-green-600 to-blue-600"
    },
    {
      id: 6,
      title: "UX Pilot vs UX Pilot",
      excerpt: "Comparing the latest AI language models head-to-head.",
      author: "David Chen",
      readTime: "9 min",
      category: "AI",
      image: "🤖",
      bgImage: "bg-gradient-to-br from-cyan-600 to-blue-600"
    }
  ];

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
            <div className={`${articles[0].bgImage} rounded-2xl overflow-hidden h-full border border-gray-700 hover:border-blue-500 transition-all duration-300 relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[400px]">
                {/* Category Tag */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-medium">
                    {articles[0].categoryTag}
                  </span>
                </div>
                
                {/* Category */}
                <div className="mb-2">
                  <span className="text-blue-300 text-sm font-medium">
                    {articles[0].category}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                  {articles[0].title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-200 mb-6 leading-relaxed text-lg">
                  {articles[0].excerpt}
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {articles[0].author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{articles[0].author}</p>
                    <p className="text-gray-300 text-xs">{articles[0].readTime} • {articles[0].date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Articles (1/3 width) */}
          <div className="space-y-6">
            {/* Mobile Article */}
            <div className={`${articles[1].bgImage} rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 relative`}>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative z-10 p-6 min-h-[200px] flex flex-col justify-end">
                <div className="mb-2">
                  <span className="text-blue-300 text-sm font-medium">
                    {articles[1].category}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                  {articles[1].title}
                </h4>
                <p className="text-gray-200 text-sm mb-4">
                  {articles[1].excerpt}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {articles[1].author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-gray-300 text-xs">{articles[1].author} • {articles[1].readTime}</span>
                </div>
              </div>
            </div>

            {/* AI Article with Trending Tag */}
            <div className={`${articles[2].bgImage} rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 relative`}>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative z-10 p-6 min-h-[200px] flex flex-col justify-end">
                <div className="mb-2">
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-medium">
                    {articles[2].categoryTag}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                  {articles[2].title}
                </h4>
                <p className="text-gray-200 text-sm mb-4">
                  {articles[2].excerpt}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {articles[2].author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-gray-300 text-xs">{articles[2].author} • {articles[2].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - 3 Equal Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {articles.slice(3).map((article) => (
            <div key={article.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="mb-3">
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full font-medium">
                  {article.category}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-3 leading-tight">
                {article.title}
              </h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {article.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-gray-400 text-xs">{article.author} • {article.readTime}</span>
              </div>
            </div>
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