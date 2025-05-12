import { getRoutesForLang } from "../_utils/localeLinks.js";

export default {
  eleventyComputed: {
    main: (data) => data.en.main,
    nav_main: (data) => data.en.main?.nav_main,
    localeLinks: (data) => getRoutesForLang(data.page.lang, data.page.fileSlug, data.isHomepage),
  }
};
