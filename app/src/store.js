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

// log initial state
console.log("initial redux state: ", store.getState());
