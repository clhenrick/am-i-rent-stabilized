import { observeStore } from "../store";
import { Component } from "./_componentBase";

export class TenantsRightsModal extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.unsubscribe = observeStore(
      this.store,
      (state) => state.tenantsRights,
      this.handleTenantsRightsChange
    );

    this.handleTenantsRightsChange = this.handleTenantsRightsChange.bind(this);
  }

  handleTenantsRightsChange(state) {
    console.log(state);
  }

  cleanUp() {
    this.unsubscribe();
    this.removeEvents();
    this.element = null;
  }
}
