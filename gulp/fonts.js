import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import addHeader from 'gulp-header';

var fontBodyFunction = `
/// Returns the font size for a given size definition.
///
/// @param {String} $value - The font size.
/// @return {Number} The font-size for the given definition.
@function font-size($value: md) {
  $fetched-font-size: map-get($font-body, $value);

  @if type-of($fetched-font-size) != null {
    @return $fetched-font-size;
  } @else {
    @error 'Font size not found.';
  }
}
`;

// This runs the task over the files making a map based on default variables
gulp.task('font-body:map', (done) => {
      gulp.src([
        config.tokens.input + '/font-body.yml'
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
          .pipe(addHeader(fontBodyFunction))
          .pipe(gulp.dest(config.tokens.output))
  done();
});


// This runs the task over the files making a map based on default variables
gulp.task('font-header:map', (done) => {
      gulp.src([
        config.tokens.input + '/font-header.yml'
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
          .pipe(gulp.dest(config.tokens.output))
  done();
});


var fontFamilyFunction = `
/// Returns the font family for a given definition.
///
/// @param {String} $value - The font key.
/// @return {Number} The font-family for the given definition.
@function font($value: sans) {
  $fetched-font: map-get($font-family, $value);

  @if type-of($fetched-font) != null {
    @return $fetched-font;
  } @else {
    @error 'Font family #{$value} not found.';
  }
}
`;

gulp.task('font-family:map', (done) => {
  gulp.src([
    config.tokens.input + '/font-family.yml'
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
      .pipe(addHeader(fontFamilyFunction))
      .pipe(gulp.dest(config.tokens.output))
done();
});



var fontWeightFunction = `
/// Returns the font weight for a given weight definition.
///
/// @param {String} $weight - The font weight.
/// @return {Number} The font-weight for the text-weight.
@function font-weight($value: normal) {
  $fetched-font-weight: map-get($font-weight, $value);

  @if type-of($fetched-font-weight) != null {
    @return $fetched-font-weight;
  } @else {
    @error 'Font weight not found.';
  }
}
`;

// This runs the task over the files making a map based on default variables
gulp.task('font-weight:map', (done) => {
      gulp.src([
        config.tokens.input + '/font-weight.yml'
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
          .pipe(addHeader(fontWeightFunction))
          .pipe(gulp.dest(config.tokens.output))
  done();
});


var lineHeightFunction = `
/// Returns the line height for a given range.
///
/// @param {Number} $range - The font style.
/// @return {Number} The line-height for the text-style.
@function line-height($value: normal) {
  $fetched-line-height: map-get($line-height, $value);

  @if type-of($fetched-line-height) != null {
    @return $fetched-line-height;
  } @else {
    @error 'Line height not found.';
  }
}
`;

// This runs the task over the files making a map based on default variables
gulp.task('line-height:map', (done) => {
      gulp.src([
        config.tokens.input + '/line-height.yml'
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
          .pipe(addHeader(lineHeightFunction))
          .pipe(gulp.dest(config.tokens.output))
  done();
});


gulp.task(
  'font',
  gulp.series('font-body:map', 'font-header:map', 'font-family:map', 'font-weight:map', 'line-height:map', (done) => {
    done();
  })
);

