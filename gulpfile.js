var gulp = require('gulp');
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    server = require('gulp-webserver'),
    plumber = require('gulp-plumber'),
    transform = require('vinyl-transform'),
    minifyCSS = require('gulp-minify-css'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    del = require('del'),
    runSequence = require('run-sequence');

// config settings for local server
var server_config = {
    host : 'localhost',
    port : '8000'
}

// error handler to prevent watch from breaking upon error
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['app/js/app/*.js', '!app/js/app/templates.js'])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('app/css'));
});

// precompile handlebars templates
gulp.task('templates', function () {
    gulp.src('app/templates/*.hbs')
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
          namespace: 'app.templates',
          noRedeclare: true, // Avoid duplicate declarations
      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('app/js/app'));
});


// Concatenate & Minify app js & vendor js libraries
gulp.task('scripts', function() {
    return gulp.src([
            'app/js/vendor/*.js',
            'app/js/app/*.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app/js/'));
});

// concat & minify scripts for pages other than index.html
gulp.task('scripts-other-pgs', function() {
    return gulp.src([
        'app/js/vendor/other_pages/handlebars.runtime.min.js',
        'app/js/app/templates.js',
        'app/js/app/app.lang-toggle.js',
        'app/js/app/app.other-pages.js'
      ])
      .pipe(concat('otherpages.js'))
      .pipe(gulp.dest('app/js'));
});

// for production use minified js & css files.
gulp.task('useref-index', function(){
  return gulp.src(['app/*.html'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('build'))
});

gulp.task('useref-html', function(){
  return gulp.src(['app/info/*.html'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('build/info'))
});

// run local server
gulp.task('webserver', function() {
  gulp.src('app/')
    .pipe(server({
      host : server_config.host,
      port : server_config.port,
      livereload: true,
      directoryListing: false,
    }));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/templates/*.hbs');
    gulp.watch('app/js/app/*.js', ['lint', 'scripts', 'scripts-other-pgs']);
    gulp.watch('app/scss/*.scss', ['sass']);
});

// copy index.html to build
gulp.task('copy-index', function() {
  return gulp.src(['app/index.html'])
      .pipe(gulp.dest('build/'))
      .on('error', handleError);
});

// copy assets dir to build
gulp.task('copy-assets', function(){
  return gulp.src(['app/assets/**/*'])
    .pipe(gulp.dest('build/assets/'))
    .on('error', handleError);
});

// copy html dir to build
gulp.task('copy-html', function() {
  return gulp.src(['app/info/*.html'])
    .pipe(gulp.dest('build/info/'))
    .on('error', handleError);
});

// copy translation data to build
gulp.task('copy-data', function() {
  return gulp.src(['app/data/*.json'])
    .pipe(gulp.dest('build/data/'))
    .on('error', handleError);
});

// delete all files in build
gulp.task('clean:build', function() {
  return del.sync(['build/*']);
});

// Default Task
gulp.task('default',
  [ 'lint',
    'sass',
    'webserver',
    'templates',
    'scripts',
    'scripts-other-pgs',
    'watch'
  ]
);

// Production
gulp.task('production', function(cb) {
  runSequence(
    'clean:build',
    'copy-index',
    'copy-assets',
    'copy-html',
    'copy-data',
    'templates',
    'useref-index',
    'useref-html',
    cb
  );
});
