// ========== COMPOSED INTERFACES ==========

// Category interface
export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

// Tag interface
export interface Tag {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

// Simple category reference (for backward compatibility)
export interface SimpleCategoryRef {
  name: string;
  slug: string;
}

// Simple tag reference (for backward compatibility)
export interface SimpleTagRef {
  name: string;
  slug: string;
}

// Directus tag wrapper
export interface DirectusTagWrapper {
  Tags_id: Tag;
}

// Core Article interface (runtime shape used by components)
export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  published_at: string;
  date_created: string;
  author?: string;
  featured_images?: Array<{
    images_id: {
      id: string;
      path: string;
      alt_text?: string;
    };
  }>;
  categories: Category;
  tags: Array<DirectusTagWrapper>;
  // Additional fields for compatibility with different components
  category?: SimpleCategoryRef;
}

// Simplified Article interface for components that use simpler tag structure
export interface SimpleArticle {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  published_at: string;
  date_created: string;
  author?: string;
  featured_images?: Array<{
    images_id: {
      id: string;
      path: string;
      alt_text?: string;
    };
  }>;
  category?: SimpleCategoryRef;
  tags?: Array<SimpleTagRef>;
}

// Author interface (reserved for future use)
export interface Author {
  id: string;
  slug: string;
  name: string;
  email?: string;
  bio?: string;
  avatar?: string;
  description?: string;
}