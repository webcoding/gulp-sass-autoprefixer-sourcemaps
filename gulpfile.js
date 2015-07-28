'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps  = require('gulp-sourcemaps');
var prefix      = require('gulp-autoprefixer');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();
var scsslint = require('gulp-scss-lint');
var cache    = require('gulp-cached');

gulp.task('default', ['serve'], function () {});

gulp.task('serve', ['sass', 'browser-sync'], function () {
  gulp.watch('./scss/**/*.scss', ['scss-lint', 'sass']);
  gulp.watch('**/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
  sass('scss/style.scss', { sourcemap: true, style: 'compact' })
    .pipe(prefix('last 5 Chrome versions',
                 'last 5 Firefox versions',
                 'last 2 Safari versions',
                 'ie >= 11',
                 'iOS >= 7',
                 'Android >= 4.3'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }))
  ;
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('scss-lint', function() {
  gulp.src('./scss/**/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint());
});
