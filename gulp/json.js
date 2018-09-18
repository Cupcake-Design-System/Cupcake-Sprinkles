import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';


gulp.task('json', (done) => {
      gulp.src([
        config.tokens.input + '/*.yml',
        '!tokens/_aliases.yml',
        '!tokens/colors-map.yml'
      ])
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: 'JSON' }
          }))
          .pipe(vinylPaths(del))
          .pipe(rename(function (opt) {
            opt.extname = ".json";
            opt.basename = opt.basename.replace(/.js/, '');
            return opt;
          }))
          .pipe(gulp.dest(config.tokens.formats + '/json'))
  done();
});



