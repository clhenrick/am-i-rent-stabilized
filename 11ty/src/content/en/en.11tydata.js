import { getRoutesForLang } from "../../_utils/localeLinks.js";

export default {
  lang: "en",
  eleventyComputed: {
    nav_main: (data) => data.en.main?.nav_main,
    resources: (data) => data.en.resources,
    how: (data) => data.en.how,
    why: (data) => data.en.why,
    localeLinks: (data) => getRoutesForLang(data.page.lang, data.page.fileSlug, data.isHomepage),
  }
};
