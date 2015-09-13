/* global module, require */

// the path is needed for the "decideInclude" function
var path = require('path');

// This function decides, whether the given path should get included or not.
// This function can get used with the bind operator:
// decideInclude.bind(null, includelist, excludelist) with
// includelist and excludelist arrays of paths or pathparts that get resolved
function decideInclude(aIncludeList, aExcludeList, aModule) {
    var include = false;
    var module = path.resolve(aModule);
    var includePaths = aIncludeList.map(function (aPath) {
        return path.resolve(aPath);
    });
    var excludePaths = aExcludeList.map(function (aPath) {
        return path.resolve(aPath);
    });

    includePaths.forEach(function (aPath) {
        if (module.indexOf(aPath) === 0) {
            include = true;
            return false;
        }
    });

    excludePaths.forEach(function (aPath) {
        if (module.indexOf(aPath) === 0) {
            include = false;
            return false;
        }
    });

    return include;
}

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

        files: [
            {
                pattern: 'tests.webpack.js',
                watched: false
            }
        ],

        preprocessors: {
            'tests.webpack.js': ['webpack']
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            reporters: [
                {
                    type: 'text'
                }
            ]
        },

        singleRun: true,

        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.spec\.js$/,
                        include: decideInclude.bind(null, ['./test'], ['./src/libs', './node_modules']),
                        loader: 'babel-loader'
                    },
                    // the isparta loader is for code coverage, see https://github.com/deepsweet/isparta-loader
                    {
                        test: /\.js$/,
                        include: decideInclude.bind(null, ['./src'], ['./src/libs', './node_modules']),
                        loader: 'isparta-loader'
                    }
                ],
                postLoaders: [
                    // the inject-loader is for mocking dependencies, see https://github.com/plasticine/inject-loader
                    {
                        test: /^inject!\S*\.js$/,
                        loader: 'inject-loader'
                    }
                ]
            },
            resolve: {
                root: [
                    path.resolve('./src')
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
};