const gulp = require('gulp');
const theo = require('theo');
const del = require('del');
const Immutable = require("immutable");
const _ = require("lodash");

//Custom formatter for nested map
theo.registerFormat("deep", result => {
  let { category, type } = result
    .get("props")
    .first()
    .toJS();
  return `
  $${type}: (
  ${result
    .get("props")
    .map(
      prop => `
      '${prop.get("name")}': (
        0: $${prop.get("type")}-${prop.get("name")}-0,
        1: $${prop.get("type")}-${prop.get("name")}-1,
        2: $${prop.get("type")}-${prop.get("name")}-2,
        3: $${prop.get("type")}-${prop.get("name")}-3,
        4: $${prop.get("type")}-${prop.get("name")}-4,
        5: $${prop.get("type")}-${prop.get("name")}-5,
        6: $${prop.get("type")}-${prop.get("name")}-6,
        7: $${prop.get("type")}-${prop.get("name")}-7,
        8: $${prop.get("type")}-${prop.get("name")}-8,
        9: $${prop.get("type")}-${prop.get("name")}-9
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
    {{kebabcase prop.name}}: $\{{kebabcase prop.type}}-{{kebabcase prop.name}},
  {{/each}}
  );`);

  theo.registerFormat('default', `
  {{#each props as |prop|}}
  $\{{kebabcase prop.type}}-{{kebabcase prop.name}}: {{#eq prop.type "string"}}"{{/eq}}{{{prop.value}}}{{#eq prop.type "string"}}"{{/eq}} !default;
{{/each}}`);

theo.registerFormat('cssCustomProps', `:root {
  {{#each props as |prop|}}
    {{#if prop.comment}}
    {{{trimLeft (indent (comment (trim prop.comment)))}}}
    {{/if}}
    --{{kebabcase prop.type}}-{{kebabcase prop.name}}: {{#eq prop.type "string"}}"{{/eq}}{{{prop.value}}}{{#eq prop.type "string"}}"{{/eq}};
  {{/each}}
  }`);

theo.registerFormat('JSON', `{
  {{#each props as |prop|}}
    {{#if prop.comment}}
    {{{trimLeft (indent (comment (trim prop.comment)))}}}
    {{/if}}
    "{{kebabcase prop.type}}-{{kebabcase prop.name}}": "{{{prop.value}}}",
  {{/each}}
  }`);



gulp.task('clean', () => del('./dist'));
