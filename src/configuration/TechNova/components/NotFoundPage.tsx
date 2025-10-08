import React from 'react';
import Link from 'next/link';
import {NotFoundPageProps} from '@/configuration/Shared/schema';


export default function NotFoundPage({ type, slug }: NotFoundPageProps) {
  const typeText = type === 'category' ? 'Category' : 'Tag';
  const typeIcon = type === 'category' ? '📂' : '🏷️';

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="text-8xl mb-4">🔍</div>
          <div className="text-6xl opacity-50">{typeIcon}</div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          {typeText} Not Found
        </h1>
        
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          We couldn't find the {type} <span className="text-blue-400 font-semibold">"{slug}"</span> you're looking for.
          <br />
          It might have been moved, deleted, or doesn't exist.
        </p>

        {/* Suggestions */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">What you can do:</h3>
          <ul className="text-gray-300 space-y-2 text-left">
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              Check the spelling of the {type} name
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              Browse all articles to find what you're looking for
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              Use the search function to find related content
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              Go back to the homepage
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/articles"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse All Articles
          </Link>
          
          <Link 
            href="/"
            className="px-8 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Back to Homepage
          </Link>
        </div>

        {/* Popular Categories/Tags */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">
            Popular {type === 'category' ? 'Categories' : 'Tags'}
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {type === 'category' ? (
              <>
                <Link href="/articles/category/machine-learning" className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                  Machine Learning
                </Link>
                <Link href="/articles/category/ai" className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                  AI
                </Link>
                <Link href="/articles/category/technology" className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                  Technology
                </Link>
                <Link href="/articles/category/programming" className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                  Programming
                </Link>
              </>
            ) : (
              <>
                <Link href="/articles/tag/python" className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-green-600 hover:text-white transition-colors">
                  #python
                </Link>
                <Link href="/articles/tag/javascript" className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-green-600 hover:text-white transition-colors">
                  #javascript
                </Link>
                <Link href="/articles/tag/react" className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-green-600 hover:text-white transition-colors">
                  #react
                </Link>
                <Link href="/articles/tag/nodejs" className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-green-600 hover:text-white transition-colors">
                  #nodejs
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}