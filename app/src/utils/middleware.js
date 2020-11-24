import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { logException, handleErrorObj } from "./logging";

const USE_LOGGER = process.env.USE_REDUX_LOGGER;
const middlewares = [thunkMiddleware];

export const crashReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    logException(
      `crashReporter: ${
        typeof err === "object"
          ? `${err.name}; ${err.message}; ${JSON.stringify(store.getState())}`
          : `${err}; ${JSON.stringify(store.getState())}`
      }`
    );
    throw err;
  }
};

export const errorLogger = (store) => (next) => (action) => {
  if (action.error) {
    const msg = handleErrorObj(action.type, action.error);
    logException(`${msg}; ${JSON.stringify(store.getState())}`);
  }
  return next(action);
};

if (process.env.NODE_ENV === "development" && USE_LOGGER) {
  middlewares.push(logger);
}

if (process.env.NODE_ENV === "production") {
  middlewares.push(errorLogger);
  middlewares.push(crashReporter);
}

export { middlewares };
