import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';

const Immutable = require("immutable");
const _ = require("lodash");
const theo = require('theo');


//Using standard - this isn't working yet
theo.registerFormat("common", def => {
    const content = def
      .get("props")
      .map(prop => {
        let result = Immutable.List();
        const j = _.camelCase(prop.get("type"));
        const k = _.capitalize(prop.get("name"));
        const v = JSON.stringify(prop.get("value"));
        result = result.push(`  ${j}${k}: ${v},`);
        return result;
      })
      .flatten(3)
      .toArray()
      .join("\n");
    return ["module.exports = {", content, "};"].join("\n");
});

gulp.task('commonjs', (done) => {
      gulp.src([
        config.tokens.input + '/*.yml',
        '!tokens/_aliases.yml',
        '!tokens/colors-map.yml'
      ])
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: 'common.js' }
          }))
          .pipe(rename(function(path) {
            path.extname = ".js";
        }))
          .pipe(gulp.dest(config.tokens.formats + '/commonjs'))
  done();
});



