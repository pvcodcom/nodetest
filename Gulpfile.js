var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

// Rutas archivos
var sass_src = 'src/sass/';
var css_src = 'src/css/';
var css_min_src = 'app/css/';
var js_src = 'src/js/';
var js_min_src = 'app/js/';

gulp.task('styles', function() {
    gulp.src(sass_src + '*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(gulp.dest(css_src))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(css_min_src));
});


gulp.task('jsmin', function () {
    gulp.src(js_src + '*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(js_min_src))
});

//Watch task
gulp.task('watch',function() {
    gulp.watch(sass_src + '*.scss',['styles']);
    gulp.watch(js_src + '*.js',['jsmin']);
});

gulp.task('default',['watch','jsmin','styles']);
