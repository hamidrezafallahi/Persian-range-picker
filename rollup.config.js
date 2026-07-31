import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/persian-range-picker.umd.js",
      format: "umd",
      name: "PersianRangePicker",
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "jalaali-js": "jalaali",
        "react/jsx-runtime": "jsxRuntime",
      },
      sourcemap: true,
    },
    {
      file: "dist/persian-range-picker.es.js",
      format: "esm",
    },
  ],
  external: ["react", "react-dom", "jalaali-js", "react/jsx-runtime"],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      inject: true,
      minimize: true,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
  ],
};
