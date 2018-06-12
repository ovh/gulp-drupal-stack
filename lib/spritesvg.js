'use strict';

// const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');

module.exports = (gulp, config, tasks) => {
  // configuration example // TODO create official config
  const configSprite = {
    shape: {
      dimension: { // Set maximum dimensions
        maxWidth: 32,
        maxHeight: 32
      },
      spacing: { // Add padding
        padding: 10
      },
      dest: 'out/intermediate-svg' // Keep the intermediate files
    },
    mode: {
      symbol: true // Activate the «symbol» mode
    }
  };

    // function cleanIndividualSvg() {
    //   return gulp.src(config.css.src)
    //     .pipe(svgmin())
    //     .pipe(gulp.dest('./out'));
    // }

  function createSpriteSvg() {
    return gulp.src(config.css.src)
      .pipe(svgSprite(configSprite))
      .pipe(gulp.dest('out'));
  }
  // gulp.task('cleansvg', gulp.parallel());
  gulp.task('spritesvg', createSpriteSvg);

  // tasks.compile.push('cleansvg');
  tasks.compile.push('spritesvg');
};
