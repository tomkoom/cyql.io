/// <reference types="vite-plugin-svgr/client" />
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import environment from "vite-plugin-environment"
import svgr from "vite-plugin-svgr"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import dotenv from "dotenv"
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const alias = [{ find: "@", replacement: resolve(__dirname, "src/frontend") }]

export default defineConfig(async () => {
  const { default: tailwindcss } = await import("@tailwindcss/vite")
  
  return {
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
  plugins: [react(), environment("all"), svgr(), tailwindcss()],
  }
})
