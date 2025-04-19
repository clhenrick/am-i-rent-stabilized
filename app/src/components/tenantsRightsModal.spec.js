import { TenantsRightsModal, ERROR_MISSING_COORDS } from "./tenantsRightsModal";
import { store } from "../store";

jest.mock("../store");

describe("TenantsRightsModal", () => {
  let element;
  let tenantsRightsModal;
  let spyRenderModalContents;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector(
      "dialog.modal--tenants-rights .modal--content"
    );
    spyRenderModalContents = jest.spyOn(
      TenantsRightsModal.prototype,
      "renderModalContents"
    );
  });

  beforeEach(() => {
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
