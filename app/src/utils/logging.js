// see: https://developers.google.com/analytics/devguides/collection/upgrade/analyticsjs#measure_events
export const logEvent = (eventName, eventParameters) =>
  gtag("event", eventName, eventParameters);

export const logException = (description, fatal = false) =>
  gtag("event", "exception", { description, fatal });

export const logAddressSearch = (address) =>
  logEvent("Address Search", { event_category: "search", label: address });

export const logAddressNF = (address) =>
  logEvent("Address Not Found", { event_category: "search", label: address });

export const logAddressRS = (address) =>
  logEvent("Address Rent Stabilized", {
    event_category: "search",
    label: address,
  });

export const logLanguageToggle = (lang) =>
  logEvent("Language Toggle", { label: lang });

export const logAddressNotRS = (address) =>
  logEvent("Address Not Rent Stabilized", {
    event_category: "search",
    label: address,
  });

export const handleErrorObj = (prefix, error) =>
  typeof error === "object"
    ? `${prefix}; ${error.name}; ${error.message}`
    : `${prefix}; ${error}`;
