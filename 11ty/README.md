# Am I Rent Stabilized Website

The website for *Am I Rent Stabilized* is assembled using the following technologies:

- [NodeJS]()
- [Eleventy.JS (11ty)]() static site generator
- [Handlebars.jS]() HTML templating library
- [Dart Sass]() for assembling the CSS
- *TODO: JS*

## Local development

Running the site locally requires working knowledge of using the command line interface.

Make sure to use the correct version of NodeJS and the Yarn package manager. For example, with Node Version Manager:

```bash
nvm use
```

Then enable corepack:

```bash
corepack enable
```

Install dependencies:

```bash
yarn install
```

Compile the site and serve it using Eleventy's local web server:

```bash
yarn start
```

## Create a production build

Assuming the correct version of NodeJS and Yarn are available locally and all dependencies have been installed, run the following command to create the site. The site will be output in the `dist/` directory (ignored by `git`).

```bash
yarn build
```

## Website architecture

This project uses 100% ESM, no common JS! Code resides in the `src/` directory (in case that isn't obvious).

### _data/

Contains "global data" available for use throughout all Eleventy templates (in `src/content/`) via the "data cascade" in Eleventy.

#### _data/eleventyComputed.js

Global "computed" data. Mainly used to organize the `locales` JSON data by their respective language code (e.g. `en`, `es`, `zh`).

#### _data/locales/

JSON files that contain the translations for each page in the site, as well as common translation strings used in places repeated throughout the site such as the primary site navigation.

For example, `main-en.json` corresponds to the homepage in English, `why-es.json` corresponds to the `why.html` page in Spanish, `resources-zh.json` corresponds to the `resources.html` page in Chinese.

### _includes/

Handlebars.js partials. Think of these as "components". They are often tightly coupled to locales JSON file data structure.

### _layouts/

Handlebars.js layouts. Think of these as the page structure for the various pages. The "how", "why", and "resources" pages share a common layout (`infopages.hbs`). All pages share the `base.hbs` layout.

### _utils/

Utility / helper function junk drawer.

### content/

The site's pages, referred to as "templates" in Eleventy. While these pages have a markdown extension, they are mainly referencing their corresponding Handlebars template in the `src/_layouts/` directory.

The site's pages are organized by language (e.g. `en/*.html`, `es/*.html`, `zh/*.html`), with the exception of the English homepage which resides at the site's root directory (`/index.html`).

### content/[slug].11tydata.js

These are Eleventy data files which configure the data for each page template. They use "computed data" to direct the locales JSON data from `src/_data` to the correct page in the correct language.

In addition to the pages, these files delegate the data for the primary navigation (`nav_main`), in page navigation links (`nav_side`), and translation links (`localeLinks`).

### scss/

The website's styles. These are sass files (`*.scss`) which compile to CSS via Dart Sass.

### Misc Files

#### _redirects

Netlify redirects file that mainly handles part of the translation / i18n stuff.

#### eleventy.config.js

Configuration file for EleventyJS static site generator that compiles the site's HTML.
