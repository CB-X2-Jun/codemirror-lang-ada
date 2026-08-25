import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const external = [
  "@codemirror/language",
  "@lezer/highlight",
  "@lezer/lr",
  "@lezer/common"
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "es",
        sourcemap: true
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: true
      }
    ],
    external,
    plugins: [nodeResolve(), typescript()]
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es"
      },
      {
        file: "dist/index.d.cts",
        format: "cjs"
      }
    ],
    external,
    plugins: [dts()]
  }
];
