(function () {
    var btn = document.getElementById('kehu');
    var box = document.getElementById('sonkehu');
    box.style.display = "none";
    var timer = null;
    box.onmouseover = btn.onmouseover = function () {
        if (timer) clearTimeout(timer)
        box.style.display = 'block';
    }
    box.onmouseout = btn.onmouseout = function () {
        timer = setTimeout(function () {
            box.style.display = 'none';
        }, 200);

    }
})();
var btn1 = document.getElementById("kaitong");
var box1 = document.getElementById('sonkaitong');
box1.style.display = "none";
btn1.onmouseenter = function () {
    box1.style.display = "block";
}
box1.onmouseenter = function () {
    box1.style.display = "block";
}
btn1.onmouseleave = function () {
    box1.style.display = "none";
}
box1.onmouseleave = function () {
    box1.style.display = "none";
}
var btn11 = document.getElementById("chongzhi");
var box11 = document.getElementById('sonchongzhi');
box11.style.display = "none";
btn11.onmouseenter = function () {
    box11.style.display = "block";
}
box11.onmouseenter = function () {
    box11.style.display = "block";
}
btn11.onmouseleave = function () {
    box11.style.display = "none";
}
box11.onmouseleave = function () {
    box11.style.display = "none";
}
var gedan = document.getElementById("guanfanggedan");
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    console.log(121);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("huidingbu1").style.display = "block";
    } else {
        document.getElementById("huidingbu1").style.display = "none";
    }
};
$("#huidingbu1").click(function () {
    $("html body").animation({ scrollTop: 0 }, 1000);
    return false;
})
var lan = document.getElementById("seca");
var tanchuang = document.getElementById("lishijilu");
var sou = document.getElementById("search");
tanchuang.style.display = "none";
lan.onclick = function () {
    tanchuang.style.display = "block";
}
sou.onclick = function () {
    tanchuang.style.display = "none";
}
$(document).mouseup(function (e) {
    var targetArea = $("#lishijilu");   // 设置目标区域
    if (!targetArea.is(e.target) && targetArea.has(e.target).length === 0) {
        $("#lishijilu").css('display', 'none');
    }
});
$(function () {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    //底部定位
    var $winH = document.body.offsetHeight, $bodyH = $("body").height(), $win = $(window).height();
    //PC端
    if (browser.versions.trident || browser.versions.presto || browser.versions.webKit ||
        browser.versions.gecko) {
        if ($bodyH < $win) {
            $(".footer").css({ "position": "fixed", "bottom": "0" })
        };
    }
    //移动端
    else {
        if ($bodyH < $win) {
            if ($bodyH <= $winH) {
                $("body").css("min-height", $winH);
                $(".footer").css({ "position": "absolute", "bottom": "0" })
            }

        }
    }
})
/*搜索记录相关*/

var hisTime;//获取搜索时间数组
var hisItem;//获取搜索内容数组
var firstKey;//获取最早的1个搜索时间

function init() {

    hisTime = [];//时间数组置空
    hisItem = [];//内容数组置空

    for (var i = 0; i < localStorage.length; i++) {//数据去重
        if (!isNaN(localStorage.key(i))) {//判断数据是否合法
            hisTime.push(localStorage.key(i));
        }
    }

    if (hisTime.length > 0) {
        hisTime.sort();//排序
        for (var y = 0; y < hisTime.length; y++) {
            localStorage.getItem(hisTime[y]).trim() && hisItem.push(localStorage.getItem(hisTime[y]));
        }
    }

    $(".delete").html("");//执行init(),每次清空之前添加的节点
    $(".Storage").show();
    for (var i = 0; i < hisItem.length; i++) {

        $(".delete").prepend('<div class="word-break">' + hisItem[i] + '</div>');
        if (hisItem[i] != '') {
            $(".Storage").hide();
        }
    }

}

init();//调用

$("#search").click(function () {
    var value = $("#seca").val();
    var time = (new Date()).getTime();

    if (!value) {
        alert("你未输入搜索内容");
        return false;
    }
    //输入的内容localStorage有记录

    if ($.inArray(value, hisItem) >= 0) {

        for (var j = 0; j < localStorage.length; j++) {
            if (value == localStorage.getItem(localStorage.key(j))) {
                localStorage.removeItem(localStorage.key(j));
            }
        }
        localStorage.setItem(time, value);

    } else {
        localStorage.setItem(time, value);
    }
    init();

});

//清除记录功能
$("#his-dele").click(function () {
    var f = 0;
    for (; f < hisTime.length; f++) {
        localStorage.removeItem(hisTime[f]);
    }
    init();
});

//苹果手机不兼容出现input无法取值以下是解决方法

$(".delete").on("click", ".word-break", function () {
    var div = $(this).text();
    $('#seca').val(div);
});
