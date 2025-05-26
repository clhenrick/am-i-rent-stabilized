const langCodes = ["en", "es", "zh"];
const langLabels = ["in english", "en español", "中文"];
const langData = langCodes.reduce((acc, cur, index) => {
  acc.set(cur, langLabels[index]);
  return acc;
}, new Map());

/** generates the necessary data for each page to link to its equivalent page in the other supported languages */
export function getRoutesForLang (currentLang, page, isHomepage = false) {
  // homepages are the only page that uses "index.html" as the file name, 11ty page data will show fileSlug as an empty string, so we correct it here
  if (isHomepage) {
    page = "index";
  }
  return [...langData.entries()]
    .filter(([lang]) => lang !== currentLang)
    .map(([lang, label]) => {
      const datum = { label, lang };
      if (lang === "en") {
        datum.path = `/${page}.html`;
      } else {
        datum.path = `/${lang}/${page}.html`;
      }
      return datum;
    });
}
