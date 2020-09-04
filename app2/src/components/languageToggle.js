import { Component } from "./_componentBase";
import { langToggle } from "../utils/translate";

export class LanguageToggle extends Component {
  constructor() {
    super({ element: document.querySelector("div.lang-toggle") });
  }

  init() {
    this.handleClick = this.handleClick.bind(this);
    this.getCurrentLanguage = this.getCurrentLanguage.bind(this);
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

  handleClick(event) {
    event.preventDefault();
    window.localStorage.setItem("lang", this.getCurrentLanguage(event.target));
    langToggle();
  }
}
