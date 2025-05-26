/** page names that locales are indexed by */
const keys = ["main", "how", "why", "resources"];

/** creates an object containing the locales json data for each page keyed by language code */
function getLocalesByLang(locales, lang) {
  const keysByLocale = keys.map((key) => `${key}-${lang}`);
  const commonLocaleKey = `common-${lang}`;
  return keys.reduce((acc, cur, index) => {
    const localeKey = keysByLocale[index];
    acc[cur] = {
      ...locales[commonLocaleKey],
      ...locales[localeKey],
    };
    return acc;
  }, {});
}

/** global data keyed by language code for i18n */
export default {
  en: ({ locales }) => getLocalesByLang(locales, "en"),
  es: ({ locales }) => getLocalesByLang(locales, "es"),
  zh: ({ locales }) => getLocalesByLang(locales, "zh"),
}
