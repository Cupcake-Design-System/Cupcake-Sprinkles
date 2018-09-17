const gulp = require('gulp');
const theo = require('theo');
const del = require('del');

//Custom formatter for nested map
theo.registerFormat("deep", result => {
  let { category, type } = result
    .get("props")
    .first()
    .toJS();
  return `
  $${category}-${type}: (
  ${result
    .get("props")
    .map(
      prop => `
      '${prop.get("name")}': (
        0: $${prop.get("name")}-0,
        1: $${prop.get("name")}-1,
        2: $${prop.get("name")}-2,
        3: $${prop.get("name")}-3,
        4: $${prop.get("name")}-4,
        5: $${prop.get("name")}-5,
        6: $${prop.get("name")}-6,
        7: $${prop.get("name")}-7,
        8: $${prop.get("name")}-8,
        9: $${prop.get("name")}-9
      ),`
    )
    .sort()
    .join("\n")}
  );
  `;
});


theo.registerFormat('map.variables.scss', `
$\{{stem meta.file}}: (
  {{#each props as |prop|}}
    {{kebabcase prop.name}}: $\{{kebabcase prop.name}},
  {{/each}}
  );`);


gulp.task('clean', () => del('./dist'));
