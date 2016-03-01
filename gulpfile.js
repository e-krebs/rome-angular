var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var karma = require("karma");

gulp.task('build', function () {
  gulp.src(['src/**/module.js', 'src/**/*.js'])
    .pipe(concat('rome-angular.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init( { loadMaps: true } ))
        .pipe(uglify())
        .pipe(rename( { extname: '.min.js'}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('dist/'));
});

gulp.task('test', function(done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('watch', ['test', 'build'], function () {
  gulp.watch('src/**/*.js', ['test', 'build']);
  gulp.watch('test/**/*.js', ['test']);
});

gulp.task('default', ['test', 'build']);
