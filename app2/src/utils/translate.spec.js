import {
  getCurLang,
  setCurLang,
  getCurrentPageName,
  getLocaleJson,
  getHtmlTemplate,
} from "./translate";

jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "getItem");

describe("getHtmlTemplate", () => {
  // FIXME: jest needs help parsing .hbs files
  // see: https://jestjs.io/docs/en/webpack.html#handling-static-assets
  // and: https://github.com/facebook/jest/issues/3604
  test("it loads the correct handlebars template", async () => {
    // const result = await getHtmlTemplate("index");
    // console.log(result);
    // expect(result).toBeTruthy();
  });
});

describe("getLocaleJson", () => {
  let data;
  let expectedData;

  beforeEach(() => {
    fetch.resetMocks();
    data = { en: {}, es: {}, zh: {} };
    expectedData = Object.assign({}, data);
  });

  test("loads the locale json for a given page", async () => {
    let result;

    fetch.mockResponseOnce(JSON.stringify(data));
    result = await getLocaleJson("index");
    expect(result).toMatchObject(expectedData);
    expect(fetch).toHaveBeenCalledWith("./locales/main-content.json");

    fetch.mockResponseOnce(JSON.stringify(data));
    result = await getLocaleJson("how");
    expect(result).toMatchObject(expectedData);
    expect(fetch).toHaveBeenCalledWith("../locales/how-content.json");
  });

  test("throws an error if the locale json cannot be found", async () => {
    expect.assertions(1);
    fetch.mockReject(() => Promise.reject());
    await expect(getLocaleJson("foobar")).rejects.toThrow(
      "Problem fetching locale json"
    );
  });
});

describe("getCurLang", () => {
  test("It returns the 'en' language code by default", () => {
    const result = getCurLang();
    expect(result).toBe("en");
  });

  test("It returns the correct language code when it has been already set", () => {
    let result;

    window.localStorage.setItem("lang", "es");
    result = getCurLang();
    expect(result).toBe("es");

    window.localStorage.setItem("lang", "zh");
    result = getCurLang();
    expect(result).toBe("zh");
  });

  test("It only returns expected language codes", () => {
    window.localStorage.setItem("lang", "pr");
    const result = getCurLang();
    expect(result).toBe("en");
  });
});

describe("setCurLang", () => {
  beforeEach(() => {
    setCurLang("es");
  });

  test("It sets the correct key in localStorage", () => {
    expect(window.localStorage.getItem("lang")).toBe("es");
  });

  test("It sets the correct class on document.body", () => {
    expect(document.body.classList.contains("es")).toBe(true);
  });

  test("It sets the correct lang attribute on html tag", () => {
    expect(document.querySelector("html").getAttribute("lang")).toBe("es");
  });

  test("It ignores unrecognized language codes", () => {
    setCurLang("pr");
    expect(window.localStorage.getItem("lang")).toBe("es");
  });
});

describe("getCurrentPageName", () => {
  test("It returns the correct substring of the current document's name", () => {
    let result;

    window.history.pushState("", null, "/index.html");
    result = getCurrentPageName();
    expect(result).toBe("index");

    window.history.pushState("", null, "/info/why.html");
    result = getCurrentPageName();
    expect(result).toBe("why");
  });
});
