'use strict';
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const path = require('path');
const glob = require('glob');


module.exports = (gulp, config, tasks) => {
  function makeSvgSpriteOptions(dirPath) {
    return {
      mode: {
        symbol: {
          dest: '.',
          example: false,
          sprite: 'sprite.svg'
        },
      }
    };
  }

  function createSpriteSvg() {

    return glob(config.spritesvg.src, (err, dirs) => {
      dirs.forEach(dir => {
        gulp.src(path.join(dir, '*.svg'))
          .pipe(rename({prefix: 'icon-'}))
          .pipe(svgmin(file => {
            return {
              // see: https://github.com/svg/svgo
              // see: https://github.com/jakearchibald/svgomg/blob/master/src/js/svgo-worker/index.js
              // see: https://github.com/svg/svgo/issues/439
              plugins: [
                { removeDoctype: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { removeMetadata: true },
                { removeXMLNS: false }, // default
                { removeEditorsNSData: true },
                { cleanupAttrs: true },
                { minifyStyles: true },
                { convertStyleToAttrs: true },
                { cleanupIDs: {
                    minify: true,
                    remove: true,
                    force: true
                  }
                },
                { removeRasterImages: false }, //default
                { removeUselessDefs: true },
                { cleanupNumericValues: true },
                { cleanupListOfValues: true },
                { convertColors: true },
                { removeUnknownsAndDefaults: true },
                { removeNonInheritableGroupAttrs: true },
                { removeUselessStrokeAndFill: true },
                { removeViewBox: false}, //default
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
                { removeElementsByAttr: false }, //default
                { addClassesToSVGElement: false }, //default
                { removeStyleElement: false }, //default
                { removeScriptElement: false }, //default
                { addAttributesToSVGElement: false }, //default
              ],
              js2svg: {
                pretty: true
              }
            }
          }))
          .pipe(svgSprite(makeSvgSpriteOptions(dir)))
          .pipe(gulp.dest(config.spritesvg.dest))
      })
    });
  }
  gulp.task('spritesvg', createSpriteSvg);

  tasks.compile.push('spritesvg');
};