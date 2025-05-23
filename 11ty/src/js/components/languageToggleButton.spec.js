import { LanguageToggleButton } from "./languageToggleButton";

describe("LanguageToggleButton", () => {
  let es;
  let element;

  beforeAll(() => {
    document.body.innerHTML =
      "<a class='toggle-es' lang='es' href='#'>en español</a>";
    element = document.querySelector("a.toggle-es");
  });

  beforeEach(() => {
    es = new LanguageToggleButton({
      lang: "es",
      label: "en español",
      element,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(element).not.toBeNull();
  });

  test("The consumer should be able to call new() on LanguageToggleButton", () => {
    expect(es).toBeTruthy();
  });

  test("It throws an Error if not passed a valid `lang` property", () => {
    const errorMsg = "LanguageToggleButton requires a valid `lang` property";
    try {
      new LanguageToggleButton({ element });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMsg);
    }
    try {
      new LanguageToggleButton({ element, lang: 0 });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMsg);
    }
  });

  test("It throws an Error if not passed a valid `label` property", () => {
    const errorMsg = "LanguageToggleButton requires a valid `label` property";
    const lang = "zh";
    try {
      new LanguageToggleButton({ element, lang });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMsg);
    }
    try {
      new LanguageToggleButton({ element, lang, label: "" });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMsg);
    }
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
