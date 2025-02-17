import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: "manifest.json", // path to your manifest.json (relative to the project root)
					dest: "", // copies to the root of the output folder (dist)
				},
			],
		}),
		// @ts-expect-error - crx plugin doesn't have proper TypeScript definitions
		crx({ manifest })
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3001,
	},
	build: {
		rollupOptions: {
			input: {
				popup: path.resolve(__dirname, "index.html"),
				background: path.resolve(
					__dirname,
					"src",
					"chrome-services",
					"utils",
					"background.ts",
				),
				content: path.resolve(
					__dirname,
					"src",
					"chrome-services",
					"utils",
					"content.ts",
				),
				constants: path.resolve(
					__dirname,
					"src",
					"chrome-services",
					"utils",
					"constants.ts",
				),
			},
			output: {
				entryFileNames: (chunk) => {
					if (chunk.name === "popup") {
						return "popup.js";
					}
					if (chunk.name === "background") {
						return "background.js";
					}
					if (chunk.name === "content") {
						return "content.js";
					}
					if (chunk.name === "constants") {
						return "constants.js";
					}
					return "[name].js";
				},
			},
		},
	},
});
