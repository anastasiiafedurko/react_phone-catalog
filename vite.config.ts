import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> | false = {
  theme_color: "#9e0081",
  background_color: "#ffffff",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  screenshots: [
    {
      src: "/screenshots/desktop.png",
      type: "image/png",
      sizes: "1701x1065",
      form_factor: "wide",
    },
    {
      src: "/screenshots/mobile.png",
      type: "image/png",
      sizes: "689x935",
      form_factor: "narrow",
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "ru",
  name: "Nice Gadgets",
  short_name: "Gadgets",
  start_url: "/react_phone-catalog/",
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html,css,js,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      manifest: manifest,
    }),
  ],
  base: mode === "production" ? "/react_phone-catalog/" : "/",
}));
