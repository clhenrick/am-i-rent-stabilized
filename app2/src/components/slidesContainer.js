import { Component } from "./_componentBase";
import { store } from "../store";

export class SlidesContainer extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.handleSlidesUpdate = this.handleSlidesUpdate.bind(this);
    this.handleSlidesUpdate();
  }

  handleSlidesUpdate() {
    store.subscribe(() => {
      const { slides } = store.getState();
      console.log("Slides state update: ", slides);
    });
  }
}
