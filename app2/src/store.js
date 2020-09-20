import { createStore } from "redux";
import { rootReducer } from "./reducers";

let reduxDevTools;

if (process.env.NODE_ENV !== "production") {
  // enables Redux dev tools via the Chrome Browser Extension
  reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

export const store = createStore(rootReducer, undefined, reduxDevTools);

// log initial state
console.log("initial redux state: ", store.getState());
