
    const { watch, series, src, dest, parallel } = require('gulp');
    var less = require('gulp-less');
    const { path } = require('path');
    var cleanCSS = require('gulp-clean-css');
    var rename = require("gulp-rename");
    var uglify = require('gulp-uglify');
    var del = require('del'); 
    const terser = require('gulp-terser');
    const htmlmin = require('gulp-htmlmin');
    const imagemin = require('gulp-imagemin');

function clean() {
    return del(['dist/*.*','css']);
}


function compileLessBootstrap(cb) {
  // body omitted
    return src('node_modules/bootstrap/less/bootstrap.less')
      .pipe(less())
      .pipe(dest('css'));
  }

function compileLessApplication(cb) {
  // body omitted
    return src('less/bureau401.less')
      .pipe(less())
      .pipe(dest('css'));
  }

function minifyCss(cb) {
  
    return src('css/*.css')
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(dest('dist'))
}

function minifyJs(){
   
     return src('js/bureau401.js')
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest('dist/js'))
}

function copyBootstrapJs(){
   
     return src('node_modules/bootstrap/dist/js/bootstrap.min.js')           
            .pipe(dest('dist/js'))   
}

function copyScrollreveal(){
     return src(['node_modules/scrollreveal/dist/*.js'])
            .pipe(dest('dist/scrollreveal'))
}
function copyFontAwesome() {
  return src(['node_modules/font-awesome/**',
  '!node_modules/font-awesome/**/*.map',
  '!node_modules/font-awesome/.npmignore',
  '!node_modules/font-awesome/*.txt',
  '!node_modules/font-awesome/*.md',
  '!node_modules/font-awesome/*.json'
])
  .pipe(dest('dist/font-awesome'))
}
  

function minifyHtml() {
  
    return src('*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest('dist'));
  
}

function minifyJsobserver(){
   
    return src('js/intersection-observer-script.js')
           .pipe(terser())
           .pipe(rename({ suffix: '.min' }))
           .pipe(dest('dist/js'))
}

function cleancss() {

    return src('css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(dest('css/'));

}

function imageminifier(){

    return src('img/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
}





function copytoDist(cb) {
  // body omitted
  cb();
}

watch('less/*.*', series(clean,parallel(compileLessBootstrap,compileLessApplication,copyScrollreveal,copyFontAwesome),imageminifier,cleancss,minifyJs,minifyJsobserver,copyBootstrapJs, minifyCss,minifyHtml, copytoDist));
//exports.build = series(clean, compileLess, minifyCss, copytoDist);
module.exports.default = series(clean,parallel(compileLessBootstrap,compileLessApplication,copyScrollreveal,copyFontAwesome),imageminifier,cleancss,minifyJs,minifyJsobserver,copyBootstrapJs, minifyCss, minifyHtml,copytoDist);
module.exports.dev = series(clean,parallel(compileLessBootstrap,compileLessApplication,copyScrollreveal,copyFontAwesome),cleancss,minifyJs,minifyJsobserver,copyBootstrapJs, minifyCss, minifyHtml,copytoDist);

