module.exports = function (grunt) {
  grunt.registerTask('buildScripts', [
    'sync:js',
    'ngtemplates'
  ]);
};