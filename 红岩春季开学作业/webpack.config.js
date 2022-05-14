//// 引入http模块，通过文件的方式读取不同文件下的html文件或者是图片，html的设置类型是text/html.字符串的设置类型是text/plain而图片不需要设置utf-8，jpg只需要设置image/jpeg即可
const http = require("http");
//// 创建服务器
const fs = require("fs").promises;
//设置加密库
const crypto = require("crypto");
const server = http.createServer(async (req, res) => {
    if (req.url === "/img") {
        let img = await fs.readFile("./th.jpg");
        res.end(img);
    }
    if (req.url === "/test.js") {
        let test = await fs.readFile("./test.js");
        //crypto.createHash(algorithm, [options]),algorithm  – 该算法用于生成哈希摘要。输入类型是字符串。options  – 这些是可用于控制流行为的可选参数。
        //node update命令用于更新一个节点 
        let etag = crypto.createHash("md5").update(test).digest("hex");
        let if_none_match = null;
        if (req.headers["'if-none-match'"]) {
            if_none_match = req.headers["'if-none-match'"];
        }
        if (if_none_match !== etag) {
            res.writeHead(200, {
                //解决办法：利用 Access-Control-Allow-Origin,Access-Control-Allow-Origin:* 允许所有域名的脚本访问该资源。
                'Access-Control-Allow-Origin': '*',
                //Cache-Control控制缓存开关的字段,'Cache-Control': 'no-cache'告诉浏览器不直接使用缓存，需要向原服务器发起请求。
                'Cache-Control': 'no-cache',
                'Etag': etag
            })
            res.end(test);
        } else {
            res.writeHead(304);
            res.end();
        }
    }
    if (req.url = "/datajson") {
        let json = await fs.readFile("./package.js");
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*'
        })
        res.end(json);
    }
})
server.listen(3000, () => {
    console.log("成功");
})
//该格式可以识别HTML结构，编码格式是UTF-8,res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
//该格式识别图片,res.writeHead(200,{'Content-Type':'image/jpg;charset=UTF8'});
//该格式识别样式,res.writeHead(200,{'Content-Type':'text/css;charset=UFT8'});
//MD5（Message-Digest Algorithm）是计算机安全领域广泛使用的散列函数（又称哈希算法、摘要算法），主要用来确保消息的完整和一致性。常见的应用场景有密码保护、下载文件校验等。如：var result = md5.update(saltPassword).digest('hex');