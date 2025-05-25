import { Component } from "./_componentBase";
import { goToNextSlide, goToSlideIdx } from "../action_creators";

export class AdvanceSlides extends Component {
  constructor(props) {
    super(props);
  }

  init(props) {
    super.checkForStore();

    if ("advanceToIdx" in props && typeof props.advanceToIdx === "number") {
      this.advanceToIdx = props.advanceToIdx;
    }

    this.handleClick = this.handleClick.bind(this);
    this.advanceToSlide = this.advanceToSlide.bind(this);
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
    this.advanceToSlide();
  }

  advanceToSlide() {
    if (this.advanceToIdx !== undefined) {
      this.store.dispatch(goToSlideIdx(this.advanceToIdx));
    } else {
      this.store.dispatch(goToNextSlide());
    }
  }
}
