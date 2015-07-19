module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
	  'bower:install',
		'clean:dev',
		'jst:dev',
		'compass:dev',
		'ngtemplates',
		'copy:dev',
		'ngAnnotate:app',
		'coffee:dev'
	]);
};
