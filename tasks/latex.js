const shell = require("gulp-shell");
const gutil = require("gulp-util");

module.exports = (gulp) => {
  gulp.task('latex2pdf', shell.task([
    'bash lib/pdf_all.sh'
  ]));

  gulp.task('compile', gulp.series('latex2pdf', (done) => {
    gutil.log('🖨  Change detected, recompiling!');
    done();
  }));
};
