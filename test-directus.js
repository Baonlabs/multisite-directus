const { createDirectus, rest, staticToken, readItems } = require('@directus/sdk');

// Load environment variables
require('dotenv').config();

const DIRECTUS_API_TOKEN = process.env.DIRECTUS_API_TOKEN || '';
const DIRECTUS_URL = process.env.DIRECTUS_API_URL || 'http://localhost:8055';

console.log('🔧 Directus Configuration:');
console.log('URL:', DIRECTUS_URL);
console.log('Token exists:', !!DIRECTUS_API_TOKEN);
console.log('Token length:', DIRECTUS_API_TOKEN.length);
console.log('Token preview:', DIRECTUS_API_TOKEN.substring(0, 10) + '...');

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_API_TOKEN))
  .with(rest());

async function testConnection() {
  try {
    console.log('\n🚀 Testing Directus connection...');
    
    // Test 1: Kiểm tra server status
    console.log('\n1. Testing server status...');
    const serverInfo = await client.request(() => ({
      path: '/server/info',
      method: 'GET'
    }));
    console.log('✅ Server is running:', serverInfo.project?.project_name || 'Unknown');
    
    // Test 2: Kiểm tra authentication
    console.log('\n2. Testing authentication...');
    const me = await client.request(() => ({
      path: '/users/me',
      method: 'GET'
    }));
    console.log('✅ Authentication successful:', me.email);
    
    // Test 3: Liệt kê các collections
    console.log('\n3. Listing available collections...');
    const collections = await client.request(() => ({
      path: '/collections',
      method: 'GET'
    }));
    console.log('📋 Available collections:');
    collections.data.forEach(col => {
      console.log(`  - ${col.collection} (${col.meta?.note || 'No description'})`);
    });
    
    // Test 4: Thử truy cập collection posts
    console.log('\n4. Testing posts collection access...');
    try {
      const posts = await client.request(readItems('posts', { limit: 1 }));
      console.log('✅ Posts collection accessible, found', posts.length, 'items');
      if (posts.length > 0) {
        console.log('📄 Sample post:', {
          id: posts[0].id,
          title: posts[0].title || 'No title',
          slug: posts[0].slug || 'No slug'
        });
      }
    } catch (postsError) {
      console.log('❌ Posts collection error:', postsError.message);
      
      // Thử tạo collection posts nếu không tồn tại
      if (postsError.message.includes('doesn\'t exist')) {
        console.log('\n5. Creating posts collection...');
        try {
          await client.request(() => ({
            path: '/collections',
            method: 'POST',
            body: JSON.stringify({
              collection: 'posts',
              meta: {
                note: 'Blog posts collection'
              },
              fields: [
                {
                  field: 'id',
                  type: 'integer',
                  meta: {
                    hidden: true,
                    readonly: true
                  },
                  schema: {
                    is_primary_key: true,
                    has_auto_increment: true
                  }
                },
                {
                  field: 'title',
                  type: 'string',
                  meta: {
                    required: true
                  }
                },
                {
                  field: 'slug',
                  type: 'string',
                  meta: {
                    required: true
                  }
                },
                {
                  field: 'content',
                  type: 'text'
                },
                {
                  field: 'status',
                  type: 'string',
                  meta: {
                    default_value: 'draft'
                  }
                },
                {
                  field: 'date_created',
                  type: 'datetime',
                  meta: {
                    special: ['date-created'],
                    readonly: true
                  }
                }
              ]
            })
          }));
          console.log('✅ Posts collection created successfully!');
          
          // Tạo sample post
          const samplePost = await client.request(() => ({
            path: '/items/posts',
            method: 'POST',
            body: JSON.stringify({
              title: 'Sample Blog Post',
              slug: 'sample-blog-post',
              content: 'This is a sample blog post created for testing.',
              status: 'published'
            })
          }));
          console.log('✅ Sample post created:', samplePost.id);
          
        } catch (createError) {
          console.log('❌ Failed to create posts collection:', createError.message);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('Full error:', error);
  }
}

testConnection();