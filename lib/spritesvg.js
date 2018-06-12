'use strict';

// const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');

module.exports = (gulp, config, tasks) => {
  // configuration example // TODO create official config
  const configSprite = {
    mode: {
      inline: true, // Prepare for inline embedding
      symbol: true // Create a «symbol» sprite
    }
  };

    // function cleanIndividualSvg() {
    //   return gulp.src(config.spritesvg.src)
    //     .pipe(svgmin())
    //     .pipe(gulp.dest('./out'));
    // }

  function createSpriteSvg(done) {
    return gulp.src(config.spritesvg.src, { cwd: config.spritesvg.dest })
      .pipe(svgSprite(configSprite)) 
      .pipe(gulp.dest(config.spritesvg.dest))
      .on('end', () => {
        done();
      });
  }
  // gulp.task('cleansvg', gulp.parallel());
  gulp.task('spritesvg', done => createSpriteSvg(done));

  // tasks.compile.push('cleansvg');
  tasks.compile.push('spritesvg');
};
