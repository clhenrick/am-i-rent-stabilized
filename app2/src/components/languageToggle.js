import { Component } from "./_componentBase";
import { translatePage, getCurLang, setCurLang } from "../utils/translate";
import { LANGS, IN_LANG } from "../utils/constants";

export class LanguageToggle extends Component {
  constructor(props) {
    super(props);
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
    setCurLang(this.getLangFromBtn(event.target));
    translatePage();
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

  setLanguageToggleBtns() {
    const es = new LanguageToggleButton({
      lang: LANGS.ES,
      label: IN_LANG.ES,
      className: "toggle-es",
      element: this.toggleBtnES,
    });

    const zh = new LanguageToggleButton({
      lang: LANGS.ZH,
      label: IN_LANG.ZH,
      className: "toggle-zh",
      element: this.toggleBtnZH,
    });

    if (getCurLang() === LANGS.ES) {
      es.toggle();
      document.body.className = LANGS.ES;
      document.querySelector("html").lang = LANGS.ES;
    } else if (getCurLang() === LANGS.ZH) {
      zh.toggle();
      document.body.className = LANGS.ZH;
      document.querySelector("html").lang = LANGS.ZH;
    } else {
      document.body.className = LANGS.EN;
      document.querySelector("html").lang = LANGS.EN;
    }
  }
}

class LanguageToggleButton {
  constructor(props = {}) {
    if ("lang" in props) {
      this.lang = props.lang;
    }

    if ("label" in props) {
      this.label = props.label;
    }

    if ("className" in props) {
      this.className = props.className;
    }

    if ("element" in props) {
      this.element = props.element;
    }

    this.init();
  }

  init() {
    this.element.innerHTML = this.label;
    this.element.className = this.className;
    this.element.lang = this.lang;
  }

  toggle() {
    if (this.element.classList.contains(this.className)) {
      this.element.className = "toggle-en";
      this.element.innerHTML = IN_LANG.EN;
      this.element.lang = LANGS.EN;
    } else {
      this.element.className = this.className;
      this.element.innerHTML = this.label;
      this.element.lang = this.lang;
    }
  }
}
