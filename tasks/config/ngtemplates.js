module.exports = function(grunt) {

  grunt.config.set('ngtemplates', {
    nyccampSails : {
      cwd : 'assets/js/interface',
      src : '**/**.html',
      dest : 'assets/js/templates.js',
      options : {
        htmlmin : '<%= htmlmin.nyccampSails %>'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-angular-templates');
}