import client from "@/lib/directus";
import { readItems } from '@directus/sdk';

// Fetch articles cho PopularArticles component
export async function getPopularArticles(limit: number = 6) {
  try {
    const articles = await client.request(
      readItems('Contents', {
        limit,
        sort: ['-published_at'],
        filter: {
          status: { _eq: 'published' },
          type: { _eq: "post" }
        },
        fields: [
          'id', 
          'title', 
          'slug', 
          'content',
          'excerpt',
          'published_at', 
          'categories.id',
          'categories.name',
          'categories.slug',
          'author_id.id',
          'author_id.name',
          'author_id.email',
          'featured_images.images_id.id',
          'featured_images.images_id.path',
          'featured_images.images_id.alt_text',
        ]
      })
    );
    // console.log('Popular articles:', articles);
    return articles;
  } catch (error) {
    console.error('Error fetching popular articles:', error);
    return [];
  }
}


// Fetch stats cho Stats component
export async function getStats() {
  try {
    const stats = await client.request(
      readItems('site_stats', {
        limit: 1,
        sort: ['-date_created'],
        fields: ['articles_count', 'users_count', 'downloads_count', 'countries_count']
      })
    );
    return stats[0] || null;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}
// Fetch articles theo category
export async function getArticlesByCategory(categorySlug: string, page: number = 1, limit: number = 12) {
  try {
    const articles = await client.request(
      readItems('Contents', {
        limit,
        offset: (page - 1) * limit,
        sort: ['-published_at'],
        filter: {
          status: { _eq: 'published' },
          categories: {
            slug: { _eq: categorySlug }
          }
        },
        fields: [
          'id', 
          'title', 
          'slug', 
          'content',
          'excerpt',
          'published_at', 
          'categories.id',
          'categories.name',
          'categories.slug',
          'author_id.id',
          'author_id.name',
          'author_id.email',
          'featured_images.images_id.id',
          'featured_images.images_id.path',
          'featured_images.images_id.alt_text',
        ]
      })
    );
    return articles;
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

// Fetch articles theo tag
export async function getArticlesByTag(tagSlug: string, page: number = 1, limit: number = 12) {
  try {
    const articles = await client.request(
      readItems('Contents', {
        limit,
        offset: (page - 1) * limit,
        sort: ['-published_at'],
        filter: {
          status: { _eq: 'published' },
          tags: {
            Tags_id: {
              slug: { _eq: tagSlug }
            }
          }
        },
        fields: [
          'id', 
          'title', 
          'slug', 
          'content',
          'excerpt',
          'published_at', 
          'categories.id',
          'categories.name',
          'categories.slug',
          'author_id.id',
          'author_id.name',
          'author_id.email',
          'tags.Tags_id.id',
          'tags.Tags_id.name',
          'tags.Tags_id.slug',
          'featured_images.images_id.id',
          'featured_images.images_id.path',
          'featured_images.images_id.alt_text',
        ]
      })
    );
    return articles;
  } catch (error) {
    console.error('Error fetching articles by tag:', error);
    return [];
  }
}

// Fetch category info by slug
export async function getCategoryBySlug(categorySlug: string) {
  try {
    const categories = await client.request(
      readItems('Categories', {
        filter: { slug: { _eq: categorySlug } },
        fields: ['id', 'name', 'description', 'slug']
      })
    );
    return categories[0] || null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

// Fetch tag info by slug
export async function getTagBySlug(tagSlug: string) {
  try {
    const tags = await client.request(
      readItems('Tags', {
        filter: { slug: { _eq: tagSlug } },
        fields: ['id', 'name', 'slug', 'description']
      })
    );
    return tags[0] || null;
  } catch (error) {
    console.error('Error fetching tag by slug:', error);
    return null;
  }
}

// Fetch related articles by category
export async function getRelatedArticles(categoryId: string, currentArticleId: string, limit: number = 3) {
  try {
    const articles = await client.request(
      readItems('Contents', {
        limit,
        sort: ['-published_at'],
        filter: {
          status: { _eq: 'published' },
          categories: { _eq: categoryId },
          id: { _neq: currentArticleId }
        },
        fields: [
          'id', 
          'title', 
          'slug', 
          'excerpt',
          'published_at',
          'categories.id',
          'categories.name',
          'categories.slug',
          'author_id.id',
          'author_id.name',
          'author_id.email',
          'featured_images.images_id.id',
          'featured_images.images_id.path',
          'featured_images.images_id.alt_text',
        ]
      })
    );
    return articles;
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

// Fetch single article by slug
export async function getPostBySlug(slug: string) {
  try {
    const posts = await client.request(
      readItems('Contents', {
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' }
        },
        fields: [
          'id',
          'title',
          'slug',
          'content',
          'excerpt',
          'published_at',
          'categories.id',
          'categories.name',
          'categories.slug',
          'tags.Tags_id.id',
          'tags.Tags_id.name',
          'tags.Tags_id.slug',
          'featured_images.images_id.id',
          'featured_images.images_id.path',
          'featured_images.images_id.alt_text',

        ]
      })
    );
    return posts?.[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch all articles without pagination (for articles page)
export async function getAllArticles() {
  try {
    const articles = await client.request(
      readItems('Contents', {
        filter: {
          status: { _eq: 'published' }
        },
        fields: [
          'id',
          'title',
          'slug',
          'content',
          'excerpt',
          'published_at',
          'categories.id',
          'categories.name',
          'categories.slug',
          'tags.Tags_id.id',
          'tags.Tags_id.name',
          'tags.Tags_id.slug',
          'featured_images.images_id.id',
          'featured_images.images_id.path',
          'featured_images.images_id.alt_text',
        ],
        sort: ['-published_at']
      })
    );
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Fetch all tags
export async function getAllTags() {
  try {
    const tags = await client.request(
      readItems('Tags', {
        sort: ['name'],
        fields: ['id', 'name', 'slug']
      })
    );
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}
// Fetch categories cho ExploreCategories
export async function getCategories() {
  try {
    const categories = await client.request(
      readItems('Categories', {
        sort: ['name'],
        fields: ['id', 'name', 'description','slug']
      })
    );
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getMetadataBySite(hostname: string) {
  try {
    const meta = await client.request(
      readItems('Sites', {
        filter: {
          url: { _eq: hostname }
        },
        fields: ['id', 'name', 'description','title']
      })
    );
    return meta?.[0] || null;
  } catch (error) {
    console.error('Error fetching meta:', error);
    return null;
  }
}
