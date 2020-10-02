import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";

const reduxDevToolsPresent =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers =
  process.env.NODE_ENV !== "production" && reduxDevToolsPresent
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
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
