export class Component {
  constructor(props = {}) {
    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);

    if ("element" in props && props.element instanceof HTMLElement) {
      this.element = props.element;
    } else {
      throw new Error("Component requires a valid DOM element prop");
    }

    this.init();
  }

  // Do any other setup work here such as add more class properties,
  // fetch data, etc. Make sure to call this.bindEvents() here
  init() {}

  // Add any DOM event listeners
  bindEvents() {}

  // Remove any DOM event listeners
  removeEvents() {}
}
