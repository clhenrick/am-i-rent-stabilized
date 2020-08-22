/*jshint esversion: 6 */
import Handlebars from "handlebars";

const w = window;
const d = document;

let $es;
let $zh;

Handlebars.registerHelper("each", function (context, options) {
  var ret = "";
  for (var i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }
  return ret;
});

Handlebars.registerHelper("if", function (conditional, options) {
  if (conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

export function langToggle(/*lang, callback*/) {
  // loads the correct lang json & template;
  // this gets called when the page first loads and when the user clicks the lang button
  var curLang = w.localStorage.getItem("lang") || "en";
  var currentPage = d.URL.substring(
    d.URL.lastIndexOf("/") + 1,
    d.URL.lastIndexOf(".")
  );

  // TODO: redirect URL to index.html instead
  if (["index", "why", "how", "resources"].indexOf(currentPage) === -1) {
    currentPage = "index";
  }

  loadTemplateData(curLang, currentPage);
}

export async function loadTemplateData(lang, currentPage, callback) {
  let template,
    html,
    filePath,
    contentFolder = "data/";

  // set variables to the correct JSON file & template based on the app's current page
  if (currentPage === "index") {
    filePath = contentFolder + "main-content.json";
    const { default: _ } = await import(
      /* webpackChunkName: "main-hbs" */ "./templates/main.hbs"
    );
    template = _;
  } else if (currentPage === "why") {
    filePath = "../" + contentFolder + "why-content.json";
    const { default: _ } = await import(
      /* webpackChunkName: "why-hbs" */ "./templates/why.hbs"
    );
    template = _;
  } else if (currentPage === "how") {
    filePath = "../" + contentFolder + "how-content.json";
    const { default: _ } = await import(
      /* webpackChunkName: "how-hbs" */ "./templates/how.hbs"
    );
    template = _;
  } else if (currentPage === "resources") {
    filePath = "../" + contentFolder + "resources-content.json";
    const { default: _ } = await import(
      /* webpackChunkName: "resources-hbs" */ "./templates/resources.hbs"
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
    initLangButtons();
  }).done(function () {
    /* TODO: FIX ME */
    // if (currentPage === "index") {
    //   /* app init() is called here */
    //   app.init.init();
    // } else {
    //   app.pages.toggleBurger();
    // }
    $es = $(".lang-toggle .toggle-es");
    $zh = $(".lang-toggle .toggle-zh");
    // $en = $(".lang-toggle .toggle-en");
    changeLangButtons(lang);
    if (callback && typeof callback === "function") {
      callback();
    }
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

function initLangButtons() {
  // add the event listener
  $(".lang-toggle")
    .find("a")
    .on("click", function (e) {
      e.preventDefault();
      var lang;
      var val = $(this).html();
      if (val === "en español") {
        lang = "es";
      } else if (val === "中文") {
        lang = "zh";
      } else {
        lang = "en";
      }
      w.localStorage.setItem("lang", lang);
      langToggle(lang);
      return false;
    });
}
