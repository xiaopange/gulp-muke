var gulp = require("gulp");
var browserify = require("browserify"); //引入browserify
var fs = require("fs"); //引入fs，fs是node的核心模块之一，不需要在npm install下载
var sequence = require("run-sequence"); //可以在一个task 中调用其它的 task。
var watchify = require("watchify"); //引入watchify插件来自动化构建

//使用browserify-shim 来构建第三方类库，将相关js文件都打包 成main.js文件。

/** 
 * 第1步：npm install -D browserify-shim 下载browserify-shim
 * 第2步：在package.json中进行相关的配置
    "browserify": {
        "transform": [
        "browserify-shim"
        ]
    },
    "browserify-shim": {
        "angular": "angular",
        "lodash": "_"
    },
    "browser":{
        "angular":"./bower_components/angular/angular.js",
        "lodash":"./bower_components/lodash/dist/lodash.js"
    },
*/

/**
 * 第2步： 定义mainjs任务
 * 使用了browserify-shim 后不需要再使用browserify 的 external() 方法
 */
gulp.task("mainjs", function () {
    var b = browserify({
        //把browserify初始化的结果赋值给变量b
        entries: ["assets/js/index.js"], //所要编译的文件的入口。index.js中虽然依赖与很多文件但其是入口文件
        cache: {},
        packageCache: {},
        plugin: [watchify]
    })
    var bundle = function bundle() {
        b.bundle().pipe(fs.createWriteStream("js/main.js"));
    };
    bundle();
    b.on('update', bundle);
}); 
/**
 * 第3步： 在默认任务default中通过sequence模块先调用mainjs。
 * 第4步： index.html 页面中只需要引入main.js 一个js文件。
 */
gulp.task("default", function () {
    //使用了browserify-shim 来构建第三方类库后不需要定义和执行 vendorjs 任务了
    sequence("mainjs"); 
});