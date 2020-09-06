// FIXME: alias these in webpack config
const w = window;
const d = document;

// loads the correct lang json & hbs template;
// this gets called when the page first loads and when the user clicks the lang button
export function translatePage() {
  renderHtmlFromTemplate(getCurLang(), getCurrentPageName());
}

export function getCurLang() {
  return w.localStorage.getItem("lang") || "en";
}

export function setCurLang(lang) {
  w.localStorage.setItem("lang", lang || "en");
}

async function renderHtmlFromTemplate(lang, currentPage) {
  try {
    const { default: template } = await getHtmlTemplate(currentPage);
    const { languages } = await getLocaleJson(lang, currentPage);
    renderHtml(lang, languages, template);
  } catch (error) {
    console.error(error);
  }
}

function getCurrentPageName() {
  let currentPage = d.URL.substring(
    d.URL.lastIndexOf("/") + 1,
    d.URL.lastIndexOf(".")
  );
  // FIXME: redirect URL to index.html instead? or a 404 page?
  if (["index", "why", "how", "resources"].indexOf(currentPage) === -1) {
    currentPage = "index";
  }
  return currentPage;
}

function renderHtml(lang, localeJson, template) {
  if (lang && localeJson && template) {
    d.querySelector("#wrapper").innerHTML = template(localeJson[lang]);
  }
}

async function getLocaleJson(lang, currentPage) {
  const localesDirName = "data";
  const dir = currentPage === "index" ? "." : "..";
  const name = currentPage === "index" ? "main" : currentPage;
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
