// stimpleport gulpfile
//
// by @ponchofreedo
//
//
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const wiredep = require('wiredep').stream;

const postcss = require('gulp-postcss');
const advancedVars = require('postcss-advanced-variables');
const apply = require('postcss-apply');
const calc = require('postcss-calc');
const partials = require('postcss-import');
const cssnano = require('cssnano');
const nestedProps = require('postcss-nested-props');
const presetEnv = require('postcss-preset-env');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// to switch between src and public
let dev = true;

gulp.task('scripts', function () {
});

gulp.task('gzip', function() {
});

gulp.task('sass', () => {
  return gulp.src('src/**/*.scss')
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.size({ title : 'sass' }))
    .pipe(gulp.dest('.tmp/'))
    .pipe(reload({stream: true}));
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
    .pipe($.size({ title : 'html' }))
    .pipe(reload({ stream: true }));
});

gulp.task('images', function (cb) {
});

gulp.task('fonts', function () {
});

gulp.task('test', function () {
});

gulp.task('clean', function () {
});

gulp.task('watch', function () {
});

// spin a server
gulp.task('serve', function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: ['.tmp', 'src']
  });

  gulp.watch([
    'src/**/*.html',
    'src/img/**/*',
  ]).on('change', reload);

  gulp.watch('src/**/*.scss', ['sass']);
});

// just test to make sure the file is alive
gulp.task('default', function () {
  runSequence('serve', 'html')
});

// put a bow on it
gulp.task('build', function () {
});

// ['build', 'watch']
