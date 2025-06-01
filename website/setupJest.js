import fetchMock from "jest-fetch-mock";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import jest from "jest";

function registerHbsPartials() {
  // These partials are automatically read by webpack using the handlebars-loader,
  // however for Jest we have to register them in order for tests to run.
  const partials = [
    "navigation",
    "language_toggle",
    "modal_dialog",
    "progress_indicator",
    "address_search_form",
    "search_result_map",
    "add_to_calendar",
    "tenants_rights_modal",
  ];

  for (const partial of partials) {
    Handlebars.registerPartial(
      partial,
      fs.readFileSync(
        path.resolve(process.cwd(), `./src/_includes/${partial}.hbs`),
        "utf-8"
      )
    );
  }
}

export default () => {
  fetchMock.enableMocks();

  registerHbsPartials();

  window.addeventatc = {
    refresh: jest.fn(),
  };

  window.matchMedia = jest.fn(() => ({
    matches: false,
  }));

  window.gtag = jest.fn();

  global.jest = jest;

  global.setDocumentHtml = (html) => {
    document.body.innerHTML = `<div id="wrapper">${html}</div>`;
  };

  global.getMainHtml = async () => {
    const localeData = await import(`./src/_data/locales/main-en.json`);
    const hbsFile = fs.readFileSync(
      path.resolve(process.cwd(), "./src/_layouts/home.hbs"),
      "utf8"
    );
    const template = Handlebars.compile(hbsFile);
    return template(localeData);
  };

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
};
