'use strict';

const webpack = require('webpack');
const browserSync = require('browser-sync');
const core = require('./core');
const through2 = require('through2');
const clone = require('clone');

module.exports = (gulp, config, tasks) => {
  if (!config.webpack.config) {
    process.stdout.write(`Config passed in requires WebPack config. gulpfile.yml file should contain this:
webpack:
  enabled: true
  config: './webpack.config.js'
Note: you can copy the template from templates/webpack.config.js.
    `);
    process.exit(1);
  }

  function compileWebpack() {
    return gulp.src(config.webpack.config)
      .pipe(function runCompileWebpack() {
        return through2.obj((file, enc, done) => {
          // Config options - https://webpack.js.org/configuration/
          let webpackConfig;
          try { webpackConfig = clone(require(file.path)); } catch (error) { return done(error); }
          if (!webpackConfig.plugins) webpackConfig.plugins = [];
          if (typeof webpackConfig.devtool === 'undefined') webpackConfig.devtool = 'cheap-module-source-map';

          return webpack(webpackConfig).run((err, stats) => {
            if (err) {
              console.error(err.stack || err);
              if (err.details) {
                console.error(err.details);
              }
              done(err);
            }

            // Stats config options: https://webpack.js.org/configuration/stats/
            console.log(stats.toString({
              chunks: false, // Makes the build much quieter
              colors: true // Shows colors in the console
            }));

            done(stats.hasErrors() ? core.error('Webpack Compile Failed.') : null);
          });
        });
      }());
  }

  gulp.task('webpack', compileWebpack);

  function watchWebpack() {
    return gulp.src(config.webpack.config)
      .pipe(function runWatchWebpack() {
        return through2.obj((file, enc, done) => {
          // Config options - https://webpack.js.org/configuration/
          let webpackConfig;
          try { webpackConfig = clone(require(file.path)); } catch (error) { return done(error); }
          if (!webpackConfig.plugins) webpackConfig.plugins = [];
          if (typeof webpackConfig.devtool === 'undefined') webpackConfig.devtool = 'cheap-module-source-map';

          webpackConfig.plugins.push(
            new webpack.LoaderOptionsPlugin({
              debug: true
            })
          );

          return webpack(webpackConfig).watch({
            // https://webpack.js.org/configuration/watch/#watchoptions
          }, (err, stats) => {
            if (err) {
              console.error(err.stack || err);
              if (err.details) {
                console.error(err.details);
              }
              done(err);
            }

            // Stats config options: https://webpack.js.org/configuration/stats/
            console.log(stats.toString({
              chunks: false, // Makes the build much quieter
              colors: true // Shows colors in the console
            }));

            if (config.browserSync.enabled) browserSync.get('server').reload();
          });
        });
      }());
  }

  gulp.task('watch:webpack', watchWebpack);

  tasks.watch.push('watch:webpack');
  tasks.compile.push('webpack');
};
