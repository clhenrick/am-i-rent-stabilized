const initialState = {
  curIndex: 0,
  canAdvance: true,
};

export function slides(state = initialState, action) {
  switch (action.type) {
    case "NextSlide":
      return { ...state, curIndex: state.curIndex + 1 };
    case "PrevSlide":
      return { ...state, curIndex: state.curIndex - 1 };
    case "GoToSlide":
      return { ...state, curIndex: action.payload };
    case "CanAdvanceSlide":
      return { ...state, canAdvance: action.payload };
    default:
      return state;
  }
}
