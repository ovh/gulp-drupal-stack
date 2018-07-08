'use strict';

const autoprefixer = require('autoprefixer');
const gulpLoadPlugins = require('gulp-load-plugins');
const sassdoc = require('sassdoc');
const join = require('path').join;
const del = require('del');

const $ = gulpLoadPlugins();

module.exports = (gulp, config, tasks) => {
  function cssCompile(done, errorShouldExit) {
    gulp.src(config.css.src)
      .pipe($.sassGlob())
      .pipe($.plumber({
        errorHandler(error) {
          $.notify.onError({
            title: 'CSS <%= error.name %> - Line <%= error.line %>',
            message: '<%= error.message %>'
          })(error);
          if (errorShouldExit) process.exit(1);
          this.emit('end');
        }
      }))
      .pipe($.if(config.css.sourceMap.enabled, $.sourcemaps.init({
        debug: config.debug
      })))
      .pipe($.sass({
        outputStyle: config.css.outputStyle,
        sourceComments: config.css.sourceComments,
        includePaths: config.css.includePaths
      }).on('error', $.sass.logError))
      .pipe($.postcss([
        autoprefixer({
          browsers: config.css.autoPrefixerBrowsers
        })
      ]))
      .pipe($.if(config.css.sourceMap.enabled, $.sourcemaps.write((config.css.sourceMap.sourceMapEmbed) ? null : './')))
      .pipe($.if(config.css.flattenDestOutput, $.flatten()))
      .pipe(gulp.dest(config.css.dest))
      .on('end', () => {
        done();
      });
  }

  cssCompile.description = 'Compile SCSS to CSS using LibSass with Autoprefixer and SourceMaps';

  gulp.task('css', done => cssCompile(done, true));

  gulp.task('clean:css', (done) => {
    del([
      join(config.css.dest, '*.{css,css.map}')
    ], { force: true }).then(() => {
      done();
    });
  });

  function validateCss(errorShouldExit) {
    return gulp.src(config.css.lint.extraSrc
      ? [].concat(config.css.src, config.css.lint.extraSrc)
      : config.css.src)
      .pipe($.cached('validate:css'))
      .pipe($.stylelint({
        failAfterError: errorShouldExit,
        reporters: [
          { formatter: 'string', console: true }
        ]
      }));
  }

  function validateCssWithNoExit() {
    return validateCss(false);
  }

  validateCss.description = 'Lint SCSS files';

  gulp.task('validate:css', () => validateCss(true));


  function formatCss() {
    return gulp.src(config.css.csscombx.extraSrc
      ? [].concat(config.css.src, config.css.csscombx.extraSrc)
      : config.css.src, { base: './' })
      .pipe($.cached('format:css'))
      .pipe($.csscombx())
      .pipe(gulp.dest('./'));
  }

  formatCss.description = 'Format SCSS files';

  gulp.task('format:css', () => formatCss());


  function docsCss() {
    return gulp.src(config.css.src)
      .pipe(sassdoc({
        dest: config.css.sassdoc.dest,
        verbose: config.css.sassdoc.verbose,
        basePath: config.css.sassdoc.basePath,
        exclude: config.css.sassdoc.exclude,
        theme: config.css.sassdoc.theme,
        sort: config.css.sassdoc.sort
      }));
  }

  docsCss.description = 'Build CSS docs using SassDoc';

  gulp.task('docs:css', docsCss);

  gulp.task('clean:docs:css', (done) => {
    del([config.css.sassdoc.dest]).then(() => {
      done();
    });
  });

  function watchCss() {
    const watchTasks = [cssCompile];
    if (config.css.csscombx.enabled) {
      watchTasks.push('format:css');
    }
    if (config.css.lint.enabled) {
      watchTasks.push(validateCssWithNoExit);
    }
    if (config.css.sassdoc.enabled) {
      watchTasks.push('docs:css');
    }
    const src = config.css.extraWatches
      ? [].concat(config.css.src, config.css.extraWatches)
      : config.css.src;
    return gulp.watch(src, gulp.parallel(watchTasks));
  }

  watchCss.description = 'Watch SCSS';

  gulp.task('watch:css', watchCss);

  tasks.watch.push('watch:css');

  tasks.compile.push('css');

  if (config.css.csscombx.enabled) {
    tasks.validate.push('format:css');
  }

  if (config.css.lint.enabled) {
    // must be after format:css
    tasks.validate.push('validate:css');
  }

  if (config.css.sassdoc.enabled) {
    tasks.compile.push('docs:css');
    tasks.clean.push('clean:docs:css');
  }

  tasks.clean.push('clean:css');
};
