export class Component {
  constructor() {
    this.bindEventListeners = this.bindEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
  }

  bindEventListeners() {}

  removeEventListeners() {}
}
