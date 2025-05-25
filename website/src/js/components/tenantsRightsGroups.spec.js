import {
  TenantsRightsGroups,
  ERROR_MISSING_COORDS,
} from "./tenantsRightsGroups";
import { store } from "../store";

jest.mock("../store");

describe("TenantsRightsGroups", () => {
  let element;
  let tenantsRightsGroups;
  let spyRenderModalContents;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector(
      "dialog.modal--tenants-rights .modal--content"
    );
    spyRenderModalContents = jest.spyOn(
      TenantsRightsGroups.prototype,
      "renderModalContents"
    );
  });

  beforeEach(() => {
    tenantsRightsGroups = new TenantsRightsGroups({ store, element });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new on TenantsRightsGroups", () => {
    expect(tenantsRightsGroups).toBeTruthy();
  });

  test("getSearchCoords", () => {
    const feature = {
      geometry: {
        coordinates: [-79, 41],
      },
    };
    const result = tenantsRightsGroups.getSearchCoords(feature);
    expect(result).toEqual({ lon: -79, lat: 41 });
    expect(() =>
      tenantsRightsGroups.getSearchCoords({ geometry: { coordinates: [] } })
    ).toThrow(new Error(ERROR_MISSING_COORDS));
  });

  test("renderModalContents", () => {
    const data = [{}, {}];
    tenantsRightsGroups.renderModalContents(data);
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
    tenantsRightsGroups.handleSearchResultChange(data);
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test("handleTenantsRightsChange with results", () => {
    const params = {
      results: { rows: [{}, {}] },
      status: "idle",
    };
    tenantsRightsGroups.handleTenantsRightsChange(params);
    expect(tenantsRightsGroups.containerYes.classList.contains("hidden")).toBe(
      false
    );
    expect(tenantsRightsGroups.containerNo.classList.contains("hidden")).toBe(
      true
    );
    expect(spyRenderModalContents).toHaveBeenCalledWith([{}, {}]);
  });

  test("handleTenantsRightsChange without results", () => {
    const params = {
      results: { rows: [] },
      status: "idle",
    };
    tenantsRightsGroups.handleTenantsRightsChange(params);
    expect(tenantsRightsGroups.containerYes.classList.contains("hidden")).toBe(
      true
    );
    expect(tenantsRightsGroups.containerNo.classList.contains("hidden")).toBe(
      false
    );
    expect(spyRenderModalContents).not.toHaveBeenCalled();
  });
});
