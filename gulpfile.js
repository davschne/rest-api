var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack', function() {
  return gulp.src('src/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack', 'copy']);
gulp.task('default', ['build']);

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['default']);
});
