import { Article, SimpleArticle, Category, Tag } from "./entities";

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