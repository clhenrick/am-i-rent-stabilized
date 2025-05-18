import * as esbuild from "esbuild";
import handlebarsPlugin from "esbuild-plugin-handlebars";

try {
  const ctx = await esbuild.context({
    entryPoints: ["src/js/index.js", "src/js/infoPages.js"],
    outdir: "dist",
    bundle: true,
    plugins: [handlebarsPlugin()],
    sourcemap: true,
  });
  await ctx.watch();
  console.log("esbuild in watch mode");
} catch (error) {
  console.error(error);
  process.exit(1);
}
