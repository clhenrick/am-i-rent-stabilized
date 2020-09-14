import { LanguageToggleButton } from "./languageToggleButton";

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
