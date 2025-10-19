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