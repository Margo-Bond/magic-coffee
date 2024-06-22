import { defineConfig } from "vite";
import svg from "vite-plugin-svg";

export default defineConfig({
  plugins: [svg()],
  assetsInclude: ["**/*.+(jpg|jpeg|png|svg)"],
});
