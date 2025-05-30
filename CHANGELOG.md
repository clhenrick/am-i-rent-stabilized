# Am I Rent Stabilized Changelog
This changelog describes significant changes to the project. It was first created on November 29, 2020 so does not account for the entire project's history.

## 2025-05-25 Migrated website to use Eleventy static site generator ([#173](https://github.com/clhenrick/am-i-rent-stabilized/pull/173))

Uses the existing Handlebars templates with EleventyJS to SSR the site's HTML pages rather than CSR them as was previously the case. This cuts down on the amount of client side JavaScript necessary to render the site and removes the need to fetch the JSON locales when toggling to a non-default language.

- Renamed the old `app/` directory to `website_deprecated`. This directory will eventually be removed once the remaining / desired dev dependencies are added back.
- Added a new directory `website/` for the Eleventy version of the website. Builds are now deployed from this directory.
- Dropped usage of Webpack as the asset compiler.
- Removed translation related JS that previously ran in the client since now all HTML pages are being generated via SSR and supported languages are rendered as separate pages in locale prefixed directories (e.g. `/es/index.html`, `/es/why.html`, etc.)
- Only migrated dependencies necessary to run the site. Dev dependencies such as Jest, ESLint, Lint Staged, Stylelint, Autoprefixer, etc. will need to be added back in a future PR. This means the component and unit tests are currently not being run via Github Actions like they previously were.
- Added Netlify redirects to redirect supported locales to their corresponding prefixed root level directory (e.g. a user with Spanish set as their native language in their OS and/or browser should be redirected to `/es/*.html`) and to redirect pages from the `/info/` directory to `/`.
- Use ESBuild to compile the client side JS.

## 2025-04-20 Accessibility fixes for modal dialogs ([#164](https://github.com/clhenrick/am-i-rent-stabilized/pull/164) & [#167](https://github.com/clhenrick/am-i-rent-stabilized/pull/167))

Added a proper (e.g. accessible) `ModalDialog` component that utilizes the HTML `<dialog>` element to show the sample rent history image in slide seven and tenants rights groups in slide eight. This fixes multiple accessibility issues with the previous modal implementations such as focus management, making the non-modal UI inert, using appropriate semantics, etc.

## 2025-04-16 Upgrade NodeJS and Yarn ([#162](https://github.com/clhenrick/am-i-rent-stabilized/pull/162))

Upgraded dependency NodeJS and with it use Corepack for utilizing the latest version of the Yarn package manager.

- upgraded NodeJS to LTS v22.14.0
- upgraded Yarn to v4.9.1
- updated webpack npm scripts to fix an issue with OpenSSL being incompatible with Webpack v4

## 2025-04-14 Search Result Map component fixes ([#160](https://github.com/clhenrick/am-i-rent-stabilized/pull/160))

Fixed some issues with the `SearchResultMap` component's SVG rendering & pop-up positioning that were left over from [PR #153](https://github.com/clhenrick/am-i-rent-stabilized/pull/153).

## 2025-04-13 Refactor app (S)CSS ([#159](https://github.com/clhenrick/am-i-rent-stabilized/pull/159))

Refactored the app's Sass to be more DRY, maintainable, make better use of the cascade, and use modern Sass features like `@use` instead of the deprecated `@import`. This should make it easier to update the app's UI in the future then with the previous tangled and messy CSS (that was mostly over ten years old!).

Additionally:

- Fixed incorrect usage of heading level elements in the info pages
- Implemented a fluid type scale via container queries to improve the handling of type sizing in the homepage's slides (s/o to [Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/blog/fluid-type-scale-with-css-clamp/)!)
- Removed `normalize.css` in favor of a custom CSS reset
- Upgraded dependencies Sass and Prettier

## 2025-03-23 Migrate app to CARTO v3 ([#144](https://github.com/clhenrick/am-i-rent-stabilized/issues/144))

Due to the "legacy" CARTO(DB) platform being shutdown in April of 2025, the website was updated to use the newer "v3" CARTO platform, SQL API, and related services. This included:

- Importing the existing "likely RS" and tenants rights service areas datasets into CARTO v3
- Recreating the visualization of "likely rent stabilized properties" in CARTO v3 and linking to it from the search results map slide
- Using the CARTO v3 SQL API for querying the likely RS and tenants rights service areas
- Adjusting the SQL queries to use Big Query geography functions instead of PostGIS functions
- Updating the search results map to use a new "likely RS" layer using GeoJSON rendered as SVG paths instead of a raster tile layer

## 2023-12-31 Bug Fix: slides smooth scroll ([#133](https://github.com/clhenrick/am-i-rent-stabilized/pull/133))

Re-implements the smooth scrolling between slides when a user has not enabled "prefers reduced motion" in their device or browser settings. The smooth scrolling had unintentionally stopped working after PR #125 which fixed accessibility issues with the slides.

## 2023-12-27 Bug Fix: address search ([#132](https://github.com/clhenrick/am-i-rent-stabilized/pull/132))

Fixes a significant bug ([#131](https://github.com/clhenrick/am-i-rent-stabilized/issues/131)) on iOS (iphones) where the address search form's input would move out of the visual viewport (be hidden) when focused. Although it would return to the visual viewport when typing,  when the input is blurred the slides layout would get stuck in a state that obscured the search button, thus preventing the user from search for an address. The fix involves temporarily hiding all non-active/visible slides when the input is focused, and then un-hiding them when the search button is clicked in order to prevent the odd layout shift from occuring.

## 2023-12-16 Improved A11Y of address search form ([#128](https://github.com/clhenrick/am-i-rent-stabilized/pull/128))

Made accessibility enhancements and bug fixes for the address search form on slide two:
- apply `aria-required="true"` to the `<input>` element to indicate that it is required to users of assistive tech
- dynamically apply `aria-labelledby` to the `<input>` element when needed to provide an accessible description
- dynamically apply `aria-invalid="true/false"` to the `<input>` when it is in an invalid state
- apply focus to the input when the user submits the form when there is an error so that error text is announced
- cleaned up HTML for error help text
- removed asterisks from error help text to avoid confusing users of assistive tech

## 2023-11-27 Fix A11Y of Homepage / Slides ([#125](https://github.com/clhenrick/am-i-rent-stabilized/pull/125))

Improves the accessibility of the home page's slides (main content):
- Utilizes the HTML `inert` attribute to remove inactive slide content that is focusable from the tab order.
- Applies `aria-hidden="true"` to all inactive slides.
- Programmatically focuses the active slide when transitioning from the previous slide. Note: no focus ring is applied to the active slide since there may only ever be a single slide in view at a time.
- Partially follows the [WAI APG's Carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) for making the slides accessible to users of assistive technology. I say "partially" because the homepage's slides pattern does not follow a typical carousel UX in that it does not allow users to go backwards / to a previous slide or jump to any slide using a specific set of controls. The implementation that follows guidance from the Carousel pattern was tested using VoiceOver on Safari with positive results.

Other:
- Updated dev dependency `caniuse-lite`

## 2023-11-22 A11Y improvements & bug fixes ([#124](https://github.com/clhenrick/am-i-rent-stabilized/pull/124))

Accessibility fixes:
- Corrected the usage of heading levels (h1-h6) through out the website so that there is one h1 per page and are sequential (see issue #85)
- Fixes the main navigation's hamburger button (previously was a clickable `<div>`) by making it an actual button.

Other bug fixes & improvements:
- fixes the "start over" button click handler which was previously not working
- cleaned up the main navigation CSS
- removed some unused SCSS partials

## 2023-02-03 App Dependency updates ([#120](https://github.com/clhenrick/am-i-rent-stabilized/pull/120))
- Removed `node-sass` in favor of (Dart) `sass`
- Upgraded `webpack` to latest 4.x version 4.46.0
- Upgraded Node.JS to `16.13.2` via `app/.nvmrc` and `.github/workflows/node.js.yml`

## 2023-02-01 ([PR #118](https://github.com/clhenrick/am-i-rent-stabilized/pull/118))
Updated the app's address search UI to use v2 of NYC Planning Labs [GeoSearch API](https://github.com/NYCPlanning/labs-geosearch-docker), an NYC specific geocoder. The v1 of the API was sunsetted in December of 2022  and as a result the app's address search no longer worked (issue [#119](https://github.com/clhenrick/am-i-rent-stabilized/issues/119)).

## 2021-04-14 ([PR #89](https://github.com/clhenrick/am-i-rent-stabilized/pull/89))
Reinstated the local tenants rights groups search that was missing from the 2020-11-29 JavaScript refactor. When a user searches for their address, if the geocoding API returns a successful response, the coordinates of that address are matched spatially (point in polygon) against a table containing the catchment areas of NYC tenants rights groups via CARTO's SQL API. If any results are found then they are displayed in a modal in the second to last slide. How this data is displayed to the user could be improved, and the tenants rights groups data itself most likely needs updating.

## 2021-03-25 ([PR #87](https://github.com/clhenrick/am-i-rent-stabilized/pull/87))
Fixed accessibility issues with elements that behaved like buttons but were either clickable `<div>` elements (ugh!) or anchor elements.

Fixed a bug where pages would load without the locale being set thereby causing an incorrect `font-size` value to be applied to body text.

## 2021-02-10 ([PR #80](https://github.com/clhenrick/am-i-rent-stabilized/pull/80))
Updated the ETL scripts that generate the data on NYC properties that are likely to have rent stabilized apartments. Consolidated the previous subdirectories (`scripts/`, `sql/`, and `data/`) into the single `data/` subdirectory. The data processing is now automated via a `Makefile` and several Docker containers. Running the command `make all` in the `data/` subdirectory will download the required data sources and run the necessary scripts that create a PostgreSQL database called `airs` with the `likely_rs` table containing the list of said properties. Currently this table is exported as a Shapefile and uploaded to CARTO to enable data querying and rendering by the app. A future update may replace the use of CARTO with a NodeJS server that features a RESTful API for querying the data.

## 2021-01-30 ([PR #79](https://github.com/clhenrick/am-i-rent-stabilized/pull/79))
Fixed a bug with the app's address search where an autosuggest search result selected by the user could return a different address by the search API endpoint.

## 2020-11-29 ([PR #58](https://github.com/clhenrick/am-i-rent-stabilized/pull/58))
This was a major JavaScript refactor (perhaps more so a rewrite!) of the application's codebase that amounted to over 400 commits! The primary goal of this refactor was to make the JavaScript code easier to reason about as its previous implementation was, let's say, not the easiest to reason about. Secondary goals were to improve code quality with unit tests, Continuous Integration, JS & SCSS linting, and code formatting. I also removed some 3rd party libraries that were no longer needed, upgraded ones that were kept, and implemented a new build system using Webpack.

Non-goals of this refactor included:
- porting the codebase to a JavaScript framework such as React or Vue
- porting the codebase to Typescript
- refactoring the styles (SCSS/Sass)
- fixing accessibility issues
- adding new features (well except for autosuggest in the address search!)

However, when an a11y related fix or SCSS improvement could be made with little effort I did so. I plan on fixing the major a11y issues with the website following this refactor.

The following is a comprehensive overview of the changes that were made.

### Code Refactor
- [x] refactor JavaScript in previous `app/js/app` directory
- [x] restructure the sub-directories in `app/`, e.g. use the `src/` and `public` directory conventions that are commonly used with modern frontend web apps.
- [x] modularize the code using ES modules
- [x] use ES6+ features / syntax
- [x] isolate interactive UI elements as ES6 Class components that inherit from a super class.
- [x] utilize immutable application state management

#### Components
Create Component classes for each interactive element to isolate its logic, styles, and DOM element(s).
- [x] Component super class
- [x] AddToCalendar
- [x] AddressSearchForm
- [x] AdvanceSlides
- [x] KeyboardNavigation
- [x] LanguageToggle
- [x] LanguageToggleButton
- [x] MapTileLayers
- [x] MapPopup
- [x] Navigation
- [x] ProgressIndicator
- [x] RentHistoryEmail
- [x] SearchResultMap
- [x] SearchValidationErrors
- [x] slidesContainer
- [x] StartOver
- [x] VerifyRentStabilized

#### State Management
- [x] use Redux.JS for managing application state
- [x] use Redux Dev Tools for tracking state when in dev mode
- [x] use `redux-logger` in a "debug" mode for debugging builds when necessary
- [x] use `redux-thunk` for handling async actions
- [x] use custom middlewares for logging errors and crashes
- [x] use an `observeStore` function that allows for Components to react to state changes

### Frontend Build System Eval
- [x] evaluated the previous frontend build system that used Gulp.JS and found it to be difficult to modify and improve so scrapped it.
- [x] use Webpack as a frontend build system with support for "develop" and "production" build options
- [x] use Webpack Dev Server
- [x] use Babel.JS for transpiling ES6+ code to ES5 for IE11
- [x] create separate entry points (code split) for `index.html` and `info/*.html` pages

### Code Quality Improvement
- [x] set up an ESLint task
- [x] set up StyleLint task for CSS/SCSS
- [x] set up a Prettier code formatting task
- [x] set up the Jest testing framework
- [x] set up a `git` commit hook that runs Prettier and ESLint
- [x] write unit tests
- [x] setup Github Action for building the app and running tests in pull requests
- [x] setup lightweight error/exception logging using Google Analytics `gtag.js`

### Static Assets
- [x] Split up locales JSON files (previously all three supported languages were in one file per HTML page)
- [x] Rename `app/data/` directory to `app/public/locales/`
- [x] use `[page-name]-[lang-code].json` file naming convention for locale files
- [x] updated translation buisness logic to accommodate this new convention

### 3rd Party Deps
- [x] upgrade GSAP dependency
- [x] remove packages installed in `bower_components` (think this is just `cartodb.js`?)
- [x] remove `jQuery`
- [x] remove `cartodb.js`
- [x] remove `aja.js`
- [x] kept `addthis.js` (social media sharing widget)
- [x] upgrade `atc.js` (Add to Calendar)
- [x] upgrade `handlebars.js`
- [x] upgrade `analytics.js` to `gtag.js`

### Geographic Map
- [x] remove usage of Leaflet.JS / CartoDB.JS
- [x] use `d3-tile` and `d3-geo` for lightweight map implementation
- [x] use CARTO Maps API for querying likely rent stabilized map tiles
- [x] kept CARTO Positron basemap tiles

### Use NYC Planning Labs Geocoder for Address Search
The previous address geocoding API being used required the street address and borough name to be passed as separate params which required separate inputs in the UI. The newer Geocoding API supports autosuggest which provides a better User Experience.
- [documentation](https://labs-geosearch-docs.netlify.app/)
- [x] remove borough select / dropdown
- [x] use autosuggest API endpoint and show results via an HTML `datalist`
- [x] update form validations error messages & styling
- [x] update translation text for form input & error validations
- [x] fix handling of form submit
- [x] made the form's "search" button an actual form submit button
- [x] add HTML label for form's text/search input

### Other
- [x] use Netlify for Preview Deploys, builds, and other misc checks on pull requests
- [x] use Netlify to host the website and automatically deploy it when pushing to the `master` git branch
- [x] removed the "Rent Logic" button / link from last slide (Rent Logic is a startup and they haven't donated a dime to me so why feature it for free on the website's homepage?)

### Left Overs
The following items I did not get around to completing and intend to address after Pull Request #58 has been merged (you can only fit so much in a single PR!)

- [ ] JS resize handler for setting slide size
  - when the browser is resized, the layout shifts oddly. A resize event handler would fix this.
  - or perhaps dispatching the `goToSlideIdx` action with the current slide index?

- [ ] Tenants Rights search component
  - needs a modal component (could combine with rent-history modal?)
  - needs the tenants rights spatial search query
  - needs an SQL query for CARTO
  - needs async action for fetching data
  - could move hbs template from index.html page to a file

A11Y:

- [ ] manage focus when scrolling between slides (see [this write up for why](https://css-tricks.com/smooth-scrolling-accessibility/))

- [ ] Fix tab index so that the user can't jump between slides by tabbing
  - maybe set tabIndex="-1" on all focusable elements that aren't in the current slide?
  - look into using the [`inert` html property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert) ([video demo](https://www.youtube.com/watch?v=fGLp_gfMMGU&list=PL7Bjl0Cb4SboBHNihVBRd-AdctfXcmClc&index=3&t=0s&app=desktop)) (requires a [polyfill](https://github.com/WICG/inert) for some browsers)

- [ ] make buttons actual HTML buttons and not clickable `<div>` elements

Misc:

- [ ] add a 404 page and adjust translation business logic for it
- [ ] could upgrade or remove normalize.css as it mostly isn't needed these days
