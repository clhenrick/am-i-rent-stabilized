/*jshint esversion: 6 */

export function langToggle(lang, callback) {
  // loads the correct lang json & template;
  // this gets called when the page first loads and when the user clicks the lang button
  var curLang = w.localStorage.getItem("lang") || "en";
  var currentPage = document.URL.substring(
    document.URL.lastIndexOf("/") + 1,
    document.URL.lastIndexOf(".")
  );

  // TODO: redirect URL to index.html instead
  if (["index", "why", "how", "resources"].indexOf(currentPage) === -1) {
    currentPage = "index";
  }

  loadTemplateData(curLang, currentPage);
}

export function loadTemplateData(lang, currentPage, callback) {
  var template,
    html,
    filePath,
    contentFolder = "data/";

  // set variables to the correct JSON file & template based on the app's current page
  if (currentPage === "index") {
    filePath = contentFolder + "main-content.json";
    template = app.templates.main;
  } else if (currentPage === "why") {
    filePath = "../" + contentFolder + "why-content.json";
    template = app.templates.why;
  } else if (currentPage === "how") {
    filePath = "../" + contentFolder + "how-content.json";
    template = app.templates.how;
  } else if (currentPage === "resources") {
    filePath = "../" + contentFolder + "resources-content.json";
    template = app.templates.resources;
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
    initLangButtons();
  }).done(function () {
    if (currentPage === "index") {
      /* app init() is called here */
      app.init.init();
    } else {
      app.pages.toggleBurger();
    }
    $es = $(".lang-toggle .toggle-es");
    $zh = $(".lang-toggle .toggle-zh");
    $en = $(".lang-toggle .toggle-en");
    changeLangButtons(lang);
    if (callback && typeof callback === "function") {
      callback();
    }
  });
}
