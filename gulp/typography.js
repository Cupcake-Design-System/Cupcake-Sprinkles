import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import theo from 'theo';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import del from 'del';
import vinylPaths from 'vinyl-paths';

theo.registerFormat('mixins', (result) => {
  const mixins = [];

  result.get('props').forEach((prop) => {
    const name = prop.get('name');
    const value = prop.get('value');
    const type = prop.get("type");
    const declarations = [];
    let mixin = '';

    value.forEach((val, key) => {
      declarations.push(`${key}: ${val};`);
    });

    mixin = `@mixin ${type}-${name}() {
${declarations.join('\n  ')}
}`;

    mixins.push(mixin);
  });

  return `${mixins.join('\n\n')}\n`;
});


theo.registerFormat("size-map", result => {
  let { category, type } = result
    .get("props")
    .first()
    .toJS();
  return `
  $${category}-text-sizes: (
  ${result
    .get("props")
    .map(
      prop => `'${prop.get("name")}': (
        font-size: $font-${prop.get("type")}-${prop.get("name")},
        font-weight: $font-${prop.get("type")}-${prop.get("name")}-weight,
        line-height: $font-${prop.get("type")}-${prop.get("name")}-line-height
      ),`
    )
    .sort()
    .join("\n")}
  );
  `;
});


gulp.task('type:sizes', (done) => {
  gulp.src([
    config.tokens.input + '/typography/body.yml',
    config.tokens.input + '/typography/header.yml'
  ])
      .pipe(gulpTheo({
          transform: { includeMeta: true },
          format: { type: 'size-map' }
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(function (path) {
        path.basename = path.basename.replace(/size-map/, '');
        path.extname = ".scss";
      }))
      .pipe(vinylPaths(del))
      .pipe(concat('_map.scss'))
      .pipe(gulp.dest(config.tokens.output + '/typography'))
done();
});


gulp.task('type:variables', (done) => {
  gulp.src([
    config.tokens.input + '/typography/variables.yml'
  ])
      .pipe(gulpTheo({
          transform: { includeMeta: true },
          format: { type: 'default.scss' }
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(function (path) {
        path.basename = path.basename.replace(/default/, '');
        path.extname = "scss";
      }))
      .pipe(gulp.dest(config.tokens.output + '/typography'))
done();
});


gulp.task('type:mixins', (done) => {
  gulp.src([
    config.tokens.input + '/typography/body.yml',
    config.tokens.input + '/typography/header.yml'
  ])
      .pipe(gulpTheo({
          transform: { includeMeta: true },
          format: { type: 'mixins' }
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(function (path) {
        path.basename = path.basename.replace(/default/, '');
        path.extname = "scss";
      }))
      .pipe(vinylPaths(del))
      .pipe(concat('_mixins.scss'))
      .pipe(gulp.dest(config.tokens.output + '/typography'))
done();
});


gulp.task('type:merge', (done) => {
  gulp.src(['./dist/typography/variables.scss', './dist/typography/body.scss', './dist/typography/header.scss'])
      .pipe(vinylPaths(del))
      .pipe(concat('_type.scss'))
      .pipe(gulp.dest(config.tokens.output + '/typography'))
done();
});


gulp.task(
  'typography',
  gulp.series('type:sizes', 'type:mixins', 'type:variables', (done) => {
    done();
  })
);
