import { BaseEntity, DescriptionField, ContentFields, TimestampFields, AuthorFields, ContactFields, MediaFields } from "./base";

// ========== COMPOSED INTERFACES ==========

// Featured image interface - composed from base interfaces
export interface FeaturedImage extends BaseEntity, DescriptionField {
  path: string;
  alt_text?: string;
}

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
export interface Article extends BaseEntity, ContentFields, TimestampFields, AuthorFields, MediaFields {
  categories: Category;
  tags: Array<DirectusTagWrapper>;
  // Additional fields for compatibility with different components
  category?: SimpleCategoryRef;
}

// Simplified Article interface for components that use simpler tag structure
export interface SimpleArticle extends BaseEntity, TimestampFields, AuthorFields, MediaFields {
  title: string;
  excerpt?: string;
  category?: SimpleCategoryRef;
  tags?: Array<SimpleTagRef>;
}

// Author interface (for future use) - composed from base interfaces
export interface Author extends BaseEntity, ContactFields {
  name: string;
}