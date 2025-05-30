import { getRoutesForLang } from "../../_utils/localeLinks.js";
import { getInPageNavLinks } from "../../_utils/inPageNavLinks.js";

export default {
  lang: "zh",
  eleventyComputed: {
    nav_main: (data) => data.zh.main?.nav_main,
    main: (data) => data.zh.main,
    resources: (data) => data.zh.resources,
    how: (data) => data.zh.how,
    why: (data) => data.zh.why,
    nav_side: (data) => getInPageNavLinks(data, "zh"),
    localeLinks: (data) =>
      getRoutesForLang(data.page.lang, data.page.fileSlug, data.isHomepage),
  },
};
