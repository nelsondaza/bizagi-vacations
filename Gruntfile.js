module.exports = function(grunt) {
	grunt.initConfig({
		// nodemon let me start the server with grunt, and reload it with avery change.
		nodemon: {
			dev: {
				script: 'server.js'
			}
		}
	});

	// load nodemon
	grunt.loadNpmTasks('grunt-nodemon');

	// register the nodemon task when we run grunt
	grunt.registerTask('default', ['nodemon']);

};