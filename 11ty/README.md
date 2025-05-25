# Am I Rent Stabilized Website

The website for *Am I Rent Stabilized* is assembled using the following technologies:

- [NodeJS](https://nodejs.org/en) JavaScript runtime for compiling the website
- [Eleventy.JS (11ty)](https://www.11ty.dev) static site generator for generating HTML
- [Handlebars.jS](https://handlebarsjs.com) HTML templating library
- [Dart Sass](https://sass-lang.com) for assembling the CSS
- [esbuild](https://esbuild.github.io) for compiling JavaScript
- [ReduxJS](https://redux.js.org) for state management
- [GSAP](https://gsap.com) for animations
- [d3-geo](https://d3js.org/d3-geo) & [d3-tile](https://github.com/d3/d3-tile) for geographic mapping

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

This project uses ESM, with the exception of component and unit tests that utilize the Jest testing framework. These files use a mix of ESM and CJS, an artifact of Jest unfortunately having never fully migrated to ESM.

Source code resides in the `src/` directory (in case that isn't obvious). The following directories assume `src/` as the parent directory (e.g. `_data/` is `src/_data/`).

### _data/

Contains "global data" available for use throughout all Eleventy templates (in `src/content/`) via the "data cascade" in Eleventy.

#### _data/eleventyComputed.js

Global "computed" data. Mainly used to group the `locales` JSON data by their respective language code (e.g. `en`, `es`, `zh`).

#### _data/locales/

JSON files that contain the translations for each page in the site, as well as common translation strings used in places repeated throughout the site such as the primary site navigation.

For example, `main-en.json` corresponds to the homepage in English, `why-es.json` corresponds to the `why.html` page in Spanish, `resources-zh.json` corresponds to the `resources.html` page in Chinese.

### _includes/

Handlebars.js partials. Think of these as "components". They are often tightly coupled to locales JSON file data structure and typically have an equivalent Sass (CSS) partial.

### _layouts/

Handlebars.js layouts. Think of these as the page structure for the various pages. The "how", "why", and "resources" pages share a common layout (`infopages.hbs`). All pages share the `base.hbs` layout.

### _utils/

Eleventy specific utility / helper function junk drawer.

### content/

The site's pages, referred to as "templates" in Eleventy. While these pages have a markdown extension, they are mainly referencing their corresponding Handlebars layout template from the `src/_layouts/` directory.

The site's pages are organized by language, with English pages being the default language at the root directory level (`/index.html`, `/why.html`, `/how.html`, etc.) and supported languages being in their own sub-directory by locale (e.g. `es/*.html`, `zh/*.html`). This structure follow's Eleventy's guidance for i18n using the ["Distinct URLs using Implied Default Language"](https://www.11ty.dev/docs/i18n/#distinct-urls-using-implied-default-language) technique. This works in tandem with locale based redirects, see the [`netlify.toml`](./netlify.toml) configuration file.

Template data is configured via `*.11tydata.js` files so that each of the site's pages may share the same markup while being rendered using the appropriate locale from `src/_data/locales/`.

### content/*.11tydata.js

These are Eleventy data files which configure the data for each page template. They use "computed data" to direct the locales JSON data from `src/_data/` to the correct page in the correct language.

In addition to the pages, these files delegate the data for the primary navigation (`nav_main`), in-page navigation links (`nav_side`), and same page translation links (`localeLinks`).

### js/

The website's client side JavaScript. Most of the JS is for use with the homepage, although there is a separate entry point for the "info" pages.

### scss/

The website's styles. These are sass files (`*.scss`) which compile to CSS via Dart Sass.

### Misc Files

#### netlify.toml

Netlify configuration file that mainly handles redirects for i18n. If a user's language is recognized and supported then they should be redirected to the corresponding page.

#### eleventy.config.js

Configuration file for EleventyJS static site generator that compiles the site's HTML.
