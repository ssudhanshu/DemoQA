const gulp = require('gulp');
const del = require('del');
const config = require('./config');

gulp.task('clean:dist', (done) => del([config.PATHS.jsDistFiles], done));

gulp.task('clean:testReports', (done) => del([config.PATHS.testReports], done));

gulp.task('clean', ['clean:dist', 'clean:testReports']);