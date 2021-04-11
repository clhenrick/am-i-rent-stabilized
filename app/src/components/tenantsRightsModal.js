import Handlebars from "handlebars";
import { observeStore } from "../store";
import { Component } from "./_componentBase";
import { fetchTenantsRightsGroups } from "../action_creators/tenantsRightsGroupsActions";
import template from "../hbs_partials/tenants_rights_modal.hbs";

Handlebars.registerPartial("trGroups", template);

export const ERROR_MISSING_COORDS =
  "Missing coordinates from address search result";

export class TenantsRightsModal extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    super.checkForStore();

    this.containerYes = document.querySelector("p.yes-local-tr");
    this.containerNo = document.querySelector("p.no-local-tr");

    this.handleTenantsRightsChange = this.handleTenantsRightsChange.bind(this);
    this.handleSearchResultChange = this.handleSearchResultChange.bind(this);
    this.renderModalContents = this.renderModalContents.bind(this);
    this.getCoords = this.getCoords.bind(this);

    this.unsubscribeSearchResult = observeStore(
      this.store,
      (state) => state.addressGeocode.searchResult,
      this.handleSearchResultChange
    );

    this.unsubscribeTenantsRights = observeStore(
      this.store,
      (state) => state.tenantsRights,
      this.handleTenantsRightsChange
    );
  }

  handleSearchResultChange(result) {
    if (
      result &&
      typeof result === "object" &&
      Array.isArray(result.features)
    ) {
      try {
        this.store.dispatch(
          fetchTenantsRightsGroups(this.getCoords(result.features[0]))
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleTenantsRightsChange({ results, status }) {
    if (status === "idle" && results && results.rows && results.rows.length) {
      this.containerYes.classList.remove("hidden");
      this.containerNo.classList.add("hidden");
      this.renderModalContents(results.rows);
    } else {
      this.containerYes.classList.add("hidden");
      this.containerNo.classList.remove("hidden");
    }
  }

  renderModalContents(trGroups) {
    this.element.innerHTML = template({ trGroups });
  }

  getCoords(feature) {
    if (
      !feature ||
      !feature.geometry ||
      !feature.geometry.coordinates ||
      !feature.geometry.coordinates.length
    ) {
      throw new Error(ERROR_MISSING_COORDS);
    }
    const [lon, lat] = feature.geometry.coordinates;
    return { lon, lat };
  }

  cleanUp() {
    this.unsubscribeTenantsRights();
    this.unsubscribeSearchResult();
    this.removeEvents();
    this.element = null;
  }
}
