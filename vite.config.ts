/// <reference types="vite-plugin-svgr/client" />
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import environment from "vite-plugin-environment"
import svgr from "vite-plugin-svgr"
import { resolve } from "node:path"

const alias = [{ find: "@", replacement: resolve(__dirname, "./src/frontend") }]

export default defineConfig({
  root: "src/frontend",
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
  resolve: {
    alias,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), environment("all"), svgr()],
})
