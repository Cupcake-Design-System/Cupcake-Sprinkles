import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import theo from 'theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';

// Formats with hex values
const indexFormats = [
  'default.scss',
];

// Formats with px values
const unitsFormats = [
  'map.variables.scss'
];

gulp.task('tokens:base', (done) => {
  indexFormats.map((format) => {
    gulp.src(config.tokens.input + '/index.yml')
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: format }
          }))
          .pipe(rename(function(path) {
              path.basename = 'index';
              path.extname = ".scss"
          }))
          .pipe(gulp.dest(config.tokens.output))
  })
  done();
});


gulp.task('tokens:core', (done) => {
  unitsFormats.map((format) => {
      gulp.src([
        config.tokens.input + '/*.yml',
        '!tokens/index.yml',
        '!tokens/_aliases.yml',
        '!tokens/colors-map.yml'
      ])
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: format }
          }))
          .pipe(vinylPaths(del))
          .pipe(rename(function (opt) {
            opt.basename = opt.basename.replace(/.map.variables/, '');
            return opt;
          }))
          .pipe(gulp.dest(config.tokens.output))
  })
  done();
});

gulp.task('tokens:colors-map', (done) => {
  indexFormats.map((format) => {
      gulp.src(config.tokens.input + '/colors-map.yml')
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: 'deep' }
          }))
          .pipe(rename(function(path) {
              path.basename = 'colors-map';
              path.extname = ".scss";
          }))
          .pipe(gulp.dest(config.tokens.output))
  })
  done();
});

gulp.task(
  'core:tokens',
  gulp.series('tokens:base', 'tokens:colors-map', 'tokens:core', (done) => {
    done();
  })
);


