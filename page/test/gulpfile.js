/**
 * Created by Administrator on 2016/12/15.
 */
var gulp = require('gulp'),
    sass=require('gulp-sass');
gulp.task('default',function(){
    gulp.src("sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"));
});
gulp.task("watchScss",function () {
    gulp.watch("sass/*.scss",['default']);
});
gulp.task("show",function (e) {
   console.log("e",e,"gulp",gulp);
});
