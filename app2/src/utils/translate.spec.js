import { translatePage, getCurLang, setCurLang } from "./translate";

jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "getItem");

describe("getCurLang", () => {
  test("It returns the 'en' language code by default", () => {
    const result = getCurLang();
    expect(result).toBe("en");
  });

  test("It returns the correct language code when it has been already set", () => {
    window.localStorage.setItem("lang", "es");
    let result = getCurLang();
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
