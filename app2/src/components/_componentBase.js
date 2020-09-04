export class Component {
  constructor(props = {}) {
    this.bindEvents = this.bindEvents || function () {};
    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents || function () {};
    this.removeEvents = this.removeEvents.bind(this);

    if ("element" in props) {
      this.element = props.element;
    }

    this.bindEvents();
  }
}
