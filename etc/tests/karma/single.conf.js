//include common configuration
var sharedConfig = require('./shared.conf.js');

module.exports = function(config) {
  //load common configuration settings
  sharedConfig(config);

  config.({
    //load only one test file 
    files: [
      'dmwa/public/javascript/tests/**/*.js'
    ],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    //browsers: ['PhantomJS'],
    // - IE (only Windows)
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
