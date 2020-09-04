# JS Refactor To Dos

This doc outlines tasks for refactoring the JavaScript in amirentstabilized.com

## High Level

- [ ] Prioritize all of these TODO's!

## Code Refactor

- [x] thoroughly review existing JS code to build a mental map of what it's doing
- [x] extract important parts of the code that will need to be referenced later
- [ ] refactor existing code to be less verbose, easier to follow, utilize ES modules & ES6+ syntax

## Frontend Build System Eval

- [x] evaluate the existing frontend build system (Gulp)
- [x] decide whether to upgrade Gulp or to switch to another build system such as Webpack or Parcel
- [x] decide whether or not to incorporate Babel
- [x] code split JS index.html from info/*.html pages
    - [ ] decide on whether or not to use multiple entry points vs. separate dynamic imports
- [ ] strategy for addressing polyfills that avoids shipping un-necessary polyfill JS bundle to modern browsers

## Code Quality Improvement

- [ ] set up an ESLint task (or keep using JS Hint?)
- [ ] set up a Prettier code formatting task
- [ ] maybe set up a testing framework and write unit tests?

## 3rd Party Deps

- [ ] remove GSAP libraries (replace scroll animation with `element.scrollIntoView`)
- [ ] remove packages installed in `bower_components` (think this is just `cartodb.js`?)
- [ ] remove JQuery (will require removing `cartodb.js` dep)
- [ ] remove `cartodb.js`
- [ ] remove `aja.js`
- [ ] upgrade (or possibly remove?) `addthis.js` (social media sharing widget)
- [ ] upgrade / fix `atc.js` (Add to Calendar)
- [ ] upgrade `handlebars.js`
- [ ] ~~add / use `alpine.js` to refactor & reduce the amount of JS needed~~
- [ ] decide on whether or not to keep google analytics


## Other
- [ ] update title attribute in info/*.pages
- [ ] write tests 

## Bugs
- [ ] lang toggle buttons not updating in index.html page