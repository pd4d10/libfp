// @ts-check
import fs from "node:fs";
import { defineConfig } from "vite";

const entries = fs
  .readdirSync("./src")
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => `./src/${file}`);

export default defineConfig({
  build: {
    lib: {
      entry: entries,
      formats: ["es"],
    },
    minify: false,
  },
});
