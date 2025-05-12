import { getRoutesForLang } from "../../_utils/localeLinks.js";

export default {
  lang: "zh",
  eleventyComputed: {
    nav_main: (data) => data.zh.main?.nav_main,
    main: (data) => data.zh.main,
    resources: (data) => data.zh.resources,
    how: (data) => data.zh.how,
    why: (data) => data.zh.why,
    localeLinks: (data) => getRoutesForLang(data.page.lang, data.page.fileSlug, data.isHomepage),
  }
};
