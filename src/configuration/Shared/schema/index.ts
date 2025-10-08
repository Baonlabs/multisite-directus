// Common interfaces for the TechNova application
// This file contains all shared type definitions used across components

// ========== BASE/ATOMIC INTERFACES ==========

// Base entity interface - common fields for all entities
export interface BaseEntity {
  id: string;
  slug: string;
}

// Content fields interface
export interface ContentFields {
  title: string;
  content: string;
  excerpt?: string;
}

// Media fields interface
export interface MediaFields {
  featured_image?: string;
}

// Timestamp fields interface
export interface TimestampFields {
  published_at: string;
  date_created: string;
}

// Author fields interface
export interface AuthorFields {
  author?: string;
}

// Description field interface
export interface DescriptionField {
  description?: string;
}

// Contact fields interface
export interface ContactFields {
  email?: string;
  bio?: string;
  avatar?: string;
}

// ========== COMPOSED INTERFACES ==========

// Category interface - composed from base interfaces
export interface Category extends BaseEntity, DescriptionField {
  name: string;
}

// Tag interface - composed from base interfaces
export interface Tag extends BaseEntity, DescriptionField {
  name: string;
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

// Core Article interface - composed from multiple base interfaces
export interface Article extends BaseEntity, ContentFields, MediaFields, TimestampFields, AuthorFields {
  category_id: Category;
  tags: Array<DirectusTagWrapper>;
  // Additional fields for compatibility with different components
  category?: SimpleCategoryRef;
}

// Simplified Article interface for components that use simpler tag structure
export interface SimpleArticle extends BaseEntity, MediaFields, TimestampFields, AuthorFields {
  title: string;
  excerpt?: string;
  category?: SimpleCategoryRef;
  tags?: Array<SimpleTagRef>;
}

// Author interface (for future use) - composed from base interfaces
export interface Author extends BaseEntity, ContactFields {
  name: string;
}

// ========== COMPONENT PROPS INTERFACES ==========

export interface ArticlesPageProps {
  articles?: Article[];
  categories?: Category[];
  tags?: Tag[];
}

export interface CategoryPageProps {
  articles: SimpleArticle[];
  categoryInfo: Category | null;
  categorySlug: string;
}

export interface TagPageProps {
  articles: SimpleArticle[];
  tagInfo: Tag | null;
  tagSlug: string;
}

export interface ArticleDetailPageProps {
  article: Article;
}

// ========== API RESPONSE INTERFACES ==========

// Directus category reference
export interface DirectusCategoryRef {
  id: string;
  name: string;
  slug: string;
}

// Directus tag reference
export interface DirectusTagRef {
  id: string;
  name: string;
  slug: string;
}

// Directus tag wrapper for API response
export interface DirectusTagWrapperResponse {
  Tags_id: DirectusTagRef;
}

// API Response interface for Directus
export interface DirectusArticle extends BaseEntity, ContentFields, MediaFields, TimestampFields {
  status: string;
  category_id: DirectusCategoryRef;
  tags: Array<DirectusTagWrapperResponse>;
}

// ========== NAVIGATION AND UI INTERFACES ==========

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  active?: boolean;
}

export interface TrendingTopic {
  id: number;
  title: string;
  category: string;
  readTime: string;
}

// Stats interface for hero sections
export interface Stats {
  articles: number;
  readers: string;
  authors: number;
}

export interface NotFoundPageProps {
  type: 'category' | 'tag';
  slug: string;
}