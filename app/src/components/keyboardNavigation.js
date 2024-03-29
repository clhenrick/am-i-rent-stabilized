import { goToNextSlide, goToPrevSlide } from "../action_creators";
import { Component } from "./_componentBase";

export class KeyboardNavigation extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();
    this.slides = this.element.querySelectorAll(".slide");

    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.maybeGoToNextSlide = this.maybeGoToNextSlide.bind(this);
    this.maybeGoToPrevSlide = this.maybeGoToPrevSlide.bind(this);

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  removeEvents() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  cleanUp() {
    this.removeEvents();
  }

  handleKeyDown(event) {
    if (
      event.target &&
      typeof event.target.matches === "function" &&
      // disregard the event when the target is NOT coming from a .slide div element
      !event.target.matches("div.slide")
    ) {
      return;
    }
    switch (event.code) {
      case "ArrowDown":
        event.preventDefault();
        this.maybeGoToNextSlide();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.maybeGoToPrevSlide();
        break;
      default:
        break;
    }
  }

  maybeGoToNextSlide() {
    if (this.curSlideIndex() < this.slides.length - 1) {
      this.store.dispatch(goToNextSlide());
    }
  }

  maybeGoToPrevSlide() {
    if (this.curSlideIndex() > 0) {
      this.store.dispatch(goToPrevSlide());
    }
  }

  curSlideIndex() {
    const { slides } = this.store.getState();
    return slides.curIndex;
  }
}
