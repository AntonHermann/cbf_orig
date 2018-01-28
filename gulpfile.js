var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var render = require('gulp-nunjucks-render');

gulp.task('html', function() {
    return gulp.src('app/html/**/*.+(html|nj)')
        .pipe(render({ path: ['app/templates'] }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        // .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('songs', function() {
    return gulp.src('app/songs/**/*')
        .pipe(gulp.dest('dist/songs'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
        },
    });
});

gulp.task('watch',
    gulp.series('html', 'css', 'js', 'images', 'songs',
    gulp.parallel('browserSync', function() {

    gulp.watch('app/html/**/*.html', gulp.series('html'));
    gulp.watch('app/templates/**/*.nj', gulp.series('html'));
    gulp.watch('app/js/**/*.js', gulp.series('js'));
    gulp.watch('app/scss/**/*.scss', gulp.series('css'));
})));

gulp.task('default', gulp.series('watch'));
