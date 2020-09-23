import { LanguageToggle } from "./languageToggle";
import { LANGS, IN_LANG } from "../constants/locales";

const translate = require("../utils/translate");
jest.mock("../utils/translate", () => {
  return {
    __esModule: true,
    translatePage: jest.fn(),
    getCurLang: jest.fn(() => "en"),
    setCurLang: jest.fn(),
  };
});

describe("LanguageToggle", () => {
  let languageToggle;

  beforeAll(async () => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    languageToggle = new LanguageToggle({
      element: document.querySelector("div.desktop .lang-toggle"),
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
    document.querySelector("div.desktop .lang-toggle a[lang='es']").click();
    expect(translate.translatePage).toHaveBeenCalled();
    expect(translate.setCurLang).toHaveBeenCalledWith("es");

    document.querySelector("div.desktop .lang-toggle a[lang='zh']").click();
    expect(translate.translatePage).toHaveBeenCalled();
    expect(translate.setCurLang).toHaveBeenCalledWith("zh");
  });

  test("The method getLangFromBtn returns the correct language code", () => {
    expect(languageToggle.getLangFromBtn(IN_LANG.EN)).toBe(LANGS.EN);
    expect(languageToggle.getLangFromBtn(IN_LANG.ES)).toBe(LANGS.ES);
    expect(languageToggle.getLangFromBtn(IN_LANG.ZH)).toBe(LANGS.ZH);
  });

  test("The method setLanguageToggleBtnsText toggles the correct language", () => {
    translate.getCurLang
      .mockImplementationOnce(() => "es")
      .mockImplementationOnce(() => "zh");

    const mockEs = (languageToggle.es.toggle = jest.fn());
    const mockZh = (languageToggle.zh.toggle = jest.fn());

    languageToggle.setLanguageToggleBtnsText();
    expect(mockEs).toHaveBeenCalledTimes(1);

    languageToggle.setLanguageToggleBtnsText();
    expect(mockZh).toHaveBeenCalledTimes(1);
  });
});
