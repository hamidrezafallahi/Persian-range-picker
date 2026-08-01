import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "PersianRangePicker",
      formats: ["es", "umd"],
      fileName: (format) => `persian-range-picker.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "jalaali-js"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "jalaali-js": "jalaali",
        },
      },
    },
  },
});
