import { slides } from "./slidesReducer";
import * as types from "../constants/actionTypes";

describe("slidesReducer", () => {
  test("Should return the initial state", () => {
    expect(slides(undefined, {})).toEqual({
      curIndex: 0,
    });
  });

  test("Should handle GoToNextSlide", () => {
    expect(
      slides(undefined, {
        type: types.GoToNextSlide,
      })
    ).toEqual({
      curIndex: 1,
    });
  });

  test("Should handle GoToPrevSlide", () => {
    expect(
      slides(
        {
          curIndex: 1,
        },
        {
          type: types.GoToPrevSlide,
        }
      )
    ).toEqual({
      curIndex: 0,
    });
  });

  test("Should handle GoToSlideIdx", () => {
    expect(
      slides(
        {
          curIndex: 0,
        },
        {
          type: types.GoToSlideIdx,
          payload: 3,
        }
      )
    ).toEqual({
      curIndex: 3,
    });
  });

  test("Should handle ResetAppState", () => {
    expect(slides({ curIndex: 9 }, { type: types.ResetAppState })).toEqual({
      curIndex: 0,
    });
  });
});
