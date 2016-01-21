var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpack = require('gulp-webpack');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('js', function () {
  gulp.src('index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(concat('react-nvd3.js'))
  .pipe(gulp.dest('dist'))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js' }))
  .pipe(gulp.dest('dist'));
});

gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {
  browserSync.init({
    server: {
      baseDir: './',
    },
    open: false
  });
  gulp.watch(['./src/*', './examples/**/*.js'], ['js-watch']);
});

gulp.task('default', ['js']);