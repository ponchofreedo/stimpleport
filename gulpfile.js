// gonna try to do this without the loader this time
//var $ = require('gulp-load-plugins')();

var gulp = require('gulp');

gulp.task('scripts', function () {
});

gulp.task('gzip', function() {
});

gulp.task('html', function () {
});

gulp.task('styles', function (cb) {
    return gulp.src(
        './*.sass',
        './*.scss'
    )
});

gulp.task('images', function (cb) {
});

gulp.task('fonts', function () {
});

gulp.task('test', function () {
});

gulp.task('watch', function () {
});

// just test to make sure the file is alive
gulp.task('default', function () {
});

// spin a server
gulp.task('serve', function () {
});

// put a bow on it
gulp.task('build', function () {
});

// ['build', 'watch']
