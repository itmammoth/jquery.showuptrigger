var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browser = require('browser-sync');

gulp.task('default', ['server'], function() {
  gulp.watch(['js/**/*.js', '!js/min/**/*.js'], ['js']);
  gulp.watch(['*.html'], browser.reload);
});

gulp.task('js', function() {
  gulp.src(['js/**/*.js', '!js/min/**/*.js'])
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('./js/min'))
      .pipe(browser.reload({ stream: true }));
});

gulp.task('server', function() {
  browser({
    server: {
      baseDir: './',
      index: 'test.html'
    }
  });
});

gulp.task('build', ['js'], function() {});
