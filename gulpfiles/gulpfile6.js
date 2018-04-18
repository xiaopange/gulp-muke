var gulp = require("gulp");
var browserify = require("browserify"); //引入browserify
var fs = require("fs"); //引入fs，fs是node的核心模块之一，不需要在npm install下载
var sequence = require("run-sequence"); //可以在一个task 中调用其它的 task。
var watchify = require("watchify"); //引入watchify插件来自动化构建
var uglify = require("gulp-uglify"); //引入gulp-uglify
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

var gif = require("gulp-if"); //引入gulp-if插件来对gulp处理流程加入条件判断

/** （2） 使用gulp-if插件在uglify时加入条件判断。通过使用 环境变量 来判断当是发布阶段的构建时则uglify，若是开发阶段则不使用uglify。
 * 在调用browserify 的bundle方法后所得到的文件内容流并不是gulp所能识别的流。
 * gulp并没有使用node 提供的流作为标准，而是使用了vinyl-fs的文件系统识别器来处理文件内容，
 * vinyl-fs: https://github.com/gulpjs/vinyl-fs ； vinyl： https://github.com/gulpjs/vinyl
 * vinyl-fs 是适配器，是以vinyl这种文件格式为标准，在vinyl 和文件系统之间简历桥梁，在一定程度上对文件系统的文件路径和文件内容做了封装，并提供了简单的api供访问。也即是 src 和 dest 方法。
 * src 方法是用于读取文件内容并转化成符合vinyl标准的流。
 * dest方法是将vinyl的流写入文件中去。
 * vinyl-buffer ：uglify接收的是buffer 而不是stream。因为stream(流)是一个动态的过程，通过source()方法数据是一点一点传到写一个pipe(uglify())中的，但是uglify需要设计到变量/语法重构等需要对整体文件内容做一个判断。
 * fs.createWriteStream("js/main.js") 是node 将stream(流)写入文件的方法。这里使用了buffer后就不需要了。
 * 最终uglify 后可以将js 代码压缩增加代码的安全性。
 */
/**
 * 第一步：定义isProduction变量。
 * process 是node的预定义变量(不需要我们来定义)其目的是获取当前进程的所有信息。
 * process.env 可以获取这个进程执行时所有环境变量。
 * process.env.ENV==='prod' 获取process.env中ENV字段的值 是否等于 'prod'，若是则isProduction==true 也即是发布阶段。
 * 最后在uglify()调用的地方加入gif判断
 * 可以在命令行中 ENV=prod gulp ； 这样就可以设置process.env.ENV的值为'prod'
 */
var isProduction = process.env.ENV === "prod";
gulp.task("mainjs", function() {
  var b = browserify({
    //把browserify初始化的结果赋值给变量b
    entries: ["assets/js/index.js"], //所要编译的文件的入口。index.js中虽然依赖与很多文件但其是入口文件
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  var bundle = function bundle() {
    // bundle 方法后得到的文件内容流是node标准流 并不是gulp 支持的vinyl流。需要通过vinyl-source-stream转化
    b
      .bundle()
      .pipe(source("main2.js")) //source()后可以转化成vinyl标准流，main2.js是vinyl虚拟文件也是最终要生成的文件
      .pipe(buffer())
      .pipe(gif(isProduction, uglify())) //uflify之前通过gif判断是否是发布阶段，是则uglify,否则不uglify
      .pipe(gulp.dest("./js/"));
  };
  bundle();
  b.on("update", bundle);
});
gulp.task("default", function() {
  sequence("mainjs");
});
