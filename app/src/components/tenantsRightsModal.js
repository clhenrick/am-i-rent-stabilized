import Handlebars from "handlebars";
import { observeStore } from "../store";
import { Component } from "./_componentBase";
import { fetchTenantsRightsGroups } from "../action_creators/tenantsRightsGroupsActions";
import { logException, handleErrorObj } from "../utils/logging";
import template from "../hbs_partials/tenants_rights_modal.hbs";

Handlebars.registerPartial("trGroups", template);

export const ERROR_MISSING_COORDS =
  "Missing coordinates from address search result";

/** Handles
 * - rendering the tenants rights group content in the corresponding modal dialog instance
 * - toggling whether slide 8 says there are tenants rights groups in the search result area
 * NOTE: modal dialog functionality handled by ModalDialog component
 */
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
    this.getSearchCoords = this.getSearchCoords.bind(this);

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
    if (result?.features?.[0]) {
      try {
        this.store.dispatch(
          fetchTenantsRightsGroups(this.getSearchCoords(result.features[0]))
        );
      } catch (error) {
        logException(
          handleErrorObj("TenantsRightsModal.handleSearchResultChange", error)
        );
      }
    }
  }

  handleTenantsRightsChange({ results, status }) {
    if (status === "idle" && results?.rows?.length) {
      this.containerYes.classList.remove("hidden");
      this.containerNo.classList.add("hidden");
      this.renderModalContents(results.rows);
    } else {
      this.containerYes.classList.add("hidden");
      this.containerNo.classList.remove("hidden");
    }
  }

  renderModalContents(trGroups) {
    try {
      this.element.innerHTML = template({ trGroups });
    } catch (error) {
      logException(
        handleErrorObj("TenantsRightsModal.renderModalContents", error)
      );
    }
  }

  getSearchCoords(feature) {
    const [lon, lat] = feature?.geometry?.coordinates;
    if (isFinite(lon) && isFinite(lat)) {
      return { lon, lat };
    }
    throw new Error(ERROR_MISSING_COORDS);
  }

  cleanUp() {
    this.unsubscribeTenantsRights();
    this.unsubscribeSearchResult();
    this.element = null;
  }
}
