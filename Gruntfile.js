module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/zerodep.js',
				dest: 'build/zerodep-<%= pkg.version %>.min.js'
			}
		},
		qunit: {
			options: {
				timeout: 10000,
				// '--cookies-file': 'misc/cookies.txt'
			},
			all: ['tests/**/*.html']
		},
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js', 'tests/runners/**/*.js']
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: './'
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task(s).
	grunt.registerTask('build', ['lint', 'uglify:build']);
	grunt.registerTask('test', ['qunit']);
	grunt.registerTask('test-server', ['connect:server:keepalive']);
	grunt.registerTask('lint', ['jshint']);

};
