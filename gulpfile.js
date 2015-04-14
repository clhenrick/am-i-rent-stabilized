// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var server = require('gulp-webserver');
var plumber = require('gulp-plumber');
// var browserify = require('browserify');
var transform = require('vinyl-transform');

// config settings for local server
var server_config = {
    host : 'localhost',
    port : '8000'
}

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')        
        .pipe(plumber())
        .pipe(sass())        
        .pipe(gulp.dest('css'))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([ 'js/vendor/*.js', 'js/*.js' ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// gulp.task('browserify', function () {
//   var browserified = transform(function(filename) {
//     var b = browserify(filename, {
//       debug: true,
//       extensions : ['.js']
//     });
//     return b.bundle();
//   });
  
//   return gulp.src([ './js/*.js' ])
//     .pipe(browserified)
//     .pipe(rename('all.js'))
//     .pipe(gulp.dest('./dist'))        
//     .pipe(uglify())
//     .pipe(rename('all.min.js'))
//     .pipe(gulp.dest('./dist'));
// });

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
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'webserver', 'scripts', 'watch']);