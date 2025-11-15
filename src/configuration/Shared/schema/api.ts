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

// Directus featured_images wrapper for API response (not used directly)
export interface DirectusImageWrapperResponse {
  featured_images_id: DirectusImageRef;
}

// API Response interface for Directus (inline fields, no base.ts dependency)
export interface DirectusArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  featured_images?: Array<{
    images_id: {
      id: string;
      path: string;
      alt_text?: string;
    };
  }>;
  published_at: string;
  date_created: string;
  status: string;
  category_id: DirectusCategoryRef;
  tags: Array<DirectusTagWrapperResponse>;
}