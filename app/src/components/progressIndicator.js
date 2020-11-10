import { Component } from "./_componentBase";
import { observeStore } from "../store";

export class ProgressIndicator extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();
    this.list = this.element.querySelector("ul");
    this.renderCircles = this.renderCircles.bind(this);
    this.appendCircle = this.appendCircle.bind(this);
    this.unsubscribe = observeStore(
      this.store,
      (state) => state.slides.curIndex,
      this.renderCircles
    );
  }

  renderCircles() {
    const slides = document.querySelectorAll(".slide");
    this.list.innerHTML = "";
    slides.forEach((_slide, index) => this.appendCircle(index));
  }

  appendCircle(index) {
    const listItem = document.createElement("li");
    if (index === this.curSlideIndex) {
      listItem.classList.add("active");
    }
    this.list.append(listItem);
  }

  get curSlideIndex() {
    const { slides } = this.store.getState();
    return slides.curIndex;
  }
}
