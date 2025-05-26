import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import { middlewares } from "./utils/middleware";

const reduxDevToolsPresent =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers =
  process.env.NODE_ENV !== "production" && reduxDevToolsPresent
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

// enabled via npm script "start:preloaded-state"
const preloadedState = process.env.USE_PRELOADED_STATE
  ? require("./preloaded-state").preloadedState
  : {};

export const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

// code credit: https://github.com/reduxjs/redux/issues/303#issuecomment-125184409
export function observeStore(rstore, select = (state) => state, onChange) {
  let currentState;

  function handleChange() {
    let nextState = select(rstore.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = rstore.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
