import Handlebars from "handlebars";
import { TenantsRightsModal, ERROR_MISSING_COORDS } from "./tenantsRightsModal";
import { store } from "../store";
import template from "../hbs_partials/tenants_rights_modal.hbs";

jest.mock("../store");

Handlebars.registerPartial("trGroups", template);

describe("TenantsRightsModal", () => {
  let element;
  let tenantsRightsModal;
  let spyBindEvents;
  let spyHandleKeyDown;
  let spyMaybeClearWindowHash;
  let spyRenderModalContents;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.createElement("div");
    element.classList.add("tr-modal");
    element.setAttribute("id", "open-modal");
    spyBindEvents = jest.spyOn(TenantsRightsModal.prototype, "bindEvents");
    spyHandleKeyDown = jest.spyOn(
      TenantsRightsModal.prototype,
      "handleKeyDown"
    );
    spyMaybeClearWindowHash = jest.spyOn(
      TenantsRightsModal.prototype,
      "maybeClearWindowHash"
    );
    spyRenderModalContents = jest.spyOn(
      TenantsRightsModal.prototype,
      "renderModalContents"
    );
  });

  beforeEach(() => {
    if (tenantsRightsModal) {
      tenantsRightsModal.removeEvents();
    }
    tenantsRightsModal = new TenantsRightsModal({ store, element });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new on TenantsRightsModal", () => {
    expect(tenantsRightsModal).toBeTruthy();
  });

  test("init", () => {
    expect(spyBindEvents).toHaveBeenCalledTimes(1);
    expect(spyMaybeClearWindowHash).toHaveBeenCalledTimes(1);
  });

  test("bindEvents", () => {
    const event = new Event("keydown");
    document.dispatchEvent(event);
    expect(spyHandleKeyDown).toHaveBeenCalledTimes(1);
  });

  test("removeEvents", () => {
    tenantsRightsModal.removeEvents();
    const event = new Event("keydown");
    document.dispatchEvent(event);
    expect(spyHandleKeyDown).not.toHaveBeenCalled();
  });

  test("handleKeyDown", () => {
    tenantsRightsModal.handleKeyDown({ code: "Escape" });
    // already called 1x from init method
    expect(spyMaybeClearWindowHash).toHaveBeenCalledTimes(2);
  });

  test("getSearchCoords", () => {
    const feature = {
      geometry: {
        coordinates: [-79, 41],
      },
    };
    const result = tenantsRightsModal.getSearchCoords(feature);
    expect(result).toEqual({ lon: -79, lat: 41 });
    expect(() =>
      tenantsRightsModal.getSearchCoords({ geometry: { coordinates: [] } })
    ).toThrow(new Error(ERROR_MISSING_COORDS));
  });

  test("maybeClearWindowHash", () => {
    window.location.hash = "open-modal";
    tenantsRightsModal.maybeClearWindowHash();
    expect(window.location.hash).toBe("");
  });

  test("renderModalContents", () => {
    const data = [{}, {}];
    tenantsRightsModal.renderModalContents(data);
    expect(element.innerHTML).toBeTruthy();
  });

  test("handleSearchResultChange", () => {
    const data = {
      features: [
        {
          geometry: {
            coordinates: [0, 0],
          },
        },
      ],
    };
    tenantsRightsModal.handleSearchResultChange(data);
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test("handleTenantsRightsChange with results", () => {
    const params = {
      results: { rows: [{}, {}] },
      status: "idle",
    };
    tenantsRightsModal.handleTenantsRightsChange(params);
    expect(tenantsRightsModal.containerYes.classList.contains("hidden")).toBe(
      false
    );
    expect(tenantsRightsModal.containerNo.classList.contains("hidden")).toBe(
      true
    );
    expect(spyRenderModalContents).toHaveBeenCalledWith([{}, {}]);
  });

  test("handleTenantsRightsChange without results", () => {
    const params = {
      results: { rows: [] },
      status: "idle",
    };
    tenantsRightsModal.handleTenantsRightsChange(params);
    expect(tenantsRightsModal.containerYes.classList.contains("hidden")).toBe(
      true
    );
    expect(tenantsRightsModal.containerNo.classList.contains("hidden")).toBe(
      false
    );
    expect(spyRenderModalContents).not.toHaveBeenCalled();
  });
});
