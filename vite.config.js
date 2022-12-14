import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		proxy: {
			"/backend": {
				target: "http://nexifytw.mynetgear.com:45000/api/Record/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/backend/, ""),
			},
		},
	},
});
