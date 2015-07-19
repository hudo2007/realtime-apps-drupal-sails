module.exports = function(grunt) {

	grunt.config.set('shell', {
	  patternlabBuild: {
	    command : 'php core/builder.php -g',
	    options : {
	      execOptions : {
	        cwd : 'public/pattern-lab'
	      }
	    }
		}
	});

	grunt.loadNpmTasks('grunt-shell');
};
