const langCodes = ["en", "es", "zh"];
const langLabels = ["In English", "En espanol", "中文"];
const langData = langCodes.reduce((acc, cur, index) => {
  acc.set(cur, langLabels[index]);
  return acc;
}, new Map());

/** generates the necessary data for each page to link to its equivalent page in the other supported languages */
export function getRoutesForLang (currentLang, page, isHomepage = false) {
  return [...langData.entries()]
    .filter(([lang]) => lang !== currentLang)
    .map(([lang, label], i) => {
      const toReturn = { label, lang };
      if (lang === "en" && isHomepage) {
        toReturn.path = `/${page}.html`;
      } else {
        toReturn.path = `/${lang}/${page}.html`;
      }
      return toReturn;
    });
}
