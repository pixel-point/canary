// vite.config.ts
import { defineConfig } from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.9_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
import react from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_@swc+helpers@0.5.2_vite@5.3.1_@types+node@20.14.9_sass@1.77.8_terser@5.31.3_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import dts from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.9_rollup@4.18.0_typescript@5.5.3_vite@5.3.1_@types+no_wmopsgf4yuf2ppgn4g6m3ti4zm/node_modules/vite-plugin-dts/dist/index.mjs";
import path, { resolve } from "path";
import svgr from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@4.18.0_typescript@5.5.3_vite@5.3.1_@types+node@20.14.9_sass@1.77.8_terser@5.31.3_/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "/Users/joetaylor/Harness/canary/packages/canary";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist",
      tsconfigPath: "./tsconfig.app.json",
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace("src/", ""),
        content
      })
    }),
    svgr()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "canary",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "@harnessio/icons-noir"],
      output: {
        globals: {
          react: "react",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvam9ldGF5bG9yL0hhcm5lc3MvY2FuYXJ5L3BhY2thZ2VzL2NhbmFyeVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pvZXRheWxvci9IYXJuZXNzL2NhbmFyeS9wYWNrYWdlcy9jYW5hcnkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pvZXRheWxvci9IYXJuZXNzL2NhbmFyeS9wYWNrYWdlcy9jYW5hcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJyAvLyBFbnN1cmUgeW91IGhhdmUgdGhpcyBwbHVnaW4gaW5zdGFsbGVkXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBkdHMoe1xuICAgICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgICB0c2NvbmZpZ1BhdGg6ICcuL3RzY29uZmlnLmFwcC5qc29uJyxcbiAgICAgIGJlZm9yZVdyaXRlRmlsZTogKGZpbGVQYXRoLCBjb250ZW50KSA9PiAoe1xuICAgICAgICBmaWxlUGF0aDogZmlsZVBhdGgucmVwbGFjZSgnc3JjLycsICcnKSxcbiAgICAgICAgY29udGVudFxuICAgICAgfSlcbiAgICB9KSxcbiAgICBzdmdyKClcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ2NhbmFyeScsXG4gICAgICBmaWxlTmFtZTogJ2luZGV4JyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXVxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ0BoYXJuZXNzaW8vaWNvbnMtbm9pciddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogJ3JlYWN0JyxcbiAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVCxTQUFTLG9CQUFvQjtBQUM1VixPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sUUFBUSxlQUFlO0FBQzlCLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxpQkFBaUIsQ0FBQyxVQUFVLGFBQWE7QUFBQSxRQUN2QyxVQUFVLFNBQVMsUUFBUSxRQUFRLEVBQUU7QUFBQSxRQUNyQztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELEtBQUs7QUFBQSxFQUNQO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLGFBQWEsdUJBQXVCO0FBQUEsTUFDeEQsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
