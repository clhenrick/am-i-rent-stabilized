import { Component } from "./_componentBase";
import { LanguageToggleButton } from "./languageToggleButton";
import { resetAppState } from "../action_creators";
import { translatePage, getCurLang, setCurLang } from "../utils/translate";
import { LANGS, IN_LANG, IN_LANG_TO_LANG } from "../constants/locales";
import { logLanguageToggle } from "../utils/logging";

export class LanguageToggle extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.checkForStore();

    this.toggleBtnES = this.element.querySelector(".toggle-es");
    this.toggleBtnZH = this.element.querySelector(".toggle-zh");

    this.es = new LanguageToggleButton({
      lang: LANGS.ES,
      label: IN_LANG.ES,
      element: this.toggleBtnES,
    });

    this.zh = new LanguageToggleButton({
      lang: LANGS.ZH,
      label: IN_LANG.ZH,
      element: this.toggleBtnZH,
    });

    this.handleClick = this.handleClick.bind(this);
    this.getLangFromBtn = this.getLangFromBtn.bind(this);
    this.setLanguageToggleBtnsText = this.setLanguageToggleBtnsText.bind(this);

    this.bindEvents();
    this.setLanguageToggleBtnsText();
  }

  bindEvents() {
    this.element.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", this.handleClick);
    });
  }

  removeEvents() {
    this.element.querySelectorAll("button").forEach((btn) => {
      btn.removeEventListener("click", this.handleClick);
    });
  }

  handleClick(event) {
    setCurLang(this.getLangFromBtn(event.target.innerHTML));
    logLanguageToggle(this.getLangFromBtn(event.target.innerHTML));
    this.store.dispatch(resetAppState());
    translatePage();
  }

  getLangFromBtn(inLang) {
    return IN_LANG_TO_LANG[inLang];
  }

  setLanguageToggleBtnsText() {
    switch (getCurLang()) {
      case LANGS.ES:
        this.es.toggle();
        break;
      case LANGS.ZH:
        this.zh.toggle();
        break;
      default:
        break;
    }
  }
}
