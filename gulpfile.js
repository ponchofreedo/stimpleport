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
// const atImport = require('postcss-import');
const presetEnv = require('postcss-preset-env');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// to switch between src and public
let dev;

gulp.task('gzip', function() {
});

gulp.task('styles', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe($.if(dev, $.sourcemaps.init(), $.sourcemaps.write()))
    .pipe($.plumber())
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe($.cssnano({
      preset: ['default', {
        discardUnused: true
      }]
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
  return gulp.src('src/**/*.html')
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {compress: { drop_console: true }},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('public'))
    .pipe($.size({ title : 'html' }));
});

gulp.task('images', function (cb) {
  return gulp.src('src/img/**/*.{png,jpg,svg,jpeg,gif,ico}')
    .pipe($.if(!dev, $.imagemin()))
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest('public/img'));
});

gulp.task('fonts', function (cb) {
  return gulp.src('src/fonts/**/*.{ttf,woff,woff2,otf}')
    .pipe($.if(!dev, $.size({ title : 'copy fonts' })))
    .pipe(gulp.dest('public/fonts'));
})

gulp.task('scripts', () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe(gulp.dest('public/scripts'))
    .pipe(reload({stream: true}));
});

// spin a server
gulp.task('serve', () => {
  runSequence(['html', 'styles', 'scripts', 'images', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: ['src', 'public']
    });

    gulp.watch('src/*.html' ['html']).on('change', reload);
    gulp.watch('src/sass/**/*.scss', ['styles']).on('change', reload);
    gulp.watch('src/scripts/**/*.js', ['scripts']).on('change', reload);
    gulp.watch('src/img/**/*.{png,jpg,svg,jpeg,gif,ico}', ['images']).on('change', reload);
  });
});

// just test to make sure the file is alive
gulp.task('default', () => {
  dev = false;
  runSequence('serve', 'html')
});

// put a bow on it
gulp.task('build', ['html', 'styles', 'images', 'scripts', 'fonts'], () => {
  return gulp.src('src/**/*')
    .pipe($.size({ title: 'build' }));
});

// ['build', 'watch']
