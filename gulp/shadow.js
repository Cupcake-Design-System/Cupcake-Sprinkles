import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import addHeader from 'gulp-header';

var shadowFunction = `
/// Returns the shadow for the specified depth
///
/// @param {String} $value - The shadow's depth.
/// @return {List} The shadow value.
@function shadow($value: sm) {
  $fetched-value: map-get($shadow, $value);

  @if type-of($fetched-value) == list {
    @return $fetched-value;
  } @else {
    @error 'Shadow variant #{$depth} not found.';
  }
}
`;

// This runs the task over the files making a map based on default variables
gulp.task('shadow', (done) => {
      gulp.src([
        config.tokens.input + '/shadow.yml'
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
          .pipe(addHeader(shadowFunction))
          .pipe(gulp.dest(config.tokens.output))
  done();
});


