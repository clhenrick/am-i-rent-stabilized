import { Component } from "./_componentBase";
import { store } from "../store";

export class SlidesContainer extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.slides = [...this.element.querySelectorAll(".slide")];
    this.prefersReducedMotion = false;
    this.activeSlide = store.getState().slides.curIndex;

    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSlidesUpdate = this.handleSlidesUpdate.bind(this);
    this.scrollToActiveSlide = this.scrollToActiveSlide.bind(this);
    this.handleMotionQuery = this.handleMotionQuery.bind(this);

    this.bindEvents();
    this.handleMotionQuery();

    store.subscribe(this.handleSlidesUpdate);
  }

  bindEvents() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  removeEvents() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    event.preventDefault();
    switch (event.code) {
      case "ArrowDown":
        // dispatch go next slide
        break;
      case "ArrowUp":
        // dispatch go prev slide
        break;
      default:
        break;
    }
  }

  handleSlidesUpdate() {
    const { slides } = store.getState();
    if (slides.curIndex !== this.activeSlideIdx) {
      // console.log("activeSlide: ", this.activeSlide);
      // console.log(`go to slide ${slides.curIndex}`);
      this.activeSlide = slides.curIndex;
      this.scrollToActiveSlide();
    }
  }

  scrollToActiveSlide() {
    this.activeSlide.scrollIntoView({
      behavior: this.prefersReducedMotion ? "auto" : "smooth",
    });
  }

  handleMotionQuery() {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      this.prefersReducedMotion = true;
    }
  }

  set activeSlide(value) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.slides[value].classList.add("active");
  }

  get activeSlide() {
    return this.slides[this.activeSlideIdx];
  }

  set activeSlideIdx(value) {
    this.activeSlide = value;
  }

  get activeSlideIdx() {
    return this.slides.findIndex((slide) => slide.classList.contains("active"));
  }
}
