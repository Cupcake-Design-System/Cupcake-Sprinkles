import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';
import addHeader from 'gulp-header';

var colorFunction = `
/// Returns the color value for a given color name and group.
/// @param {String} $value [primary] - The color's base.
/// @param {Number} $range [7] - The darkness/lightness of the color. Defaults to 7. The higher the number, the darker the color.
/// @return {Color} - The color value.
@function color($value: primary, $range: 7) {

  @if $value == black {
    @return $color-black;
  } @else if $value == white {
    @return $color-white;
  } @else if $value == gray {
    @return config($color, 'gray', $range);
  } @else if {
    @return config($color, $value, $range);
  } @else {
    @error 'Color #{value} - #{$range} not found.';
  }
}
`;


gulp.task('color', (done) => {
  gulp.src(config.tokens.input + '/colors-map.yml')
      .pipe(gulpTheo({
          transform: { includeMeta: true },
          format: { type: 'deep' }
      }))
      .pipe(rename(function(path) {
          path.basename = '_colors-map';
          path.extname = ".scss";
      }))
      .pipe(addHeader(colorFunction))
      .pipe(gulp.dest(config.tokens.output))
done();
});
