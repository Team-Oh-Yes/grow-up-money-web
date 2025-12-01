import react from "@vitejs/plugin-react";
import fs from "fs";
import { defineConfig } from "vite";

const keyPath = "./local.growmoney.duckdns.org-key.pem";
const certPath = "./local.growmoney.duckdns.org.pem";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    https: mode === "development"
      ? {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        }
      : false, 
    port: 5173,
    hmr: {
      protocol: 'wss', 
      // This tells the browser to connect to the server using the correct host
      host: 'local.growmoney.duckdns.org',
    }
    // ----------------------------------------------------
  },
}));