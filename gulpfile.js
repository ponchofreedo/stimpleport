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
const cssnano = require('cssnano');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// to switch between src and public
let dev = true;

gulp.task('gzip', function() {
});

gulp.task('sass', function () {
  return gulp.src('src/css/*.scss')
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.size({ title : 'sass' }))
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({stream: true}));
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
    .pipe($.size({ title : 'html' }))
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

gulp.task('scripts', () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('extras', () => {
  return gulp.src([
    'src/*',
    '!src/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('public'));
});

// spin a server
gulp.task('serve', function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: ['.tmp', 'src']
  });

  gulp.watch([
    'src/*.html',
    'src/img/**/*',
  ]).on('change', reload);

  gulp.watch('src/css/**/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
});

// just test to make sure the file is alive
gulp.task('default', function () {
  dev = false;
  runSequence('serve', 'html')
});

// put a bow on it
gulp.task('build', function () {
});

// ['build', 'watch']
