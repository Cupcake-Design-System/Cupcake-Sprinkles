import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import addHeader from 'gulp-header';

var radiusFunction = `
/// Returns the radius value for a given variant.
///
/// @param {String} $radius - how much space do you need.
/// @return {Number} The spacing for the variant in px.
@function radius($value: md) {
  $fetched-value: map-get($radius, $value);

  @if type-of($fetched-value) == number {
    @return $fetched-value;
  } @else {
    @error 'Radius variant #{$radius} not found.';
  }
}
`;

// This runs the task over the files making a map based on default variables
gulp.task('radius', (done) => {
      gulp.src([
        config.tokens.input + '/radius.yml'
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
          .pipe(addHeader(radiusFunction))
          .pipe(gulp.dest(config.tokens.output))
  done();
});


