var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "@harnessio/unified-pipeline",
      version: "0.1.9",
      description: "Harness Unified Pipeline ibrary",
      scripts: {
        dev: "run-p typed-scss build:watch",
        build: "vite build",
        "build:watch": "vite build --watch",
        "typed-scss": "typed-scss-modules src --watch",
        prepublishOnly: "pnpm build"
      },
      private: false,
      type: "module",
      module: "./dist/index.js",
      main: "./dist/index.js",
      files: [
        "dist"
      ],
      types: "./dist/index.d.ts",
      exports: {
        ".": {
          import: "./dist/index.js"
        },
        "./styles": "./dist/style.css"
      },
      style: "./dist/style.css",
      repository: {
        type: "git",
        url: "git+https://github.com/harness/canary/tree/main/packages/unified-pipeline"
      },
      bugs: {
        url: "https://github.com/harness/canary/issues"
      },
      license: "Apache-2.0",
      dependencies: {
        "@types/node": "^22.2.0",
        classnames: "^2.5.1",
        dagre: "^0.8.5",
        elkjs: "^0.9.3",
        "iconoir-react": "^7.3.0",
        "lodash-es": "^4.17.21",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        reactflow: "^11.11.4",
        tailwindcss: "^3.4.1",
        "web-worker": "^1.0.0"
      },
      devDependencies: {
        "@modyfi/vite-plugin-yaml": "^1.1.0",
        "@types/classnames": "^2.3.1",
        "@types/dagre": "^0.7.52",
        "@types/lodash-es": "^4.17.12",
        "@types/react": "^18.3.3",
        "@types/react-copy-to-clipboard": "^5.0.7",
        "@types/react-dom": "^18.2.0",
        "@vitejs/plugin-react-swc": "^3.5.0",
        "dts-bundle-generator": "^6.4.0",
        "npm-run-all": "^4.1.5",
        sass: "^1.32.8",
        "typed-scss-modules": "^7.1.4",
        typescript: "^5.3.3",
        vite: "^5.3.1",
        "vite-plugin-dts": "^3.9.1",
        "vite-plugin-svgr": "^4.2.0",
        zustand: "^4.5.4"
      }
    };
  }
});

// vite.config.ts
import { defineConfig } from "file:///Users/abhinavrastogi/harness/canary/node_modules/.pnpm/vite@5.3.1_@types+node@22.2.0_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
import react from "file:///Users/abhinavrastogi/harness/canary/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_@swc+helpers@0.5.2_vite@5.3.1_@types+node@22.2.0_sass@1.77.8_terser@5.31.3_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import dts from "file:///Users/abhinavrastogi/harness/canary/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@22.2.0_rollup@4.18.0_typescript@5.5.3_vite@5.3.1_@types+nod_qa4wpcapuuoday34im3xycyt4q/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
import svgr from "file:///Users/abhinavrastogi/harness/canary/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@4.18.0_typescript@5.5.3_vite@5.3.1_@types+node@22.2.0_sass@1.77.8_terser@5.31.3_/node_modules/vite-plugin-svgr/dist/index.js";
import { uniq } from "file:///Users/abhinavrastogi/harness/canary/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import ViteYaml from "file:///Users/abhinavrastogi/harness/canary/node_modules/.pnpm/@modyfi+vite-plugin-yaml@1.1.0_rollup@4.18.0_vite@5.3.1_@types+node@22.2.0_sass@1.77.8_terser@5.31.3_/node_modules/@modyfi/vite-plugin-yaml/dist/index.js";
var __vite_injected_original_dirname = "/Users/abhinavrastogi/harness/canary/packages/unified-pipeline";
var pkg = require_package();
var external = uniq(
  Object.keys(pkg.dependencies || []).concat(Object.keys(pkg.devDependencies || [])).concat(Object.keys(pkg.peerDependencies || [])).concat(["elkjs", "web-worker"])
);
var vite_config_default = defineConfig({
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [
    react(),
    dts({
      outDir: "dist",
      tsconfigPath: "./tsconfig.json"
      // beforeWriteFile: (filePath, content) => ({
      //   filePath: filePath.replace('src/', ''),
      //   content
      // })
    }),
    svgr(),
    ViteYaml()
  ],
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "unified-pipeline",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: { external }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZS5qc29uIiwgInZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ7XG4gIFwibmFtZVwiOiBcIkBoYXJuZXNzaW8vdW5pZmllZC1waXBlbGluZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjEuOVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiSGFybmVzcyBVbmlmaWVkIFBpcGVsaW5lIGlicmFyeVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwicnVuLXAgdHlwZWQtc2NzcyBidWlsZDp3YXRjaFwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZDp3YXRjaFwiOiBcInZpdGUgYnVpbGQgLS13YXRjaFwiLFxuICAgIFwidHlwZWQtc2Nzc1wiOiBcInR5cGVkLXNjc3MtbW9kdWxlcyBzcmMgLS13YXRjaFwiLFxuICAgIFwicHJlcHVibGlzaE9ubHlcIjogXCJwbnBtIGJ1aWxkXCJcbiAgfSxcbiAgXCJwcml2YXRlXCI6IGZhbHNlLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvaW5kZXguanNcIixcbiAgXCJtYWluXCI6IFwiLi9kaXN0L2luZGV4LmpzXCIsXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiZGlzdFwiXG4gIF0sXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLlwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9pbmRleC5qc1wiXG4gICAgfSxcbiAgICBcIi4vc3R5bGVzXCI6IFwiLi9kaXN0L3N0eWxlLmNzc1wiXG4gIH0sXG4gIFwic3R5bGVcIjogXCIuL2Rpc3Qvc3R5bGUuY3NzXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL2hhcm5lc3MvY2FuYXJ5L3RyZWUvbWFpbi9wYWNrYWdlcy91bmlmaWVkLXBpcGVsaW5lXCJcbiAgfSxcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9oYXJuZXNzL2NhbmFyeS9pc3N1ZXNcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjIuMFwiLFxuICAgIFwiY2xhc3NuYW1lc1wiOiBcIl4yLjUuMVwiLFxuICAgIFwiZGFncmVcIjogXCJeMC44LjVcIixcbiAgICBcImVsa2pzXCI6IFwiXjAuOS4zXCIsXG4gICAgXCJpY29ub2lyLXJlYWN0XCI6IFwiXjcuMy4wXCIsXG4gICAgXCJsb2Rhc2gtZXNcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdGZsb3dcIjogXCJeMTEuMTEuNFwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjFcIixcbiAgICBcIndlYi13b3JrZXJcIjogXCJeMS4wLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAbW9keWZpL3ZpdGUtcGx1Z2luLXlhbWxcIjogXCJeMS4xLjBcIixcbiAgICBcIkB0eXBlcy9jbGFzc25hbWVzXCI6IFwiXjIuMy4xXCIsXG4gICAgXCJAdHlwZXMvZGFncmVcIjogXCJeMC43LjUyXCIsXG4gICAgXCJAdHlwZXMvbG9kYXNoLWVzXCI6IFwiXjQuMTcuMTJcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4zLjNcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1jb3B5LXRvLWNsaXBib2FyZFwiOiBcIl41LjAuN1wiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjUuMFwiLFxuICAgIFwiZHRzLWJ1bmRsZS1nZW5lcmF0b3JcIjogXCJeNi40LjBcIixcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMS41XCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuMzIuOFwiLFxuICAgIFwidHlwZWQtc2Nzcy1tb2R1bGVzXCI6IFwiXjcuMS40XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4zXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMy4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeMy45LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLXN2Z3JcIjogXCJeNC4yLjBcIixcbiAgICBcInp1c3RhbmRcIjogXCJeNC41LjRcIlxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hYmhpbmF2cmFzdG9naS9oYXJuZXNzL2NhbmFyeS9wYWNrYWdlcy91bmlmaWVkLXBpcGVsaW5lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWJoaW5hdnJhc3RvZ2kvaGFybmVzcy9jYW5hcnkvcGFja2FnZXMvdW5pZmllZC1waXBlbGluZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWJoaW5hdnJhc3RvZ2kvaGFybmVzcy9jYW5hcnkvcGFja2FnZXMvdW5pZmllZC1waXBlbGluZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgcGF0aCwgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InXG5pbXBvcnQgeyB1bmlxIH0gZnJvbSAnbG9kYXNoLWVzJ1xuaW1wb3J0IFZpdGVZYW1sIGZyb20gJ0Btb2R5Zmkvdml0ZS1wbHVnaW4teWFtbCdcbmNvbnN0IHBrZyA9IHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJylcblxuY29uc3QgZXh0ZXJuYWwgPSB1bmlxKFxuICBPYmplY3Qua2V5cyhwa2cuZGVwZW5kZW5jaWVzIHx8IFtdKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMocGtnLmRldkRlcGVuZGVuY2llcyB8fCBbXSkpXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhwa2cucGVlckRlcGVuZGVuY2llcyB8fCBbXSkpXG4gICAgLmNvbmNhdChbJ2Vsa2pzJywgJ3dlYi13b3JrZXInXSlcbilcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGRlZmluZTogeyAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiAnXCJwcm9kdWN0aW9uXCInIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGR0cyh7XG4gICAgICBvdXREaXI6ICdkaXN0JyxcbiAgICAgIHRzY29uZmlnUGF0aDogJy4vdHNjb25maWcuanNvbidcbiAgICAgIC8vIGJlZm9yZVdyaXRlRmlsZTogKGZpbGVQYXRoLCBjb250ZW50KSA9PiAoe1xuICAgICAgLy8gICBmaWxlUGF0aDogZmlsZVBhdGgucmVwbGFjZSgnc3JjLycsICcnKSxcbiAgICAgIC8vICAgY29udGVudFxuICAgICAgLy8gfSlcbiAgICB9KSxcbiAgICBzdmdyKCksXG4gICAgVml0ZVlhbWwoKVxuICBdLFxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ3VuaWZpZWQtcGlwZWxpbmUnLFxuICAgICAgZmlsZU5hbWU6ICdpbmRleCcsXG4gICAgICBmb3JtYXRzOiBbJ2VzJ11cbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHsgZXh0ZXJuYWwgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFDRSxNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsTUFDWCxhQUFlO0FBQUEsTUFDZixTQUFXO0FBQUEsUUFDVCxLQUFPO0FBQUEsUUFDUCxPQUFTO0FBQUEsUUFDVCxlQUFlO0FBQUEsUUFDZixjQUFjO0FBQUEsUUFDZCxnQkFBa0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsU0FBVztBQUFBLE1BQ1gsTUFBUTtBQUFBLE1BQ1IsUUFBVTtBQUFBLE1BQ1YsTUFBUTtBQUFBLE1BQ1IsT0FBUztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFTO0FBQUEsTUFDVCxTQUFXO0FBQUEsUUFDVCxLQUFLO0FBQUEsVUFDSCxRQUFVO0FBQUEsUUFDWjtBQUFBLFFBQ0EsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLE9BQVM7QUFBQSxNQUNULFlBQWM7QUFBQSxRQUNaLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxNQUFRO0FBQUEsUUFDTixLQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsU0FBVztBQUFBLE1BQ1gsY0FBZ0I7QUFBQSxRQUNkLGVBQWU7QUFBQSxRQUNmLFlBQWM7QUFBQSxRQUNkLE9BQVM7QUFBQSxRQUNULE9BQVM7QUFBQSxRQUNULGlCQUFpQjtBQUFBLFFBQ2pCLGFBQWE7QUFBQSxRQUNiLE9BQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLFdBQWE7QUFBQSxRQUNiLGFBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsaUJBQW1CO0FBQUEsUUFDakIsNEJBQTRCO0FBQUEsUUFDNUIscUJBQXFCO0FBQUEsUUFDckIsZ0JBQWdCO0FBQUEsUUFDaEIsb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCO0FBQUEsUUFDaEIsa0NBQWtDO0FBQUEsUUFDbEMsb0JBQW9CO0FBQUEsUUFDcEIsNEJBQTRCO0FBQUEsUUFDNUIsd0JBQXdCO0FBQUEsUUFDeEIsZUFBZTtBQUFBLFFBQ2YsTUFBUTtBQUFBLFFBQ1Isc0JBQXNCO0FBQUEsUUFDdEIsWUFBYztBQUFBLFFBQ2QsTUFBUTtBQUFBLFFBQ1IsbUJBQW1CO0FBQUEsUUFDbkIsb0JBQW9CO0FBQUEsUUFDcEIsU0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBQUE7QUFBQTs7O0FDbEU0VyxTQUFTLG9CQUFvQjtBQUN6WSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLFNBQWUsZUFBZTtBQUM5QixPQUFPLFVBQVU7QUFDakIsU0FBUyxZQUFZO0FBQ3JCLE9BQU8sY0FBYztBQU5yQixJQUFNLG1DQUFtQztBQU96QyxJQUFNLE1BQU07QUFFWixJQUFNLFdBQVc7QUFBQSxFQUNmLE9BQU8sS0FBSyxJQUFJLGdCQUFnQixDQUFDLENBQUMsRUFDL0IsT0FBTyxPQUFPLEtBQUssSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFDN0MsT0FBTyxPQUFPLEtBQUssSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFDOUMsT0FBTyxDQUFDLFNBQVMsWUFBWSxDQUFDO0FBQ25DO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUSxFQUFFLHdCQUF3QixlQUFlO0FBQUEsRUFDakQsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsUUFBUTtBQUFBLE1BQ1IsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLaEIsQ0FBQztBQUFBLElBQ0QsS0FBSztBQUFBLElBQ0wsU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxJQUNmLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZSxFQUFFLFNBQVM7QUFBQSxFQUM1QjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
