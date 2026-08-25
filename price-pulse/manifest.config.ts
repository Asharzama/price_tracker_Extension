import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,

  name: "PricePulse",

  description: "Track product prices across shopping websites.",

  version: "1.0.0",

  action: {
    default_popup: "popup.html",
  },

  content_scripts: [
    {
      matches: ["https://*.amazon.in/*", "https://*.flipkart.com/*", "https://*.amazon.com/*"],
      js: ["src/content/content.ts"],
    },
  ],

  permissions: ["storage", "tabs", "activeTab", "notifications", "alarms"],

  host_permissions: ["https://*.amazon.in/*", "https://*.flipkart.com/*", "https://*.amazon.com/*"],

  background: {
    service_worker: "src/background/background.ts",
    type: "module",
  },
});
