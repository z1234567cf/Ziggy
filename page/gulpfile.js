/**
 * Created by Administrator on 2016/12/22.
 */
var gulp=require("gulp");
var sourceMap=require("gulp-sourcemaps");
var uglify=require("gulp-uglify");
var minify=require("gulp-minify-css");
var rev=require("gulp-rev");
var revCollector=require("gulp-rev-collector");
var revRepalece=require("gulp-rev-replace");
var revForma=require("gulp-rev-format");

// gulp.task("js",function () {
//    return gulp.src("youjin1117/**/*.js")
//        .pipe(rev())
//        .pipe(sourceMap.init())
//        .pipe(uglify())
//        .pipe(sourceMap.write("maps"))
//        .pipe(gulp.dest("dist"))
//        .pipe(rev.manifest())
//        .pipe(gulp.dest("rev/js"));
// });
// gulp.task("html",["js","css"],function () {
//     return gulp.src(["rev/**/*.json","youjin1117/**/*.html"])
//         .pipe( revCollector())
//         .pipe(gulp.dest("dist"));
// });
// gulp.task("css",function () {
//    return gulp.src("youjin1117/**/*.css")
//        .pipe(rev())
//        .pipe(minify())
//        .pipe(gulp.dest("dist"))
//        .pipe(rev.manifest())
//        .pipe(gulp.dest("rev/css"));
// });
// // gulp.task("rev-collector",function () {
// //
// //     }
// // );
// gulp.task("default",["html"]);

gulp.task('rev', function(){
    return gulp.src(['youjin1117/youjin/**/*.*'])
        .pipe(gulp.dest("dist/youjin"))
        .pipe(rev())
        .pipe(revForma({
            prefix: '.', // 在版本号前增加字符
            suffix: '.cache', // 在版本号后增加字符
            lastExt: false
        }))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/"));
});

gulp.task('add-version',['rev'], function() {
    var manifest = gulp.src(["rev/*.json"]);
    function modifyUnreved(filename) {
        return filename;
    }
    function modifyReved(filename) {
        // filename是：admin.69cef10fff.cache.css的一个文件名
        // 在这里才发现刚才用gulp-rev-format的作用了吧？就是为了做正则匹配，
        if (filename.indexOf('.cache') > -1) {
            // 通过正则和relace得到版本号：69cef10fff
            const _version = filename.match(/\.[\w]*\.cache/)[0].replace(/(\.|cache)*/g,"");
            // 把版本号和gulp-rev-format生成的字符去掉，剩下的就是原文件名：admin.css
            const _filename = filename.replace(/\.[\w]*\.cache/,"");
            // 重新定义文件名和版本号：admin.css?v=69cef10fff
            filename = _filename + "?v=" + _version;
            // 返回由gulp-rev-replace替换文件名
            return filename;
        }
        return filename;
    }
    return gulp.src(['youjin1117/youjin/**/*.html'])
    // 删除原来的版本
        .pipe(revRepalece({
            manifest: manifest,
            modifyUnreved: modifyUnreved,
            modifyReved: modifyReved
        }))
        .pipe(gulp.dest('dist/youjin'));
});

gulp.task("test",function () {
   console.log(module);
});