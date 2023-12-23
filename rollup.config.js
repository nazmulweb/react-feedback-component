import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import sass from "rollup-plugin-sass";

import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      // typescript({ useTsconfigDeclarationDir: true }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
      sass({
        insert: true,
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      // external({
      //   includeDependencies: true,
      // }),
      // nodeResolve(),
      // terser(),
      // postcss(),
      // sass({
      //   insert: true,
      // }),
      // typescript({ useTsconfigDeclarationDir: true }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
    external: [/\.(css|less|scss)$/],
  },
];
