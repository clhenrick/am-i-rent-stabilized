import * as types from "../constants/actionTypes";

export const nextSlide = () => ({
  type: types.NextSlide,
});

export const prevSlide = () => ({
  type: types.PrevSlide,
});

export const goToSlide = (payload = 0) => ({
  type: types.GoToSlide,
  payload,
});

export const canAdvanceSlide = (payload = true) => ({
  type: types.CanAdvanceSlide,
  payload,
});
