import { NextResponse } from 'next/server';
import client from '@/lib/directus';
import { readItems } from '@directus/sdk';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() || '';
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? Math.min(Number(limitParam) || 10, 25) : 10;

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    const articles = await client.request(
      readItems('Contents', {
        limit,
        sort: ['-published_at'],
        filter: {
          status: { _eq: 'published' },
          type: { _eq: 'post' },
          title: { _contains: q }
        },
        fields: [
          'id',
          'title',
          'slug',
          'categories.name',
          'categories.slug',
          'featured_images.images_id.path',
          'featured_images.images_id.alt_text'
        ]
      })
    );

    // Normalize the response shape
    const results = (articles || []).map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      category: a?.categories ? { name: a.categories.name, slug: a.categories.slug } : null,
      thumbnail: a?.featured_images?.[0]?.images_id?.path || null,
      alt: a?.featured_images?.[0]?.images_id?.alt_text || ''
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ results: [], error: 'SEARCH_FAILED' }, { status: 500 });
  }
}