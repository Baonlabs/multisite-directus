import { BaseEntity, ContentFields, MediaFields, TimestampFields } from "./base";

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

// Directus image reference for featured_images
export interface DirectusImageRef {
  id: string;
  path: string;
  alt_text?: string;
}

// Directus tag wrapper for API response
export interface DirectusTagWrapperResponse {
  Tags_id: DirectusTagRef;
}

// Directus featured_images wrapper for API response
export interface DirectusImageWrapperResponse {
  featured_images_id: DirectusImageRef;
}

// API Response interface for Directus
export interface DirectusArticle extends BaseEntity, ContentFields, MediaFields, TimestampFields {
  status: string;
  category_id: DirectusCategoryRef;
  tags: Array<DirectusTagWrapperResponse>;
}