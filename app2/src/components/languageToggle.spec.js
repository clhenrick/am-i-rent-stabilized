import fs from "fs";
import path from "path";
import { LanguageToggle } from "./languageToggle";
import H from "handlebars";

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

    languageToggle.handleClick = jest.fn();
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

  test("The component element property exists", () => {
    expect(languageToggle.element).toBeDefined();
  });

  test("The component button children handles a click event", () => {
    const spy = jest.spyOn(languageToggle, "handleClick");
    document.querySelector("div.lang-toggle.desktop a").click();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
