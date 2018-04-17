var gulp = require("gulp");
var browserify = require("browserify"); //引入browserify
var fs = require("fs"); //引入fs，fs是node的核心模块之一，不需要在npm install下载
var sequence = require("run-sequence"); //可以在一个task 中调用其它的 task。

var watchify = require("watchify"); //引入watchify插件来自动化构建
/**
 * 因为 default 是 gulp默认的task,比较特殊，再加上可能经常修改default执行的内容，所以这里不要将js的构建直接写到default中；新建mainjs 的task用来 执行browserify 构建 js.
 * 这样就意味着要在一个task(default)中调用另外一个task(mainjs)，这需要用到node 的 run-sequence 模块。这个模块的作用可以以 “任务名称” 作为 "参数" 来调用不同的任务。
 * 然后就可以在 default 中利用sequence('mainjs') 来调用mainjs 任务。
 * 同时可以使用gulp 的watch 任务来监听相关文件目录下的改动而触发相应的任务执行。
 */
gulp.task("default", function () {
    //定义任务用 task；default是gulp默认的任务;sequence模块可以在一个task 中调用其它的 task。
    //(1)在默认任务default中利用sequence先执行 mainjs任务，再执行watch 任务；这里可以传多个任务名做参数。
    sequence('mainjs','watch') ;

    //（2）使用了watchify插件后不需要调用 watch 任务了
    //sequence("mainjs2");
});
gulp.task('mainjs', function () {
    browserify()
        .add("assets/js/index.js")
        .bundle()
        .pipe(fs.createWriteStream("js/main.js"));
});
gulp.task('watch', function () {
    //监听assets/js 下所有的js文件若发生改动则调用mainjs 任务
    gulp.watch('assets/js/*.js', function () {
        sequence('mainjs')
    });
});

/** (2)
 * 同时也可以使用 watchify插件来监听 文件的改动而触发相应的任务。
 * 使用了watchify后默认任务default中只需要通过sequence("mainjs2") 调用mainjs2 任务即可，不需要再定义watch 任务
*/
gulp.task('mainjs2', function () {
    //把browserify初始化的结果赋值给变量b
    var b = browserify({ 
        entries: ['assets/js/index.js'],  //所要编译的文件的入口。index.js中虽然依赖与很多文件但其是入口文件
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });
    //当browserify 初始化后会有各update事件，每当监听文件发生变化时都会触发update事件
    b.on('update', function () { 
        bundle()
    });
    bundle()
    function bundle() {
        b.bundle().pipe(fs.createWriteStream("js/main.js"));
    };
});

