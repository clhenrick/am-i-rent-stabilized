require('jest-fetch-mock').enableMocks();

const fs = require("fs");
const path = require("path");
const Handlebars = require("Handlebars");
const constants = require("./src/utils/constants");

registerHbsPartials();

global.setDocumentHtml = (html) => {
  document.body.innerHTML = `<div id="wrapper">${html}</div>`;
}

global.getMainHtml = () => {
  const localeData = require(`./public/${constants.LOCALES_JSON_DIR}/main-en.json`);
  const hbsFile = fs.readFileSync(
    path.resolve(__dirname, "./src/hbs_templates/main.hbs"),
    "utf8"
  );
  const template = Handlebars.compile(hbsFile);
  return template(localeData);
}

function registerHbsPartials() {
  // these partials are automatically read by webpack using the handlebars-loader
  // for Jest we have to register them separately
  Handlebars.registerPartial("navigation", fs.readFileSync(
    path.resolve(__dirname, "./src/hbs_partials/navigation.hbs"),
    "utf8"
  ));

  Handlebars.registerPartial("navigation_info", fs.readFileSync(
    path.resolve(__dirname, "./src/hbs_partials/navigation_info.hbs"),
    "utf8"
  ));

  Handlebars.registerPartial("language_toggle", fs.readFileSync(
    path.resolve(__dirname, "./src/hbs_partials/language_toggle.hbs"),
    "utf8"
  ));
}
