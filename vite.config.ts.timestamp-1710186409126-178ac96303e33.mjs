// vite.config.ts
import { crx } from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import vue from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { dirname, relative } from "path";
import AutoImport from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/unplugin-icons/dist/vite.js";
import Components from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/unplugin-vue-components/dist/vite.js";
import { VueRouterAutoImports } from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/unplugin-vue-router/dist/index.mjs";
import VueRouter from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/unplugin-vue-router/dist/vite.mjs";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/vite/dist/node/index.js";

// define.config.ts
import fs from "fs";
import { spawnSync } from "child_process";

// package.json
var package_default = {
  dependencies: {
    "@supabase/supabase-js": "^2.39.7",
    gsap: "^3.12.5",
    marked: "^11.1.1",
    pinia: "^2.1.7",
    vue: "^3.4.10",
    "vue-router": "^4.2.5"
  },
  description: "May we experience a plenitude of wins!",
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.22",
    "@iconify-json/mdi": "^1.1.64",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "@types/eslint": "^8.56.2",
    "@types/eslint-config-prettier": "^6.11.3",
    "@types/node": "^20.11.0",
    "@typescript-eslint/eslint-plugin": "^6.18.1",
    "@typescript-eslint/parser": "^6.18.1",
    "@vitejs/plugin-vue": "^5.0.3",
    "@vue/compiler-sfc": "^3.4.10",
    "@vueuse/core": "^10.7.1",
    autoprefixer: "^10.4.16",
    "chrome-types": "^0.1.249",
    daisyui: "^4.6.0",
    eslint: "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-vue": "^9.20.0",
    postcss: "^8.4.33",
    prettier: "^3.1.1",
    "prettier-plugin-tailwindcss": "^0.5.11",
    sass: "^1.69.7",
    tailwindcss: "^3.4.1",
    typescript: "^5.3.3",
    "unplugin-auto-import": "^0.17.3",
    "unplugin-icons": "^0.18.2",
    "unplugin-vue-components": "^0.26.0",
    "unplugin-vue-router": "^0.7.0",
    vite: "^5.0.11",
    "vite-plugin-vue-devtools": "^7.0.8",
    "vue-tsc": "^1.8.27",
    "webext-bridge": "^6.0.1"
  },
  displayName: "DV STATUS CHECKER",
  name: "dv-status-checker",
  repository: {
    type: "git",
    url: "https://github.com/mubaidr/vite-vue3-chrome-extension-v3"
  },
  overrides: {
    "@crxjs/vite-plugin": "$@crxjs/vite-plugin"
  },
  pnpm: {
    overrides: {},
    peerDependencyRules: {
      allowAny: [],
      allowedDeprecatedVersions: {
        "sourcemap-codec": "1.4.8"
      },
      allowedVersions: {},
      ignoreMissing: []
    }
  },
  private: true,
  scripts: {
    build: "vite build",
    dev: "vite",
    lint: "eslint . --fix --ext js,mjs,cjs,ts,mts,cts,vue",
    preview: "vite preview"
  },
  type: "module",
  version: "0.0.1"
};

// define.config.ts
var changelog = fs.readFileSync("./CHANGELOG.md", "utf-8");
var gitCommit = spawnSync("git", ["rev-parse", "--short", "HEAD"]).stdout.toString().trim();
var jsn = (value) => JSON.stringify(value);
var defineViteConfig = {
  __VERSION__: jsn(package_default.version),
  __DISPLAY_NAME__: jsn(package_default.displayName),
  __CHANGELOG__: jsn(changelog),
  __GIT_COMMIT__: jsn(gitCommit),
  __GITHUB_URL__: jsn(package_default.repository.url)
};

// manifest.config.ts
import { defineManifest } from "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var { version, name, description, displayName } = package_default;
var [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = defineManifest(async (env) => ({
  name: env.mode === "staging" ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    default_popup: "src/popup/index.html"
  },
  background: {
    service_worker: "src/background/index.ts"
  },
  content_scripts: [
    {
      all_frames: false,
      js: ["src/content-script/index.ts"],
      matches: ["https://dvprogram.state.gov/ESC/*"],
      run_at: "document_end"
    }
  ],
  host_permissions: ["*://*/*"],
  options_page: "src/options/index.html",
  permissions: ["storage"],
  web_accessible_resources: []
}));

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///C:/Users/theOBSERVER/Desktop/CODE/dv-status-checker/vite.config.ts";
var transformHtmlPlugin = (data) => ({
  name: "transform-html",
  transformIndexHtml: {
    order: "pre",
    handler(html) {
      return html.replace(/<%=\s*(\w+)\s*%>/gi, (match, p1) => data[p1] || "");
    }
  }
});
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "~": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      src: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  plugins: [
    crx({ manifest: manifest_config_default }),
    VueRouter({
      root: ".",
      // Add your own custom pages here. Just add it to the array. Example: 'src/welcome/pages'
      routesFolder: [
        { src: "src/pages", path: "common/" },
        { src: "src/content-script/iframe/pages", path: "iframe/" },
        { src: "src/options/pages", path: "options/" },
        { src: "src/popup/pages", path: "popup/" },
        { src: "src/setup/pages", path: "setup/" }
      ],
      dts: "src/typed-router.d.ts",
      extensions: [".vue"]
    }),
    vue(),
    // VueDevTools(),
    AutoImport({
      imports: ["vue", VueRouterAutoImports, "vue/macros", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables/"]
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ["src/components"],
      // generate `components.d.ts` for ts support with Volar
      dts: "src/components.d.ts",
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: "i",
          enabledCollections: ["mdi"]
        })
      ]
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: "vue3",
      scale: 1.5
    }),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      order: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      }
    },
    transformHtmlPlugin({
      HTML_TITLE: package_default.displayName || package_default.name
    })
  ],
  define: defineViteConfig,
  build: {
    rollupOptions: {
      input: {
        iframe: "src/content-script/iframe/index.html",
        setup: "src/setup/index.html"
      }
    }
  },
  server: {
    port: 3e3,
    strictPort: true,
    hmr: {
      port: 8880,
      overlay: true
    }
  },
  optimizeDeps: {
    include: ["vue", "@vueuse/core"],
    exclude: ["vue-demi"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiZGVmaW5lLmNvbmZpZy50cyIsICJwYWNrYWdlLmpzb24iLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdGhlT0JTRVJWRVJcXFxcRGVza3RvcFxcXFxDT0RFXFxcXGR2LXN0YXR1cy1jaGVja2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0aGVPQlNFUlZFUlxcXFxEZXNrdG9wXFxcXENPREVcXFxcZHYtc3RhdHVzLWNoZWNrZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3RoZU9CU0VSVkVSL0Rlc2t0b3AvQ09ERS9kdi1zdGF0dXMtY2hlY2tlci92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGRpcm5hbWUsIHJlbGF0aXZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXHJcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgeyBWdWVSb3V0ZXJBdXRvSW1wb3J0cyB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXInXHJcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJ1xyXG5pbXBvcnQgeyBVUkwsIGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG4vLyBpbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5pbXBvcnQgeyBkZWZpbmVWaXRlQ29uZmlnIGFzIGRlZmluZSB9IGZyb20gJy4vZGVmaW5lLmNvbmZpZydcclxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuY29uZmlnJ1xyXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcblxyXG5jb25zdCB0cmFuc2Zvcm1IdG1sUGx1Z2luID0gKGRhdGEpID0+XHJcbiAgPFBsdWdpbj57XHJcbiAgICBuYW1lOiAndHJhbnNmb3JtLWh0bWwnLFxyXG4gICAgdHJhbnNmb3JtSW5kZXhIdG1sOiB7XHJcbiAgICAgIG9yZGVyOiAncHJlJyxcclxuICAgICAgaGFuZGxlcihodG1sKSB7XHJcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvPCU9XFxzKihcXHcrKVxccyolPi9naSwgKG1hdGNoLCBwMSkgPT4gZGF0YVtwMV0gfHwgJycpXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH1cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICBzcmM6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICBjcngoeyBtYW5pZmVzdCB9KSxcclxuXHJcbiAgICBWdWVSb3V0ZXIoe1xyXG4gICAgICByb290OiAnLicsXHJcbiAgICAgIC8vIEFkZCB5b3VyIG93biBjdXN0b20gcGFnZXMgaGVyZS4gSnVzdCBhZGQgaXQgdG8gdGhlIGFycmF5LiBFeGFtcGxlOiAnc3JjL3dlbGNvbWUvcGFnZXMnXHJcbiAgICAgIHJvdXRlc0ZvbGRlcjogW1xyXG4gICAgICAgIHsgc3JjOiAnc3JjL3BhZ2VzJywgcGF0aDogJ2NvbW1vbi8nIH0sXHJcbiAgICAgICAgeyBzcmM6ICdzcmMvY29udGVudC1zY3JpcHQvaWZyYW1lL3BhZ2VzJywgcGF0aDogJ2lmcmFtZS8nIH0sXHJcbiAgICAgICAgeyBzcmM6ICdzcmMvb3B0aW9ucy9wYWdlcycsIHBhdGg6ICdvcHRpb25zLycgfSxcclxuICAgICAgICB7IHNyYzogJ3NyYy9wb3B1cC9wYWdlcycsIHBhdGg6ICdwb3B1cC8nIH0sXHJcbiAgICAgICAgeyBzcmM6ICdzcmMvc2V0dXAvcGFnZXMnLCBwYXRoOiAnc2V0dXAvJyB9LFxyXG4gICAgICBdLFxyXG4gICAgICBkdHM6ICdzcmMvdHlwZWQtcm91dGVyLmQudHMnLFxyXG4gICAgICBleHRlbnNpb25zOiBbJy52dWUnXSxcclxuICAgIH0pLFxyXG5cclxuICAgIHZ1ZSgpLFxyXG5cclxuICAgIC8vIFZ1ZURldlRvb2xzKCksXHJcblxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIGltcG9ydHM6IFsndnVlJywgVnVlUm91dGVyQXV0b0ltcG9ydHMsICd2dWUvbWFjcm9zJywgJ0B2dWV1c2UvY29yZSddLFxyXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcy8nXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcclxuICAgICAgLy8gZ2VuZXJhdGUgYGNvbXBvbmVudHMuZC50c2AgZm9yIHRzIHN1cHBvcnQgd2l0aCBWb2xhclxyXG4gICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgLy8gYXV0byBpbXBvcnQgaWNvbnNcclxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgIHByZWZpeDogJ2knLFxyXG4gICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ21kaSddLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWljb25zXHJcbiAgICBJY29ucyh7XHJcbiAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLFxyXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgICBzY2FsZTogMS41LFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2Fzc2V0cy1yZXdyaXRlJyxcclxuICAgICAgb3JkZXI6ICdwb3N0JyxcclxuICAgICAgYXBwbHk6ICdidWlsZCcsXHJcbiAgICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sLCB7IHBhdGggfSkge1xyXG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoXHJcbiAgICAgICAgICAvXCJcXC9hc3NldHNcXC8vZyxcclxuICAgICAgICAgIGBcIiR7cmVsYXRpdmUoZGlybmFtZShwYXRoKSwgJy9hc3NldHMnKX0vYFxyXG4gICAgICAgIClcclxuICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgdHJhbnNmb3JtSHRtbFBsdWdpbih7XHJcbiAgICAgIEhUTUxfVElUTEU6IHBhY2thZ2VKc29uLmRpc3BsYXlOYW1lIHx8IHBhY2thZ2VKc29uLm5hbWUsXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGRlZmluZSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBpbnB1dDoge1xyXG4gICAgICAgIGlmcmFtZTogJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgc2V0dXA6ICdzcmMvc2V0dXAvaW5kZXguaHRtbCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiAzMDAwLFxyXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcclxuICAgIGhtcjoge1xyXG4gICAgICBwb3J0OiA4ODgwLFxyXG4gICAgICBvdmVybGF5OiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogWyd2dWUnLCAnQHZ1ZXVzZS9jb3JlJ10sXHJcbiAgICBleGNsdWRlOiBbJ3Z1ZS1kZW1pJ10sXHJcbiAgfSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0aGVPQlNFUlZFUlxcXFxEZXNrdG9wXFxcXENPREVcXFxcZHYtc3RhdHVzLWNoZWNrZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHRoZU9CU0VSVkVSXFxcXERlc2t0b3BcXFxcQ09ERVxcXFxkdi1zdGF0dXMtY2hlY2tlclxcXFxkZWZpbmUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy90aGVPQlNFUlZFUi9EZXNrdG9wL0NPREUvZHYtc3RhdHVzLWNoZWNrZXIvZGVmaW5lLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IHsgc3Bhd25TeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcclxuaW1wb3J0IHBhY2thZ2VKc29uIGZyb20gJy4vcGFja2FnZS5qc29uJ1xyXG5cclxuLy8gUmVhZCBDSEFOR0VMT0cubWQgZmlsZSBpbnRvIGEgc3RyaW5nLlxyXG5jb25zdCBjaGFuZ2Vsb2cgPSBmcy5yZWFkRmlsZVN5bmMoJy4vQ0hBTkdFTE9HLm1kJywgJ3V0Zi04JylcclxuXHJcbi8vIEdldCB0aGUgY3VycmVudCBnaXQgY29tbWl0IGhhc2guXHJcbmNvbnN0IGdpdENvbW1pdCA9IHNwYXduU3luYygnZ2l0JywgWydyZXYtcGFyc2UnLCAnLS1zaG9ydCcsICdIRUFEJ10pXHJcbiAgLnN0ZG91dC50b1N0cmluZygpXHJcbiAgLnRyaW0oKVxyXG5cclxuY29uc3QganNuID0gKHZhbHVlOiBzdHJpbmcpID0+IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxyXG5cclxuLy8gRG9uJ3QgZm9yZ2V0IHRvIGFkZCB5b3VyIGFkZGVkIHZhcmlhYmxlcyB0byB2aXRlLWVudi5kLnRzIGFsc28hXHJcblxyXG4vLyBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSBpbiB5b3VyIFZ1ZSBjb21wb25lbnRzIGFuZCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHRoZWlyIHZhbHVlcyBhdCBidWlsZCB0aW1lLlxyXG4vLyBUaGVzZSB3aWxsIGJlIGNvbXBpbGVkIGludG8geW91ciBhcHAuIERvbid0IHN0b3JlIHNlY3JldHMgaGVyZSFcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZpbmVWaXRlQ29uZmlnID0ge1xyXG4gIF9fVkVSU0lPTl9fOiBqc24ocGFja2FnZUpzb24udmVyc2lvbiksXHJcbiAgX19ESVNQTEFZX05BTUVfXzoganNuKHBhY2thZ2VKc29uLmRpc3BsYXlOYW1lKSxcclxuICBfX0NIQU5HRUxPR19fOiBqc24oY2hhbmdlbG9nKSxcclxuICBfX0dJVF9DT01NSVRfXzoganNuKGdpdENvbW1pdCksXHJcbiAgX19HSVRIVUJfVVJMX186IGpzbihwYWNrYWdlSnNvbi5yZXBvc2l0b3J5LnVybCksXHJcbn1cclxuIiwgIntcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiOiBcIl4yLjM5LjdcIixcclxuICAgIFwiZ3NhcFwiOiBcIl4zLjEyLjVcIixcclxuICAgIFwibWFya2VkXCI6IFwiXjExLjEuMVwiLFxyXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuN1wiLFxyXG4gICAgXCJ2dWVcIjogXCJeMy40LjEwXCIsXHJcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjVcIlxyXG4gIH0sXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIk1heSB3ZSBleHBlcmllbmNlIGEgcGxlbml0dWRlIG9mIHdpbnMhXCIsXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4yMlwiLFxyXG4gICAgXCJAaWNvbmlmeS1qc29uL21kaVwiOiBcIl4xLjEuNjRcIixcclxuICAgIFwiQHRhaWx3aW5kY3NzL2Zvcm1zXCI6IFwiXjAuNS43XCIsXHJcbiAgICBcIkB0YWlsd2luZGNzcy90eXBvZ3JhcGh5XCI6IFwiXjAuNS4xMFwiLFxyXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiXjguNTYuMlwiLFxyXG4gICAgXCJAdHlwZXMvZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl42LjExLjNcIixcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTEuMFwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl42LjE4LjFcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl42LjE4LjFcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC4zXCIsXHJcbiAgICBcIkB2dWUvY29tcGlsZXItc2ZjXCI6IFwiXjMuNC4xMFwiLFxyXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTAuNy4xXCIsXHJcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE2XCIsXHJcbiAgICBcImNocm9tZS10eXBlc1wiOiBcIl4wLjEuMjQ5XCIsXHJcbiAgICBcImRhaXN5dWlcIjogXCJeNC42LjBcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjguNTYuMFwiLFxyXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMjAuMFwiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zM1wiLFxyXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjEuMVwiLFxyXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC41LjExXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS42OS43XCIsXHJcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4xXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4zLjNcIixcclxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy4zXCIsXHJcbiAgICBcInVucGx1Z2luLWljb25zXCI6IFwiXjAuMTguMlwiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI2LjBcIixcclxuICAgIFwidW5wbHVnaW4tdnVlLXJvdXRlclwiOiBcIl4wLjcuMFwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMC4xMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHNcIjogXCJeNy4wLjhcIixcclxuICAgIFwidnVlLXRzY1wiOiBcIl4xLjguMjdcIixcclxuICAgIFwid2ViZXh0LWJyaWRnZVwiOiBcIl42LjAuMVwiXHJcbiAgfSxcclxuICBcImRpc3BsYXlOYW1lXCI6IFwiRFYgU1RBVFVTIENIRUNLRVJcIixcclxuICBcIm5hbWVcIjogXCJkdi1zdGF0dXMtY2hlY2tlclwiLFxyXG4gIFwicmVwb3NpdG9yeVwiOiB7XHJcbiAgICBcInR5cGVcIjogXCJnaXRcIixcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL211YmFpZHIvdml0ZS12dWUzLWNocm9tZS1leHRlbnNpb24tdjNcIlxyXG4gIH0sXHJcbiAgXCJvdmVycmlkZXNcIjoge1xyXG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCIkQGNyeGpzL3ZpdGUtcGx1Z2luXCJcclxuICB9LFxyXG4gIFwicG5wbVwiOiB7XHJcbiAgICBcIm92ZXJyaWRlc1wiOiB7fSxcclxuICAgIFwicGVlckRlcGVuZGVuY3lSdWxlc1wiOiB7XHJcbiAgICAgIFwiYWxsb3dBbnlcIjogW10sXHJcbiAgICAgIFwiYWxsb3dlZERlcHJlY2F0ZWRWZXJzaW9uc1wiOiB7XHJcbiAgICAgICAgXCJzb3VyY2VtYXAtY29kZWNcIjogXCIxLjQuOFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYWxsb3dlZFZlcnNpb25zXCI6IHt9LFxyXG4gICAgICBcImlnbm9yZU1pc3NpbmdcIjogW11cclxuICAgIH1cclxuICB9LFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxyXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXHJcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWZpeCAtLWV4dCBqcyxtanMsY2pzLHRzLG10cyxjdHMsdnVlXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIlxyXG4gIH0sXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIlxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdGhlT0JTRVJWRVJcXFxcRGVza3RvcFxcXFxDT0RFXFxcXGR2LXN0YXR1cy1jaGVja2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0aGVPQlNFUlZFUlxcXFxEZXNrdG9wXFxcXENPREVcXFxcZHYtc3RhdHVzLWNoZWNrZXJcXFxcbWFuaWZlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy90aGVPQlNFUlZFUi9EZXNrdG9wL0NPREUvZHYtc3RhdHVzLWNoZWNrZXIvbWFuaWZlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lTWFuaWZlc3QgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcclxuXHJcbmNvbnN0IHsgdmVyc2lvbiwgbmFtZSwgZGVzY3JpcHRpb24sIGRpc3BsYXlOYW1lIH0gPSBwYWNrYWdlSnNvblxyXG4vLyBDb252ZXJ0IGZyb20gU2VtdmVyIChleGFtcGxlOiAwLjEuMC1iZXRhNilcclxuY29uc3QgW21ham9yLCBtaW5vciwgcGF0Y2gsIGxhYmVsID0gJzAnXSA9IHZlcnNpb25cclxuICAvLyBjYW4gb25seSBjb250YWluIGRpZ2l0cywgZG90cywgb3IgZGFzaFxyXG4gIC5yZXBsYWNlKC9bXlxcZC4tXSsvZywgJycpXHJcbiAgLy8gc3BsaXQgaW50byB2ZXJzaW9uIHBhcnRzXHJcbiAgLnNwbGl0KC9bLi1dLylcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KGFzeW5jIChlbnYpID0+ICh7XHJcbiAgbmFtZTogZW52Lm1vZGUgPT09ICdzdGFnaW5nJyA/IGBbSU5URVJOQUxdICR7bmFtZX1gIDogZGlzcGxheU5hbWUgfHwgbmFtZSxcclxuICBkZXNjcmlwdGlvbixcclxuICAvLyB1cCB0byBmb3VyIG51bWJlcnMgc2VwYXJhdGVkIGJ5IGRvdHNcclxuICB2ZXJzaW9uOiBgJHttYWpvcn0uJHttaW5vcn0uJHtwYXRjaH0uJHtsYWJlbH1gLFxyXG4gIC8vIHNlbXZlciBpcyBPSyBpbiBcInZlcnNpb25fbmFtZVwiXHJcbiAgdmVyc2lvbl9uYW1lOiB2ZXJzaW9uLFxyXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXHJcbiAgLy8ga2V5OiAnZWtnbWNicGdnbGZsbWdjZmFqbmdscGJjYmRjY25uamUnLFxyXG4gIGFjdGlvbjoge1xyXG4gICAgZGVmYXVsdF9wb3B1cDogJ3NyYy9wb3B1cC9pbmRleC5odG1sJyxcclxuICB9LFxyXG4gIGJhY2tncm91bmQ6IHtcclxuICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxyXG4gIH0sXHJcbiAgY29udGVudF9zY3JpcHRzOiBbXHJcbiAgICB7XHJcbiAgICAgIGFsbF9mcmFtZXM6IGZhbHNlLFxyXG4gICAgICBqczogWydzcmMvY29udGVudC1zY3JpcHQvaW5kZXgudHMnXSxcclxuICAgICAgbWF0Y2hlczogWydodHRwczovL2R2cHJvZ3JhbS5zdGF0ZS5nb3YvRVNDLyonXSxcclxuICAgICAgcnVuX2F0OiAnZG9jdW1lbnRfZW5kJyxcclxuICAgIH0sXHJcbiAgXSxcclxuICBob3N0X3Blcm1pc3Npb25zOiBbJyo6Ly8qLyonXSxcclxuICBvcHRpb25zX3BhZ2U6ICdzcmMvb3B0aW9ucy9pbmRleC5odG1sJyxcclxuICBwZXJtaXNzaW9uczogWydzdG9yYWdlJ10sXHJcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXSxcclxufSkpXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVYsU0FBUyxXQUFXO0FBQzNXLE9BQU8sU0FBUztBQUNoQixTQUFTLFNBQVMsZ0JBQWdCO0FBQ2xDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQUNyQyxP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
