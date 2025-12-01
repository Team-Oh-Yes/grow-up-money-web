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
<<<<<<< HEAD
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }
=======
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        }
>>>>>>> 94ba6ca6e36a4efb34f4b6652cdc41129fd6dbe5
      : false,

    host: "0.0.0.0",
    port: 5173,
    hmr: {
      protocol: 'wss',
      host: 'local.growmoney.duckdns.org',
      port: 5173,
    }
  },
}));