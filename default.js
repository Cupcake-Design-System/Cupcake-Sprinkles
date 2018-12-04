const { Map } = require('immutable');

module.exports = theo => {
theo.registerFormat('scss', `{{#each props as |prop|}}
$\{{kebabcase prop.type}}-{{kebabcase prop.name}}: {{#eq prop.type "string"}}"{{/eq}}{{{prop.value}}}{{#eq prop.type "string"}}"{{/eq}} !default;
{{/each}}`);
};


