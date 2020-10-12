require('dotenv').config();

const path = require('path');
const downloadsPath = path.resolve(__dirname, './e2e/downloads');
exports.config = {
    // where the e2e spec files are available and which files you want to cover the test cases
    
    //Login URL and DB Details
    params: {
        URL: {
            testURL:process.env.URL
        },
        randomNumData:{
            //Geenerating a random number of 3 digits to use in tests
            randomNum: Math.floor(100 + Math. random() * 900)
        }
    },

    specs: [
            './e2e/dist/tests/Elements/checkbox-spec.js',
            './e2e/dist/tests/Elements/webtables-spec.js',
            './e2e/dist/tests/Elements/uploadanddownload-spec.js',
            './e2e/dist/tests/AlertsFramesWindows/alerts-spec.js',
            './e2e/dist/tests/AlertsFramesWindows/browserwindows-spec.js',
            './e2e/dist/tests/Widgets/datepicker-spec.js',
            './e2e/dist/tests/Widgets/progressbar-spec.js'
        ],

    // suites: [],

    // Timeout Value for a Page to be loaded
    getPageTimeout: 20000,

    // Jasmine is the framework getting used to write the test cases
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 15000
    },
    directConnect: true,
    capabilities: {
        "browserName": 'chrome',
        'platform': 'ANY',
        'version': 'ANY',
        'chromeOptions': {
            args: ['--no-sandbox', '--test-type=browser'],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': downloadsPath
                }
            }
        }
    },

    onPrepare: function () {

        console.log("INSIDE ONPREPARE");
        browser.ignoreSynchronization = true;

        //Implicitly wait
        browser.driver.manage().timeouts().implicitlyWait(20000);

        // Logs
        // Log Time format
        var DisplayProcessor = require('jasmine-spec-reporter').DisplayProcessor;
        function TimeProcessor(configuration) {
        }
        function getTime() {
                var now = new Date();
                return  '['+now.getFullYear() + '-' +
                now.getMonth(+1) + '-' +
                now.getDate()+ ' ' +
                now.getHours() + ':' +
                    now.getMinutes() + ':' +
                    now.getSeconds() + '.' +
                    now.getMilliseconds() + ']';
        }
         TimeProcessor.prototype = new DisplayProcessor();
         TimeProcessor.prototype.displayJasmineStarted = function (suite, log) {
            return getTime() + ' - ' + log;
          };
         TimeProcessor.prototype.displaySuite = function (suite, log) {
            return getTime() + ' - ' + log;
          };

          TimeProcessor.prototype.displaySpecStarted = function (spec, log) {
            return getTime() + ' - ' + log;
          };

          TimeProcessor.prototype.displaySuccessfulSpec = function (spec, log) {
            return getTime() + ' - ' + log;
          };

          TimeProcessor.prototype.displayPendingSpec = function (spec, log) {
            return getTime() + ' - ' + log;
          };
        //Console log
        var JasmineSpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(
            new JasmineSpecReporter({
                displayStacktrace: true,      // display stacktrace for each failed assertion, values: (all|specs|summary|none)
                displaySuccessesSummary: true, // display summary of all successes after execution
                displayFailuresSummary: true,   // display summary of all failures after execution
                displayPendingSummary: true,    // display summary of all pending specs after execution
                displaySuccessfulSpec: true,    // display each successful spec
                displayFailedSpec: true,        // display each failed spec
                displayPendingSpec: false,      // display each pending spec
                displaySpecDuration: false,     // display each spec duration
                displaySuiteNumber: false,      // display each suite number (hierarchical)
                colors: {
                    success: 'green',
                    failure: 'red',
                    pending: 'yellow'
                },
                prefixes: {
                    success: '✓ ',
                    failure: '✗ ',
                    pending: '* '
                },
                customProcessors: [TimeProcessor]
            })
        );

        // Setting the timestamp of the report directory
        var today, timeStamp;
        today = new Date();
        timeStamp = today.getMonth() + 1; //Currently getMonth() function is returning month - 1, that's why added +1.
        timeStamp = today.getDate() + '_' + timeStamp + '_' + today.getFullYear() + '_' + today.getHours() + 'h_' + today.getMinutes() + 'm';

        // Generate test reports
        browser.outputDir = "e2e/reports/";
        browser.outputDirDTTM = browser.outputDir + "" + timeStamp + "/";

        var protractorBeautifulReporter = require('protractor-beautiful-reporter');
        jasmine.getEnv().addReporter(new protractorBeautifulReporter({
            baseDirectory: browser.outputDir,
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            takeScreenShotsOnlyForFailedSpecs: true,
            preserveDirectory: false,
            docName: 'results.html',
            docTitle: 'DEMO QA UI TEST AUTOMATION REPORT',
            gatherBrowserLogs: false
        }).getJasmine2Reporter());


        // Export xml results
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: browser.outputDir,
            filePrefix: 'e2eTestResultsXML'
        }));

        // Capture JSON output results
        var JSONReporter = require('jasmine-json-test-reporter');
        jasmine.getEnv().addReporter(new JSONReporter({
            file: 'jasmine-test-results.json',
            beautify: true,
            indentationLevel: 4 // used if beautify === true
        }));

        // Capture jasmine2-html report
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
          savePath: './test/reports/',
          inlineImages: false,
          takeScreenshotsOnlyOnFailures: true,
          fileName: 'MyReportName'
        })
      );

        //Export Screenshot for html summarize report
        var fs = require('fs-extra');

        fs.emptyDir(browser.outputDirDTTM + '/screenshots/', function (err) {
            console.log(err);
        });

        jasmine.getEnv().addReporter({
            specDone: function (result) {
                if (result.status == 'failed') {
                    browser.getCapabilities().then(function (caps) {
                        var browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function (png) {
                            var stream = fs.createWriteStream(browser.outputDirDTTM + '/screenshots/' + browserName + '-' + result.fullName + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });
    },

    onComplete: function () {
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            var HTMLReport = require('protractor-html-reporter');

            testConfig = {
                reportTitle: 'DEMO QA UI Test Execution Report',
                outputPath: browser.outputDirDTTM,
                testBrowser: caps.get('browserName'),
                screenshotsOnlyOnFailure: true
            };
            new HTMLReport().from(browser.outputDir + 'e2eTestResultsXML.xml', testConfig);
            new HTMLReport().from(browser.outputDir + 'e2eTestResultsXML.xml', {
                reportTitle: 'DEMO QA UI Test Execution Report',
                testBrowser: caps.get('browserName'),
                outputPath: 'e2e/reports/',
                screenshotsOnlyOnFailure: true
            });
        });
    },

};
