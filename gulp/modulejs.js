import gulp from 'gulp';
import config from '../config';
import gulpTheo from 'gulp-theo';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';

gulp.task('modulejs', (done) => {
      gulp.src([
        config.tokens.input + '/*.yml',
        '!tokens/_aliases.yml',
        '!tokens/colors-map.yml'
      ])
          .pipe(gulpTheo({
              transform: { includeMeta: true },
              format: { type: 'module' }
          }))
          .pipe(vinylPaths(del))
          .pipe(rename(function (opt) {
            opt.extname = ".js";
            opt.basename = opt.basename.replace(/.module/, '');
            return opt;
          }))
          .pipe(gulp.dest(config.tokens.formats + '/modulejs'))
  done();
});



