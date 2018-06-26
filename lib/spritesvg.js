'use strict';

const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const path = require('path');
const glob = require('glob');
const del = require('del');
var gulpif = require('gulp-if');

module.exports = (gulp, config, tasks) => {

  function createSpriteSvg(src, prefix, outputFileName, conf) {
      return glob(src, (err, files) => { 
        files.forEach((file) => {
          gulp.src(path.join(file, '*.svg'))
            .pipe(rename({ prefix: prefix }))
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
                  sprite: `${outputFileName}.svg` 
                }
              }
            })))
            .pipe(gulpif(conf == svgoIconIllustrationConf, svgSprite({
              shape: {
                dest: config.spritesvg.iconIllustration.options.outputDirName
              }
            })))
            .pipe(gulp.dest(config.spritesvg.dest));
        });
      });
  }

  gulp.task('clean:spritesvg', (done) => {
    del([
      `${config.spritesvg.dest}*.svg`,
       path.join(config.spritesvg.dest, config.spritesvg.iconIllustration.options.outputDirName)
    ], { force: true }).then(() => {
      done();
    });
  });

  gulp.task('spritesvg:util', () => {
    return createSpriteSvg(config.spritesvg.iconUtil.options.src,
                           config.spritesvg.iconUtil.options.prefix,
                           config.spritesvg.iconUtil.options.outputFileName,
                           svgoIconUtilityConf);
  });
  gulp.task('spritesvg:illu', () => {
    return createSpriteSvg(config.spritesvg.iconIllustration.options.src,
                           config.spritesvg.iconIllustration.options.prefix,
                           config.spritesvg.iconIllustration.options.outputFileName,
                           svgoIconIllustrationConf);
  });
  gulp.task('spritesvg', gulp.parallel('spritesvg:util','spritesvg:illu'));

  tasks.clean.push('clean:spritesvg');
  tasks.compile.push('spritesvg:util');
  tasks.compile.push('spritesvg:illu');
  tasks.compile.push('spritesvg');

};

/** ILLUSTRATION svgo OPTIONS **/
/** Note: Order is important **/
const svgoIconIllustrationConf = [
  { removeDoctype: true },
  { removeXMLProcInst: true },
  { removeComments: true },
  { removeMetadata: true },
  { removeXMLNS: false }, // This one cause issue with class name (does not append prefix) so we have to leave it false
  { removeEditorsNSData: true },
  { cleanupAttrs: true },
  { inlineStyles: true },
  { minifyStyles: true },
  { convertStyleToAttrs: true }, // not default
  {
    cleanupIDs:
    {
      minify: true,
      remove: true,
      force: true
    }
  },
  { prefixIds: false },
  { removeRasterImages: true },
  { removeUselessDefs: true },
  { cleanupNumericValues: true },
  { cleanupListOfValues: true },
  { convertColors: true },
  { removeUnknownsAndDefaults: true },
  { removeNonInheritableGroupAttrs: true },
  { removeUselessStrokeAndFill: true },
  { removeViewBox: false }, // default
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
  { sortAttrs: true }, // not default
  { removeTitle: true },
  { removeDesc: true },
  { removeDimensions: true }, // not default
  { removeAttrs: false },
  { removeElementsByAttr: false }, // default
  { addClassesToSVGElement: false }, // default
  { removeStyleElement: false }, // default
  { removeScriptElement: false }, // default
  { addAttributesToSVGElement: false } // default
];



/** UTILITY svgo OPTIONS    **/
/** Note: Order is important **/
// see: https://github.com/svg/svgo
// see: https://github.com/jakearchibald/svgomg/blob/master/src/js/svgo-worker/index.js
// see: https://github.com/svg/svgo/issues/439
const svgoIconUtilityConf = [
  { removeDoctype: true },
  { removeXMLProcInst: true },
  { removeComments: true },
  { removeMetadata: true },
  { removeXMLNS: true }, // not default
  { removeEditorsNSData: true },
  { cleanupAttrs: true },
  { minifyStyles: true },
  { convertStyleToAttrs: true },
  {
    cleanupIDs:
    {
      minify: true,
      remove: true,
      force: true
    }
  },
  { removeRasterImages: false }, // default
  { removeUselessDefs: true },
  { cleanupNumericValues: true },
  { cleanupListOfValues: true },
  { convertColors: true },
  { removeUnknownsAndDefaults: true },
  { removeNonInheritableGroupAttrs: true },
  { removeUselessStrokeAndFill: true },
  { removeViewBox: false }, // default
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
  { sortAttrs: true }, // not default
  { removeTitle: true },
  { removeDesc: true },
  { removeDimensions: true }, // not default
  {
    removeAttrs: {
      attrs: ['xmlns', '(stroke|fill)']
    }
  },
  { removeElementsByAttr: false }, // default
  { addClassesToSVGElement: false }, // default
  { removeStyleElement: false }, // default
  { removeScriptElement: false }, // default
  { addAttributesToSVGElement: false } // default
];