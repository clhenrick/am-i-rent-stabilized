import handlebars from "handlebars";
import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";
import { I18nPlugin } from "@11ty/eleventy";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(handlebarsPlugin, {
    // Override the `ejs` library instance
    eleventyLibraryOverride: handlebars,
  });

  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "en",
  });

  eleventyConfig.addWatchTarget("./assets/");
  eleventyConfig.addWatchTarget("./src/_utils/");
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addWatchTarget("./src/scss/");

  eleventyConfig.addPassthroughCopy("assets/png");

  // Set global permalinks to resource.html style
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) =>
      `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });
}

export const config = {
  templateFormats: ["md", "hbs"],

  dir: {
    input: "src/content",
    output: "dist",
    includes: "../_includes",
    layouts: "../_layouts",
    data: "../_data",
  },
};
