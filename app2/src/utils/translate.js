import { getPageJsBundle } from "./pageBundle";
import { LANGS } from "./constants";

// FIXME: alias these in webpack config
const w = window;
const d = document;

/**
 * translatePage
 * For a given HTML page:
 * load the correct locale json & hbs template
 * render the HTML with the locale
 * then load the page's JS bundle.
 * This is called when the page first loads and
 * when the user changes the page's language.
 */
export async function translatePage() {
  const currentPage = getCurrentPageName();
  try {
    await renderHtmlFromTemplate(getCurLang(), currentPage);
    const main = await getPageJsBundle(currentPage);
    main();
  } catch (error) {
    console.error(error);
  }
}

export function getCurLang() {
  const lang = w.localStorage.getItem("lang");
  if (lang && Object.values(LANGS).indexOf(lang) !== -1) {
    return lang;
  }
  return "en";
}

export function setCurLang(lang) {
  if (lang && Object.values(LANGS).indexOf(lang) !== -1) {
    d.body.className = lang;
    d.querySelector("html").lang = lang;
    w.localStorage.setItem("lang", lang);
  }
}

export function getCurrentPageName() {
  let result = d.URL.substring(
    d.URL.lastIndexOf("/") + 1,
    d.URL.lastIndexOf(".")
  );
  // FIXME: redirect URL to index.html instead? or a 404 page?
  if (["index", "why", "how", "resources"].indexOf(result) === -1) {
    result = "index";
  }
  return result;
}

async function renderHtmlFromTemplate(lang, pageName) {
  try {
    const [{ default: template }, locales] = await Promise.all([
      getHtmlTemplate(pageName),
      getLocaleJson(pageName),
    ]);
    renderHtml(lang, locales, template);
  } catch (error) {
    console.error(error);
  }
}

export function renderHtml(lang, localeJson, template) {
  if (lang && localeJson && template) {
    d.querySelector("#wrapper").innerHTML = template(localeJson[lang]);
  }
}

export async function getLocaleJson(pageName) {
  const localesDirName = "locales";
  const dir = pageName === "index" ? "." : "..";
  const name = pageName === "index" ? "main" : pageName;
  const localeFileName = `${name}-content.json`;
  try {
    const res = await fetch(`${dir}/${localesDirName}/${localeFileName}`);
    if (res.ok) return res.json();
  } catch (error) {
    throw new Error("Problem fetching locale json");
  }
}

export async function getHtmlTemplate(pageName) {
  const name = pageName === "index" ? "main" : pageName;
  try {
    return await import(
      /* webpackChunkName: "locales-hbs" */ `../hbs_templates/${name}.hbs`
    );
  } catch (error) {
    throw new Error("Problem loading .hbs file");
  }
}
