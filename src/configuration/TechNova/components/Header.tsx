"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Category = { id: string; name: string; slug: string };
type Tag = { id: string; name: string; slug: string };

export default function Header({ cate = [], tag = [] }: { cate?: Category[]; tag?: Tag[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ id: string; title: string; slug: string; category?: { name: string; slug: string } | null; thumbnail?: string | null }>>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function performSearch(query: string) {
    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    try {
      setSearchLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=8`);
      const data = await res.json();
      setSearchResults(data?.results || []);
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchDropdown(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(value), 300);
  }
  

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
            <Link href="/articles/category/productivity" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
              Productivity
            </Link>
            <Link href="/articles/category/workplace-ai" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
              Workplace AI
            </Link>
            <Link href="/articles/category/automation" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
              Automation
            </Link>
            <Link href="/articles/category/future-skills" className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base">
              Future Skills
            </Link>
          </nav>

          {/* Search and Subscribe */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="relative hidden lg:block" ref={searchRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={onSearchChange}
                onFocus={() => setShowSearchDropdown(true)}
                className="bg-gray-800 text-white placeholder-white/60 pl-8 lg:pl-10 pr-3 lg:pr-4 py-1.5 lg:py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 lg:w-64 text-sm"
              />

              {showSearchDropdown && (
                <div className="absolute top-full left-0 mt-2 w-[28rem] max-h-96 overflow-auto rounded-lg border border-gray-700 bg-gray-800 shadow-xl z-50">
                  {searchLoading ? (
                    <div className="p-3 text-sm text-white">Searching...</div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-3 text-sm text-white">No results found</div>
                  ) : (
                    <ul className="py-2">
                      {searchResults.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={`/${item.slug}`}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700"
                            onClick={() => setShowSearchDropdown(false)}
                          >
                            {item.thumbnail ? (
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                width={32}
                                height={32}
                                className="rounded object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="h-8 w-8 rounded bg-gray-700" />
                            )}
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white">{item.title}</div>
                              {item.category && (
                                <div className="text-xs text-gray-400">{item.category.name}</div>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Subscribe Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium transition-colors duration-300 text-xs sm:text-sm">
              Subscribe
            </button>

            {/* Hamburger Menu Button (all sizes) */}
            <button
              className="text-gray-300 hover:text-white p-1"
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

      {/* Navigation Menu (toggle via hamburger, visible on all sizes) */}
      <div
        id="mobile-nav"
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} fixed left-0 right-0 top-14 sm:top-16 bottom-0 z-40 bg-gray-900 overflow-y-auto`}
      >
        <div className="px-4 sm:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-12">
            {/* Categories from props */}
            <div>
              <h3 className="text-white font-semibold text-base mb-3">Categories</h3>
              {Array.isArray(cate) && cate.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {cate.map((cat: Category) => (
                    <Link
                      key={cat.id}
                      href={`/articles/category/${cat.slug}`}
                      className="block w-full py-2 text-white text-sm hover:text-blue-400"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No categories available</p>
              )}
            </div>

            {/* Tags from props */}
            <div className="sm:pl-6">
              <h3 className="text-white font-semibold text-base mb-3">Tags</h3>
              {Array.isArray(tag) && tag.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {tag.map((t: Tag) => (
                    <Link
                      key={t.id}
                      href={`/articles/tag/${t.slug}`}
                      className="block w-full py-2 text-white text-sm hover:text-blue-400"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No tags available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}