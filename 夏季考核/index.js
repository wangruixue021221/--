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
    var targetArea = $("#lishijilu");   // ??????????????????
    if (!targetArea.is(e.target) && targetArea.has(e.target).length === 0) {
        $("#lishijilu").css('display', 'none');
    }
});
$(function () {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//?????????????????????????????????
                trident: u.indexOf('Trident') > -1, //IE??????
                presto: u.indexOf('Presto') > -1, //opera??????
                webKit: u.indexOf('AppleWebKit') > -1, //?????????????????????
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //????????????
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //?????????????????????
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios??????
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android????????????uc?????????
                iPhone: u.indexOf('iPhone') > -1, //?????????iPhone??????QQHD?????????
                iPad: u.indexOf('iPad') > -1, //??????iPad
                webApp: u.indexOf('Safari') == -1 //??????web????????????????????????????????????
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    //????????????
    var $winH = document.body.offsetHeight, $bodyH = $("body").height(), $win = $(window).height();
    //PC???
    if (browser.versions.trident || browser.versions.presto || browser.versions.webKit ||
        browser.versions.gecko) {
        if ($bodyH < $win) {
            $(".footer").css({ "position": "fixed", "bottom": "0" })
        };
    }
    //?????????
    else {
        if ($bodyH < $win) {
            if ($bodyH <= $winH) {
                $("body").css("min-height", $winH);
                $(".footer").css({ "position": "absolute", "bottom": "0" })
            }

        }
    }
})
/*??????????????????*/

var hisTime;//????????????????????????
var hisItem;//????????????????????????
var firstKey;//???????????????1???????????????

function init() {

    hisTime = [];//??????????????????
    hisItem = [];//??????????????????

    for (var i = 0; i < localStorage.length; i++) {//????????????
        if (!isNaN(localStorage.key(i))) {//????????????????????????
            hisTime.push(localStorage.key(i));
        }
    }

    if (hisTime.length > 0) {
        hisTime.sort();//??????
        for (var y = 0; y < hisTime.length; y++) {
            localStorage.getItem(hisTime[y]).trim() && hisItem.push(localStorage.getItem(hisTime[y]));
        }
    }

    $(".delete").html("");//??????init(),?????????????????????????????????
    $(".Storage").show();
    for (var i = 0; i < hisItem.length; i++) {

        $(".delete").prepend('<div class="word-break">' + hisItem[i] + '</div>');
        if (hisItem[i] != '') {
            $(".Storage").hide();
        }
    }

}

init();//??????

$("#search").click(function () {
    var value = $("#seca").val();
    var time = (new Date()).getTime();

    if (!value) {
        alert("????????????????????????");
        return false;
    }
    //???????????????localStorage?????????

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

//??????????????????
$("#his-dele").click(function () {
    var f = 0;
    for (; f < hisTime.length; f++) {
        localStorage.removeItem(hisTime[f]);
    }
    init();
});

//???????????????????????????input?????????????????????????????????

$(".delete").on("click", ".word-break", function () {
    var div = $(this).text();
    $('#seca').val(div);
});
