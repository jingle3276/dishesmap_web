//include common configuration
var sharedConfig = require('./shared.conf.js');

module.exports = function(config) {
  //load common configuration settings
  sharedConfig(config);

  config.set({
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  });
};
