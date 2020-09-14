import { LANGS, IN_LANG } from "../utils/constants";

export class LanguageToggleButton {
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
