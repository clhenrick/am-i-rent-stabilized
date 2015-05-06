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
    declare = require('gulp-declare');

// config settings for local server
var server_config = {
    host : 'localhost',
    port : '8000'
}

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/app/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')        
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))        
        .pipe(gulp.dest('css'))
        .pipe(rename('main.css'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'));
});

// precompile handlebars templates
gulp.task('templates', function () {
    gulp.src('templates/*.hbs')
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
          namespace: 'app.templates',
          noRedeclare: true, // Avoid duplicate declarations
      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('js/dist'));
});

// Concatenate & Minify vendor libraries
gulp.task('scripts', function() {
    return gulp.src([  
            'js/vendor/*.js',
            'js/dist/templates.js',
            'js/app/*.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('js/dist'))
        .pipe(uglify())        
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('js/dist'));
});

// Concatenate & Minify app
// gulp.task('app', function() {
//     return gulp.src('js/app/*.js')
//         .pipe(concat('app.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(uglify())        
//         .pipe(rename('app.min.js'))
//         .pipe(gulp.dest('dist'));
// });

// run local server
gulp.task('webserver', function() {
  gulp.src('.')
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
    gulp.watch('js/app/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'webserver', 'templates', 'scripts', 'watch']);