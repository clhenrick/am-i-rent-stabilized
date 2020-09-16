import { NavMenuToggle } from "./navigation";

describe("NavMenuToggle", () => {
  let navMenuToggle;

  beforeAll(async () => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    navMenuToggle = new NavMenuToggle({
      element: document.querySelector("nav.main-nav"),
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The components HTML exists", () => {
    expect(document.querySelector("nav.main-nav")).toBeDefined();
  });

  test("The consumer should be able to call new() on NavMenuToggle", () => {
    expect(navMenuToggle).toBeTruthy();
  });

  test("The component handles a click event", () => {
    document.querySelector("nav.main-nav .burger").click();
    expect(
      navMenuToggle.element.querySelector(".burger").classList.contains("open")
    ).toBe(true);
    expect(
      navMenuToggle.element.querySelector("ul").classList.contains("responsive")
    ).toBe(true);

    document.querySelector("nav.main-nav .burger").click();
    expect(
      navMenuToggle.element.querySelector(".burger").classList.contains("open")
    ).toBe(false);
    expect(
      navMenuToggle.element.querySelector("ul").classList.contains("responsive")
    ).toBe(false);
  });
});
