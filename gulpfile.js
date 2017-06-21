var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var babel        = require('gulp-babel');
var uglify       = require('gulp-uglify');

gulp.task('css', function() {
  gulp.src('./src/css/*.css')
      .pipe(autoprefixer())
      .pipe(minifycss())
      .pipe(gulp.dest('./production/css'));
});

gulp.task('js', function() {
  gulp.src('./src/js/*.js')
      .pipe(babel({
        presets: [['es2015', {
          test:    /\.js$/,
          loader:  'babel',
          exclude: /node_modules/,
          query: {compact: false}
        }]]
      }))
      .pipe(uglify())
      .pipe(gulp.dest('./production/js'))
});

gulp.task('lib', function() {
  gulp.src('./src/lib/**')
      .pipe(gulp.dest('./production/lib'));
});

gulp.task('html', function() {
  gulp.src('./src/*.html')
      .pipe(gulp.dest('./production'));
});

gulp.task('manifest', function() {
  gulp.src('./src/manifest.json')
      .pipe(gulp.dest('./production'));
});

gulp.task('img', function() {
  gulp.src('./src/img/**')
      .pipe(gulp.dest('./production/img'));
});

gulp.task('license', function() {
  gulp.src('./LICENSE')
      .pipe(gulp.dest('./production'));
});

gulp.task('default', ['css', 'js', 'lib', 'html', 'manifest', 'img', 'license']);
