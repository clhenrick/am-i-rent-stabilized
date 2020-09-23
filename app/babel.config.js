// currently used for tests with Jest
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: "usage",
        corejs: { version: 3, proposals: true },
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ],
  env: {
    test: {
      plugins: ["dynamic-import-node"]
    }
  }
};