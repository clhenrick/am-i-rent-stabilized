import { NavMenuToggle } from "./navigation";

describe("NavMenuToggle", () => {
  let navMenuToggle;
  let element;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    element = document.querySelector("nav.main-nav");
  });

  beforeEach(() => {
    navMenuToggle = new NavMenuToggle({
      element,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The components HTML exists", () => {
    expect(element).not.toBeNull();
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
