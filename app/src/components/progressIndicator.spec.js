import { ProgressIndicator } from "./progressIndicator";
// import { store, observeStore } from "../store";

// jest.mock("../store", () => {
//   return {
//     __esModule: true,
//     store: {
//       getState: jest.fn(() => ({
//         slides: {
//           curIndex: 0,
//         },
//       })),
//       subscribe: jest.fn((cb) => cb()),
//       dispatch: jest.fn(),
//     },
//     observeStore: jest.fn(),
//   };
// });

describe("ProgressIndicator", () => {
  let progressIndicator;
  let spyRenderCircles;

  beforeAll(() => {
    spyRenderCircles = jest.spyOn(ProgressIndicator.prototype, "renderCircles");

    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    progressIndicator = new ProgressIndicator({
      element: document.querySelector("#progress-indicator"),
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelector("#progress-indicator")).toBeDefined();
  });

  test("The consumer should be able to call new() on AddressSearchForm", () => {
    expect(progressIndicator).toBeTruthy();
  });

  test("uses observeStore", () => {
    const store = require("../store");
    const spy = jest.spyOn(store, "observeStore");
    progressIndicator = new ProgressIndicator({
      element: document.querySelector("#progress-indicator"),
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("responds to redux state changes of slides.curIndex", () => {
    const { store } = require("../store");
    spyRenderCircles.mockRestore();
    store.dispatch({ type: "GoToNextSlide" });
    expect(spyRenderCircles).toHaveBeenCalledTimes(2);
  });

  test("renderCircles", () => {
    const { ProgressIndicator } = require("./progressIndicator");
    const { store } = require("../store");
    jest.mock("../store");

    store.getState.mockImplementation(() => ({
      slides: { curIndex: 0 },
    }));

    progressIndicator = new ProgressIndicator({
      element: document.querySelector("#progress-indicator"),
    });
    progressIndicator.renderCircles();

    // console.log(progressIndicator.curSlideIndex);
    // console.log(
    //   Array.from(progressIndicator.list.querySelectorAll("li")).map((el) =>
    //     el.classList.contains("active")
    //   )
    // );

    expect(progressIndicator.list.children.length).toBeGreaterThan(0);
    expect(
      progressIndicator.list
        .querySelectorAll("li")[0]
        .classList.contains("active")
    ).toBe(true);

    store.getState.mockImplementation(() => ({
      slides: { curIndex: 2 },
    }));
    progressIndicator.renderCircles();

    expect(
      progressIndicator.list
        .querySelectorAll("li")[2]
        .classList.contains("active")
    ).toBe(true);
  });
});
