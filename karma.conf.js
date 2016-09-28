module.exports = function(karma) {
  karma.set({
    browsers: [ 'PhantomJS' ],
    frameworks: [ 'browserify', 'jasmine' ],

    // add all your files here in order,
    // including non-commonJS files you need to load before your test cases 
    files: [
      // external libraries / vendors
      'https://cdnjs.cloudflare.com/ajax/libs/es6-promise/3.3.1/es6-promise.min.js',

      // 'some-non-cjs-library.js',
      'spec/**/*.spec.js'
    ],

    preprocessors: {
      'spec/**/*.js': [ 'browserify' ]
    },

    // see what is going on 
    logLevel: 'LOG_DEBUG',
 
    browserify: {
      debug: true,
      transform: [ 
        ['babelify', {presets: ["es2015", "react"]}] 
      ],
      extensions: [ '.js' ]
    }
  });
};