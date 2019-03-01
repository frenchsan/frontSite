<<<<<<< Updated upstream
=======
// var gulp = require('gulp');
// var less = require('gulp-less');
// var browserSync = require('browser-sync').create();
// var header = require('gulp-header');
// var cleanCSS = require('gulp-clean-css');
// var rename = require("gulp-rename");

// var pkg = require('./package.json');
// var del = require('del'); // rm -rf
// var purify = require('gulp-purifycss');
// var watch = require('gulp-watch');
// const imagemin = require('gulp-imagemin');

// // refers to my build directory and or files to
// // to delete
// var toDelete = [
//     'dist', 'css'
// ]

// // deletes files
// gulp.task('clean', function() {
//     return del(toDelete); // rm -rf
// });

// // Compile LESS files from /less into /css
// // gulp.task('less', function() {
// //     return gulp.src('less/bureau401.less')
// //         .pipe(less())
// //         .pipe(gulp.dest('css'))
// //         .pipe(browserSync.reload({
// //             stream: true
// //         }))
// // });

// gulp.task('less', function() {

//     return new Promise(function(resolve, reject) {
//         gulp.src('node_modules/bootstrap/less/bootstrap.less')
//             .pipe(less())
//             .pipe(gulp.dest('css'));
//         gulp.src('less/bureau401.less')
//             .pipe(less())
//             .pipe(gulp.dest('css'))
//             .pipe(browserSync.reload({
//                 stream: true
//             }));y
//         resolve();

//     })
// });

// gulp.task('minify-css', () => {
//     return gulp.src('css/*.css')
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest('dist'))
       
// });

// gulp.task('minify-img', () =>
//     gulp.src('img/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/img'))
// );

// // Minify JS
// gulp.task('minify-js', function() {
//     return gulp.src('js/bureau401.js')
//         .pipe(uglify())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('dist/js'))
      
// });

// // gulp.task('purifycss', function() {
// //     return gulp.src('dist/bootstrap.min.css')
// //         .pipe(purify(['**/*.js', '**/*.html']))
// //         .pipe(gulp.dest('dist'));
// // });

// gulp.task('copy', function() {
//     return new Promise(function(resolve, reject) {
//         gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
//             .pipe(gulp.dest('dist/bootstrap/js'));

//         gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
//             .pipe(gulp.dest('dist/jquery'));

//         gulp.src(['node_modules/scrollreveal/dist/*.js'])
//             .pipe(gulp.dest('dist/scrollreveal'))

//         gulp.src([
//                 'node_modules/font-awesome/**',
//                 '!node_modules/font-awesome/**/*.map',
//                 '!node_modules/font-awesome/.npmignore',
//                 '!node_modules/font-awesome/*.txt',
//                 '!node_modules/font-awesome/*.md',
//                 '!node_modules/font-awesome/*.json'
//             ])
//             .pipe(gulp.dest('dist/font-awesome'))


//         resolve();
//     })

// })

// // Run everything
// gulp.task('default',
//     gulp.series('clean', 'less','copy', 'minify-css', 'minify-js' ));

// // Configure the browserSync task
// gulp.task('browserSync', function() {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         },
//     })
// })

// // Dev task with browserSync
// gulp.task('dev', gulp.series('clean', 'less', 'minify-css', 'minify-js', 'minify-img', 'copy', 'browserSync'), function() {
//     gulp.watch('less/*.less', ['less']);
//     gulp.watch('css/*.css', ['minify-css']);
//     gulp.watch('js/*.js', ['minify-js']);
//     // Reloads the browser whenever HTML or JS files change
//     gulp.watch('index.html', browserSync.reload);
//     gulp.watch('js/**/*.js', browserSync.reload);
//     gulp.watch('less/**/*.less', browserSync.reload);
// });
>>>>>>> Stashed changes

    const { watch, series, src, dest, parallel } = require('gulp');
    var less = require('gulp-less');
    const { path } = require('path');
    var cleanCSS = require('gulp-clean-css');
    var rename = require("gulp-rename");
    var uglify = require('gulp-uglify');
    var del = require('del'); 
    const terser = require('gulp-terser');
    const htmlmin = require('gulp-htmlmin');

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


function copytoDist(cb) {
  // body omitted
  cb();
}

watch('less/*.*', series(clean,parallel(compileLessBootstrap,compileLessApplication,copyScrollreveal,copyFontAwesome),cleancss,minifyJs,minifyJsobserver,copyBootstrapJs, minifyCss,minifyHtml, copytoDist));
//exports.build = series(clean, compileLess, minifyCss, copytoDist);
exports.default = series(clean,parallel(compileLessBootstrap,compileLessApplication,copyScrollreveal,copyFontAwesome),cleancss,minifyJs,minifyJsobserver,copyBootstrapJs, minifyCss, minifyHtml,copytoDist);

<<<<<<< Updated upstream
=======

  
>>>>>>> Stashed changes
