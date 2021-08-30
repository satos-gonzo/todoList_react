const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

// バンドル用タスク
gulp.task('bundle', function (done) {
  // dest は webpack で言う output.path にしたいところを設定
  gulp.src('./src/js/app.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(
      webpackStream(webpackConfig, webpack)).pipe(gulp.dest('./dist/js/'));
  done();
});

// ブラウザの自動リロード
gulp.task('browserSync', function (done) {
  browserSync.init({
    server: {
      baseDir: "./", // 対象ディレクトリ
      index: "./index.html" //indexファイル名
    }
  });
  done();
});
gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
});

// 監視用タスク
gulp.task('check', function () {
  gulp.watch('./src/js/**/*.js', gulp.series('bundle'));
});


// watchコマンド入力→checkで各タスクの実行→
//gulp.task('watch', gulp.series('bundle', 'check'));
gulp.task('watch', gulp.series(gulp.parallel('browserSync', 'bundle'), function () {
  gulp.watch('./dist/js/*.js', gulp.task('check'));
  gulp.watch('./index.html', gulp.task('bs-reload'));
  gulp.watch('./src/js/*.js', gulp.task('bs-reload'));
  gulp.watch('./dist/js/*.js', gulp.task('bs-reload'));
  gulp.watch('./dist/css/*.css', gulp.task('bs-reload'));
}));
