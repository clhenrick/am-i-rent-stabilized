import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

function registerHbsPartials() {
  const partials = [
    "navigation",
    "language_toggle",
    "modal_dialog",
    "progress_indicator",
    "address_search_form",
    "search_result_map",
    "add_to_calendar",
    "tenants_rights_modal",
    "in_page_nav",
    "scripts",
    "styles",
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

registerHbsPartials();

global.setDocumentHtml = (html) => {
  document.body.innerHTML = `<div id="wrapper">${html}</div>`;
};

global.getMainHtml = () => {
  const localeData = JSON.parse(
    fs.readFileSync(
      path.resolve(process.cwd(), "./src/_data/locales/main-en.json"),
      "utf-8"
    )
  );
  const homeHbs = fs.readFileSync(
    path.resolve(process.cwd(), "./src/_layouts/home.hbs"),
    "utf8"
  );
  const baseHbs = fs.readFileSync(
    path.resolve(process.cwd(), "./src/_layouts/base.hbs"),
    "utf8"
  );
  const homeContent = Handlebars.compile(homeHbs)(localeData);
  return Handlebars.compile(baseHbs)({
    ...localeData,
    content: homeContent,
    isHomepage: true,
  });
};

global.ResizeObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

window.addeventatc = { refresh: vi.fn() };
window.matchMedia = vi.fn(() => ({ matches: false }));
window.gtag = vi.fn();
