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

  function createSpriteSvg() { // done

    return glob(config.spritesvg.src, (err, dirs) => {
      dirs.forEach(dir => {
        gulp.src(path.join(dir, '*.svg'))
          .pipe(rename({prefix: 'icon-'}))
          .pipe(svgmin(file => {
            return {
              plugins: [
                // { cleanupIDs: {
                //     minify: true
                //   }
                // },
                // { removeViewBox: false },
                // { removeTitle: false },
                // { mergePaths: false },
                // { convertPathData: false},
                // { removeUselessStrokeAndFill: false },
                // { removeEmptyAttrs: false },
                // { removeDesc: true },
                // { removeNonInheritableGroupAttrs: true },
                // { collapseGroups: true },
                // { convertStyleToAttrs: true},
                {
                  cleanupAttrs: true,
                }, {
                  removeDoctype: true,
                },{
                  removeXMLProcInst: true,
                },{
                  removeComments: true,
                },{
                  removeMetadata: true,
                },{
                  removeTitle: true,
                },{
                  removeDesc: true,
                },{
                  removeUselessDefs: true,
                },{
                  removeEditorsNSData: true,
                },{
                  removeEmptyAttrs: true,
                },{
                  removeHiddenElems: true,
                },{
                  removeEmptyText: true,
                },{
                  removeEmptyContainers: true,
                },{
                  removeViewBox: false,
                },{
                  cleanUpEnableBackground: true,
                },{
                  convertStyleToAttrs: true,
                },{
                  convertColors: true,
                },{
                  /* https://github.com/svg/svgo/blob/master/plugins/convertPathData.js#L9-L26 */
                  convertPathData: false,
                },{
                  convertTransform: true,
                },{
                  removeUnknownsAndDefaults: true,
                },{
                  removeNonInheritableGroupAttrs: true,
                },{
                  removeUselessStrokeAndFill: true,
                },{
                  removeUnusedNS: true,
                },{
                  cleanupIDs: true,
                },{
                  cleanupNumericValues: true,
                },{
                  moveElemsAttrsToGroup: true,
                },{
                  moveGroupAttrsToElems: true,
                },{
                  collapseGroups: true,
                },{
                  removeRasterImages: false,
                },{
                  mergePaths: true,
                },{
                  convertShapeToPath: true,
                },{
                  sortAttrs: true,
                },{
                  transformsWithOnePath: false,
                },{
                  removeDimensions: true,
                },
                {
                  removeAttrs: {
                    attrs: ['xmlns', '(stroke|fill)']
                  }
                }
              ],
              js2svg: {
                pretty: true
              }
            }
          }))
          .pipe(svgSprite(makeSvgSpriteOptions(dir)))
          //.pipe(size({showFiles: true, title: svgDest}))
          .pipe(gulp.dest(config.spritesvg.dest))
      })
    });
  }
  gulp.task('spritesvg', createSpriteSvg);

  tasks.compile.push('spritesvg');
};