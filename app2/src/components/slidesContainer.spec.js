import { SlidesContainer } from "./slidesContainer";

describe("SlidesContainer", () => {
  const selector = ".slides-container";
  let slidesContainer;

  beforeAll(() => {
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    slidesContainer = new SlidesContainer({
      element: document.querySelector(selector),
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelector(selector)).toBeDefined();
  });

  test("The consumer should be able to call new() on SlidesContainer", () => {
    expect(slidesContainer).toBeTruthy();
  });
});
