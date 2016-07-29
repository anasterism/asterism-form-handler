var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// process javascript

gulp.task('lint', function() {
    return gulp.src(['./src/form.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('brains', ['lint'], function() {
    return gulp.src(['./src/form.js'])
        .pipe(uglify())
        .pipe(rename('form.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
    gulp.watch('./src/form.js', ['brains']);
});
