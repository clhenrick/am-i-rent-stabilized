import {
  nextSlide,
  prevSlide,
  goToSlide,
  canAdvanceSlide,
} from "./slidesActions";

describe("slidesActions", () => {
  test("nextSlide", () => {
    expect(nextSlide()).toEqual({ type: "NextSlide" });
  });

  test("prevSlide", () => {
    expect(prevSlide()).toEqual({ type: "PrevSlide" });
  });

  test("goToSlide", () => {
    expect(goToSlide(5)).toEqual({ type: "GoToSlide", payload: 5 });
  });

  test("canAdvanceSlide", () => {
    expect(canAdvanceSlide(false)).toEqual({
      type: "CanAdvanceSlide",
      payload: false,
    });
  });
});
