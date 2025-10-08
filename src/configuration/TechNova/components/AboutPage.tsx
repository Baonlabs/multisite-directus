import React from 'react';

export default function AboutPage() {
  const missionItems = [
    {
      icon: "🎯",
      title: "Innovation",
      description: "Driving technological advancement through cutting-edge research and development."
    },
    {
      icon: "🔬",
      title: "Research",
      description: "Conducting deep analysis and exploration of emerging technologies."
    },
    {
      icon: "❤️",
      title: "Community",
      description: "Building a supportive ecosystem for tech enthusiasts and professionals."
    }
  ];

  const coreValues = [
    {
      icon: "🔍",
      title: "Transparency",
      description: "We believe in open and honest communication about technology developments and their implications.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🧠",
      title: "Integrity",
      description: "Maintaining the highest standards of accuracy and ethical reporting in all our content.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Striving for the highest quality in everything we do, from research to content creation.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: "📈",
      title: "Growth",
      description: "Continuously evolving and adapting to stay at the forefront of technological advancement.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Kim",
      role: "Chief Technology Officer",
      bio: "Leading AI researcher with 15+ years in machine learning and neural networks.",
      image: "SK",
      expertise: ["AI/ML", "Neural Networks", "Research"]
    },
    {
      name: "Alex Chen",
      role: "Senior Editor",
      bio: "Technology journalist specializing in emerging tech trends and industry analysis.",
      image: "AC",
      expertise: ["Tech Journalism", "Industry Analysis", "Content Strategy"]
    },
    {
      name: "Emma Davis",
      role: "Research Director",
      bio: "PhD in Computer Science, focusing on quantum computing and advanced algorithms.",
      image: "ED",
      expertise: ["Quantum Computing", "Algorithms", "Research"]
    },
    {
      name: "Mike Johnson",
      role: "Community Manager",
      bio: "Building and nurturing our tech community with passion for innovation.",
      image: "MJ",
      expertise: ["Community Building", "Social Media", "Engagement"]
    },
    {
      name: "David Park",
      role: "UX Designer",
      bio: "Creating intuitive and beautiful user experiences for our digital platforms.",
      image: "DP",
      expertise: ["UX Design", "UI/UX", "Product Design"]
    },
    {
      name: "Lisa Rodriguez",
      role: "Data Scientist",
      bio: "Analyzing trends and patterns to provide insights into technology adoption.",
      image: "LR",
      expertise: ["Data Science", "Analytics", "Machine Learning"]
    }
  ];

  const journeySteps = [
    {
      year: "2020",
      title: "TechNova Founded",
      description: "Started as a small blog covering emerging technologies and AI breakthroughs."
    },
    {
      year: "2021",
      title: "100 Articles Published",
      description: "Reached our first major milestone with comprehensive tech coverage."
    },
    {
      year: "2022",
      title: "Team Expansion",
      description: "Grew our team to include leading experts in AI, quantum computing, and robotics."
    },
    {
      year: "2023",
      title: "1M+ Monthly Readers",
      description: "Became a trusted source for technology insights with global readership."
    },
    {
      year: "2024",
      title: "Platform Redesign",
      description: "Launched our new platform with enhanced user experience and community features."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 text-white py-20 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            About Our Tech Community
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            We are passionate about exploring the frontiers of technology, 
            sharing insights, and building a community of innovators who are 
            shaping tomorrow's digital landscape.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Our Mission */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              To democratize technology knowledge by providing accessible, comprehensive, and cutting-edge 
              information that empowers individuals and organizations to thrive in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionItems.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Core Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-400 text-lg">
              The principles that guide everything we do at TechNova.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className={`bg-gradient-to-r ${value.color} p-6 rounded-xl`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{value.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-400 text-lg">
              The brilliant minds behind TechNova's success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">{member.image}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-blue-400 text-sm font-medium">{member.role}</p>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Journey */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-gray-400 text-lg">
              From a simple idea to a thriving tech community.
            </p>
          </div>

          <div className="space-y-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex-shrink-0">
                  {step.year}
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Our Community CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Tech Community</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a growing community of technology enthusiasts, researchers, and innovators 
            who are passionate about shaping the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
              Subscribe
            </button>
            <button className="bg-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors backdrop-blur-sm">
              Follow Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}