import fs from "fs";
import path from "path";
import H from "handlebars";
import {
  getCurLang,
  setCurLang,
  getCurrentPageName,
  getLocaleJson,
  getHtmlTemplate,
  renderHtml,
} from "./translate";
import { LOCALES_JSON_DIR } from "../constants/locales";

jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "getItem");

describe("renderHtml", () => {
  let mainTemplate;
  let whyTemplate;

  let mainEnLocale;
  let whyEsLocale;

  beforeAll(() => {
    mainEnLocale = require(`../../public/${LOCALES_JSON_DIR}/main-en.json`);
    whyEsLocale = require(`../../public/${LOCALES_JSON_DIR}/why-es.json`);

    mainTemplate = H.compile(
      fs.readFileSync(
        path.resolve(__dirname, "../hbs_templates/main.hbs"),
        "utf8"
      )
    );

    whyTemplate = H.compile(
      fs.readFileSync(
        path.resolve(__dirname, "../hbs_templates/main.hbs"),
        "utf8"
      )
    );
  });

  test("it renders html from a locales json and hbs template", () => {
    document.body.innerHTML = '<div id="wrapper"></div>';
    renderHtml(mainEnLocale, mainTemplate);
    expect(document.querySelector("#wrapper").innerHTML).toBeDefined();

    document.body.innerHTML = '<div id="wrapper"></div>';
    renderHtml(whyEsLocale, whyTemplate);
    expect(document.querySelector("#wrapper").innerHTML).toBeDefined();
  });

  test("it does not render html if missing arguments", () => {
    document.body.innerHTML = '<div id="wrapper"></div>';
    renderHtml();
    expect(document.querySelector("#wrapper").innerHTML).toBe("");
  });
});

describe("getHtmlTemplate", () => {
  test("it loads the correct handlebars template", async () => {
    const result = await getHtmlTemplate("index");
    expect(result).toBeTruthy();
  });

  test("it throws an error for a non-matching page name", async () => {
    await expect(getHtmlTemplate("foobar")).rejects.toThrow(
      "Problem loading .hbs file"
    );
  });
});

describe("getLocaleJson", () => {
  let data;
  let expectedData;

  beforeEach(() => {
    fetch.resetMocks();
    data = {};
    expectedData = Object.assign({}, data);
  });

  test("loads the locale json for a given page", async () => {
    let result;

    fetch.mockResponseOnce(JSON.stringify(data));
    result = await getLocaleJson("index", "en");
    expect(result).toMatchObject(expectedData);
    expect(fetch).toHaveBeenCalledWith(`./${LOCALES_JSON_DIR}/main-en.json`);

    fetch.mockResponseOnce(JSON.stringify(data));
    result = await getLocaleJson("how", "es");
    expect(result).toMatchObject(expectedData);
    expect(fetch).toHaveBeenCalledWith(`../${LOCALES_JSON_DIR}/how-es.json`);
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
