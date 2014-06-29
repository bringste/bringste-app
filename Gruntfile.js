'use strict';

module.exports = function (grunt) {

  /* global process */

  // configures browsers to run test against
  // any of [ 'PhantomJS', 'Chrome', 'Firefox', 'IE']
  var TEST_BROWSERS = ((process.env.TEST_BROWSERS || '').replace(/^\s+|\s+$/, '') || 'PhantomJS').split(/\s*,\s*/g);


  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      sources: 'app',
      dist: 'www',
      assets: 'assets',
      tests: 'test',
      vendor: 'assets/vendor'
    },

    sass: {
      app: {
        files: {
          '<%= config.dist %>/css/bringste.css': '<%= config.assets %>/scss/bringste.scss'
        }
      }
    },

    jshint: {
      src: [
        ['<%= config.sources %>']
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        jshintrc: true
      }
    },

    karma: {
      options: {
        configFile: '<%= config.tests %>/config/karma.unit.js',
        browsers: TEST_BROWSERS
      },
      single: {
        singleRun: true,
        autoWatch: false,
      },
      unit: {}
    },

    browserify: {
      options: {
        transform: [
          [ 'brfs' ],
          [ 'exposify', {
            expose: {
              cordova: 'cordova',
              angular: 'angular',
              'status-bar': 'StatusBar'
            }
          } ]
        ],
        browserifyOptions: {
          builtins: [ 'fs' ],
          commondir: false
        },
        bundleOptions: {
          detectGlobals: false,
          insertGlobalVars: []
        }
      },
      app: {
        files: {
          '<%= config.dist %>/bringste.js': [ '<%= config.sources %>/bringste.js' ]
        }
      },
      watch: {
        options: {
          watch: true,
          keepalive: true
        },
        files: {
          '<%= config.dist %>/bringste.js': [ '<%= config.sources %>/bringste.js' ]
        }
      }
    },
    copy: {
      resources: {
        files: [
          { cwd: '<%= config.sources %>', src: [ 'index.html' ], dest: '<%= config.dist %>', expand: true },
          { cwd: '<%= config.assets %>', src: [ 'img/**/*' ], dest: '<%= config.dist %>', expand: true },
          { cwd: '<%= config.vendor %>/ionic',
            src: [ 'fonts/**/*', 'js/ionic.bundle.js' ],
            dest: '<%= config.dist %>/vendor/ionic', expand: true }
        ]
      }
    },
    watch: {
      sass: {
        files: [ '<%= config.assets %>/scss/**/*' ],
        tasks: [ 'sass:app' ]
      },
      resources: {
        files: [
          '<%= config.assets %>/img/**/*',
          '<%= config.sources %>/*.html'
        ],
        tasks: [ 'copy:resources' ]
      }
    }
  });

  grunt.registerTask('test', 'karma:single');

  grunt.registerTask('build', [ 'browserify:app', 'sass:app', 'copy' ]);

  grunt.registerTask('auto-build', [
    'build',
    'browserify:watch',
    'watch'
  ]);

  grunt.registerTask('default', [ 'jshint', 'test', 'build' ]);
};
