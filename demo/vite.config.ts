import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => ({
  root: __dirname,
  // gh-pages needs the repo base path; local `yarn dev:demo` must use `/`
  base: command === "build" ? "/react-persian-range-picker/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "../src"),
    },
  },
  // Ensure SEO static files under public/ are copied into demo/dist
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    open: true,
  },
}));
