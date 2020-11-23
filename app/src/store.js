import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import logger from "redux-logger";
import { logException } from "./utils/logging";

const USE_LOGGER = process.env.USE_REDUX_LOGGER;
const middlewares = [thunkMiddleware];

const reduxDevToolsPresent =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers =
  process.env.NODE_ENV !== "production" && reduxDevToolsPresent
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const crashReporter = () => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    logException(
      `Redux caught exception: ${
        typeof err === "object" ? `${err.name}, ${err.message}` : err
      }`
    );
    throw err;
  }
};

if (process.env.NODE_ENV === "development" && USE_LOGGER) {
  middlewares.push(logger);
}

if (process.env.NODE_ENV === "production") {
  middlewares.push(crashReporter);
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
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
