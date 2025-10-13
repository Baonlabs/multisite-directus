# Multisite Directus

Một ứng dụng Next.js đa trang web (multisite) được tích hợp với Directus CMS, cho phép quản lý nội dung cho nhiều domain khác nhau từ một codebase duy nhất.

## 🚀 Tính năng

- **Multisite Architecture**: Hỗ trợ nhiều domain với cấu hình riêng biệt
- **Directus CMS Integration**: Quản lý nội dung thông qua Directus headless CMS
- **Dynamic Content**: Bài viết, danh mục, tags được quản lý động từ database
- **Responsive Design**: Giao diện responsive với Tailwind CSS
- **TypeScript**: Fully typed với TypeScript
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS 4

## 📋 Yêu cầu hệ thống

- Node.js 18.0 hoặc cao hơn
- npm, yarn, pnpm hoặc bun
- Directus instance (local hoặc cloud)

---

# 🛠️ HƯỚNG DẪN CÀI ĐẶT

## Bước 1: Clone và cài đặt dependencies

```bash
# Clone repository
git clone https://github.com/Baonlabs/multisite-directus.git
cd multisite-directus

# Cài đặt dependencies
npm install
# hoặc yarn install / pnpm install / bun install
```

## Bước 2: Cấu hình môi trường

Sao chép file `.env.example` thành `.env.local`:

```bash
cp .env.example .env.local
```

Chỉnh sửa file `.env.local` với thông tin của bạn:

```env
# Directus Configuration
DIRECTUS_URL=http://localhost:8055
DIRECTUS_API_TOKEN=your_directus_api_token_here

# Domain Configuration for Multisite
DOMAIN_1=localhost
DOMAIN_2=example.com

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Bước 3: Cấu hình Directus

### Cài đặt Directus (nếu chưa có)

```bash
# Cài đặt Directus CLI
npm install -g @directus/cli

# Tạo project Directus mới
npx create-directus-project my-directus-project

# Hoặc sử dụng Docker
docker run -d \
  --name directus \
  -p 8055:8055 \
  -e KEY=replace-with-random-value \
  -e SECRET=replace-with-random-value \
  -e DB_CLIENT=sqlite3 \
  -e DB_FILENAME=/directus/database/data.db \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=password \
  -v directus_data:/directus/database \
  directus/directus
```

### Tạo Collections trong Directus

Tạo các collections sau trong Directus Admin Panel:

1. **Sites**
   - `id` (Integer, Primary Key)
   - `name` (String)
   - `url` (String)
   - `tagline` (String, optional)
   - `description` (Text, optional)
   - `logo` (Integer, optional, relation to directus_files)
   - `favicon` (Integer, optional, relation to directus_files)

2. **Contents**
   - `id` (Integer, Primary Key)
   - `type` (String: article, page, etc.)
   - `title` (String)
   - `slug` (String, unique)
   - `status` (String: draft, published, archived)
   - `content` (Text, optional)
   - `blocks` (JSON, optional)
   - `published_at` (DateTime, optional)
   - `site_id` (Integer, Many-to-One relation với Sites)
   - `author_id` (Integer, Many-to-One relation với Users)
   - `category_id` (Integer, optional, Many-to-One relation với Categories)
   - `tags` (Alias, Many-to-Many relation to Tags)

3. **Forms**
   - `id` (Integer, Primary Key)
   - `title` (String)
   - `fields` (JSON)
   - `site_id` (Integer, Many-to-One relation với Sites)

4. **Navigation**
   - `id` (Integer, Primary Key)
   - `key` (String)
   - `is_active` (Boolean)
   - `site_id` (Integer, Many-to-One relation với Sites)

5. **NavigationItems**
   - `id` (Integer, Primary Key)
   - `title` (String)
   - `link` (String)
   - `sort` (Integer)
   - `type` (String: internal, external)
   - `navigation_id` (Integer, Many-to-One relation với Navigation)
   - `parent_id` (Integer, optional, Many-to-One relation với NavigationItems)

6. **Categories**
   - `id` (Integer, Primary Key)
   - `name` (String)
   - `slug` (String, unique)
   - `description` (Text, optional)
   - `parent_id` (Integer, optional, Many-to-One relation với Categories)

7. **Tags**
   - `id` (Integer, Primary Key)
   - `name` (String)
   - `slug` (String, unique)

8. **Comments**
    - `id` (Integer, Primary Key)
    - `content_id` (Integer, Many-to-One relation với Contents)
    - `user_id` (Integer, optional, Many-to-One relation với Users)
    - `guest_name` (String, optional)
    - `content` (Text)
    - `created_at` (DateTime)
    - `status` (String: pending, approved, rejected)

### Tạo API Token

1. Vào Directus Admin Panel
2. Đi đến Settings > Access Tokens
3. Tạo token mới với quyền đọc cho các collections
4. Copy token và paste vào file `.env.local`

---

# 🚀 CÁCH SỬ DỤNG

## Chạy ứng dụng

### Development mode

```bash
npm run dev
# hoặc yarn dev / pnpm dev / bun dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Production build

```bash
# Build ứng dụng
npm run build

# Chạy production server
npm run start
```

## Scripts có sẵn

- `npm run dev` - Chạy development server với Turbopack
- `npm run build` - Build ứng dụng cho production với Turbopack
- `npm run start` - Chạy production server
- `npm run lint` - Chạy ESLint

## API Endpoints

Project sử dụng các API endpoints sau từ Directus:

- `GET /articles` - Lấy danh sách bài viết
- `GET /articles/:slug` - Lấy bài viết theo slug
- `GET /categories` - Lấy danh sách danh mục
- `GET /tags` - Lấy danh sách tags
- `GET /articles/category/:category` - Lấy bài viết theo danh mục
- `GET /articles/tag/:tag` - Lấy bài viết theo tag

---

# 🏗️ CẤU TRÚC PROJECT

```
multisite-directus/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [slug]/            # Dynamic routes cho bài viết
│   │   ├── articles/          # Trang danh sách bài viết
│   │   ├── about/             # Trang giới thiệu
│   │   ├── contact/           # Trang liên hệ
│   │   └── layout.tsx         # Layout chính
│   ├── configuration/         # Cấu hình cho từng site
│   │   ├── Shared/           # Components và schema chung
│   │   └── TechNova/         # Cấu hình cho TechNova site
│   ├── lib/                  # Utilities và API calls
│   │   ├── directus.ts       # Directus client setup
│   │   └── directus-queries.ts # API queries
│   └── ultility/             # Utility functions
├── .env.example             # Template cho environment variables
└── README.md               # Tài liệu này
```

## Multisite Architecture

Project này hỗ trợ nhiều domain thông qua logic switch-case trong các page components. Mỗi domain có thể có:

- Layout riêng biệt
- Components riêng biệt  
- Styling riêng biệt
- Content filtering riêng biệt

Cơ chế hoạt động:
- Mỗi page component sẽ đọc hostname từ request headers
- Sử dụng switch-case để kiểm tra hostname và render component tương ứng
- Mỗi domain sẽ có bộ components riêng trong thư mục `src/configuration/`

---

# 🎨 CUSTOMIZATION & MỞ RỘNG

## Thêm Domain Mới

### 1. Cấu hình Environment
Bạn cần thêm domain mới vào file cấu hình môi trường `.env.local` với tên biến như `DOMAIN_3`, `DOMAIN_4`, v.v.

### 2. Tạo Configuration Folder
Tạo một thư mục cấu hình mới trong `src/configuration/` với tên site của bạn. Trong thư mục này, tạo các folder con:
- `components/` - chứa các React components riêng cho site này
- `styles/` - chứa CSS/styling riêng cho site này

Các components cần thiết bao gồm HomePage, ArticlesPage, Layout và các components khác tùy theo nhu cầu.

### 3. Cập nhật Page Components
Cập nhật logic routing trong các file page components (như `page.tsx`, `layout.tsx`) để thêm case xử lý cho domain mới. Sử dụng switch-case hoặc if-else để kiểm tra hostname và render component tương ứng.

## Thêm Page Mới

### 1. Tạo Page Component
Tạo một thư mục mới trong `src/app/` với tên trang bạn muốn (ví dụ: `new-page`, `services`, `portfolio`).

### 2. Tạo file page.tsx
Trong thư mục vừa tạo, tạo file `page.tsx` với logic:
- Import thư viện `headers` từ Next.js để lấy thông tin hostname
- Sử dụng switch-case để kiểm tra hostname và render component tương ứng cho từng site
- Có component mặc định cho trường hợp hostname không khớp

### 3. Tạo Components cho từng Site
Trong thư mục configuration của từng site, tạo component riêng cho trang mới này. Mỗi component sẽ có nội dung và styling phù hợp với từng site.

## Thêm Layout Mới

### 1. Tạo Layout Component
Trong thư mục configuration của site mới, tạo component Layout với cấu trúc:
- Header (navigation, logo, menu)
- Main content area (nơi hiển thị children)
- Footer (thông tin liên hệ, links, copyright)

### 2. Cập nhật Root Layout
Chỉnh sửa file `src/app/layout.tsx` để thêm case xử lý cho domain mới, render layout component tương ứng dựa trên hostname.

## Thêm Content Type Mới

### 1. Tạo Collection trong Directus
Vào Directus Admin Panel và tạo collection mới (ví dụ: Products, Services, Portfolio). Định nghĩa các fields cần thiết như:
- ID (Primary Key)
- Tên/tiêu đề
- Mô tả/nội dung
- Các trường khác tùy theo loại content (giá, hình ảnh, ngày tạo, v.v.)

### 2. Thêm TypeScript Interface
Trong file schema (`src/configuration/Shared/schema/index.ts`), định nghĩa interface TypeScript cho content type mới với các properties tương ứng với fields trong Directus.

### 3. Tạo API Queries
Trong file `src/lib/directus-queries.ts`, tạo các functions để:
- Lấy danh sách tất cả items
- Lấy item theo ID hoặc slug
- Lọc items theo điều kiện
- Sắp xếp và phân trang

Sử dụng Directus SDK với các methods như `readItems`, `readItem` và các options như `filter`, `sort`, `limit`.

### 4. Tạo Pages và Components
Tạo các trang và components để hiển thị content type mới:
- Trang danh sách (list page)
- Trang chi tiết (detail page)
- Components hiển thị từng item
- Components filter/search nếu cần

---

# 📚 TÀI LIỆU THAM KHẢO

- [Next.js Documentation](https://nextjs.org/docs)
- [Directus Documentation](https://docs.directus.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

# 🤝 CONTRIBUTING

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

---

# 📄 LICENSE & SUPPORT

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue trên GitHub repository.
