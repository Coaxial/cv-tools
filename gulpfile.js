const gulp = require('gulp');
const path = require('path');
const exec = require('child_process').exec;
const s3 = require('gulp-s3');
const runSequence = require('run-sequence');
const gutil = require("gulp-util");
const fs = require('fs');

// Parse config.json
const config = require('./tasks/config');

require('./tasks/latex')(gulp);
require('./tasks/dist')(gulp, config);
require('./tasks/upload')(gulp, config);
require('./tasks/pack')(gulp, config);

//
// "Porcelain" tasks
//
gulp.task('default', () => {
  gutil.log('');
  gutil.log('O Hai! (￣^￣)ゞ');
  gutil.log('');
  gutil.log('👉  Run `gulp work` to recompile tex document to pdf as it changes');
  gutil.log('👉  Run `gulp publish` to pack, encrypt, and upload pdf');
  gutil.log('');
  gutil.log('Good hunting!');
  gutil.log('');
});

gulp.task('publish', (done) => {
  runSequence('pack:zip', 'upload:s3', done);
});

gulp.task('work', () => {
  gulp.watch(config.texFilename, ['compile'], { read: false });
});
