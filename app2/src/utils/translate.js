/*jshint esversion: 6 */
const w = window;
const d = document;
let $es;
let $zh;

export function langToggle() {
  // loads the correct lang json & template;
  // this gets called when the page first loads and when the user clicks the lang button
  var curLang = w.localStorage.getItem("lang") || "en";
  var currentPage = d.URL.substring(
    d.URL.lastIndexOf("/") + 1,
    d.URL.lastIndexOf(".")
  );

  // TODO: redirect URL to index.html instead? or a 404 page?
  if (["index", "why", "how", "resources"].indexOf(currentPage) === -1) {
    currentPage = "index";
  }

  loadTemplateData(curLang, currentPage);
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

    // TODO: maybe fire a custom event to trigger
    // parts of app that require the DOM to be present?
    // then all this other stuff could be moved elsewhere.
    $es = $(".lang-toggle .toggle-es");
    $zh = $(".lang-toggle .toggle-zh");

    changeLangButtons(lang);
  });
}

function changeLangButtons(lang) {
  // change the language toggle buttons so the user can switch between them
  if (lang === "es") {
    $es.html("in english");
    $es.removeClass("toggle-es").addClass("toggle-en");
    $zh.html("中文");
    $("body").addClass("es");
    $("body").removeClass("en");
    $("body").removeClass("zh");
  } else if (lang === "zh") {
    $es.html("en español");
    $zh.html("in english");
    $zh.removeClass("toggle-zh").addClass("toggle-en");
    $("body").addClass("zh");
    $("body").removeClass("es");
    $("body").removeClass("en");
  } else {
    $es.html("en español");
    $zh.html("中文");
    $("body").addClass("en");
    $("body").removeClass("es");
    $("body").removeClass("zh");
  }
}
