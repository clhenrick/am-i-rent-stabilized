import { createStore, combineReducers } from "redux";

const defaultSlidesState = {
  curIndex: 0,
  canAdvance: true,
};

function slides(state = defaultSlidesState, action) {
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

const rootReducer = combineReducers({ slides });

export const nextSlide = () => ({
  type: "NextSlide",
});

export const prevSlide = () => ({
  type: "PrevSlide",
});

export const goToSlide = (payload = 0) => ({
  type: "GoToSlide",
  payload,
});

export const canAdvanceSlide = (payload = true) => ({
  type: "CanAdvanceSlide",
  payload,
});

export const store = createStore(rootReducer);

// log initial state
console.log(store.getState());
