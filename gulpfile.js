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
const del = require('del');

const postcss = require('gulp-postcss');
const presetEnv = require('postcss-preset-env');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// to switch between src and public
let dev = true;

gulp.task('gzip', function() {
});

gulp.task('sass', () => {
  return gulp.src('src/css/*.scss')
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe($.cssnano({
      preset: 'default',
      safe: true
    }))
    .pipe(postcss([
      presetEnv({
        browsers: [
          'last 2 versions',
          'ie >= 8',
          'dead'
        ],
        autoprefixer: ({
          grid: true,
          flexbox: true
        })
      })
    ]))
    .pipe(gulp.dest('public/css'))
    .pipe($.size({ title : 'sass' }))
    .pipe(reload({stream: true}));
});

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {compress: {drop_console: true}},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('public'))
    .pipe($.size({ title : 'html' }))
});

gulp.task('images', function (cb) {
  return gulp.src('src/img/**/*.{png,jpg,svg,jpeg,gif,ico}')
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest('public/img'));
});

gulp.task('test', () => {
});

gulp.task('scripts', () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe(gulp.dest('public/scripts'))
    .pipe(reload({stream: true}));
});

// spin a server
gulp.task('serve', () => {
  runSequence(['sass', 'scripts', 'images'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: ['src', 'public']
    });

    gulp.watch([
      'src/*.html',
      'src/img/**/*'
    ]).on('change', reload);

    gulp.watch('src/css/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/css/img/**/*.{png,jpg,svg,jpeg,gif,ico}', ['images']);
  });
});

// just test to make sure the file is alive
gulp.task('default', () => {
  dev = false;
  runSequence('serve', 'html')
});

// put a bow on it
gulp.task('build', ['html', 'sass', 'images', 'scripts'], () => {
  return gulp.src('src/**/*')
    .pipe($.size({ title: 'build' }));
});

// ['build', 'watch']
