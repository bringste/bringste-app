'use strict';

module.exports = function(karma) {

  karma.set({

    basePath: '../../',

    frameworks: [ 'browserify', 'jasmine' ],

    files: [
      'assets/vendor/ionic/js/ionic.bundle.js',
      'test/spec/**/*Spec.js'
    ],

    reporters: [ 'dots' ],

    preprocessors: {
      'test/spec/**/*Spec.js': [ 'browserify' ]
    },

    browsers: [ 'PhantomJS' ],

    singleRun: false,
    autoWatch: true,

    // browserify configuration
    browserify: {
      debug: true,
      transform: [
        'brfs',
        [ 'exposify', {
          expose: {
            cordova: 'cordova',
            angular: 'angular',
            'status-bar': 'StatusBar'
          }
        } ]
      ]
    }
  });
};
