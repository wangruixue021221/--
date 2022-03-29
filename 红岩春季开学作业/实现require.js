//vm模块是用来运行代码的模块
//require方法的实现:
//1.内部实现一个require方法，2.使用`Module._load`方法加载模块，3.使用`Module.__resolveFilename`将相对路径=>绝对路径+文件后缀，4.缓存机制`Module._cache`缓存模块，
//5.新建一个模块`new Module`:Module有两个主要属性id(路径)，exports={}，6.使用`tryMudoleLoad`尝试加载模块，获取文件后缀，7.通过`Module._extensions`上后缀对应的方法加载模块->读取文件
//8.`Module.wrap`包裹读取的字符串内容,`runInThisContext`运行包裹后的字符串，将字符串转为函数,9.运行函数，并将this.exports(默认空对象)作为this绑定到函数的this上
let path = require("path");
let fs = require("fs");
let vm = require("vm");
function Module(path) {
    this.id = path;
    this.exports = {};
}
Module.wrapper = ['(function(exports,require,module,__filename,__dirname){', '})'];
Module.extension = {
    '.js': function (module) {
        let content = fs.readFileSync(module.id, 'utf-8');
        let fnStr = Module.wrapper[0] + content + Module.wrapper[1];
        let wrapperFn = vm.runInThisContext(fnStr);
        //该方法是用户自定义给module.exports赋值
        wrapperFn.call(module.exports, module.exports, req, module, __filename, __dirname);
    },
    '.json': function (module) {
        let json = fs.readFileSync(module.id, 'utf-8');
        module.exports = json;
    },
    '.node': {
        //
    }
}
function tryMudoleLoad(module) {
    //path.extname返回path路径文件扩展名，如果path以"."结尾，将返回".",如果没扩展名，又不以"."结尾。将返回空值（文件扩展名又称文件后缀名）
    let extension = path.extname(module.id);
    Module.extension[extension](module);
}
Module._cache = {};
function req(modulePath) {
    let resolvedPath = path.resolve(modulePath);
    //如果文件没有写扩展名，需要按照默认扩展名依次查找
    let i = 0;
    function findFilePath(parsePath) {
        try {
            //fs.accessSync(path,[,mode])同步地测试用户对path指定的文件或者目录的权限，mode参数是可选的整数，指定要执行的可访问性检查。
            fs.accessSync(parsePath);
            return parsePath;
        } catch (e) {
            let extensions = Object.keys(Module.extensions);
            let tempPath = resolvedPath + extensions[i++];
            return findFilePath(tempPath);
        }
    }
    let absolutePath = findFilePath(resolvedPath);
    if (Module._cache[absolutePath]) {
        return Module._cache[absolutePath].exports;
    }
    const module = new Module(absolutePath);
    tryMudoleLoad(module);
    Module._cache[absolutePath] = module;
    return module.exports;
}
console.log(req('./1'));