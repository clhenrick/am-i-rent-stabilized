import { Component } from "./_componentBase";

export class MapPopup extends Component {
  constructor(props) {
    super(props);
  }

  init(props) {
    this.map = props.map;
    this.mapDimensions = this.map.dimensions;
    this.contentContainer = this.element.querySelector(".map-pop-up--content");
    this.arrowContainer = this.element.querySelector(
      ".map-pop-up--arrow-container"
    );

    this.setContent = this.setContent.bind(this);
    this.setPosition = this.setPosition.bind(this);
  }

  setContent(addressRecord) {
    if (!addressRecord) {
      this.contentContainer.innerHTML = "";
    } else {
      const { name, borough, state, zipcode } = addressRecord;
      this.contentContainer.innerHTML = `<p>${name}</p><p>${borough} ${state} ${zipcode}</p>`;
    }
  }

  setPosition() {
    const { width } = this.dimensions;
    this.element.style.left = `${width / 2}px`;
  }

  show() {
    this.element.classList.remove("hidden");
  }

  hide() {
    this.element.classList.add("hidden");
  }

  get dimensions() {
    const { width, height } = this.element.getBoundingClientRect();
    return { width, height };
  }
}
