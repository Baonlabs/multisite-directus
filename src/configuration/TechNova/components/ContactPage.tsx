import React from 'react';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us a message and we'll respond within 24 hours",
      contact: "hello@technova.com",
      action: "Send Email"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with our team in real-time during business hours",
      contact: "Available 9 AM - 6 PM PST",
      action: "Start Chat"
    },
    {
      icon: "📱",
      title: "Social Media",
      description: "Follow us and send us a direct message on social platforms",
      contact: "@TechNovaOfficial",
      action: "Follow Us"
    }
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Tech Street, Suite 400",
      zipCode: "San Francisco, CA 94105",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "New York",
      address: "456 Innovation Ave, Floor 12",
      zipCode: "New York, NY 10001",
      phone: "+1 (555) 987-6543"
    },
    {
      city: "London",
      address: "789 Future Lane, Level 8",
      zipCode: "London, UK EC1A 1BB",
      phone: "+44 20 7123 4567"
    }
  ];

  const faqItems = [
    {
      question: "How can I contribute to TechNova?",
      answer: "We welcome contributions from the tech community! You can submit articles, research papers, or join our contributor program. Contact us for more details."
    },
    {
      question: "Do you offer consulting services?",
      answer: "Yes, we provide technology consulting services for businesses looking to implement AI and emerging technologies. Reach out to discuss your needs."
    },
    {
      question: "Can I advertise on TechNova?",
      answer: "We offer various advertising opportunities including sponsored content, banner ads, and newsletter sponsorships. Contact our partnerships team."
    },
    {
      question: "How do I report technical issues?",
      answer: "For technical issues with our website or platform, please use the contact form below or email our support team directly."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 text-white py-20 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Get In Touch.
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Have questions, ideas, or want to collaborate? We'd love to hear from you. 
            Reach out and let's start a conversation about the future of technology.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Contact Methods */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How to Reach Us</h2>
            <p className="text-gray-400 text-lg">
              Choose the method that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center hover:border-blue-500 transition-colors">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{method.description}</p>
                <p className="text-blue-400 font-medium mb-4">{method.contact}</p>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                  <option>General Inquiry</option>
                  <option>Partnership</option>
                  <option>Technical Support</option>
                  <option>Media & Press</option>
                  <option>Careers</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows={6}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="Tell us about your project, question, or how we can help..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Office Locations */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Office Locations</h3>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="text-lg font-semibold text-white mb-2">{office.city}</h4>
                    <p className="text-gray-400 text-sm mb-1">{office.address}</p>
                    <p className="text-gray-400 text-sm mb-2">{office.zipCode}</p>
                    <p className="text-blue-400 text-sm font-medium">{office.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-xl font-bold text-white mb-2">Quick Response</h3>
                <p className="text-white/90 text-sm">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call our main office.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-lg">
              Quick answers to common questions.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest tech insights, industry news, 
            and exclusive content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}