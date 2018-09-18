import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';

const Immutable = require("immutable");
const _ = require("lodash");
const theo = require('theo');

theo.registerFormat("common", result => {
module.exports = def => {
  const content = def
    .get("props")
    .map(prop => {
      let result = Immutable.List();
      const j = _.camelCase(prop.get("type"));
      const k = _.camelCase(prop.get("name"));
      const v = JSON.stringify(prop.get("value"));
      result = result.push(`  ${j}-${k}: ${v},`);
      return result;
    })
    .flatten(1)
    .toArray()
    .join("\n");
  return ["module.exports = {", content, "};"].join("\n");
};});

gulp.task('commonjs', (done) => {
      gulp.src([
        config.tokens.input + '/*.yml',
        '!tokens/_aliases.yml',
        '!tokens/colors-map.yml'
      ])
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: 'common' }
          }))
          .pipe(vinylPaths(del))
          .pipe(rename(function (opt) {
            opt.basename = opt.basename.replace(/.js/, '');
            return opt;
          }))
          .pipe(gulp.dest(config.tokens.formats + '/commonjs'))
  done();
});



