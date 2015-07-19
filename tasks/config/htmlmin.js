module.exports = function(grunt) {

  grunt.config.set('htmlmin', {
    nyccampSails : {
      collapseBooleanAttributes : true,
      collapseWhitespace : true,
      removeAttributeQuotes : true,
      removeComments : true, // Only if you don't use comment directives!
      removeEmptyAttributes : true,
      removeRedundantAttributes : true,
      removeScriptTypeAttributes : true,
      removeStyleLinkTypeAttributes : true
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
}