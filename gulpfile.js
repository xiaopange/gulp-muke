var gulp = require("gulp");
var browserify = require("browserify"); //引入browserify
var fs = require("fs"); //引入fs，fs是node的核心模块之一，不需要在npm install下载
var sequence = require("run-sequence"); //可以在一个task 中调用其它的 task。
var watchify = require("watchify"); //引入watchify插件来自动化构建
var uglify=require('gulp-uglify'); //引入gulp-uglify
var source =require('vinyl-source-stream');
var buffer = require("vinyl-buffer");
var gif=require("gulp-if"); //引入gulp-if插件来对gulp处理流程加入条件判断

var coffee =require('gulp-coffee'); //引入gulp-coffee 将coffee代码编译成javascript代码
/**
 * 第一步：安装gulp-coffee: cnpm install --save-dev gulp-coffee
 * 第二步：定义coffee任务，先将assets/js 下的所有coffee文件编译成javascript代码（会生成在build/js下）
*/
var isProduction =process.env.ENV === 'prod';
gulp.task("mainjs", function() {
  var b = browserify({//把browserify初始化的结果赋值给变量b
    entries: ["build/js/index.js"], //所要编译的文件的入口。index.js中虽然依赖与很多文件但其是入口文件
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  var bundle = function bundle() {
		// bundle 方法后得到的文件内容流是node标准流 并不是gulp 支持的vinyl流。需要通过vinyl-source-stream转化
		b
      .bundle()
      .pipe(source("coffee.js")) //source()后可以转化成vinyl标准流，main2.js是vinyl虚拟文件也是最终要生成的文件
      .pipe(buffer())
      .pipe(gif(isProduction,uglify())) //uflify之前通过gif判断是否是发布阶段，是则uglify,否则不uglify
      .pipe(gulp.dest("./js/"));
  };
  bundle();
  b.on("update", bundle);
}); 
//将assets/js 下的所有coffee文件转为javascript并输出到build/js下
gulp.task('coffee',function(){
	gulp.src('./assets/js/*.coffee')
	.pipe(coffee())
	.pipe(gulp.dest('./build/js/'))
});
//定义一个coffeeWatch任务使用gulp的watch任务来监听assest/js下的所有coffee文件的修改
gulp.task('coffeeWatch',function(){
	gulp.watch('./assets/js/*.coffee',function(){
		sequence("coffee");
	})
});
gulp.task("default", function() {
	//先执行coffee任务，再执行coffeeWatch，再执行mainjs任务
  sequence("coffee","coffeeWatch","mainjs");
});

