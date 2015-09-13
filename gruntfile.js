/* global module, require */
module.exports = function (grunt) {
    var path = require('path');

    grunt.initConfig({
        clean: {
            dist: ['dist/**/*']
        },
        eslint: {
            options: {
                configFile: '.eslintrc',
                ignorePath: '.eslintignore'
            },
            ci: {
                src: ['./src/**/*.js']
            }
        },
        webpack: {
            'build': {
                entry: './src/main.js',
                output: {
                    path: 'dist/',
                    filename: 'bundle.js'
                },
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            loader: 'babel-loader',
                            query: {
                                optional: ['runtime']
                            }
                        }
                    ]
                },
                stats: {
                    colors: false,
                    modules: true,
                    reasons: true
                },
                resolve: {
                    root: [
                        path.resolve('./src')
                    ]
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            ci: {
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['clean:dist', 'webpack:build']);
    grunt.registerTask('test', ['eslint:ci', 'karma:ci']);
};