import React from 'react';

export default function Stats() {
  const stats = [
    {
      number: "500+",
      label: "Active Members",
      icon: "👥",
      color: "from-blue-500 to-purple-600"
    },
    {
      number: "200+",
      label: "Expert Reviews",
      icon: "⭐",
      color: "from-purple-500 to-pink-600"
    },
    {
      number: "50+",
      label: "Tech Categories",
      icon: "🚀",
      color: "from-pink-500 to-red-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${stat.color} p-8 rounded-2xl text-white text-center transform group-hover:scale-105 transition-all duration-300 shadow-xl`}>
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}