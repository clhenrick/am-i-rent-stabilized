import { LanguageToggle } from "./languageToggle";
import { LANGS, IN_LANG } from "../constants/locales";
import { store } from "../store";
import { logLanguageToggle } from "../utils/logging";
const translate = require("../utils/translate");

jest.mock("../utils/logging");
jest.mock("../utils/translate", () => {
  return {
    __esModule: true,
    translatePage: jest.fn(),
    getCurLang: jest.fn(() => "en"),
    setCurLang: jest.fn(),
  };
});

jest.mock("../store");

describe("LanguageToggle", () => {
  let languageToggle;
  let element;

  beforeAll(async () => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector("div.desktop .lang-toggle");
  });

  beforeEach(() => {
    languageToggle = new LanguageToggle({
      element,
      store,
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("The component's HTML exists", () => {
    expect(element).toBeDefined();
  });

  test("The consumer should be able to call new() on LanguageToggle", () => {
    expect(languageToggle).toBeTruthy();
  });

  test("The component instance's element property exists", () => {
    expect(languageToggle.element).toBeDefined();
  });

  test("handleClick calls store.dispatch", () => {
    const event = {
      target: languageToggle.element.querySelector("a[lang='es']"),
      preventDefault: jest.fn(),
    };
    languageToggle.handleClick(event);
    expect(store.dispatch).toHaveBeenCalledWith({ type: "ResetAppState" });
  });

  test("handleClick calls setCurLang and translatePage", () => {
    const event = {
      target: languageToggle.element.querySelector("a[lang='es']"),
      preventDefault: jest.fn(),
    };
    languageToggle.handleClick(event);
    expect(translate.setCurLang).toHaveBeenCalledTimes(1);
    expect(translate.translatePage).toHaveBeenCalledTimes(1);
  });

  test("handleClick logs a Language Toggle event", () => {
    const event = {
      target: languageToggle.element.querySelector("a[lang='es']"),
      preventDefault: jest.fn(),
    };
    languageToggle.handleClick(event);
    expect(logLanguageToggle).toHaveBeenCalledWith("es");
  });

  test("The component's buttons call handleClick", () => {
    const spyHandleClick = jest.spyOn(LanguageToggle.prototype, "handleClick");
    languageToggle = new LanguageToggle({ element, store });

    document.querySelector("div.desktop .lang-toggle a[lang='es']").click();
    expect(spyHandleClick).toHaveBeenCalledTimes(1);

    spyHandleClick.mockClear();

    document.querySelector("div.desktop .lang-toggle a[lang='zh']").click();
    expect(spyHandleClick).toHaveBeenCalledTimes(1);
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
