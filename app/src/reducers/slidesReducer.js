const initialState = {
  curIndex: 0,
};

export function slides(state = initialState, action) {
  switch (action.type) {
    case "GoToNextSlide":
      return { ...state, curIndex: state.curIndex + 1 };
    case "GoToPrevSlide":
      return { ...state, curIndex: state.curIndex - 1 };
    case "GoToSlideIdx":
      return { ...state, curIndex: action.payload };
    case "ResetAppState":
      return { ...initialState };
    default:
      return state;
  }
}
