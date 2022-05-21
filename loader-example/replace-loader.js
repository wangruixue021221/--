module.exports = function (source) {
    //源码中的”World“替换成了”Loader“
    return source.replace(/World/g, "Loader");
}