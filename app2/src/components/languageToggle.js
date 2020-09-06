import { Component } from "./_componentBase";
import { translatePage, getCurLang, setCurLang } from "../utils/translate";
import { LANGS, IN_LANG, IN_LANG_TO_LANG } from "../utils/constants";

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
    setCurLang(this.getLangFromBtn(event.target.innerHTML));
    translatePage();
  }

  getLangFromBtn(inLang) {
    return IN_LANG_TO_LANG[inLang];
  }

  setLanguageToggleBtns() {
    const es = new LanguageToggleButton({
      lang: LANGS.ES,
      label: IN_LANG.ES,
      element: this.toggleBtnES,
    });

    const zh = new LanguageToggleButton({
      lang: LANGS.ZH,
      label: IN_LANG.ZH,
      element: this.toggleBtnZH,
    });

    if (getCurLang() === LANGS.ES) {
      es.toggle();
    } else if (getCurLang() === LANGS.ZH) {
      zh.toggle();
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

    if ("element" in props) {
      this.element = props.element;
    }

    this.init();
  }

  init() {
    this.className = `toggle-${this.lang}`;
    this.toggledClassName = `toggle-${LANGS.EN}`;
    this.element.innerHTML = this.label;
    this.element.className = this.className;
    this.element.lang = this.lang;
  }

  toggle() {
    if (this.element.classList.contains(this.className)) {
      this.element.className = this.toggledClassName;
      this.element.innerHTML = IN_LANG.EN;
      this.element.lang = LANGS.EN;
    } else {
      this.element.className = this.className;
      this.element.innerHTML = this.label;
      this.element.lang = this.lang;
    }
  }
}
