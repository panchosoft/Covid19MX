import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// Mirrors the data-build-timestamp attribute that was previously
// injected by the EJS template processed by html-webpack-plugin.
function injectBuildTimestamp() {
  return {
    name: "inject-build-timestamp",
    transformIndexHtml(html) {
      const buildTimestamp = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, -1);
      return html.replace(
        '<html lang="en">',
        `<html lang="en" data-build-timestamp="${buildTimestamp}">`
      );
    },
  };
}

export default defineConfig({
  plugins: [
    vue(),
    injectBuildTimestamp(),
    VitePWA({
      strategies: "generateSW",
      injectRegister: false,
      manifest: false,
      filename: "service-worker.js",
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: false,
  },
});
