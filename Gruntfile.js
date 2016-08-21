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

		// Copy libs to public
		copy: {
			js: {
				expand: true,
				cwd: './node_modules',
				dest: './public/js/vendor/',
				flatten: true,
				filter: 'isFile',
				src: [
					'./jquery/dist/jquery.min.js',
					'./mustache/mustache.min.js',
					'./jquery-mockjax/dist/jquery.mockjax.min.js'
				]
			}
		},

		nightwatch: {
			options: {
				src_folders: './tests/',
				output_folder: './tests/reports/',
				selenium: {
					start_process: true,
					server_path: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.1.jar',
				},
				test_settings: {
					default: {
						desiredCapabilities: {
							browserName: 'phantomjs',
							javascriptEnabled : true,
							acceptSslCerts : true,
							'phantomjs.binary.path': './node_modules/phantomjs/lib/phantom/bin/phantomjs',
//							'phantomjs.binary.path': './node_modules/phantomjs/lib/phantom/phantomjs.exe'
							"phantomjs.cli.args" : []
						}
					}
				}
			}
		},

		// Watch files for changes process them
		watch: {
			css: {
				files: ['public/src/css/*.less'],
				tasks: ['less', 'cssmin']
			},
			js: {
				files: ['public/src/js/**/*.js','public/src/js/**/*.js', 'tests/*.js'],
				tasks: ['jshint', 'uglify', 'nightwatch']
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
			tasks: ['nodemon', 'watch', 'nightwatch']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nightwatch');

	grunt.registerTask('default', ['copy', 'less', 'cssmin', 'jshint', 'uglify', 'concurrent']);
	grunt.registerTask('server', ['nodemon']);
	grunt.registerTask('tests', ['copy', 'less', 'cssmin', 'jshint', 'uglify', 'nightwatch', 'watch']);

};