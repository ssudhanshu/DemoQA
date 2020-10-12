var gulp = require('gulp');
var path = require('path');
const config = require('./config');
const e2eConfig = {
  appDir: 'e2e',
  testDest: 'e2e/dist'
};


gulp.task('build-e2e', () => {
  var typescript = require('gulp-typescript');
var tsProject = typescript.createProject('./e2e/tsconfig.json');
var src = [
  path.join(e2eConfig.appDir, '/**/*.ts')
];
var result = gulp.src(src).pipe(tsProject());

return result.js.pipe(gulp.dest(e2eConfig.testDest));
});

// delete _only_ tests generated on e2e.
// If we delete everything (using Ionic's `clean` task we'll wipe the newly built app we're testing against)
gulp.task('clean-e2e', () => {

  var del = require('del');

return del(['e2e/**/*', '!e2e/tsconfig.json']).then((paths) => {
  console.log('Deleted', paths && paths.join(', ') || '-');
});
});

gulp.task('copy:e2e', () => {
    gulp.src(config.PATHS.srcFiles)
        .pipe(gulp.dest(config.PATHS.destFiles))
});

gulp.task('e2e', ['copy:e2e']);
