gulp        = require 'gulp'
stylus      = require 'gulp-stylus'
concat      = require 'gulp-concat'
source      = require 'vinyl-source-stream'
browserify  = require 'browserify'
reactify    = require 'reactify'
del         = require 'del'

gulp.task 'jsx', ->
  del ['./public/js/*'], ->
    browserify
      entries: ['./src/jsx/app.jsx']
    .transform reactify, {stripTypes: true, es6: true}
    .bundle()
    .pipe source 'index.js'
    .pipe gulp.dest './public/js'

gulp.task 'stylus', ->
  del ['./public/css/*'], ->
    gulp.src ['./src/stylus/index.styl']
      .pipe stylus()
      .pipe gulp.dest './public/css'

gulp.task 'watch', ->
  gulp.watch './src/stylus/**/*', ['stylus']
  gulp.watch './src/jsx/**/*', ['jsx']

gulp.task 'default', ['jsx', 'stylus', 'watch']
gulp.task 'release', ['jsx', 'stylus']
