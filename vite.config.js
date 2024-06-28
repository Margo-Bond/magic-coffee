import { defineConfig } from "vite";
import path from "path";
import svgString from "vite-plugin-svgstring";

export default defineConfig({
  plugins: [svgString()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["**/*.+(jpg|jpeg|png|svg)"],
  },
});
