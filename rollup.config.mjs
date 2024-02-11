import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";

/* eslint-disable import/no-anonymous-default-export */
export default {
  input: "dist/index.js",
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm",
    },
  ],
  external: [
    "react",
    "react-dom",
    "@tanstack/react-query",
    "superjson",
    "fast-equals",
    "socket.io-client",
  ],
  plugins: [
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
    terser(),
  ],
};
