"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-lg sm:text-2xl font-bold text-white">TechNova</h1>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors font-medium text-sm lg:text-base">
              Home
            </Link>
            <Link href="/articles" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
              Articles
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
              Contact
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
              About
            </Link>
          </nav>

          {/* Search and Subscribe */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text:white placeholder-gray-400 pl-8 lg:pl-10 pr-3 lg:pr-4 py-1.5 lg:py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 lg:w-64 text-sm"
              />
            </div>

            {/* Subscribe Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium transition-colors duration-300 text-xs sm:text-sm">
              Subscribe
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-1"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-controls="mobile-nav"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (hidden by default) */}
      <div
        id="mobile-nav"
        className={`md:hidden border-t border-gray-800 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-3 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
          <Link href="/" className="block text-white hover:text-blue-400 transition-colors font-medium text-sm">
            Home
          </Link>
          <Link href="/articles" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm">
            Articles
          </Link>
          <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm">
            Contact
          </Link>
          <Link href="/about" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm">
            About
          </Link>
          <div className="pt-2 sm:pt-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 px-3 sm:px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}