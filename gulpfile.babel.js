import gulp from 'gulp';
import jshint from 'gulp-jshint'
import sass from 'gulp-sass'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import server from 'gulp-webserver'
import plumber from 'gulp-plumber'
import minifyCSS from 'gulp-minify-css'
import handlebars from 'gulp-handlebars'
import wrap from 'gulp-wrap'
import declare from 'gulp-declare'
import useref from 'gulp-useref'
import gulpIf from 'gulp-if'
import del from 'del'

const server_config = {
  host: 'localhost',
  port: '8000'
}

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
// Lint Task
function lint() {
  return gulp.src(['app/js/app/*.js', '!app/js/app/templates.js'])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}

// Compile Our Sass
function compileSass() {
  return gulp.src('app/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/css'));
}

// precompile handlebars templates
export function templates() {
  return gulp.src('app/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'app.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('app/js/app'));
}


// Concatenate & Minify app js & vendor js libraries
function scripts() {
  return gulp.src([
    'app/js/vendor/*.js',
    'app/js/app/*.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('app/js/'));
}

// concat & minify scripts for pages other than index.html
function scriptsOtherPages() {
  return gulp.src([
    'app/js/vendor/other_pages/handlebars.runtime.min.js',
    'app/js/app/templates.js',
    'app/js/app/app.lang-toggle.js',
    'app/js/app/app.other-pages.js'
  ])
    .pipe(concat('otherpages.js'))
    .pipe(gulp.dest('app/js'));
}

// for production use minified js & css files.
function minifyIndexJs() {
  return gulp.src('app/*.html', { allowEmpty: true })
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('build'))
}

function minifyOtherPagesJs() {
  return gulp.src('app/info/*.html', { allowEmpty: true })
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('build/info'))
}

function minifyMainCss() {
  return gulp.src('app/*.html', { allowEmpty: true })
    .pipe(useref())
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('build'))
}

// run local server
function webserver() {
  return gulp.src('app/')
    .pipe(server({
      host: server_config.host,
      port: server_config.port,
      livereload: true,
      directoryListing: false,
    }));
}

// Watch Files For Changes
function watch() {
  gulp.watch('app/templates/*.hbs', templates);
  gulp.watch('app/js/app/*.js', gulp.series(lint, gulp.parallel(scripts, scriptsOtherPages)));
  gulp.watch('app/scss/*.scss', compileSass);
}

// copy index.html to build
function copyIndex() {
  return gulp.src(['app/index.html'])
    .pipe(gulp.dest('build/'))
    .on('error', handleError);
}

// copy assets dir to build
function copyAssets() {
  return gulp.src(['app/assets/**/*'])
    .pipe(gulp.dest('build/assets/'))
    .on('error', handleError);
}

// copy html dir to build
function copyOtherPages() {
  return gulp.src(['app/info/*.html'])
    .pipe(gulp.dest('build/info/'))
    .on('error', handleError);
}

// copy translation data to build
function copyData() {
  return gulp.src(['app/data/*.json'])
    .pipe(gulp.dest('build/data/'))
    .on('error', handleError);
}

// delete all files in build
function clean() {
  return del(['build/*']);
}

// Production Build
export const production = gulp.series(
  clean,
  gulp.parallel(
    copyIndex,
    copyAssets,
    copyOtherPages,
    copyData
  ),
  gulp.parallel(
    scripts,
    scriptsOtherPages,
    templates
  ),
  minifyIndexJs,
  minifyOtherPagesJs,
  compileSass,
  minifyMainCss,
);

// Default Task
const build = gulp.series(
  lint,
  gulp.parallel(
    scripts,
    scriptsOtherPages,
    templates
  ),
  compileSass,
  webserver,
  watch
);

export default build;