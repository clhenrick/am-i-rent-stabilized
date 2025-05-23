import * as esbuild from "esbuild";
import handlebarsPlugin from "esbuild-plugin-handlebars";
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { argv } from 'node:process';
import packageJson from './package.json' with { type: 'json' };

const { browserslist } = packageJson;

/** first cli argument is for the mode ("dev" or "prod"); */
const mode = argv[2];

/** whether we are creating a production build */
const isProdMode = mode === "prod";

const targets = isProdMode ? browserslist.production : browserslist.development;

/** options shared by both .build() and .context() */
const options = {
  bundle: true,
  define: {
    'process.env.USE_PRELOADED_STATE': JSON.stringify(process.env.USE_PRELOADED_STATE) ?? 'false',
    'process.env.USE_REDUX_LOGGER': JSON.stringify(process.env.USE_REDUX_LOGGER) ?? 'false'
  },
  target: browserslistToEsbuild(targets),
  drop: isProdMode ? ['console'] : undefined,
  entryPoints: ["src/js/index.js", "src/js/infoPages.js"],
  format: 'esm',
  minify: isProdMode,
  outdir: "dist",
  plugins: [handlebarsPlugin()],
  sourcemap: true,
}

main();

async function main() {
  if (isProdMode) {
    await build();
  } else {
    await watch();
  }
}

async function watch() {
  try {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log("esbuild in watch mode");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function build() {
  try {
    const result = await esbuild.build(options);
    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
