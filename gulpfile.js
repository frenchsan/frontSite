var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var del = require('del'); // rm -rf
var purify = require('gulp-purifycss');

// refers to my build directory and or files to
// to delete
var toDelete = [
    'dist',
]

// deletes files
gulp.task('clean', function() {
    return del(toDelete); // rm -rf
});

// Compile LESS files from /less into /css
// gulp.task('less', function() {
//     return gulp.src('less/bureau401.less')
//         .pipe(less())
//         .pipe(gulp.dest('css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

gulp.task('less', function() {

    return new Promise(function(resolve, reject) {
        gulp.src('less/bureau401.less')
            .pipe(less())
            .pipe(gulp.dest('css'));
        gulp.src('less/bootstrap/bootstrap.less')
            .pipe(less())
            .pipe(gulp.dest('css'))
            .pipe(browserSync.reload({
                stream: true
            }));
        resolve();

    })
});

gulp.task('minify-css', () => {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('js/bureau401.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// gulp.task('purifycss', function() {
//     return gulp.src('dist/bootstrap.min.css')
//         .pipe(purify(['**/*.js', '**/*.html']))
//         .pipe(gulp.dest('dist'));
// });

gulp.task('copy', function() {
    return new Promise(function(resolve, reject) {
        gulp.src('node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map')
            .pipe(gulp.dest('dist/bootstrap'));

        gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
            .pipe(gulp.dest('dist/jquery'));

        gulp.src(['node_modules/magnific-popup/dist/*'])
            .pipe(gulp.dest('dist/magnific-popup'))

        gulp.src(['node_modules/scrollreveal/dist/*.js'])
            .pipe(gulp.dest('dist/scrollreveal'))

        gulp.src([
                'node_modules/font-awesome/**',
                '!node_modules/font-awesome/**/*.map',
                '!node_modules/font-awesome/.npmignore',
                '!node_modules/font-awesome/*.txt',
                '!node_modules/font-awesome/*.md',
                '!node_modules/font-awesome/*.json'
            ])
            .pipe(gulp.dest('dist/font-awesome'))


        resolve();
    })

})

// Run everything
gulp.task('default',
    gulp.series('clean', 'less', 'minify-css', 'minify-js', 'copy'));

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
})

// Dev task with browserSync
gulp.task('dev', gulp.series('clean', 'less', 'minify-css', 'minify-js', 'copy', 'browserSync'), function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});