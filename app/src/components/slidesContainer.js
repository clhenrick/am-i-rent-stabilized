import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Component } from "./_componentBase";
import { observeStore } from "../store";

gsap.registerPlugin(ScrollToPlugin);

const SCROLL_DURATION_SECONDS = 0.65;

export class SlidesContainer extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.slides = [...this.element.querySelectorAll(".slide")];
    this.prefersReducedMotion = false;
    this.activeSlide = this.store.getState().slides.curIndex;

    this.handleSlidesUpdate = this.handleSlidesUpdate.bind(this);
    this.scrollToActiveSlide = this.scrollToActiveSlide.bind(this);
    this.handleMotionQuery = this.handleMotionQuery.bind(this);

    this.handleMotionQuery();
    this.unsubscribe = observeStore(
      this.store,
      (state) => state.slides,
      this.handleSlidesUpdate
    );
    console.log(this.activeSlideIdx);
    this.scrollToActiveSlide();
  }

  handleSlidesUpdate() {
    const { slides } = this.store.getState();
    if (slides.curIndex !== this.activeSlideIdx) {
      this.activeSlide = slides.curIndex;
      this.scrollToActiveSlide();
    }
  }

  scrollToActiveSlide() {
    const id = `#slide-${this.activeSlideIdx + 1}`;
    console.log(id);
    const duration = this.prefersReducedMotion ? 0 : SCROLL_DURATION_SECONDS;
    gsap.to(this.element, {
      duration,
      scrollTo: id,
      ease: "sine.inOut",
    });
  }

  handleMotionQuery() {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      this.prefersReducedMotion = true;
    }
  }

  set activeSlide(value) {
    this.slides.forEach((slide) => {
      if (slide === this.slides[value]) {
        slide.classList.add("active");
        slide.removeAttribute("inert");
        slide.setAttribute("aria-hidden", false);
        slide.focus();
      } else {
        slide.classList.remove("active");
        slide.setAttribute("inert", true);
        slide.setAttribute("aria-hidden", true);
      }
    });
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
