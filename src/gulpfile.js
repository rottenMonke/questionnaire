const gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat');
;

/* Task to compile less */
  gulp.task('styles', function () {
    return gulp.src('./static/styles/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./'));
  })

  /* Task to watch less changes */
  gulp.task('watch-styles', function() {  
     gulp.watch('./static/styles/**/*.less' , ['styles']);
  });
   
   
  /* Task when running `gulp` from terminal */
  gulp.task('default', ['watch-styles']);