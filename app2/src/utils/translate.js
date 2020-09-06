/*jshint esversion: 6 */
const w = window;
const d = document;

// loads the correct lang json & hbs template;
// this gets called when the page first loads and when the user clicks the lang button
export function langToggle() {
  let currentPage = d.URL.substring(
    d.URL.lastIndexOf("/") + 1,
    d.URL.lastIndexOf(".")
  );

  // FIXME: redirect URL to index.html instead? or a 404 page?
  if (["index", "why", "how", "resources"].indexOf(currentPage) === -1) {
    currentPage = "index";
  }

  loadTemplateData(getCurLang(), currentPage);
}

export async function loadTemplateData(lang, currentPage) {
  let template,
    html,
    filePath,
    contentFolder = "data/";

  // set variables to the correct JSON file & template based on the app's current page
  if (currentPage === "index") {
    filePath = contentFolder + "main-content.json";
    const { default: _ } = await import(
      /* webpackChunkName: "main-hbs" */ "../hbs_templates/main.hbs"
    );
    template = _;
  } else if (currentPage === "why") {
    filePath = "../" + contentFolder + "why-content.json";
    const { default: _ } = await import(
      /* webpackChunkName: "why-hbs" */ "../hbs_templates/why.hbs"
    );
    template = _;
  } else if (currentPage === "how") {
    filePath = "../" + contentFolder + "how-content.json";
    const { default: _ } = await import(
      /* webpackChunkName: "how-hbs" */ "../hbs_templates/how.hbs"
    );
    template = _;
  } else if (currentPage === "resources") {
    filePath = "../" + contentFolder + "resources-content.json";
    const { default: _ } = await import(
      /* webpackChunkName: "resources-hbs" */ "../hbs_templates/resources.hbs"
    );
    template = _;
  }

  $.getJSON(filePath, function (data) {
    // load the correct language from the json data
    if (lang === "es") {
      html = template(data.languages.es);
    } else if (lang === "zh") {
      html = template(data.languages.zh);
    } else {
      html = template(data.languages.en);
    }
    d.querySelector("#wrapper").innerHTML = html;
  }).done(async function () {
    // load the correct chunk for either the app for index.html or helper js for info/*.html pages
    let init;
    if (currentPage === "index") {
      const { default: _ } = await import(
        /* webpackChunkName: "init-app" */ "./initApp.js"
      );
      init = _;
    } else {
      const { default: _ } = await import(
        /* webpackChunkName: "init-info-pages" */ "./initInfoPages.js"
      );
      init = _;
    }
    init();
  });
}

export function getCurLang() {
  return w.localStorage.getItem("lang") || "en";
}

export function setCurLang(lang) {
  w.localStorage.setItem("lang", lang || "en");
}
