import react from "@vitejs/plugin-react";
import fs from "fs";
import { defineConfig } from "vite";

const keyPath = "./local.growmoney.duckdns.org-key.pem";
const certPath = "./local.growmoney.duckdns.org.pem";

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    host: "0.0.0.0",
    port: 5173,
    proxy: {
    },
  },
});