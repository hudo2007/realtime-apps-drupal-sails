module.exports = function(grunt) {

  grunt.config.set('compass', {
    dev : { // Target
      options : { // Target options
        basePath: 'assets/',
        outputStyle: 'expanded',
        noLineComments: false,
        bundleExec: true
      }
    },
    staging : { // Target
      options : { // Target options
        basePath: 'assets/',
        outputStyle: 'compressed',
        noLineComments: true,
        force: true,
        bundleExec: true
      }
    },
  });
  
  grunt.loadNpmTasks('grunt-contrib-compass');
};