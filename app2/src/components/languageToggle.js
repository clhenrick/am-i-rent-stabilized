import { Component } from "./_componentBase";
import { langToggle, getCurLang } from "../utils/translate";
import { LANGS, IN_LANG } from "../utils/constants";

export class LanguageToggle extends Component {
  constructor() {
    super({ element: document.querySelector("div.lang-toggle") });
  }

  init() {
    this.toggleBtnES = this.element.querySelector(".toggle-es");
    this.toggleBtnZH = this.element.querySelector(".toggle-zh");
    this.handleClick = this.handleClick.bind(this);
    this.getLangFromBtn = this.getLangFromBtn.bind(this);
    this.setLanguageToggleBtns = this.setLanguageToggleBtns.bind(this);
    this.bindEvents();
    this.setLanguageToggleBtns();
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

  handleClick(event) {
    event.preventDefault();
    window.localStorage.setItem("lang", this.getLangFromBtn(event.target));
    langToggle();
  }

  getLangFromBtn(btn) {
    let result;
    if (btn.innerHTML === "en español") {
      result = "es";
    } else if (btn.innerHTML === "中文") {
      result = "zh";
    } else {
      result = "en";
    }
    return result;
  }

  // TODO:
  // - refactor logic?
  setLanguageToggleBtns() {
    if (getCurLang() === LANGS.ES) {
      // toggle lang to es
      // 1. toggle previous lang text & lang attr to en
      this.toggleBtnES.innerHTML = IN_LANG.EN;
      this.toggleBtnES.lang = LANGS.EN;

      // 2. toggle class name to en
      this.toggleBtnES.classList.remove("toggle-es");
      this.toggleBtnES.classList.add("toggle-en");

      // 3. make sure other button has correct text & lang attr
      this.toggleBtnZH.innerHTML = IN_LANG.ZH;
      this.toggleBtnZH.lang = LANGS.ZH;

      // 4. update body class name to current lang
      document.body.classList.add("es");
      document.body.classList.remove("en");
      document.body.classList.remove("zh");

      // 5. set lang attr on html tag
      document.querySelector("html").lang = LANGS.ES;
    } else if (getCurLang() === LANGS.ZH) {
      // toggle to zh
      // similar process to toggle to es above
      this.toggleBtnES.innerHTML = IN_LANG.ES;
      this.toggleBtnES.lang = LANGS.ES;

      this.toggleBtnZH.innerHTML = IN_LANG.EN;
      this.toggleBtnZH.lang = LANGS.EN;

      this.toggleBtnZH.classList.remove("toggle-zh");
      this.toggleBtnZH.classList.add("toggle-en");

      document.body.classList.add("zh");
      document.body.classList.remove("es");
      document.body.classList.remove("en");

      document.querySelector("html").lang = LANGS.ZH;
    } else {
      // default is to set lang to en

      // make sure other btns text & lang attr are correctly set
      this.toggleBtnES.innerHTML = IN_LANG.ES;
      this.toggleBtnES.lang = LANGS.ES;

      this.toggleBtnZH.innerHTML = IN_LANG.ZH;
      this.toggleBtnZH.lang = LANGS.ZH;

      // toggle body class name
      document.body.classList.add("en");
      document.body.classList.remove("es");
      document.body.classList.remove("zh");

      // set html tag's lang attr
      document.querySelector("html").lang = LANGS.EN;
    }
  }
}
