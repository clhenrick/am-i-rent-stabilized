import fs from "fs";
import path from "path";
import { LanguageToggle } from "./languageToggle";
import H from "handlebars";
import { translatePage, getCurLang, setCurLang } from "../utils/translate";

jest.mock(translatePage);

const localeData = require("../../public/locales/main-content.json");

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
      element: document.querySelector("div.lang-toggle"),
    });
    // languageToggle.handleClick = jest.fn(() => "test");
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("Component HTML exists", () => {
    expect(document.querySelector(".lang-toggle")).toBeDefined();
  });

  test("Component element property exists", () => {
    expect(languageToggle.element).toBeDefined();
  });

  // test("Component child buttons handle click", () => {
  //   translatePage.mockResolvedValue(undefined);
  //   const spy = jest.spyOn(languageToggle, "handleClick");
  //   document.querySelector("div.lang-toggle a").click();
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockRestore();
  // })
});
