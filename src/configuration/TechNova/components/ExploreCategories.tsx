import React from 'react';

export default function ExploreCategories() {
  const categories = [
    {
      id: 1,
      title: "Artificial Intelligence",
      icon: "🤖",
      color: "from-blue-500 to-cyan-500",
      description: "Machine Learning, Neural Networks, AI Ethics"
    },
    {
      id: 2,
      title: "Space Tech",
      icon: "🚀",
      color: "from-purple-500 to-pink-500", 
      description: "Rockets, Satellites, Space Exploration"
    },
    {
      id: 3,
      title: "Green Energy",
      icon: "🌱",
      color: "from-green-500 to-emerald-500",
      description: "Solar, Wind, Sustainable Technology"
    },
    {
      id: 4,
      title: "Blockchain",
      icon: "⛓️",
      color: "from-orange-500 to-red-500",
      description: "Cryptocurrency, DeFi, Web3 Innovation"
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Explore by Category</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dive deep into specialized tech domains and discover cutting-edge innovations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-white text-center transform group-hover:scale-105 transition-all duration-300 shadow-xl relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full blur-lg"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Arrow Icon */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            Can't find what you're looking for? We have more categories to explore
          </p>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 border border-gray-600">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}