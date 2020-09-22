module.exports = {
  __esModule: true,
  getState: jest.fn(() => ({
    slides: {
      curIndex: 0,
      canAdvance: true,
    },
  })),
  dispatch: jest.fn(),
  subscribe: jest.fn((cb) => cb()),
};
