require("jest-fetch-mock").enableMocks();

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const { LOCALES_JSON_DIR } = require("./src/constants/locales");

registerHbsPartials();

global.setDocumentHtml = (html) => {
  document.body.innerHTML = `<div id="wrapper">${html}</div>`;
};

global.getMainHtml = () => {
  const localeData = require(`./public/${LOCALES_JSON_DIR}/main-en.json`);
  const hbsFile = fs.readFileSync(
    path.resolve(__dirname, "./src/hbs_templates/main.hbs"),
    "utf8"
  );
  const template = Handlebars.compile(hbsFile);
  return template(localeData);
};

window.addeventatc = {
  refresh: jest.fn(),
};

window.matchMedia = jest.fn(() => ({
  matches: false,
}));

window.gtag = jest.fn();

function registerHbsPartials() {
  // These partials are automatically read by webpack using the handlebars-loader,
  // however for Jest we have to register them in order for tests to run.
  const partials = [
    "navigation",
    "navigation_info",
    "language_toggle",
    "progress_indicator",
    "address_search_form",
    "search_validation_errors",
    "search_result_map",
    "add_to_calendar",
    "tenants_rights_modal",
  ];

  for (const partial of partials) {
    Handlebars.registerPartial(
      partial,
      fs.readFileSync(
        path.resolve(__dirname, `./src/hbs_partials/${partial}.hbs`),
        "utf-8"
      )
    );
  }
}
