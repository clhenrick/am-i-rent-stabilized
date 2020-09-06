import { getPageJsBundle } from "./pageBundle";

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
  return w.localStorage.getItem("lang") || "en";
}

export function setCurLang(lang) {
  w.localStorage.setItem("lang", lang || "en");
}

function getCurrentPageName() {
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
    const [{ default: template }, { languages }] = await Promise.all([
      getHtmlTemplate(pageName),
      getLocaleJson(lang, pageName),
    ]);
    renderHtml(lang, languages, template);
  } catch (error) {
    console.error(error);
  }
}

function renderHtml(lang, localeJson, template) {
  if (lang && localeJson && template) {
    d.querySelector("#wrapper").innerHTML = template(localeJson[lang]);
  }
}

async function getLocaleJson(lang, pageName) {
  const localesDirName = "locales";
  const dir = pageName === "index" ? "." : "..";
  const name = pageName === "index" ? "main" : pageName;
  const localeFileName = `${name}-content.json`;
  const res = await fetch(`${dir}/${localesDirName}/${localeFileName}`);
  if (res.ok) return res.json();
  throw new Error("Problem fetching locale json");
}

async function getHtmlTemplate(pageName) {
  const name = pageName === "index" ? "main" : pageName;
  return await import(
    /* webpackChunkName: "locales-hbs" */ `../hbs_templates/${name}.hbs`
  );
}
