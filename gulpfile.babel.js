import config from './config';
import gulp from 'gulp';
import requiredir from 'require-dir';
import c from "ansi-colors";


console.log(c.yellow(`Building Cupcake v${config.version} Tokens 🎂`));

requiredir('./gulp');


gulp.task(
  'default',
  gulp.series('clean:tokens', 'tokens:colors-map', 'tokens:map', 'tokens:core', (done) => {
    done();
  })
);


gulp.task(
  'extended',
  gulp.series('clean:tokens', 'default', 'custom-properties', 'cssmodules', 'commonjs', 'json', 'modulejs', 'raw', (done) => {
    done();
  })
);
