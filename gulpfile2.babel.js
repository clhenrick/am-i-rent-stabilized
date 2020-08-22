/*jshint esversion: 6 */
import gulp from 'gulp';

import jshint from 'gulp-jshint';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import server from 'gulp-webserver';
import plumber from 'gulp-plumber';
import minifyCSS from 'gulp-minify-css';
import handlebars from 'gulp-handlebars';
import wrap from 'gulp-wrap';
import declare from 'gulp-declare';
import useref from 'gulp-useref';
import gulpIf from 'gulp-if';
import del from 'del';

const sourcemaps = require("gulp-sourcemaps");
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import browserify from "browserify";
import babel from "babelify";

const server_config = {
  host: 'localhost',
  port: '8000'
};

const paths = {
  js: {
    watchFiles: "app/js/refactored/*.js",
    source: ["app/js/refactored/main.js"],
    destMapFolder: ["dist/"]
  },
  scss: {
    watchFiles: "app/scss/*.scss",
    source: ["app/scss/main.scss"],
    destMapFolder: ["dist/"]
  },
  build: {
    destBuildFolder: "dist",
    destMinCSSFileName: "bundle.min.css",
    destMinJSFileName: "bundle.min.js"
  }
};

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// delete all files in build
function clean() {
  return del([`${paths.build.destBuildFolder}/*`]);
}

function js() {
  const bundler = browserify({ entries: paths.js.source }, { debug: true }).transform(babel);
  return bundler.bundle()
    .on("error", handleError)
    .pipe(source(paths.build.destMinJSFileName))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write(paths.js.destMapFolder))
    .pipe(gulp.dest(paths.build.destBuildFolder));
}

/* HANDLE SCSS */
function scss() {
  return gulp
    .src(paths.scss.source)
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(rename("main.css"))
    .pipe(gulp.dest(paths.build.destBuildFolder));
}

/* HANDLE COPYING FILES */
function copyIndex() {
  return gulp
    .src(["app/index.html"])
    .pipe(gulp.dest(paths.build.destBuildFolder))
    .on("error", handleError);
}

// copy assets dir to build
function copyAssets() {
  return gulp
    .src(["app/assets/**/*"])
    .pipe(gulp.dest(`${paths.build.destBuildFolder}/assets/`))
    .on("error", handleError);
}

// copy html dir to build
function copyOtherPages() {
  return gulp
    .src(["app/info/*.html"])
    .pipe(gulp.dest(`${paths.build.destBuildFolder}/info/`))
    .on("error", handleError);
}

// copy translation data to build
function copyData() {
  return gulp
    .src(["app/data/*.json"])
    .pipe(gulp.dest(`${paths.build.destBuildFolder}/data/`))
    .on("error", handleError);
}

function copyAllFiles(cb) {
  copyIndex();
  copyAssets();
  copyOtherPages();
  copyData();
  if (cb && typeof cb === "function") cb();
}
/* END COPYING FILES */

/* WATCH FILES FOR CHANGES */
function watchFiles(cb) {
  gulp.watch(paths.js.watchFiles, gulp.series(js));
  gulp.watch(paths.scss.watchFiles, gulp.series(sass));

  if (cb && typeof cb === "function") {
    cb();
  }
}

/* LOCAL WEBSERVER WITH LIVE RELOAD */
function webserver() {
  return gulp.src(paths.build.destBuildFolder).pipe(
    server({
      host: server_config.host,
      port: server_config.port,
      livereload: true,
      directoryListing: false,
    })
  );
}

/* DEFAULT GULP TASK */
export default gulp.series(
  clean,
  watchFiles,
  gulp.parallel(scss, js),
  copyAllFiles,
  webserver
);
