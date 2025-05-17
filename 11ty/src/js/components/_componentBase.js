/* Class that all Components which rely on a DOM node inherit from */
export class Component {
  /**
   * @param props.element The Component's DOM node. (Required)
   * @param props.store The Redux store singleton (Optional)
   */
  constructor(props = {}) {
    if ("element" in props && props.element instanceof HTMLElement) {
      this._element = props.element;
    } else {
      throw new Error("Component requires a valid DOM element prop");
    }

    if (
      "store" in props &&
      typeof props.store === "object" &&
      typeof props.store.dispatch === "function" &&
      typeof props.store.getState === "function" &&
      typeof props.store.subscribe === "function"
    ) {
      this._store = props.store;
    }

    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.checkForStore = this.checkForStore.bind(this);
    this.cleanUp = this.cleanUp.bind(this);

    this.init(props);
  }

  // Do any other setup work here such as add more class properties,
  // fetch data, etc. Make sure to call this.bindEvents() here.
  // @param Props:  props are passed as an arg from the constructor.
  init(/* props */) {}

  // Add any DOM event listeners
  bindEvents() {}

  // Remove any DOM event listeners
  removeEvents() {}

  // placeholder to unsubscribe from redux store, if subscribed to
  unsubscribe() {}

  // can be used to make sure a store is passed when a component relies on it
  checkForStore() {
    if (!this.store) {
      throw new Error("Requires redux store as a prop");
    }
  }

  // call prior to removing component instance
  cleanUp() {
    this.unsubscribe();
  }

  get element() {
    return this._element;
  }

  set element(el) {
    this._element = el;
  }

  get store() {
    return this._store;
  }
}
