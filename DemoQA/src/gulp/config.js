const path = require('path');

module.exports.pkg = require(path.join(__dirname, '../package.json'));

// note: for all paths, the base dir is ../
module.exports.PATHS = {
    jsDistFiles: 'dist/**/*.js',
    testReports: 'reports/',
    srcFiles: './e2e/**/*.ts',
    destFiles: 'dist/e2e/'

};
