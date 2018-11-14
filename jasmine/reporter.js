const fs = require('fs-extra');
const path = require('path');
const shortenSpecFilePaths = require("./pathShortener").shortenSpecFilePaths;

/**
 * Creates an instance of Jasmin nested JSON Reporter.
 *
 * @param optionsParam: object containing following options:
 *  @reportDirPath string (optional): Path to the folder where 'report.json' file will be saved (default: 'testresults').
 *  @metadata object (optional): Arbitrary data to be supplied within the resulting report for further use by consumer. E.g. report title.
 *  @writeFn function (optional): Callback function used to write report having following signature (default: fs.outputJsonSync):
 *    @reportDirPath string: Path specified by @reportDirPath.
 *    @reportObject object: Object containing actual report.
 *    @writeOptions object: {spaces: 2}
 *  @shouldNotReportSpecPath boolean: If true prevents reporting the spec path, which requires extending the `describe()` function.
 *
 * @returns {{jasmineStarted(*): void, suiteStarted(*=): void, suiteDone(*): void, specStarted(*), specDone(*=): void, jasmineDone(*): void}}
 * @constructor
 */
function Reporter(optionsParam) {
  const options = optionsParam || {};
  const reportDirPath = options.reportDirPath || 'testresults';
  const metadata = options.metadata || {};
  const writeFn = options.writeFn || fs.outputJsonSync; // only sync version works !?
  const suites = { metadata: metadata, suites: [], specs: []};
  const suiteList = [];
  let currentSuite = suites;
  let currentSpecStarted = null;

  extendJasmineDescribe();

  return {
    jasmineStarted(info) {
      suites.info = info;
      suites.start = Date.now();
    },

    suiteStarted(suite) {
      suite.parentSuite = currentSuite;
      suite.suites = [];
      suite.specs = [];
      suite.start = Date.now();
      currentSuite.suites.push(suite);
      currentSuite = suite;
      suiteList.push(currentSuite);
    },

    suiteDone(suite) {
      currentSuite.end = Date.now();
      const oldCurrentSuite = currentSuite;
      currentSuite = currentSuite.parentSuite;
      delete oldCurrentSuite.parentSuite;
    },

    specStarted(spec) {
      currentSpecStarted = Date.now();
    },

    specDone(spec) {
      spec.start = currentSpecStarted;
      spec.end = Date.now();
      currentSuite.specs.push(spec);

      tryTakeScreenshotIfFailed(spec);
    },

    jasmineDone(result) {
      suites.result = result;
      suites.end = Date.now();

      shortenSpecFilePaths(suiteList);

      tryCopyHtmlReportFilesToDestinationFirst(reportDirPath);

      writeFn(path.join(reportDirPath, 'report.json'), suites, {spaces: 2});
    }
  };


  function extendJasmineDescribe() {
    if (global.__originalDescribe || options.shouldNotReportSpecPath || !jasmine)
      return;

    global.__originalDescribe = describe;
    global.__originalXDescribe = xdescribe;
    global.__originalFDescribe = fdescribe;

    describe = letJasmineProvideSpecPath(describe);
    xdescribe = letJasmineProvideSpecPath(xdescribe);
    fdescribe = letJasmineProvideSpecPath(fdescribe);
  }

  async function tryTakeScreenshotIfFailed(spec) {
    if (!spec.failedExpectations.length > 0 || !global.browser)
      return;

    try {
      global.browser.takeScreenshot().then(function (png) {
        fs.ensureDirSync(reportDirPath);
        const fileName = spec.fullName.replace(/[\/\\]/g, ' ').substring(0, 230) + '.png';
        const stream = fs.createWriteStream(path.join(reportDirPath, fileName));
        stream.write(new Buffer(png, 'base64'));
        stream.end();
      }, function (error) {
        console.log("Failed to take screenshot:", error);
      })
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Stores the path of the spec file to `__specFilePath` property of each suite object.
   * This could only be done by a hack, extracting the path from error stack trace.
   * @param describe
   * @returns {function(*=, *=): *}
   */
  function letJasmineProvideSpecPath(describe) {
    return (description, fn) => {
      const suite = describe(description, fn);

      // assumed that the second line in stack trace contains the path of the spec file:
      const firstSpecFilePath = /(?<=at .+:\d+:\d+\s+at .+\().+(?=:\d+:\d+\))/mi;
      const stackTrace = (new Error()).stack;
      const foundPaths = firstSpecFilePath.exec(stackTrace);

      if (foundPaths) {
        suite.result.__specFilePath = foundPaths[0];
      }

      return suite;
    }
  }

  function tryCopyHtmlReportFilesToDestinationFirst(reportDirPath) {
    // don't copy html files to public, because they are already there
    // don't copy html files during unit tests with mocked writeFn
    if (reportDirPath === 'public' || writeFn !== fs.outputJsonSync)
      return;

    fs.emptyDirSync(reportDirPath);
    fs.copySync(path.join(__dirname, '../dist'), reportDirPath);
  }
}


module.exports = Reporter;
