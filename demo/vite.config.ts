import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  root: __dirname,
  base: "/Persian-range-picker/",
  plugins: [react()],
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "../src"),
    },
  },
});
