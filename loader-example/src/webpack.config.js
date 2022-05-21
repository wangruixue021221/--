const path = require("path");
module.exports = {
    entry: "./src/inde.js",
    output: {
        filename: '[name].js',
        path: path.resolve(_dirname, 'build')
    },
    // 我们编译为Node.js环境下的JS，等下直接使用Node.js执行编译完成的文件
    target: "node",
    module: {
        rule: [
            {
                test: /\.js$/,
                use: [
                    "replace-loader"
                ]
            }
        ]
    },
    // 配置loader的查找目录
    resolveLoader: { modules: ["./node_modules", "./loader"] }
}