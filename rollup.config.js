import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import sass from "rollup-plugin-sass";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      external({
        includeDependencies: true,
      }),
      nodeResolve(),
      terser(),
      postcss(),
      sass({
        insert: true,
      }),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  },
];
