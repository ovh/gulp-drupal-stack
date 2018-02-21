'use strict';

const concat = require('gulp-concat');
const gulpif = require('gulp-if');

module.exports = (gulp, config, tasks) => {
  function copyCurrentFiles(files) {
    return gulp.src(files.src)
      .pipe(gulpif(files.concat, concat(files.destName || 'undefined.js')))
      .pipe(gulp.dest(files.dest));
  }

  copyCurrentFiles.description = 'Copies multiple files into a given destination (and optionally concat them).';

  gulp.task('copy', gulp.parallel(config.copy.files.map(files => function copyFiles() {
    return copyCurrentFiles(files);
  })));

  gulp.task('watch:copy', gulp.parallel(config.copy.files.map(files => function watchCopyFiles() {
    return gulp.watch(files.src, gulp.series(function copyFiles() {
      return copyCurrentFiles(files);
    }));
  })));

  tasks.compile.push('copy');
  tasks.watch.push('watch:copy');
};

