import { Component } from "./_componentBase";
import { MAP_BORDER_WIDTH, MAP_MARKER } from "../constants/app";

export class MapPopup extends Component {
  constructor(props) {
    super(props);
  }

  init(props) {
    this.map = props.map;
    this.contentContainer = this.element.querySelector(".map-pop-up--content");
    this.setContent = this.setContent.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
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
    const mapWidth = this.map.dimensions.width + MAP_BORDER_WIDTH * 2;
    const mapHeight = this.map.dimensions.height + MAP_BORDER_WIDTH * 2;
    const { width, height } = this.dimensions;
    this.element.style.left = `${mapWidth / 2 - width / 2}px`;
    this.element.style.top = `${
      mapHeight / 2 - height - MAP_MARKER.HEIGHT - MAP_MARKER.TRIANGLE_OFFSET
    }px`;
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

  get mapDimensions() {
    return this.map.dimensions;
  }
}
