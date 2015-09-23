'use strict';

var gulp = require('gulp');


var rubySass = require('gulp-ruby-sass');

var $ = require('gulp-load-plugins')();
var sass = require('gulp-sass');


var sourcemaps  = require('gulp-sourcemaps');
var prefix      = require('gulp-autoprefixer');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();
var scsslint = require('gulp-scss-lint');
var cache    = require('gulp-cached');
var del = require('del');

gulp.task('default', ['serve'], function () {});

gulp.task('serve', ['clean', 'sass', 'browser-sync'], function () {
  gulp.watch('./scss/**/*.scss', ['scss-lint', 'sass']);
  gulp.watch('**/*.html').on('change', browserSync.reload);
});

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 2.3',
  'bb >= 10'
];


// 此处调整新增使用 gulp-sass 以及 gulp-load-plugins 来动态加载引用
// 本质上，gulp-sass还是引用 node-sass 依赖 sass，这里直接用 ruby-sass就成了，
gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    //rubySass的 autoprefixer 不能用下面这种参数
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCss())
    .pipe($.sourcemaps.write())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }))
  ;
});


// 下面方法用得 gulp-ruby-sass
gulp.task('rubySass', function () {
  // TODO: Pass in/load prefix config

    rubySass('scss/style.scss', { sourcemap: true, style: 'compact' })
    .pipe(prefix('last 5 Chrome versions',
                 'last 5 Firefox versions',
                 'last 2 Safari versions',
                 'ie >= 11',
                 'iOS >= 7',
                 'Android >= 4.3'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCss())
    .pipe($.sourcemaps.write())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }))
  ;
});

// 洗刷刷
gulp.task('clean', function(cb) {
  del(['dist/*'], cb);
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
