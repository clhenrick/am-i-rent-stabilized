import { slides } from "./slidesReducer";
import * as types from "../constants/actionTypes";

describe("slidesReducer", () => {
  test("Should return the initial state", () => {
    expect(slides(undefined, {})).toEqual({
      curIndex: 0,
      canAdvance: true,
    });
  });

  test("Should handle GoToNextSlide", () => {
    expect(
      slides(undefined, {
        type: types.GoToNextSlide,
      })
    ).toEqual({
      curIndex: 1,
      canAdvance: true,
    });
  });

  test("Should handle GoToPrevSlide", () => {
    expect(
      slides(
        {
          curIndex: 1,
          canAdvance: true,
        },
        {
          type: types.GoToPrevSlide,
        }
      )
    ).toEqual({
      curIndex: 0,
      canAdvance: true,
    });
  });

  test("Should handle GoToSlideIdx", () => {
    expect(
      slides(
        {
          curIndex: 0,
          canAdvance: true,
        },
        {
          type: types.GoToSlideIdx,
          payload: 3,
        }
      )
    ).toEqual({
      curIndex: 3,
      canAdvance: true,
    });
  });

  test("Should handle CanAdvanceSlide", () => {
    expect(
      slides(
        {
          curIndex: 1,
          canAdvance: true,
        },
        {
          type: types.CanAdvanceSlide,
          payload: false,
        }
      )
    ).toEqual({
      curIndex: 1,
      canAdvance: false,
    });

    expect(
      slides(
        {
          curIndex: 9,
          canAdvance: false,
        },
        {
          type: types.CanAdvanceSlide,
          payload: true,
        }
      )
    ).toEqual({
      curIndex: 9,
      canAdvance: true,
    });
  });
});
