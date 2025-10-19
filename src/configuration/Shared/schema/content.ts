// ========== CONTENT AND RENDERING TYPES ==========

export interface SeoJson {
  [key: string]: any;
}

export type JsonNode = {
  tag: string;
  className?: string;
  props?: Record<string, any>;
  children?: string | JsonNode[];
};