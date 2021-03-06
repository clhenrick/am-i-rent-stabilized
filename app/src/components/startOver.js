import { Component } from "./_componentBase";
import { resetAppState } from "../action_creators";

export class StartOver extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.checkForStore();
    this.handleClick = this.handleClick.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener("click", this.handleClick);
  }

  removeEvents() {
    this.element.removeEventListener("click", this.handleClick);
  }

  handleClick(event) {
    event.preventDefault();
    this.store.dispatch(resetAppState());
  }
}
