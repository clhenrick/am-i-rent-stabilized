import handlebars from "handlebars";
import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(handlebarsPlugin, {
    // Override the `ejs` library instance
    eleventyLibraryOverride: handlebars,
  });
}

export const config = {
  templateFormats: ["md", "hbs"],

  markdownTemplateEngine: "hbs",

  dir: {
    input: "content",
    output: "dist",
    includes: "../_includes",
  },
};
