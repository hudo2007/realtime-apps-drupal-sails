module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'compass:dev',
		'ngtemplates',
		'sync:dev',
		'coffee:dev'
	]);
};
