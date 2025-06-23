# Am I Rent Stabilized?

![](website/assets/png/airs_landing_page.png)

A mobile friendly, multi-lingual web app that informs NYC residents about [Rent Stabilization](http://www.nycrgb.org/html/resources/faq/rentstab.html) by simplifying the process of how to find out if their apartment may be rent stabilized, if they are paying too much rent, and what to do about it.

See it in action at [amirentstabilized.com](https://amirentstabilized.com/).

## Website Development

These instructions pertain to the development of Am I Rent Stabilized website in this repo's [`website/`](./website/) directory.

Developing the website requires familiarity with the Command Line Interface, as well as local installations of NodeJS v22.14 and Yarn v4.91.

> [!TIP]
> It is recommended to use [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) to switch between different NodeJS versions in a shell.

### Architecture

Am I Rent Stabilized's website is a static site that is server side rendered using [EleventyJS](https://www.11ty.dev) with [HandlebarsJS](https://handlebarsjs.com) as the primary templating engine. The homepage makes use of JavaScript for user interactions while the remaining pages are largely static HTML and CSS.

This website supports several different languages (locales). The website's primary locale, English, uses the root directory (e.g. `/index.html`) while the other locales use subdirectories (e.g. `/es/index.html`, `/zh/index.html`).

Netlify redirects are used to automatically redirect supported locales to the appropriate subdirectory when detected via the useragent. Additionally each page links to the same page in each supported locale.

See the [Localization](#localization) section in this README for more info.

### Available Scripts

The following commands assume to be run from the [`website`](./website/) directory. See the [`website/package.json`](./website/package.json) for a full list of available scripts.

Assuming the correct version of NodeJS is being used, you may need to enable `corepack` before proceeding:

```bash
corepack enable
```

Install the required 3rd party dependencies:

```bash
yarn install
```

To have Eleventy watch for changes and serve the site using a local web server:

```bash
yarn start
```

To have Eleventy create a production optimized build (will output assets to the `website/dist` directory):

```bash
yarn build
```

To serve the assets of the production build do:

```bash
yarn serve
```

### Localization

The website's content is available in the following languages:

- English
- Spanish
- Chinese

Changes made to any of the content will need to be reflected in the corresponding locales JSON files and potentially the Handlebars layout template files.

These files are located as follows:

- [`website/src/_data/locales/`](./website/src/_data/locales/): JSON files for supported locales. The naming convention used is `[page name]-[language code].json`, for example `how-es.json` maps to `how.html` in Spanish.

- [`website/src/_layouts/`](./website/src/_layouts/): Handlebars template files that correspond to the website's HTML pages.

> [!NOTE]
> In both sets of files `main-[lang].json` maps to `home.hbs` (the site's homepage).

The locales JSON files and Handlebars layout templates files are utilized in the [`website/src/content/`](./website/src/content/) directory. Root level files in this directory correspond to English while subdirectories (e.g. `es/`, `zh/`) correspond to secondary locales (Spanish, Chinese).

[Eleventy directory specific data files](https://www.11ty.dev/docs/data-template-dir/) are used to set the appropriate locale strings for each page in the website. For example, the [`es.11tydata.js`](./website/src/content/es/es.11tydata.js) data file sets Spanish strings for the site's primary navigation, homepage, info pages (how, why, resources), etc when the user is visiting the site at `/es/[page].html`. These strings are treated as "data" and "cascade" to the designated Eleventy template and/or Handlebars partial.

Each page template file is a simple Markdown file with front matter that states which Handlebars layout file to use. For example, the `src/content/zh/index.md` file contains `layout: home.hbs` which means it uses the `src/_layouts/home.hbs` file to render the page's content.

### Adding a New Translation

Adding a new language translation will require:

1. New `locale` JSON files for each corresponding HTML page in [`website/src/_data/locales/`](./website/src/_data/locales/)
2. Page template files in [`website/src/content/[lang]/`](./website/src/content/) for each HTML page in the new language
3. Updating the Netlify redirects settings in [`website/netlify.toml`](./website/netlify.toml)
4. Updating the UI to display the new language option on each page (See [`website/src/_includes/language_toggle.hbs`](./website/src/_includes/language_toggle.hbs) and [`website/src/_utils/localeLinks.js`](./website/src/_utils/localeLinks.js)).

> [!WARNING]
> "Right to Left" (RTL) language support has not yet been tested. Supporting RTL languages may require additional development work.

## Data Sources and ETL:

See the [`data/`](./data) directory for a Makefile and Docker container configurations for generating the app's dataset of NYC parcels that are likely to have rent-stabilized apartments.

The processed dataset is hosted and [publicly available for download on CARTO.com](https://clausa.app.carto.com/map/9102794d-e704-4e91-95b8-582049b57ad1).

## Credits

- Big thanks to [Caroline Woolard](http://carolinewoolard.com/) for suggesting the idea to me.

- [Jue Yang](https://github.com/jueyang) designed the awesome building graphics which informed the overall redesign of version 2 of the site.

- [Eric Brelsford](http://ebrelsford.github.io/portfolio/) and [BetaNYC](http://betanyc.us/) provided motivational and technical support.

- [Radish Lab](http://radishlab.com/) contributed the design mockups for version 2.

- [John Krauss](http://blog.johnkrauss.com/) provided data for NYC properties that should have rent-stabilized apartments due to receiving tax exemptions from state programs such as 421a. (You can learn more on the the repo for [nyc-stabilization-unit-counts](https://github.com/talos/nyc-stabilization-unit-counts)).

### Fullscreen Slides with GSAP's TweenLite, CSSPlugin and ScrollToPlugin Credit

Forked from [Chrysto](http://codepen.io/bassta/)'s Pen [Fullscreen slides with TweenLite, CSSPlugin and ScrollToPlugin](http://codepen.io/bassta/pen/kDvmC/).

A [Pen](http://codepen.io/anon/pen/XJqaRg) by [Captain Anonymous](http://codepen.io/anon) on [CodePen](http://codepen.io/).

[License](http://codepen.io/anon/pen/XJqaRg/license).

## LICENSE

[Creative Commons Attribution-NonCommercial ](http://creativecommons.org/licenses/by-nc/4.0/)
(CC BY-NC)

In other words: **_Not For Profit!_**
