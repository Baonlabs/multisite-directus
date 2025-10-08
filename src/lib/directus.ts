import { createDirectus, rest, staticToken } from '@directus/sdk';

const DIRECTUS_API_TOKEN = process.env.DIRECTUS_API_TOKEN || '';
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
// Khởi tạo Directus client với cú pháp mới
const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_API_TOKEN))
  .with(rest());


export default client;
