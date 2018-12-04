import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import theo from 'theo';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import del from 'del';
import vinylPaths from 'vinyl-paths';
const { Map } = require('immutable');

theo.registerFormat('btnMap', raw => {
  const props = raw.get('props');

  const data = props.map(prop => {
    const value = prop.get('value');
    if (Map.isMap(value)) {
      const name = prop.get('name');

      return {
        name,
        value: value.toObject()
      };
    } else {
      return value;
    }
  });

  const map = data.toArray().map(d => {
const body = Object.keys(d.value).map(k => `
    ${k}: ${d.value[k]}`);

      return `  '${d.name}': ( ${body}
  )`;
  });

  return `$btn-map: (
${map.join('\n')}
) !default;
`;
});

gulp.task('btn', (done) => {
  gulp.src([
    config.tokens.input + '/buttons/button.yml'
  ])
      .pipe(gulpTheo({
          transform: { includeMeta: true },
          format: { type: 'btnMap' }
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(function (path) {
        path.basename = path.basename.replace(/btnMap/, '');
        path.extname = ".scss";
      }))
      .pipe(gulp.dest(config.tokens.output))
done();
});


// gulp.task('type:variables', (done) => {
//   gulp.src([
//     config.tokens.input + '/typography/variables.yml'
//   ])
//       .pipe(gulpTheo({
//           transform: { includeMeta: true },
//           format: { type: 'default.scss' }
//       }))
//       .pipe(vinylPaths(del))
//       .pipe(rename(function (path) {
//         path.basename = path.basename.replace(/default/, '');
//         path.extname = "scss";
//       }))
//       .pipe(gulp.dest(config.tokens.output))
// done();
// });


gulp.task('type:merge', (done) => {
  gulp.src(['./dist/variables.scss', './dist/body.scss', './dist/header.scss'])
      .pipe(vinylPaths(del))
      .pipe(concat('_type.scss'))
      .pipe(gulp.dest(config.tokens.output))
done();
});



