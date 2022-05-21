// resolve用来拼接绝对路径的方法
const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // webpack配置
    // 入口起点
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        // 输出路径
        // __dirname nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, "build")
    },
    // loader的配置
    module: {
        rule: [
            // 详细loader配置
            // 不同文件必须配置不同loader处理
        ]
    },
    plugins: [
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    mode: "development"
}