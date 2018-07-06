'use strict';

const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const path = require('path');
const glob = require('glob');
const del = require('del');
const gulpif = require('gulp-if');

module.exports = (gulp, config, tasks) => {
  // ILLUSTRATION svgo OPTIONS
  // Order is important (see reference for order and default below)
  const svgoIconIllustrationConf = [
    // leave { removeXMLNS: false } default false, issue with class name (does not append prefix)
    // so we have to leave it false (<style> is needed for illustration type)
    {
      cleanupIDs:
      {
        force: true
      }
    },
    { removeRasterImages: true },
    { cleanupListOfValues: true },
    { removeViewBox: false },
    { sortAttrs: true },
    { removeTitle: false },
    { removeDesc: false },
    { removeDimensions: true }
  ];

  // UTILITY svgo OPTIONS
  const svgoIconUtilityConf = [
    { removeXMLNS: true },
    {
      cleanupIDs:
      {
        force: true
      }
    },
    { cleanupListOfValues: true },
    { removeViewBox: false },
    { sortAttrs: true },
    { removeDimensions: true },
    {
      removeAttrs: {
        attrs: ['xmlns', '(stroke|fill)']
      }
    }
  ];

  function createSvg(src, prefix, conf) {
    return glob(src, (err, files) => {
      files.forEach((file) => {
        gulp.src(path.join(file, '*.svg'))
          .pipe(rename({ prefix: prefix })) // eslint-disable-line
          .pipe(svgmin({
            plugins: conf,
            js2svg: {
              pretty: true,
              indent: '  '
            }
          }))
          .pipe(gulpif(conf === svgoIconUtilityConf, svgSprite({
            mode: {
              symbol: {
                dest: '.',
                example: false,
                sprite: `${config.svg.iconUtil.options.outputFileName}.svg`
              }
            }
          })))
          .pipe(gulpif(conf === svgoIconIllustrationConf, svgSprite({
            shape: {
              dest: config.svg.iconIllustration.options.outputDirName
            }
          })))
          .pipe(gulp.dest(config.svg.dest));
      });
    });
  }

  gulp.task('clean:svg', (done) => {
    del([
      `${config.svg.dest}*.svg`,
      path.join(config.svg.dest, config.svg.iconIllustration.options.outputDirName)
    ], { force: true }).then(() => {
      done();
    });
  });

  /* eslint-disable arrow-body-style */
  gulp.task('svg:utilsprite', () => {
    return createSvg(
      config.svg.iconUtil.options.src,
      config.svg.iconUtil.options.prefix,
      svgoIconUtilityConf
    );
  });
  /* eslint-disable arrow-body-style */
  gulp.task('svg:illu', () => {
    return createSvg(
      config.svg.iconIllustration.options.src,
      config.svg.iconIllustration.options.prefix,
      svgoIconIllustrationConf
    );
  });
  gulp.task('svg', gulp.parallel('svg:utilsprite', 'svg:illu'));

  tasks.clean.push('clean:svg');
  tasks.compile.push('svg:utilsprite');
  tasks.compile.push('svg:illu');
  tasks.compile.push('svg');
};

// Reference for default values svgo plugins and order
// see: https://github.com/svg/svgo/blob/master/.svgo.yml
// see: https://github.com/svg/svgo/tree/master/plugins
// see: https://github.com/jakearchibald/svgomg/blob/master/src/js/svgo-worker/index.js
// see: https://github.com/svg/svgo/issues/439
/* [
  { removeDoctype: true },
  { removeXMLProcInst: true },
  { removeComments: true },
  { removeMetadata: true },
  { removeXMLNS: false },
  { removeEditorsNSData: true },
  { cleanupAttrs: true },
  { inlineStyles: true },
  { minifyStyles: true },
  { convertStyleToAttrs: true },
  { cleanupIDs: true },
  { prefixIds: false },
  { removeRasterImages: false },
  { removeUselessDefs: true },
  { cleanupNumericValues: true },
  { cleanupListOfValues: false },
  { convertColors: true },
  { removeUnknownsAndDefaults: true },
  { removeNonInheritableGroupAttrs: true },
  { removeUselessStrokeAndFill: true },
  { removeViewBox: true },
  { cleanupEnableBackground: true },
  { removeHiddenElems: true },
  { removeEmptyText: true },
  { convertShapeToPath: true },
  { moveElemsAttrsToGroup: true },
  { moveGroupAttrsToElems: true },
  { collapseGroups: true },
  { convertPathData: true },
  { convertTransform: true },
  { removeEmptyAttrs: true },
  { removeEmptyContainers: true },
  { mergePaths: true },
  { removeUnusedNS: true },
  { sortAttrs: false },
  { removeTitle: true },
  { removeDesc: true },
  { removeDimensions: false },
  { removeAttrs: false },
  { removeElementsByAttr: false },
  { addClassesToSVGElement: false },
  { removeStyleElement: false },
  { removeScriptElement: false },
  { addAttributesToSVGElement: false }
]; */
