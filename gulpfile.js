var gulp = require('gulp');
var webpack = require('gulp-webpack');
var KarmaServer = require('karma').Server;

gulp.task('webpack:build', function() {
  return gulp.src('src/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client_test/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client_test/'));
});

gulp.task('copy', function() {
  return gulp.src('src/**/*(*.html|*.css)')
    .pipe(gulp.dest('build/'));
});

gulp.task('karma', ['webpack:test'], function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build', ['webpack:build', 'copy']);

gulp.task('default', ['karma', 'build']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});
