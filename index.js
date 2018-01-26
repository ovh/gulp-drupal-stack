'use strict';

const _ = require('lodash');
const yaml = require('js-yaml');
const fs = require('fs');

// read default config settings
const defaultConfig = yaml.safeLoad(fs.readFileSync(`${__dirname}/gulpfile.default.yml`, 'utf8'), { json: true });

module.exports = (gulp, userConfig, tasks) => {
  const config = _.merge(defaultConfig, userConfig);

  /* eslint-disable global-require */
  if (config.browserSync.enabled) {
    require('./lib/browser-sync')(gulp, config, tasks);
  }

  if (config.icons.enabled) {
    require('./lib/icons')(gulp, config, tasks);
  }

  if (config.js.enabled) {
    require('./lib/js')(gulp, config, tasks);
  }

  if (config.css.enabled) {
    require('./lib/css')(gulp, config, tasks);
  }

  if (config.patternLab.enabled) {
    require('./lib/pattern-lab--php-twig')(gulp, config, tasks);
  }

  if (config.drupal.enabled) {
    require('./lib/drupal')(gulp, config, tasks);
  }

  if (config.webpack.enabled) {
    require('./lib/webpack')(gulp, config, tasks);
  }

  /* eslint-enable global-require */

  // This is a fix fo Gulp, because series and paparallel needs at least one task
  gulp.task('nothing-to-do', done => done());

  if (!tasks.clean.length) {
    tasks.clean.push('nothing-to-do');
  }
  if (!tasks.compile.length) {
    tasks.compile.push('nothing-to-do');
  }
  if (!tasks.validate.length) {
    tasks.validate.push('nothing-to-do');
  }
  if (!tasks.test.length) {
    tasks.test.push('nothing-to-do');
  }
  if (!tasks.watch.length) {
    tasks.watch.push('nothing-to-do');
  }
  if (!tasks.default.length) {
    tasks.default.push('nothing-to-do');
  }

  // Instead of `gulp.parallel`, which is what is set in Pattern Lab Starter's `gulpfile.js`, this
  // uses `gulp.series`. Needed to help with the Gulp task dependencies lost going from v3 to v4.
  // We basically need icons compiled before CSS & CSS/JS compiled before inject:pl before pl
  // compile. The order of the `require`s above is the order that compiles run in; not perfect, but
  // it works.
  // eslint-disable-next-line no-param-reassign
  tasks.compile = gulp.series(tasks.compile);
};
