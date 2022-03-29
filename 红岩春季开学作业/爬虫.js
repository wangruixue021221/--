//引入依赖
var request = require("request");
var cheerio = require("cheerio");
const { cookie } = require("request");
//然后调用request接口
request("http://news.shu.edu.cn/Default.aspx?tabid=446", function (err, result) {
    if (err) {
        console.log(err);
    } else {
        //将request返回的结果传入cheerio中,并获得想要获取的信息
        var $ = cheerio.load(result.body);
        $('a[id^="dnn"]').each(function (index, element) {
            console.log($(element).text());
        })
    }
})
//http协议里，建立连接要发送请求头header，对于一些动态网页的爬取有时候需要设置user agent、cookies等等
var options = {
    url: startUrl + '?page=1',
    method: "GET",
    charset: "utf-8",
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36",
        "cookie": cookies
    }
};
request(options, function (err, body, response) {
    //...
})
//通过npm install async --save来安装并通过var async = require("async")来引入async处理并发控制问题
var async = require("async");
//实现一个限制并发问题的解决
//async.mapLimit每次以指定的最大limit数执行异步操作，limit数是一次异步操作的最大数量
async.mapLimit(5, function (url, callback) {
    //...
    fetch(url, callback);
})