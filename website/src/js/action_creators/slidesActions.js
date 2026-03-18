import * as types from "../constants/actionTypes.js";

export const goToNextSlide = () => ({
  type: types.GoToNextSlide,
});

export const goToPrevSlide = () => ({
  type: types.GoToPrevSlide,
});

export const goToSlideIdx = (payload = 0) => ({
  type: types.GoToSlideIdx,
  payload,
});
