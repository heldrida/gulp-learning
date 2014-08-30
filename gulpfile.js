/**
 * gulp
 * $ npm install gulp gulp-livereload gulp-watch gulp-sass gulp-uglify gulp-minify-css gulp-htmlmin gulp-rename gulp-concat gulp-plumber --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber');

// Sass
gulp.task('sass', function () {
    return gulp.src('sass/*.scss')
           .pipe(plumber())
           .pipe(sass())
           .pipe(gulp.dest('css'))
           .pipe(rename({ suffix: '.min' }))
           .pipe(minifycss())
           .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('js/**/*.js')
           .pipe(concat('main.js'))
           .pipe(uglify())
           .pipe(rename({ suffix: '.min' }))
           .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function () {
    return gulp.src('index.html')
           .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
           .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', function () {

    // Watch `html`
    gulp.watch('index.html', ['html']);

    // Watch `scripts`
    gulp.watch('js/**/*.js', ['scripts']);

    // Watch `scss` files
    gulp.watch('sass/*.scss', ['sass']);
    
    // Watch any files in `dist`, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

    // Create liveReload server
    // Remember to add to index.html hostname:port/livereload.js (if prefered method)
    livereload.listen();

});