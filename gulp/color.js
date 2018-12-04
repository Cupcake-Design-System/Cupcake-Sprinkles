import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import theo from 'theo';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import del from 'del';
import vinylPaths from 'vinyl-paths';
const { Map } = require('immutable');


// this gets colors from deep map yml format
theo.registerFormat('color-var-deep', (result) => {
  const colors = [];

  result.get('props').forEach((prop) => {
    const name = prop.get('name');
    const value = prop.get('value');
    const declarations = [];
    let color = '';

    value.forEach((val, key) => {
      declarations.push(`$color-${name}-${key}: ${val} !default;`);
    });

    color = `${declarations.join('\n  ')}`;

    colors.push(color);
  });

  return `${colors.join('\n\n')}\n`;
});

gulp.task('color:variables', (done) => {
  gulp.src([
    config.tokens.input + '/colors-map.yml',
    config.tokens.input + '/colors-map-extended.yml'
  ])
      .pipe(gulpTheo({
          transform: { includeMeta: true },
          format: { type: 'color-var-deep' }
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(function (path) {
        path.basename = path.basename.replace(/color-var-deep/, '');
        path.extname = "var.scss";
      }))
      .pipe(vinylPaths(del))
      .pipe(concat('_colors.scss'))
      .pipe(gulp.dest(config.tokens.output + '/colors'))
done();
});


theo.registerFormat('color-deep-map', raw => {
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

  return `$color-map: (
${map.join('\n')}
) !default;
`;
});


gulp.task('color:map', (done) => {
  gulp.src([
    config.tokens.input + '/colors-map.yml',
    config.tokens.input + '/colors-map-extended.yml'
  ])
      .pipe(gulpTheo({
          transform: { includeMeta: true },
          format: { type: 'color-deep-map' }
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(function (path) {
        path.basename = path.basename.replace(/color-deep-map/, '');
        path.extname = ".scss";
      }))
      .pipe(vinylPaths(del))
      .pipe(concat('_colors-map.scss'))
      .pipe(gulp.dest(config.tokens.output + '/colors'))
done();
});




gulp.task('color:merge', (done) => {
  gulp.src(['./dist/colors/_colors.scss', './dist/colors/_colors-map.scss'])
      .pipe(vinylPaths(del))
      .pipe(concat('_colors.scss'))
      .pipe(gulp.dest(config.tokens.output + '/colors'))
done();
});


gulp.task(
  'color',
  gulp.series('color:map', 'color:variables', (done) => {
    done();
  })
);

