# Pong babel example #

This is a VERY basic version of pong that I wrote as test for a babel structure.

I wanted to check whether babel is cool in projects, so I wrote something small one that contains the most
important things.

I know that the code itself could get refactored at some points (ball collision calculation), but I got the
main idea about how to work with es6, and checked how I can transpile it an easy way.

There are some tests, but they are just to see how this works and how I can gain coverage for the code and
mock dependencies. See through the tests, but dont't expect all code to be tested, I just wanted to get the
idea of how to test the code.

You can see the mocking in action in `/tests/main.spec.js`

## Good parts ##

So, the main reason was to test es6 and babel, and I think this was successful. Using es6 with babel is very
easy, especially when combined with webpack.

Webpack has a structure of "loaders", that can transpile the code while loading it in the application, so
when using a babel-loader all problems get solved by webpack. and you can focus on code.

Even better: [After reading this](https://www.codementor.io/reactjs/tutorial/test-reactjs-components-karma-webpack)
I knew how to combine karma with webpack, so unittesting is as easy as it can get.

Even while unittesting webpack can be used to load es6 files, and babel will take care of transpilling
the code.

All in all this is a very cool structure, and I think this can be used as boilerplate for other projects
as well.

Even using librarys is very easy (ok, what should not be easy with this?). I used underscore as test library,
because it's one of the most useful one out there, and there are no problems. I use underscore in my tests,
if you want to see how easy it is. Libs are excluded from code coverage, are "prefixed" with "libs", I love
it.

## Bad parts ##

Even thougth there was a lot of good things, there are some drawbacks as well.

I used [Visual Studio Code](https://code.visualstudio.com/) as editor, because it's a pretty good
free editor. But here the editor fails to resolve the types of class members. This is nothing too
bad, but I hoped for a little more. But who knows about the future, and whether this gets better over
time.

Another problem that took some time was getting code coverage for the tests. The problem was not
using the loader, but using the include and exclude options for the loaders. Somehow this options
are some kind of tricky to work with, so I used the option to write a function that decides whether
to include the file in this or that loader. Maybe this is a problem of my current operating system
(windows...), but it's good that it's solveable.

## Conclusion ##

All in all I think es6 is useable in projects, where the combination with webpack is possible.
It's syntax has grown a lot, so a lot of not-javascript-developers can join in projects. This
is very good for software companies, because the transition to javascript from other high level
languages is not that hard anymore.

For someone used to javascript there's no difference while reading the code.

I hope that the tooling get's better in future, but the for people that are new to javascript: A
good step forward.

The last point is webpack: This was the first time I tried webpack, and: WHAT THE FIRETRUCK is this
cool! It takes away so much pain, it's perfectly integrated in karma, and it just works. After this
I'm realy in love with webpack. Webpack handles not only bunding, but transpilling, covering the
correct code and dependency injection. This is awesome.
