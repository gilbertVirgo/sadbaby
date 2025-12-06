import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		hmr: true,
		watch: {
			usePolling: true,
		},
	},
	build: {
		// Enable code splitting for better performance
		rollupOptions: {
			output: {
				// Split vendor code into separate chunks
				manualChunks: {
					react: ["react", "react-dom"],
					router: ["react-router-dom"],
				},
			},
		},
		// Optimize chunk size
		chunkSizeWarningLimit: 1000,
		// Generate source maps for production debugging
		sourcemap: false,
		// Minify for smaller bundle
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
	// Performance optimizations
	resolve: {
		alias: {
			// Helps with tree-shaking and reduces bundle size
		},
	},
});
