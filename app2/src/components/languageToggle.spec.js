import fs from "fs";
import path from "path";
import H from "handlebars";
import { LanguageToggle, LanguageToggleButton } from "./languageToggle";

const localeData = require("../../public/locales/main-content.json");

const translate = require("../utils/translate");
jest.mock("../utils/translate", () => {
  return {
    __esModule: true,
    translatePage: jest.fn(),
    getCurLang: jest.fn(),
    setCurLang: jest.fn(),
  };
});

describe("LanguageToggle", () => {
  let languageToggle;

  beforeAll(async () => {
    const hbsFile = fs.readFileSync(
      path.resolve(__dirname, "../hbs_templates/main.hbs"),
      "utf8"
    );
    const template = H.compile(hbsFile);
    const html = template(localeData.languages.en);
    document.body.innerHTML = `<div id="wrapper">${html}</div>`;

    languageToggle = new LanguageToggle({
      element: document.querySelector("div.lang-toggle.desktop"),
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelector(".lang-toggle")).toBeDefined();
  });

  test("The consumer should be able to call new() on LanguageToggle", () => {
    expect(languageToggle).toBeTruthy();
  });

  test("The component instance's element property exists", () => {
    expect(languageToggle.element).toBeDefined();
  });

  test("The component's buttons correctly handle a click event", () => {
    document.querySelector("div.lang-toggle.desktop a[lang='es']").click();
    expect(translate.translatePage).toHaveBeenCalled();
    expect(translate.setCurLang).toHaveBeenCalledWith("es");

    document.querySelector("div.lang-toggle.desktop a[lang='zh']").click();
    expect(translate.translatePage).toHaveBeenCalled();
    expect(translate.setCurLang).toHaveBeenCalledWith("zh");
  });
});

describe("LanguageToggleButton", () => {
  let es;

  beforeAll(() => {
    document.body.innerHTML =
      "<a class='toggle-es' lang='es' href='#'>en español</a>";
    es = new LanguageToggleButton({
      lang: "es",
      label: "en español",
      element: document.querySelector("a.toggle-es"),
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The consumer should be able to call new() on LanguageToggleButton", () => {
    expect(es).toBeTruthy();
  });

  test("It should have the correct className property", () => {
    expect(document.querySelector("a.toggle-es")).toBeDefined();
  });

  test("The toggle method updates the element correctly", () => {
    es.toggle();
    expect(document.querySelector("a.toggle-en").innerHTML).toEqual(
      "in english"
    );
    expect(document.querySelector("a[lang='en']")).toBeDefined();

    es.toggle();
    expect(document.querySelector("a.toggle-es").innerHTML).toEqual(
      "en español"
    );
    expect(document.querySelector("a[lang='es']")).toBeDefined();
  });
});