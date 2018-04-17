var gulp = require("gulp");
var shelljs=require('shelljs'); //引入shelljs

var browserify = require("browserify"); //引入browserify
var fs = require("fs"); //引入fs，fs是node的核心模块之一，不需要在npm install下载
gulp.task("default", function () {
    //定义任务用 task；default是gulp默认的任务
    //(1)通过shelljs来调用browserify，browserify可以作为可执行文件直接再shelljs中调用
    shelljs.exec('browserify js/index.js -o js/main.js')

    /**
     *(2)通过node来调用browserify
     *browserify() 是初始化 ， add('js/index.js')是将此js作为输入文件输入到browserify中;
     *bundle() 步骤后生成的只是文字内容的stream，还要调用fs模块的createWriteStream()方法将其生成文件，fs.createWriteStream('js/main.js') 里的参数是要生成文件的路劲。
    */
    browserify().add('js/index.js').bundle().pipe(fs.createWriteStream('js/main.js'))   
});
