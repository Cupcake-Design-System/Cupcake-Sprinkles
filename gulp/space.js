import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import addHeader from 'gulp-header';

var spaceFunction = `
/// Returns the spacing value for a given variant.
///
/// @param {String} $space - how much space do you need.
/// @return {Number} The spacing for the variant in px.
@function space($value: md) {
  $fetched-value: map-get($space, $value);

  @if type-of($fetched-value) == number {
    @return $fetched-value;
  } @else {
    @error 'Spacing variant #{$space} not found.';
  }
}
`;

// This runs the task over the files making a map based on default variables
gulp.task('space', (done) => {
      gulp.src([
        config.tokens.input + '/space.yml'
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
          .pipe(addHeader(spaceFunction))
          .pipe(gulp.dest(config.tokens.output))
  done();
});


