/* global require*/

// ES5 shims for Function.prototype.bind, Object.prototype.keys, etc.
// This is needed for phantomjs, because phantomjs does not support all
// es5 features
require('core-js/es5');

// now search for all files in the test directory, that end with ".spec.js"
// the first parameter is the directory to check, the second parameter is a
// boolean whether all subdirectories should be searched as well, the third
// parameter is a matcher for the files, that should be loaded in the context
// see https://webpack.github.io/docs/context.html#require-context
var context = require.context('./test', true, /\.spec\.js$/);

// now the context is setup with a list of all keys, that match the previous
// configuration. We can access it with "context.keys()". So go for every key
// and call it in this local context. The context itself is something like a
// require function, to use it.
context.keys().forEach(context);