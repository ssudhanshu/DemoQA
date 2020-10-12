require('require-dir')('./gulp');
const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const runSequence = require('run-sequence');
const del = require('del');
const shell = require('shelljs');
const gutil = require('gulp-util');

gulp.task('clean:nodemodules', (done) => del(['./node_modules'], done));

gulp.task('build', (done) => {
    runSequence(
        'clean',
        'e2e',
        done)
});

gulp.task('default', ['build']);
