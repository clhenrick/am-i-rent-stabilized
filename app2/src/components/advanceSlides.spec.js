import fs from "fs";
import path from "path";
import H from "handlebars";
import { AdvanceSlides } from "./advanceSlides";
import { LOCALES_JSON_DIR } from "../utils/constants";

const localeData = require(`../../public/${LOCALES_JSON_DIR}/main-en.json`);

describe("AdvanceSlides", () => {
  let advanceSlides;
  let spyButton;

  beforeAll(() => {
    const hbsFile = fs.readFileSync(
      path.resolve(__dirname, "../hbs_templates/main.hbs"),
      "utf8"
    );
    const template = H.compile(hbsFile);
    const html = template(localeData);
    document.body.innerHTML = `<div id="wrapper">${html}</div>`;

    spyButton = jest.spyOn(AdvanceSlides.prototype, "handleClick");

    advanceSlides = new AdvanceSlides({
      element: document.querySelector(".go-next.bottom-arrow"),
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelectorAll(".go-next.bottom-arrow")).toHaveLength(6);
  });

  test("The consumer should be able to call new() on AdvanceSlides class", () => {
    expect(advanceSlides).toBeTruthy();
  });

  test("The component's button handles a click event", () => {
    document.querySelector(".go-next.bottom-arrow > h3").click();
    expect(spyButton).toHaveBeenCalled();
  });
});
