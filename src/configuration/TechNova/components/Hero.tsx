import React from 'react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 text-white py-20 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Discover the
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Future of
              </span>
              <br />
              Technology
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
              Dive into cutting-edge innovations, explore emerging trends, and 
              stay ahead with the latest technological breakthroughs that shape our world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Start Reading
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                Explore Topics
              </button>
            </div>
          </div>
          
          {/* Right Content - Featured Article Card */}
          <div className="relative">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">AI Revolution: The Next Decade</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">
                How Artificial Intelligence is Reshaping Industries
              </h3>
              
              <p className="text-gray-300 text-sm mb-4">
                Explore the transformative impact of AI across healthcare, finance, 
                and manufacturing sectors...
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Alex Chen</span>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}