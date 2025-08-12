import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

// این دو خط برای تعریف __dirname در ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: __dirname,
  base: "/Persian-range-picker/", // اسم ریپوی خودت
  plugins: [react()],
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "../src"), // مسیر src اصلی
    },
  },
});
