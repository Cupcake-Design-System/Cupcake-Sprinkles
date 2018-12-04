const { Map } = require('immutable');

module.exports = theo => {

  theo.registerFormat('scss', raw => {
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
    ${k}: $font-${d.name}-${k}`);
      return `'${d.name}': (${body}
  )`;
    });

return `$font: (
  ${map.join('\n')}
) !default;
`;
  });
};
