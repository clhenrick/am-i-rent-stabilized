import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Component } from "./_componentBase";
import { observeStore } from "../store";

// NOTE: this is required for GSAP plugins to work with module bundlers
gsap.registerPlugin(ScrollToPlugin);

export const SCROLL_DURATION_SECONDS = 0.65;

export class SlidesContainer extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.slides = [...this.element.querySelectorAll(".slide")];
    this.prefersReducedMotion = false;
    this.activeSlideIndex = this.store.getState().slides.curIndex;
    this.previousSlideIndex = undefined;

    this.handleSlidesUpdate = this.handleSlidesUpdate.bind(this);
    this.scrollToActiveSlide = this.scrollToActiveSlide.bind(this);
    this.handleMotionQuery = this.handleMotionQuery.bind(this);
    this.handleScrollComplete = this.handleScrollComplete.bind(this);

    this.handleMotionQuery();
    this.unsubscribe = observeStore(
      this.store,
      (state) => state.slides,
      this.handleSlidesUpdate
    );
    this.scrollToActiveSlide();
  }

  handleSlidesUpdate() {
    const { slides } = this.store.getState();
    if (slides.curIndex !== this.activeSlideIndex) {
      this.previousSlideIndex = this.activeSlideIndex;
      this.activeSlideIndex = slides.curIndex;
      this.scrollToActiveSlide();
    }
  }

  scrollToActiveSlide() {
    const id = `#slide-${this.activeSlideIndex + 1}`;
    const duration = this.prefersReducedMotion ? 0 : SCROLL_DURATION_SECONDS;
    const toOptions = {
      duration,
      scrollTo: id,
      ease: "sine.inOut",
      onComplete: this.handleScrollComplete,
    };
    // NOTE: we call gsap.fromTo when previousSlideIndex exists to avoid unintentionally scrolling from the first slide.
    // this avoids a side effect from a bugfix for issue #131 where the non-active slides are hidden then revealed to prevent an undesirable layout shift from the soft keyboard on touch screen devices.
    if (
      typeof this.previousSlideIndex === "number" &&
      !isNaN(this.previousSlideIndex)
    ) {
      const previousId = `#slide-${this.previousSlideIndex + 1}`;
      const fromOptions = { scrollTo: previousId };
      gsap.fromTo(this.element, fromOptions, toOptions);
    } else {
      gsap.to(this.element, toOptions);
    }
  }

  handleScrollComplete() {
    this.activeSlide.focus();
  }

  handleMotionQuery() {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      this.prefersReducedMotion = true;
    }
  }

  /** updates a slide in the document to be the "active" one and all other slides to be "inactive" */
  set activeSlide(target) {
    this.slides.forEach((slide) => {
      if (slide === target) {
        slide.classList.add("active");
        slide.removeAttribute("inert");
        slide.setAttribute("aria-hidden", false);
      } else {
        slide.classList.remove("active");
        slide.setAttribute("inert", true);
        slide.setAttribute("aria-hidden", true);
      }
    });
  }

  /** returns the slide that currently has a class of "active" */
  get activeSlide() {
    return this.slides[this.activeSlideIndex];
  }

  /** alias for setting activeSlide via an index */
  set activeSlideIndex(index) {
    this.activeSlide = this.slides[index];
  }

  /** returns the index of the slide with a class of "active" */
  get activeSlideIndex() {
    return this.slides.findIndex((slide) => slide.classList.contains("active"));
  }
}
