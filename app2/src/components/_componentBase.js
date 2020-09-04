export class Component {
  constructor(props = {}) {
    this.init = this.init || function () {};
    this.init = this.init.bind(this);

    this.bindEvents = this.bindEvents || function () {};
    this.bindEvents = this.bindEvents.bind(this);

    this.removeEvents = this.removeEvents || function () {};
    this.removeEvents = this.removeEvents.bind(this);

    if ("element" in props) {
      this.element = props.element;
    }

    // do other setup work here such as add more class properties, fetch data, etc.
    // make sure to call this.bindEvents() here
    this.init();
  }
}
