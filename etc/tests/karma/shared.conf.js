
module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    // DMWA_HOME
    basePath: '../../..',

    // frameworks to use
    frameworks: ['qunit'],

    // list of files / patterns to load in the browser
    // The order of patterns determines the order in which files are included in the browser
    files: [

      //css
      {pattern: 'dmwa/public/stylesheets/**/*.css', included: false},

      //external dependencies: must be explicitly added in the right order
      //jquery first, underscore, backbone and bootstrap
      'dmwa/public/javascript/3p/jquery.js',
      'dmwa/public/javascript/3p/underscore.js',
      'dmwa/public/javascript/3p/backbone.js',
      'dmwa/public/javascript/3p/backbone.localStorage.js',
      'dmwa/public/javascript/3p/bootstrap.js',
      'dmwa/public/javascript/3p/spin.min.js',

      // goog closure lib base
      'dmwa/public/javascript/3p/goog/base.js',
      // note: this must be right after base.js
      {pattern: 'dmwa/public/javascript/3p/goog/**/*.js', included: false},

      // source files - served and linked through dmwa.js, but not executed
      // unless they're needed in a test via a call to goog.require
      // includes all tests
      {pattern: 'dmwa/public/javascript/dmwa/**/*.js', included: false},
      {pattern: 'dmwa/public/javascript/target/**/*.js', included: false},

      // load dependency tree file, tests, and helpers
      'dmwa/public/javascript/built/dmwa_deps.js',

      // all json files
      //TODO: remove json files
      //{pattern: 'dmwa/public/javascript/**/*.json', included: false},
      // need to explicitly add goog.require compiled templates, as nothing else will require them.
      'etc/tests/karma/require_goog_load.js',

      //test sources included in the specific conf files
      {pattern: 'dmwa/public/javascript/tests/**/*.js'}
    ],


    preprocessors: {
      //'*.html': ['html2js']
    },

    // proxies - needed because the goog namespaces provided don't
    //  completely match the organization of the file system
    proxies : {
      '/goog' : 'http://localhost:9876/base/dmwa/public/javascript/3p/goog',
      '/deps.js' : 'http://localhost:9876/base/dmwa/public/javascript/3p/goog/deps.js',

      '/dmwa' : 'http://localhost:9876/base/dmwa/public/javascript/dmwa',
      '/target' :  'http://localhost:9876/base/dmwa/public/javascript/target'
    },

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
