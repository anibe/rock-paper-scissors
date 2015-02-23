"use strict";

module.exports = function ( grunt ) {

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        jshint: {

            options: {
                jshintrc: ".jshintrc"
            },
            defaults: [
                "src/**/*.js",
                'Gruntfile.js'
            ]
        },

        csslint: {
            strict: {
                options: {
                    csslintrc: '.csslintrc',
                    import: 2,
                    formatters: ['compact']
                },
                src: [
                    'src/**/*.css'
                ]
            }
        },

        connect: {
            mock: {
                options: {
                    base: 'src/',
                    open: true,
                    keepalive: true
                }
            }
        },

        jasmine: {
            dev: {
                src: ['src/js/*.js'],
                options: {
                    vendor: 'src/js/lib/**/*.js',
                    specs: 'src/spec/js/**/*.spec.js',
                    keepRunner: true
                }
            }
        },

        clean: {
            options: {
                force: true
            },
            styles: {
                src: [
                    'src/css/main.css',
                    'src/css/main.css.map'
                ]
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            sass: {
                files: ['src/css/**/*.scss'],
                tasks: ['sass:expanded']
            }
        }

    });

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-csslint' );
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Runs all checkstyle stuff
    grunt.registerTask( 'default', [
        'jshint',
        'csslint'
    ] );

    // tests
    grunt.registerTask( 'test', [
        'default',
        'jasmine'
    ] );

    // Dev
    grunt.registerTask( 'dev', [
        'clean',
        'sass:compressed',
        'default',
        'test',
        'connect',
        'watch'

    ] );



};
