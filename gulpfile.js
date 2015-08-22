var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var react = require('gulp-react');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

gulp.task('js', function () {
  gulp.src('*.jsx')
  .pipe(react())
  .pipe(concat('react-nvd3.js'))
  .pipe(gulp.dest('dist'))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js' }))
  .pipe(gulp.dest('dist'));
});

gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.jsx", ['js-watch']);
});

// gulp.task('examples', function () {
//   browserify({
//     entries: 'examples/index.jsx',
//     extensions: ['.jsx']
//   })
//   .transform(babelify)
//   .bundle()
//   .pipe(source('examples/index.js'))
//   .pipe(gulp.dest('./'));
// });

gulp.task('default', ['js']);