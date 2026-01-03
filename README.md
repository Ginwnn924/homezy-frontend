# Homezy Frontend

Dự án Frontend cho nền tảng Homezy, được xây dựng với React, TypeScript và Vite.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animation**: Framer Motion
- **Icons**: FontAwesome
- **Routing**: React Router DOM
- **State Management**: (Zustand/Context - *dự kiến*)
- **Internationalization**: i18next, react-i18next

## 📂 Cấu Trúc Thư Mục

Dự án được tổ chức theo kiến trúc hướng tính năng (Feature-based Architecture) để đảm bảo khả năng mở rộng và dễ bảo trì.

```
src/
├── assets/             # Tài nguyên tĩnh (ảnh, fonts, icons)
├── components/         # Các component dùng chung (Shared UI)
│   ├── ui/             # Các component cơ bản, độc lập (Button, Input, Modal...)
│   └── common/         # Các component nghiệp vụ dùng nhiều nơi (Header, Footer...)
├── config/             # Cấu hình môi trường, constants (env variables...)
├── features/           # Cốt lõi: Chia code theo tính năng (Domain Driven)
│   └── [feature-name]/ # Ví dụ: auth, products, cart...
│       ├── api/        # API calls riêng cho feature này
│       ├── components/ # Components chỉ dùng trong feature này
│       ├── hooks/      # Hooks riêng cho feature này
│       ├── routes/     # Routes con của feature
│       ├── types/      # Types riêng cho feature
│       └── index.ts    # Public API của feature
├── hooks/              # Custom hooks dùng chung toàn app (useScrollPosition...)
├── i18n/               # Cấu hình đa ngôn ngữ (locales en/vi)
├── layouts/            # Các bố cục trang (MainLayout, AuthLayout...)
├── lib/                # Cấu hình thư viện bên thứ 3 (axios, firebase...)
├── providers/          # Các Context Providers (ThemeProvider, AuthProvider...)
├── routes/             # Cấu hình routing chính của App
├── stores/             # Quản lý state toàn cục (Zustand, Redux, Context)
├── types/              # TypeScript types/interfaces dùng chung
├── utils/              # Các hàm tiện ích (cn, formatDate, animations...)
├── App.tsx             # Component gốc, setup providers/routes
└── main.tsx            # Entry point
```

## 📝 Chi Tiết Các Thư Mục

### 1. `src/features/` (Quan trọng nhất)
Thay vì gom tất cả components vào một chỗ, chúng ta chia theo **tính năng**. Mỗi feature là một module khép kín.
*   **Lợi ích**: Dễ quản lý, dễ xóa hoặc refactor một tính năng mà không ảnh hưởng toàn bộ app.

### 2. `src/components/`
*   **ui/**: Chứa các "Dumb components" (chỉ hiển thị, không logic nghiệp vụ) như Button, Input. Có thể tái sử dụng cho mọi dự án.
*   **common/**: Chứa các components có logic nghiệp vụ của Homezy nhưng được dùng ở nhiều trang, ví dụ: `Header`, `Footer`, `ProductCard`.

### 3. `src/lib/` vs `src/utils/`
*   **lib/**: Nơi cấu hình các thư viện. Ví dụ: tạo instance của axios, cấu hình firebase app.
*   **utils/**: Các hàm thuần túy (pure functions) để xử lý logic nhỏ. Ví dụ: `cn()` để merge class Tailwind, hàm format tiền tệ.

### 4. `src/providers/`
Nơi đặt các Global Context. Ví dụ: `AuthProvider` để bọc toàn bộ ứng dụng và cung cấp thông tin user đăng nhập.

## 🚀 Cài Đặt & Chạy Dự Án

1.  **Cài đặt dependencies:**
    ```bash
    npm install
    # hoặc
    yarn install
    ```

2.  **Chạy môi trường dev:**
    ```bash
    npm run dev
    ```

3.  **Build production:**
    ```bash
    npm run build
    ```

4.  **Lint code:**
    ```bash
    npm run lint
    ```
