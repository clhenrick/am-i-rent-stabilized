import fs from "fs";
import path from "path";
import H from "handlebars";
import { NavMenuToggle } from "./navigation";

const localeData = require("../../public/locales/main-content.json");

describe("NavMenuToggle", () => {
  let navMenuToggle;

  beforeAll(async () => {
    const hbsFile = fs.readFileSync(
      path.resolve(__dirname, "../hbs_templates/main.hbs"),
      "utf8"
    );
    const template = H.compile(hbsFile);
    const html = template(localeData.languages.en);
    document.body.innerHTML = `<div id="wrapper">${html}</div>`;

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
