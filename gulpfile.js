var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var babel        = require('gulp-babel');
var uglify       = require('gulp-uglify');

gulp.task('css', function() {
  gulp.src('./src/css/*.css')
      .pipe(plumber())
      .pipe(autoprefixer())
      .pipe(minifycss())
      .pipe(gulp.dest('.'));
});

gulp.task('js', function() {
  gulp.src('./src/js/*.js')
      .pipe(plumber())
      .pipe(babel({
        presets: [['es2015', {
          test:    /\.js$/,
          loader:  'babel',
          exclude: /node_modules/,
          query: {compact: false}
        }]]
      }))
      .pipe(uglify())
      .pipe(gulp.dest('.'))
});

gulp.task('lib', function() {
  gulp.src('./src/lib/**')
      .pipe(plumber())
      .pipe(gulp.dest('.'));
});

gulp.task('html', function() {
  gulp.src('./src/*.html')
      .pipe(plumber())
      .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch([
    './src/css/*.css',
    './src/js/*.js',
    './src/lib/**',
    './src/*.html'
  ], [
    'css', 'js', 'lib', 'html'
  ]);
});

gulp.task('default', ['css', 'js', 'lib', 'html', 'watch']);
