import { createStore } from "redux";
import { rootReducer } from "./reducers";

export const store = createStore(rootReducer);

// log initial state
console.log("initial redux state: ", store.getState());
