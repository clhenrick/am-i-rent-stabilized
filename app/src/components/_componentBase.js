export class Component {
  constructor(props = {}) {
    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.checkForStore = this.checkForStore.bind(this);

    // `element` is a required prop!
    if ("element" in props && props.element instanceof HTMLElement) {
      this.element = props.element;
    } else {
      throw new Error("Component requires a valid DOM element prop");
    }

    // Pass the redux store to components as a prop instead of importing it.
    // This makes testing components that use the store a bit easier I think.
    // It also helps make it more clear which components use the store
    if (
      "store" in props &&
      typeof props.store === "object" &&
      typeof props.store.dispatch === "function" &&
      typeof props.store.getState === "function" &&
      typeof props.store.subscribe === "function"
    ) {
      this.store = props.store;
    }

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

  // can be used to make sure a store is passed when a component relies on it
  checkForStore() {
    if (!this.store) {
      throw new Error("Requires redux store as a prop");
    }
  }
}
