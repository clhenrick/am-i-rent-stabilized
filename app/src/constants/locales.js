export const LANGS = {
  EN: "en",
  ES: "es",
  ZH: "zh",
};

export const IN_LANG = {
  EN: "in english",
  ES: "en español",
  ZH: "中文",
};

export const IN_LANG_TO_LANG = Object.entries(IN_LANG).reduce(
  (acc, [key, val]) => {
    acc[val] = LANGS[key];
    return acc;
  },
  {}
);

export const LOCALES_JSON_DIR = "locales";
