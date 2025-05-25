import {
  logEvent,
  logException,
  logAddressSearch,
  logAddressNF,
  logAddressRS,
  logLanguageToggle,
  logAddressNotRS,
  handleErrorObj,
} from "./logging";

describe("logging", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("logEvent", () => {
    logEvent("Foo", { event_category: "Bla", label: "Bar" });
    expect(gtag).toHaveBeenCalledWith("event", "Foo", {
      event_category: "Bla",
      label: "Bar",
    });
  });

  test("logException", () => {
    logException("Foo Bar", true);
    expect(gtag).toHaveBeenCalledWith("event", "exception", {
      description: "Foo Bar",
      fatal: true,
    });
  });

  test("logAddressSearch", () => {
    logAddressSearch("Foo");
    expect(gtag).toHaveBeenCalledWith("event", "Address Search", {
      event_category: "search",
      label: "Foo",
    });
  });

  test("logAddressNF", () => {
    logAddressNF("Foo");
    expect(gtag).toHaveBeenCalledWith("event", "Address Not Found", {
      event_category: "search",
      label: "Foo",
    });
  });

  test("logAddressRS", () => {
    logAddressRS("Foo");
    expect(gtag).toHaveBeenCalledWith("event", "Address Rent Stabilized", {
      event_category: "search",
      label: "Foo",
    });
  });

  test("logAddressNotRS", () => {
    logAddressNotRS("Foo");
    expect(gtag).toHaveBeenCalledWith("event", "Address Not Rent Stabilized", {
      event_category: "search",
      label: "Foo",
    });
  });

  test("logLanguageToggle", () => {
    logLanguageToggle("zh");
    expect(gtag).toHaveBeenCalledWith("event", "Language Toggle", {
      label: "zh",
    });
  });

  test("handleErrorObj", () => {
    let result = handleErrorObj("Foo", new Error("Bar"));
    expect(result).toEqual("Foo; Error; Bar");
    result = handleErrorObj("Foo", "Bar");
    expect(result).toEqual("Foo; Bar");
  });
});
