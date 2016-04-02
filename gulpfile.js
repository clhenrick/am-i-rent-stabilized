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
    return gulp.src('app/js/app/*.js')
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

gulp.task('sass-build', function(){
  return gulp.src('app/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'));
})

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


// Concatenate & Minify vendor libraries
gulp.task('scripts', function() {
    return gulp.src([
            'app/js/vendor/*.js',
            'app/js/app/*.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('scripts-build', function() {
  return gulp.src([
    './app/js/vendor/*.js',
    './app/js/app/*.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(rename('bundle.min.js'))
  .pipe(gulp.dest('build/js'));
})

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

gulp.task('scripts-other-pgs-build', function() {
    return gulp.src([
        'app/js/vendor/other_pages/handlebars.runtime.min.js',
        'app/js/app/templates.js',
        'app/js/app/app.lang-toggle.js',
        'app/js/app/app.other-pages.js'
      ])
      .pipe(concat('otherpages.js'))
      .pipe(uglify())
      .pipe(rename('otherpages.min.js'))
      .pipe(gulp.dest('build/js'));
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
    gulp.watch('templates/*.hbs');
    gulp.watch('js/app/*.js', ['lint', 'scripts', 'scripts-other-pgs']);
    gulp.watch('scss/*.scss', ['sass']);
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
  return gulp.src(['app/html/*.html'])
    .pipe(gulp.dest('build/html/'))
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
gulp.task('default', ['lint', 'sass', 'webserver', 'templates', 'scripts', 'scripts-other-pgs', 'copy', 'watch']);

// Production
gulp.task('production', function(cb) {
  runSequence(
    'clean:build',
    'copy-index',
    'copy-assets',
    'copy-html',
    'copy-data',
    'templates',
    'sass-build',
    'scripts-build',
    'scripts-other-pgs-build',
    cb
  );
});
