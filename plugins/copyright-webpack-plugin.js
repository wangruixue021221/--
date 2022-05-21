class Copyrightwebpackplugin {
    constructor(options) {
        console.log("插件被使用了，传入的参数是:", options);
    }
    // 参数 compiler 是 webpack 的一个实例
    // compiler 存放着所有配置内容，包括所有打包的相关内容
    // compiler.hooks 定义了打包过程中的时刻值（钩子）
    // emit 时刻：将打包的资源输出到 输出目录(build) 前,是一个异步的时刻值
    apply(compiler) {
        // compile 时刻是同步的时刻
        // 同步的时刻的参数中， 第二个方法参数只传一个 compilation 参数
        compiler.hooks.compile.tap("CopyrightWebpackPlugin", (complication) => {
            //hook.tap是一种同步编程的模式，hook.tapAsync是一种异步编程模式
            console.log("compiler");
        })
        // compilation 存放着这一次打包的内容
        compiler.hooks.emit.tapAsync("CopyrightWebpackPlugin", (complication, callback) => {
            // 打包生成的内容存放在compilation.assets
            // console.log(compilation.assets)
            // 打包输出前添加一个 copyright.txt 文件
            complication.assets["copyright.txt"] = {
                source: function () {
                    return 'copyright output by plugin';
                },
                size: function () {
                    return 26;
                }
            };
            callback();
        })
    }
}
module.exports = CopyrightWebpackPlugin;