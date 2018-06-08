// gonna try to do this without the loader this time
//var $ = require('gulp-load-plugins')();

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

const advancedVars = require('postcss-advanced-variables');
const apply = require('postcss-apply');
const calc = require('postcss-calc');
const cssimport = require('postcss-import');
const cssnano = require('cssnano');
const customProps = require('postcss-custom-properties');
const nesting = require('postcss-nesting');
const nestedProps = require('postcss-nested-props');
const presetEnv = require('postcss-preset-env');


gulp.task('scripts', function () {
});

gulp.task('gzip', function() {
});

gulp.task('html', function () {
});

gulp.task('styles', function (cb) {

  return gulp.src('src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      cssimport(),
      customProps({
        preserve: false,
        warnings: true
      }),
      apply(),
      calc(),
      nesting(),
      nestedProps(),
      cssnano({
        preset: 'default'
      }),
      presetEnv({
        browsers: [
          'last 2 versions',
          'ie >= 8',
          'dead'
        ],
        stage: 3,
        autoprefixer: ({
          grid: true
        })
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/'));
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

// just test to make sure the file is alive
gulp.task('default', function () {
  runSequence('styles')
});

// spin a server
gulp.task('serve', function () {
});

// put a bow on it
gulp.task('build', function () {
});

// ['build', 'watch']
