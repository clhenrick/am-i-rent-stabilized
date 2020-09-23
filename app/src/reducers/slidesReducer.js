const initialState = {
  curIndex: 0,
  canAdvance: true,
};

export function slides(state = initialState, action) {
  switch (action.type) {
    case "GoToNextSlide":
      return { ...state, curIndex: state.curIndex + 1 };
    case "GoToPrevSlide":
      return { ...state, curIndex: state.curIndex - 1 };
    case "GoToSlideIdx":
      return { ...state, curIndex: action.payload };
    case "CanAdvanceSlide":
      return { ...state, canAdvance: action.payload };
    default:
      return state;
  }
}
