import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // 👇 Tắt rule cảnh báo dấu nháy đơn trong JSX
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // (Tùy chọn) Bạn có thể thêm các rule khác ở đây nếu cần:
      // "no-console": "warn",
      // "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
];

export default eslintConfig;
