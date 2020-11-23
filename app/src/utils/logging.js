// see: https://developers.google.com/analytics/devguides/collection/upgrade/analyticsjs#measure_events
export const logEvent = (eventName, eventParameters) =>
  gtag("event", eventName, eventParameters);

export const logException = (description, fatal = false) =>
  gtag("event", "exception", { description, fatal });
