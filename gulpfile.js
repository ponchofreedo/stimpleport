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
// let dev = true;

gulp.task('scripts', function () {
});

gulp.task('gzip', function() {
});

gulp.task('postcss', function (cb) {
  return gulp.src('src/**/*.css')
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe(postcss([
      partials({
        'skipDuplicates': true
      }),
      apply({
        preserve: false
      }),
      nestedProps(),
      presetEnv({
        browsers: [
          'last 2 versions',
          'ie >= 8',
          'dead'
        ],
        stage: 3,
        features: {
          'custom-properties': {
            preserve: false,
            warnings: true
          },
          'nesting-rules': true
        },
        autoprefixer: ({
          grid: true
        })
      }),
      calc({
        warnWhenCannotResolve: true
      }),
      cssnano({
        autoprefixer: false,
        preset: 'default',
        safe: true
      })
    ]))
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size({ title : 'css' }))
    .pipe(reload({stream: true}));
});

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('public/'))
    .pipe($.size({ title : 'html' }));
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
  runSequence('postcss')
});

// spin a server
gulp.task('serve', function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['public']
    }
  });
});

// put a bow on it
gulp.task('build', function () {
});

// ['build', 'watch']
