const path = require("path");
const CopyrightWebpackPlugin = require("./plugins/copyright-webpack-plugin");
module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js"
    },
    plugins: [
        new CopyrightWebpackPlugin({
            name: "pluginParams"
        })
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    }
}