const { reject } = require("async");
const { xml } = require("cheerio/lib/static");
const { resolve } = require("path");

function dataJson(url, type, data) {
    const promise = new promise((resolve, reject) => {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open(type, url);
        if (type == "GET") {
            xmlHttp.send();
        } else {
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(data));
        }
        xmlHttp.responseType = "json";
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState != 4) return
            if (xmlHttp.status == 200) {
                resolve(xmlHttp.response);
            } else {
                reject(new Error(xmlHttp.statusText));
            }
        };
    })
    return promise;
}
//共享函数
exports.dataJson = dataJson;