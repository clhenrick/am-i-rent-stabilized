import { defineConfig } from "vitest/config";
import Handlebars from "handlebars";

/** Vite plugin to transform .hbs imports into callable Handlebars template functions */
function handlebarsPlugin() {
  return {
    name: "vite-plugin-handlebars",
    transform(src, id) {
      if (id.endsWith(".hbs")) {
        const precompiled = Handlebars.precompile(src);
        return {
          code: `import Handlebars from "handlebars";\nexport default Handlebars.template(${precompiled});`,
          map: null,
        };
      }
    },
  };
}

export default defineConfig({
  plugins: [handlebarsPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/js/test-setup.js"],
  },
});
