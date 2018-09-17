import pkg from './package';

export default {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,


  root: __dirname,

  tokens: {
    input: 'tokens',
    output: 'dist',
    formats: 'dist/formats'
  },
};
