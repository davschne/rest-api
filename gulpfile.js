var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack:build', function() {
  return gulp.src('src/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', function() {
  return gulp.src('src/**/*(*.html|*.css)')
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack:build', 'copy']);
gulp.task('default', ['build']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});
