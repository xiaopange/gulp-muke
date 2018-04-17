var gulp = require("gulp");
var browserify = require("browserify"); //引入browserify
var fs = require("fs"); //引入fs，fs是node的核心模块之一，不需要在npm install下载
var sequence = require("run-sequence"); //可以在一个task 中调用其它的 task。
var watchify = require("watchify"); //引入watchify插件来自动化构建

//不使用browserify - shim 来构建第三方类库

/** 第1步：定义vendorjs任务
 * borwserify 初始化并将结果复制给变量bb。然后对angular和lodash调用browserify的require方法，
 * 并且用expose属性暴露出两者的名称来（相当于为angular 和 lodash 取个别名）。
 * 这样做使得生成的vendor.js文件内容能在main.js文件中被使用。
 * 最后调用bundel()方法 将结果输出到一个文件中(vendor.js)。
*/
gulp.task("vendorjs", function () {
    var bb = browserify()
        .require("./bower_components/angular/angular.js", { expose: "angular" })
        .require("./bower_components/lodash/dist/lodash.js", { expose: "lodash" })
        .bundle()
        .pipe(fs.createWriteStream("./js/vendor.js"));
}); 
/**
 * 第2步： 定义mainjs任务
 * 使用了browserify的external()方法引入vendorjs任务生成的文件内容，这样main.js就可以使用这两个模块了。
 */
gulp.task("mainjs", function () {
    var b = browserify({
        //把browserify初始化的结果赋值给变量b
        entries: ["assets/js/index.js"], //所要编译的文件的入口。index.js中虽然依赖与很多文件但其是入口文件
        cache: {},
        packageCache: {},
        plugin: [watchify]
    }).external('angular').external('lodash');  //使用了external() 方法后引入vendorjs生成的文件内容，这样main.js就可以使用这两个模块了。
    b.on("update", function () {
        //当browserify 初始化后会有各update事件，每当监听文件发生变化时都会触发update事件
        bundle();
    });
    bundle();
    function bundle() {
        b.bundle().pipe(fs.createWriteStream("js/main.js"));
    }
});
/**
 * 第3步： 在默认任务default中通过sequence模块先调用vendorjs任务生成vendor.js文件，在执行mainjs任务。
 * 第4步： index.html 页面中只需要引入 vendor.js 和 main.js 两个js文件
 */
gulp.task("default", function () {
    //先执行vendorjs任务生成vendor.js文件，再执行mainjs任务
    sequence('vendorjs', 'mainjs')
});