export const RS_SEARCH_DELAY_MS = process.env.NODE_ENV === "test" ? 0 : 2200;

export const MAP_ZOOM = {
  DEFAULT: 20,
  RESULT: 24,
};
export const MAP_CENTER = {
  DEFAULT: [-74.006, 40.7128],
};
export const MAP_MARKER = {
  WIDTH: 16 * 2,
  HEIGHT: 20 * 2,
};
export const MAP_BORDER_WIDTH = 3;
