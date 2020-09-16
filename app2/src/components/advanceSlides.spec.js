import { AdvanceSlides } from "./advanceSlides";

describe("AdvanceSlides", () => {
  let advanceSlides;
  let spyButton;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
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
