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
    matches: [
      "https://*.amazon.in/*",
      "https://*.amazon.com/*",
    ],
    js: ["src/content/index.ts"],
  },
],

  permissions: [
  "storage",
  "tabs",
  "activeTab",
  "notifications",
],

  host_permissions: [
    "https://*.amazon.in/*",
    "https://*.amazon.com/*",
  ],

  background: {
  service_worker: "src/background/index.ts",
  type: "module",
},
});
