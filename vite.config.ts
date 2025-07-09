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
      external: ["react", "react-dom"], // React جدا بمونه و تکراری نشه
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
