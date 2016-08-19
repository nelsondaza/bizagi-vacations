module.exports = function(grunt) {
	grunt.initConfig({
		// Check JS files for errors
		jshint: {
			all: ['public/src/js/**/*.js', 'public/src/js/*.js']
		},

		// Minify JS files into app.min.js
		uglify: {
			build: {
				files: {
					'public/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
				}
			}
		},

		// Process the less files to style.css
		less: {
			build: {
				files: {
					'public/css/style.css': ['public/src/css/00-main.less']
				}
			}
		},

		// Minify CSS styles.css into style.min.css
		cssmin: {
			build: {
				files: {
					'public/css/style.min.css': 'public/css/style.css'
				}
			}
		},

		// Watch files for changes process them
		watch: {
			css: {
				files: ['public/src/css/00-main.less'],
				tasks: ['less', 'cssmin']
			},
			js: {
				files: ['public/src/js/**/*.js', 'public/src/js/*.js'],
				tasks: ['jshint', 'uglify']
			}
		},

		// nodemon let me start the server with grunt, and reload it with every change.
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		// run watch and nodemon at the same time
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);

};