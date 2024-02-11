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
    "react/jsx-runtime",
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
  onwarn: function (warning, warn) {
    // Skip certain warnings
    // Ignore "THIS_IS_UNDEFINED" warnings
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }
    // Ignore "UNRESOLVED_IMPORT" warnings
    // if (
    //   warning.code === "UNRESOLVED_IMPORT" &&
    //   warning.source === "react/jsx-runtime"
    // ) {
    //   return;
    // }
    // Log other warnings as usual
    warn(warning);
  },
};
