import * as esbuild from "esbuild";
import handlebarsPlugin from "esbuild-plugin-handlebars";

try {
  const result = await esbuild.build({
    entryPoints: ["src/js/index.js", "src/js/infoPages.js"],
    outdir: "dist",
    bundle: true,
    plugins: [handlebarsPlugin()],
    minify: true,
    drop: ["console"],
  });
  console.log(result);
} catch (error) {
  console.error(error);
  process.exit(1);
}
