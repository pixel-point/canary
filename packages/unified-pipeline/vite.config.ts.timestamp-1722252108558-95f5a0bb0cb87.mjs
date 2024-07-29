var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "@harnessio/unified-pipeline",
      version: "0.1.2",
      description: "Harness Unified Pipeline ibrary",
      scripts: {
        dev: "run-p typed-scss build:watch",
        build: "vite build",
        "build:watch": "vite build --watch",
        "typed-scss": "typed-scss-modules src --watch",
        preinstall: "npx only-allow pnpm",
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
        dagre: "^0.8.5",
        classnames: "^2.5.1",
        elkjs: "^0.9.3",
        "lodash-es": "^4.17.21",
        "iconoir-react": "^7.3.0",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        reactflow: "^11.11.4",
        tailwindcss: "^3.4.1",
        "web-worker": "^1.0.0"
      },
      devDependencies: {
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
        zustand: "^4.5.4",
        "@modyfi/vite-plugin-yaml": "^1.1.0"
      }
    };
  }
});

// vite.config.ts
import { defineConfig } from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.9_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
import react from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_@swc+helpers@0.5.2_vite@5.3.1_@types+node@20.14.9_sass@1.77.8_terser@5.31.3_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import dts from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.9_rollup@4.18.0_typescript@5.5.3_vite@5.3.1_@types+no_wmopsgf4yuf2ppgn4g6m3ti4zm/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
import svgr from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@4.18.0_typescript@5.5.3_vite@5.3.1_@types+node@20.14.9_sass@1.77.8_terser@5.31.3_/node_modules/vite-plugin-svgr/dist/index.js";
import { uniq } from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import ViteYaml from "file:///Users/joetaylor/Harness/canary/node_modules/.pnpm/@modyfi+vite-plugin-yaml@1.1.0_rollup@4.18.0_vite@5.3.1_@types+node@20.14.9_sass@1.77.8_terser@5.31.3_/node_modules/@modyfi/vite-plugin-yaml/dist/index.js";
var __vite_injected_original_dirname = "/Users/joetaylor/Harness/canary/packages/unified-pipeline";
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
    rollupOptions: {
      external
      // output: {
      //   globals: external.reduce((obj, item) => {
      //     obj[item] = item
      //     return obj
      //   }, {})
      // }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZS5qc29uIiwgInZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ7XG4gIFwibmFtZVwiOiBcIkBoYXJuZXNzaW8vdW5pZmllZC1waXBlbGluZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjEuMlwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiSGFybmVzcyBVbmlmaWVkIFBpcGVsaW5lIGlicmFyeVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwicnVuLXAgdHlwZWQtc2NzcyBidWlsZDp3YXRjaFwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZDp3YXRjaFwiOiBcInZpdGUgYnVpbGQgLS13YXRjaFwiLFxuICAgIFwidHlwZWQtc2Nzc1wiOiBcInR5cGVkLXNjc3MtbW9kdWxlcyBzcmMgLS13YXRjaFwiLFxuICAgIFwicHJlaW5zdGFsbFwiOiBcIm5weCBvbmx5LWFsbG93IHBucG1cIixcbiAgICBcInByZXB1Ymxpc2hPbmx5XCI6IFwicG5wbSBidWlsZFwiXG4gIH0sXG4gIFwicHJpdmF0ZVwiOiBmYWxzZSxcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwibW9kdWxlXCI6IFwiLi9kaXN0L2luZGV4LmpzXCIsXG4gIFwibWFpblwiOiBcIi4vZGlzdC9pbmRleC5qc1wiLFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIlxuICBdLFxuICBcInR5cGVzXCI6IFwiLi9kaXN0L2luZGV4LmQudHNcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvaW5kZXguanNcIlxuICAgIH0sXG4gICAgXCIuL3N0eWxlc1wiOiBcIi4vZGlzdC9zdHlsZS5jc3NcIlxuICB9LFxuICBcInN0eWxlXCI6IFwiLi9kaXN0L3N0eWxlLmNzc1wiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9oYXJuZXNzL2NhbmFyeS90cmVlL21haW4vcGFja2FnZXMvdW5pZmllZC1waXBlbGluZVwiXG4gIH0sXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vaGFybmVzcy9jYW5hcnkvaXNzdWVzXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJkYWdyZVwiOiBcIl4wLjguNVwiLFxuICAgIFwiY2xhc3NuYW1lc1wiOiBcIl4yLjUuMVwiLFxuICAgIFwiZWxranNcIjogXCJeMC45LjNcIixcbiAgICBcImxvZGFzaC1lc1wiOiBcIl40LjE3LjIxXCIsXG4gICAgXCJpY29ub2lyLXJlYWN0XCI6IFwiXjcuMy4wXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0Zmxvd1wiOiBcIl4xMS4xMS40XCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuMVwiLFxuICAgIFwid2ViLXdvcmtlclwiOiBcIl4xLjAuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9jbGFzc25hbWVzXCI6IFwiXjIuMy4xXCIsXG4gICAgXCJAdHlwZXMvZGFncmVcIjogXCJeMC43LjUyXCIsXG4gICAgXCJAdHlwZXMvbG9kYXNoLWVzXCI6IFwiXjQuMTcuMTJcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4zLjNcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1jb3B5LXRvLWNsaXBib2FyZFwiOiBcIl41LjAuN1wiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjUuMFwiLFxuICAgIFwiZHRzLWJ1bmRsZS1nZW5lcmF0b3JcIjogXCJeNi40LjBcIixcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMS41XCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuMzIuOFwiLFxuICAgIFwidHlwZWQtc2Nzcy1tb2R1bGVzXCI6IFwiXjcuMS40XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4zXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMy4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeMy45LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLXN2Z3JcIjogXCJeNC4yLjBcIixcbiAgICBcInp1c3RhbmRcIjogXCJeNC41LjRcIixcbiAgICBcIkBtb2R5Zmkvdml0ZS1wbHVnaW4teWFtbFwiOiBcIl4xLjEuMFwiXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2pvZXRheWxvci9IYXJuZXNzL2NhbmFyeS9wYWNrYWdlcy91bmlmaWVkLXBpcGVsaW5lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvam9ldGF5bG9yL0hhcm5lc3MvY2FuYXJ5L3BhY2thZ2VzL3VuaWZpZWQtcGlwZWxpbmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pvZXRheWxvci9IYXJuZXNzL2NhbmFyeS9wYWNrYWdlcy91bmlmaWVkLXBpcGVsaW5lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcbmltcG9ydCB7IHVuaXEgfSBmcm9tICdsb2Rhc2gtZXMnXG5pbXBvcnQgVml0ZVlhbWwgZnJvbSAnQG1vZHlmaS92aXRlLXBsdWdpbi15YW1sJ1xuY29uc3QgcGtnID0gcmVxdWlyZSgnLi9wYWNrYWdlLmpzb24nKVxuXG5jb25zdCBleHRlcm5hbCA9IHVuaXEoXG4gIE9iamVjdC5rZXlzKHBrZy5kZXBlbmRlbmNpZXMgfHwgW10pXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhwa2cuZGV2RGVwZW5kZW5jaWVzIHx8IFtdKSlcbiAgICAuY29uY2F0KE9iamVjdC5rZXlzKHBrZy5wZWVyRGVwZW5kZW5jaWVzIHx8IFtdKSlcbiAgICAuY29uY2F0KFsnZWxranMnLCAnd2ViLXdvcmtlciddKVxuKVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgZGVmaW5lOiB7ICdwcm9jZXNzLmVudi5OT0RFX0VOVic6ICdcInByb2R1Y3Rpb25cIicgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZHRzKHtcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgdHNjb25maWdQYXRoOiAnLi90c2NvbmZpZy5qc29uJ1xuICAgICAgLy8gYmVmb3JlV3JpdGVGaWxlOiAoZmlsZVBhdGgsIGNvbnRlbnQpID0+ICh7XG4gICAgICAvLyAgIGZpbGVQYXRoOiBmaWxlUGF0aC5yZXBsYWNlKCdzcmMvJywgJycpLFxuICAgICAgLy8gICBjb250ZW50XG4gICAgICAvLyB9KVxuICAgIH0pLFxuICAgIHN2Z3IoKSxcbiAgICBWaXRlWWFtbCgpXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICBuYW1lOiAndW5pZmllZC1waXBlbGluZScsXG4gICAgICBmaWxlTmFtZTogJ2luZGV4JyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXVxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWxcbiAgICAgIC8vIG91dHB1dDoge1xuICAgICAgLy8gICBnbG9iYWxzOiBleHRlcm5hbC5yZWR1Y2UoKG9iaiwgaXRlbSkgPT4ge1xuICAgICAgLy8gICAgIG9ialtpdGVtXSA9IGl0ZW1cbiAgICAgIC8vICAgICByZXR1cm4gb2JqXG4gICAgICAvLyAgIH0sIHt9KVxuICAgICAgLy8gfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQ0UsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLE1BQ1gsYUFBZTtBQUFBLE1BQ2YsU0FBVztBQUFBLFFBQ1QsS0FBTztBQUFBLFFBQ1AsT0FBUztBQUFBLFFBQ1QsZUFBZTtBQUFBLFFBQ2YsY0FBYztBQUFBLFFBQ2QsWUFBYztBQUFBLFFBQ2QsZ0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxNQUNBLFNBQVc7QUFBQSxNQUNYLE1BQVE7QUFBQSxNQUNSLFFBQVU7QUFBQSxNQUNWLE1BQVE7QUFBQSxNQUNSLE9BQVM7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBUztBQUFBLE1BQ1QsU0FBVztBQUFBLFFBQ1QsS0FBSztBQUFBLFVBQ0gsUUFBVTtBQUFBLFFBQ1o7QUFBQSxRQUNBLFlBQVk7QUFBQSxNQUNkO0FBQUEsTUFDQSxPQUFTO0FBQUEsTUFDVCxZQUFjO0FBQUEsUUFDWixNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsTUFBUTtBQUFBLFFBQ04sS0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFNBQVc7QUFBQSxNQUNYLGNBQWdCO0FBQUEsUUFDZCxPQUFTO0FBQUEsUUFDVCxZQUFjO0FBQUEsUUFDZCxPQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixpQkFBaUI7QUFBQSxRQUNqQixPQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixXQUFhO0FBQUEsUUFDYixhQUFlO0FBQUEsUUFDZixjQUFjO0FBQUEsTUFDaEI7QUFBQSxNQUNBLGlCQUFtQjtBQUFBLFFBQ2pCLHFCQUFxQjtBQUFBLFFBQ3JCLGdCQUFnQjtBQUFBLFFBQ2hCLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQjtBQUFBLFFBQ2hCLGtDQUFrQztBQUFBLFFBQ2xDLG9CQUFvQjtBQUFBLFFBQ3BCLDRCQUE0QjtBQUFBLFFBQzVCLHdCQUF3QjtBQUFBLFFBQ3hCLGVBQWU7QUFBQSxRQUNmLE1BQVE7QUFBQSxRQUNSLHNCQUFzQjtBQUFBLFFBQ3RCLFlBQWM7QUFBQSxRQUNkLE1BQVE7QUFBQSxRQUNSLG1CQUFtQjtBQUFBLFFBQ25CLG9CQUFvQjtBQUFBLFFBQ3BCLFNBQVc7QUFBQSxRQUNYLDRCQUE0QjtBQUFBLE1BQzlCO0FBQUEsSUFDRjtBQUFBO0FBQUE7OztBQ2xFNlYsU0FBUyxvQkFBb0I7QUFDMVgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQUNoQixTQUFlLGVBQWU7QUFDOUIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsWUFBWTtBQUNyQixPQUFPLGNBQWM7QUFOckIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTSxNQUFNO0FBRVosSUFBTSxXQUFXO0FBQUEsRUFDZixPQUFPLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLEVBQy9CLE9BQU8sT0FBTyxLQUFLLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQzdDLE9BQU8sT0FBTyxLQUFLLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQzlDLE9BQU8sQ0FBQyxTQUFTLFlBQVksQ0FBQztBQUNuQztBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVEsRUFBRSx3QkFBd0IsZUFBZTtBQUFBLEVBQ2pELFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxNQUNSLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS2hCLENBQUM7QUFBQSxJQUNELEtBQUs7QUFBQSxJQUNMLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFPRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
