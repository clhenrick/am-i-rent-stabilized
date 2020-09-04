import { Component } from "./_componentBase";
import { langToggle } from "../utils/translate";

export class LanguageToggle extends Component {
  constructor() {
    super({ element: document.querySelector("div.lang-toggle") });
  }

  init() {
    this.handleClick = this.handleClick.bind(this);
    this.getCurrentLanguage = this.getCurrentLanguage.bind(this);
    this.changeLanguageButtons = this.changeLanguageButtons.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    this.element.querySelectorAll("a").forEach((btn) => {
      btn.addEventListener("click", this.handleClick);
    });
  }

  removeEvents() {
    this.element.querySelectorAll("a").forEach((btn) => {
      btn.removeEventListener("click", this.handleClick);
    });
  }

  getCurrentLanguage(target) {
    let result;
    if (target.innerHTML === "en español") {
      result = "es";
    } else if (target.innerHTML === "中文") {
      result = "zh";
    } else {
      result = "en";
    }
    return result;
  }

  // TODO:
  // - this should fire when template data has finished loading
  // - refactor logic?
  // - drop usage of jQuery
  changeLanguageButtons(lang) {
    const $es = $(".lang-toggle .toggle-es");
    const $zh = $(".lang-toggle .toggle-zh");

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

  handleClick(event) {
    event.preventDefault();
    window.localStorage.setItem("lang", this.getCurrentLanguage(event.target));
    langToggle();
  }
}
