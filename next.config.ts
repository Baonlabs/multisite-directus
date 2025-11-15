import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cho phép nhiều origin trong môi trường development truy cập tài nguyên /_next/*
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://bao1.test:3000",
    "http://bao2.test:3000",
  ],
  // Cấu hình cho development với multiple domains
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
  
  // Cấu hình headers để xử lý cross-origin requests
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
