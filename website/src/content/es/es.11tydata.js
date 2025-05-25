import { getRoutesForLang } from "../../_utils/localeLinks.js";
import { getInPageNavLinks } from "../../_utils/inPageNavLinks.js"

export default {
  lang: "es",
  eleventyComputed: {
    nav_main: (data) => data.es.main?.nav_main,
    main: (data) => data.es.main,
    resources: (data) => data.es.resources,
    how: (data) => data.es.how,
    why: (data) => data.es.why,
    nav_side: (data) => getInPageNavLinks(data, "es"),
    localeLinks: (data) => getRoutesForLang(data.page.lang, data.page.fileSlug, data.isHomepage),
  }
};
