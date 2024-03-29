'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		css: {
			input: 'app/assets/styles/master.scss',
			output: 'public/styles/master.min.css'
		},

		js: {
			input: 'app/assets/scripts/*.js',
			output: 'public/scripts/master.min.js'
		},

		pkg: grunt.file.readJSON('package.json'),

		tag: {
			banner: '/*!\n' +
				' * <%= pkg.name %>\n' +
				' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
				' * @version <%= pkg.version %>\n' +
				' */\n'
		},



		sass: {
			options: {
				banner: '<%= tag.banner %>',
				noCache: true
			},
			dev: {
				files: {
					'<%= css.output %>': '<%= css.input %>'
				},
				options: {
					style: 'expanded'
				}
			},
			dist: {
				files: {
					'<%= css.output %>': '<%= css.input %>'
				},
				options: {
					style: 'compressed'
				}
			}
		},



		jshint: {
			files: '<%= js.input %>',
			options: {
				jshintrc: '.jshintrc'
			}
		},

		concat: {
			options: {
				seperator: ';',
				stripBanners: true,
				nonull: true,
				banner: '<%= tag.banner %>'
			},
			dev: {
				files: {
					'<%= js.output %>': '<%= js.input %>'
				}
			}
		},

		uglify: {
			options: {
				banner: "<%= tag.banner %>",
				wrap: true
			},
			dist: {
				files: {
					'<%= js.output %>': ['<%= js.output %>']
				}
			}
		},



		watch: {
			css: {
				files: '<%= css.input %>',
				tasks: ['sass:dev']
			},
			scripts: {
				files: '<%= js.input %>',
				tasks: ['jshint', 'concat:dev']
			}
		},

		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					watchedExtensions: ['hbs', 'js'],
					watchedFolders: ['app', 'config'],
					ignoredFiles: ['app/assets/**', 'public/**', 'node_modules/**'],
					legacyWatch: true,
					env: {
						NODE_ENV: 'development',
						PORT: '3000'
					},
					cwd: __dirname
				}
			}
		},



		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}

	});



	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');


	grunt.registerTask('default', [
		'sass:dev',
		'jshint',
		'concat:dev',
		'concurrent'
	]);

	grunt.registerTask('build', [
		'sass:dist',
		'jshint',
		'uglify'
	]);

};