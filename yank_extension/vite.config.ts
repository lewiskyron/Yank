import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
	// @ts-expect-error - crx plugin doesn't have proper TypeScript definitions
	plugins: [react(), crx({ manifest })],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
    port: 3000,
  },
});
