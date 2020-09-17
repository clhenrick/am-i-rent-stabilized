import { slides } from "./slidesReducer";
import * as types from "../constants/actionTypes";

describe("slidesReducer", () => {
  test("Should return the initial state", () => {
    expect(slides(undefined, {})).toEqual({
      curIndex: 0,
      canAdvance: true,
    });
  });

  test("Should handle NextSlide", () => {
    expect(
      slides(undefined, {
        type: types.NextSlide,
      })
    ).toEqual({
      curIndex: 1,
      canAdvance: true,
    });
  });

  test("Should handle PrevSlide", () => {
    expect(
      slides(
        {
          curIndex: 1,
          canAdvance: true,
        },
        {
          type: types.PrevSlide,
        }
      )
    ).toEqual({
      curIndex: 0,
      canAdvance: true,
    });
  });

  test("Should handle GoToSlide", () => {
    expect(
      slides(
        {
          curIndex: 0,
          canAdvance: true,
        },
        {
          type: types.GoToSlide,
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
