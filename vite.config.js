import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // để route hoạt động khi build

  server: {
    host: true, // This allows Vite to expose your local IP
    historyApiFallback: true,
  },
});
