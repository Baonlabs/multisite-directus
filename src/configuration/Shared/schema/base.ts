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
  featured_images?: Array<{
    images_id: {
      id: string;
      path: string;
      alt_text?: string;
    };
  }>;
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