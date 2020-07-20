'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', function (done) {
    gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
    done();
});

gulp.task('sass:watch', function(done){
    gulp.watch('./css/*.scss', gulp.series('sass'));
    done();
});

gulp.task('browser-sync', function(done) {
    var files = ['./*.html', './css/*.css', './assets/images/*.{png, jpg, gif}', './js/*.js']
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
    done();
});

gulp.task('default', gulp.series('browser-sync'), function(){
    gulp.start('sass:watch');
});

gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('copyfonts', function(){
    gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function(){
    return gulp.src('./assets/images/*.{png,jpg,jpeg,gif}').
    pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('usemin', function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream,file){
        return stream
        .pipe(usemin({
            css: [rev()],
            html: [function() { return htmlmin({collapseWhitespace: true}) }],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss, 'concat']
        }));
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('clean'), function(){
    gulp.start('copyfonts','imagemin', 'usemin')
})