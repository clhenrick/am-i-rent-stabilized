import { getRoutesForLang } from "../_utils/localeLinks.js";
import { getInPageNavLinks } from "../_utils/inPageNavLinks.js"

export default {
  lang: "en",
  eleventyComputed: {
    nav_main: (data) => data.en.main?.nav_main,
    main: (data) => data.en.main,
    resources: (data) => data.en.resources,
    how: (data) => data.en.how,
    why: (data) => data.en.why,
    nav_side: (data) => getInPageNavLinks(data, "en"),
    localeLinks: (data) => getRoutesForLang(data.page.lang, data.page.fileSlug, data.isHomepage),
  }
};
