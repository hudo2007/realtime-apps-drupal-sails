module.exports = function(grunt) {

  grunt.config.set('ngAnnotate', {
    options : {
      singleQuotes : true,
    },
    app : {
      files : [ {
        expand : true,
        src : [ '.tmp/public/js/interface/**/*.js' ]
      } ],
    },
  });

  grunt.loadNpmTasks('grunt-ng-annotate');
};
