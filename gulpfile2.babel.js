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

function scss() {
  return gulp.src(paths.scss.source)
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.build.destBuildFolder));
}


function watchFiles(cb) {
  gulp.watch(paths.js.watchFiles, gulp.series(js));
  gulp.watch(paths.scss.watchFiles, gulp.series(sass));

  if (cb && typeof cb === "function") {
    cb();
  }
}

export default gulp.series(clean, watchFiles, gulp.parallel(scss, js));
