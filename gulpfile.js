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

gulp.task('sass', () => {
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

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
    .pipe($.size({ title : 'html' }))
});

gulp.task('images', function (cb) {
  return gulp.src('src/img/**/*.{png,jpg,svg,jpeg,gif,ico}')
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest('.tmp/img'));
});

gulp.task('test', () => {
});

gulp.task('clean', () => {
});

gulp.task('watch', () => {
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
gulp.task('serve', () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: ['.tmp', 'src']
  });

  gulp.watch([
    'src/*.html',
  ]).on('change', reload);

  gulp.watch('src/css/**/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/css/img/**/*.{png,jpg,svg,jpeg,gif,ico}', ['images']);
});

// just test to make sure the file is alive
gulp.task('default', () => {
  dev = false;
  runSequence('serve', 'html')
});

// put a bow on it
gulp.task('build', () => {
});

// ['build', 'watch']
