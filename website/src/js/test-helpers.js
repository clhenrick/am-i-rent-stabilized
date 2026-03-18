import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

/**
 * Creates a lightweight test store with thunk middleware that records all
 * dispatched plain actions, replacing the need for redux-mock-store.
 * @param {object} initialState
 * @returns {object} Redux store with an additional getActions() method
 */
export function createTestStore(initialState = {}) {
  const recorded = [];
  const recorder = () => (next) => (action) => {
    recorded.push(action);
    return next(action);
  };
  const store = createStore(
    (state = initialState) => state,
    initialState,
    applyMiddleware(thunk, recorder)
  );
  store.getActions = () => recorded;
  return store;
}
