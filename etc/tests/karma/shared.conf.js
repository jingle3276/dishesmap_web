
module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../../..',

    // frameworks to use
    frameworks: ['qunit'],

    // list of files / patterns to load in the browser
    files: [
      //css
      {pattern: 'dmwa/public/stylesheets/**/*.css', included: false},

      // external dependencies: must be explicitly added in the right order
      'dmwa/public/javascript/3p/jquery.js',
      'dmwa/public/javascript/3p/underscore.js',
      'dmwa/public/javascript/3p/backbone.js',
      'dmwa/public/javascript/3p/bootstrap.js',

      // closures base
      'dmwa/public/javascript/3p/goog/base.js',
      // note: this must be right after base.js
      {pattern: 'dmwa/public/javascript/3p/goog/**/*.js', included: false},


      // built dependency tree for web-dmwament, tests, and helpers
      'dmwa/public/javascript/built/dmwa_deps.js',

      // source files - served and linked through dmwa.js, but not executed
      // unless they're needed in a test via a call to goog.require
      // includes all tests
      {pattern: 'dmwa/public/javascript/**/*.js', included: false},

      {pattern: 'dmwa/public/javascript/**/*.json', included: false},

      // fixtures data

      // need to explicitly goog.require compiled templates, as nothing else will require them.
      'etc/tests/karma/require_goog_load.js'

      // script to goog.require (and in doing so start) all the tests
      // also controls which apps tests are run in the test suite
      //'dmwa/tests/javascript/start_tests.js'
    ],


    preprocessors: {
      '*.html': ['html2js']
    },

    // proxies - needed because the goog namespaces provided don't
    //  completely match the organization of the file system
    //proxies : {
    //  '/goog' : 'http://localhost:9876/base/dmwa/public/javascript/3p/goog'
      //'/deps.js' : 'http://localhost:9876/base/assess/public/javascript/3p/goog/deps.js',
    //},

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    // for default purpose
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable colors in the output by default (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000

  });
};
