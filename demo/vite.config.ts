import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => ({
  root: __dirname,
  // gh-pages needs the repo base path; local `yarn dev:demo` must use `/`
  base: command === "build" ? "/Persian-range-picker/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "../src"),
    },
  },
  server: {
    port: 5174,
    open: true,
  },
}));
