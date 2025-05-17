import { LANGS, IN_LANG } from "../constants/locales";
import { Component } from "./_componentBase";

export class LanguageToggleButton extends Component {
  constructor(props) {
    super(props);
  }

  init(props) {
    if ("lang" in props && typeof props.lang === "string") {
      this.lang = props.lang;
    } else {
      throw Error("LanguageToggleButton requires a valid `lang` property");
    }

    if ("label" in props && typeof props.label === "string") {
      this.label = props.label;
    } else {
      throw Error("LanguageToggleButton requires a valid `label` property");
    }

    this.className = `toggle-${this.lang}`;
    this.toggledClassName = `toggle-${LANGS.EN}`;
    this.element.innerHTML = this.label;
    this.element.className = `${this.className} button`;
    this.element.lang = this.lang;
  }

  toggle() {
    if (this.element.classList.contains(this.className)) {
      this.element.className = `${this.toggledClassName} button`;
      this.element.innerHTML = IN_LANG.EN;
      this.element.lang = LANGS.EN;
    } else {
      this.element.className = `${this.className} button`;
      this.element.innerHTML = this.label;
      this.element.lang = this.lang;
    }
  }
}
