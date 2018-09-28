import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import theo from 'theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import concat from 'gulp-concat';
import addHeader from 'gulp-header';
import pkg from '../package.json';

var metaHeader = `
/* ----------------------- */
/* 🎂 Cupcake Sprinkles 🎂 */
/* imported from: ${pkg.name} version: ${pkg.version} */
/* DO NOT MODIFY THIS FILE DIRECTLY! */
/* ALL VALUES COME FROM THE ${pkg.name} PACKAGE */
/* ----------------------- */
`;


// This runs the task over the files making a map based on default variables
gulp.task('tokens:map', (done) => {
      gulp.src([
        config.tokens.input + '/*.yml',
        '!./tokens/index.yml',
        '!./tokens/_aliases.yml',
        '!./tokens/colors-map.yml',
        '!./tokens/color.yml'
      ])
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: 'map.variables.scss' }
          }))
          .pipe(vinylPaths(del))
          .pipe(rename(function (opt) {
            opt.basename = opt.basename.replace(/.map.variables/, '');
            return opt;
          }))
          .pipe(concat('_maps.scss'))
          .pipe(gulp.dest(config.tokens.output))
  done();
});

// This runs the task over the files making a single file with default variables
gulp.task('tokens:core', (done) => {
  gulp.src([
    config.tokens.input + '/*.yml',
    '!./tokens/index.yml',
    '!./tokens/_aliases.yml',
    '!./tokens/colors-map.yml'
  ])
      .pipe(gulpTheo({
          transform: { includeMeta: true },
          format: { type: 'default' }
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(function (opt) {
        opt.extname = ".scss";
        opt.basename = opt.basename.replace(/.default/, '');
        return opt;
      }))
      .pipe(concat('_variables.scss'))
      .pipe(gulp.dest(config.tokens.output))
done();
});


gulp.task('tokens:colors-map', (done) => {
      gulp.src(config.tokens.input + '/colors-map.yml')
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: 'deep' }
          }))
          .pipe(rename(function(path) {
              path.basename = '_colors-map';
              path.extname = ".scss";
          }))
          .pipe(gulp.dest(config.tokens.output))
  done();
});


gulp.task('clean:tokens', (done) => {
  return del(config.tokens.output).then(() => {
    done();
  });
});


gulp.task('tokens:merge', (done) => {
  gulp.src(['./dist/_variables.scss', './dist/_colors-map.scss', './dist/_maps.scss'])
      .pipe(vinylPaths(del))
      .pipe(concat('_tokens.scss'))
      .pipe(addHeader(metaHeader))
      .pipe(gulp.dest(config.tokens.output))
done();
});

gulp.task('map:merge', (done) => {
  gulp.src(['./dist/*.scss', '!./dist/_variables.scss'])
      .pipe(vinylPaths(del))
      .pipe(concat('_maps.scss'))
      .pipe(gulp.dest(config.tokens.output))
done();
});
