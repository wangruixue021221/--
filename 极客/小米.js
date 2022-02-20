var lunbotu = document.querySelector('.lunbotu');
   var leftBox = document.querySelector('.left');
   var rightBox = document.querySelector('.right');
   var ul = lunbotu.querySelector('ul');
   var ol = lunbotu.querySelector('ol');
   var right = document.querySelector('.right');
   var left = document.querySelector('.left');
   var lunbotuWidth = lunbotu.offsetWidth;
   // console.log(ul)
   // console.log(ol)
   // 第一步：
   // 鼠标经过轮播图的时候，左右小按钮弹出
   lunbotu.addEventListener('mouseenter', function () {
    leftBox.style.display = 'block';
    rightBox.style.display = 'block';
    // 鼠标经过轮播图的时候，停止定时器
    clearInterval(timer);
   })
   // 鼠标离开轮播图的时候，左右小按钮隐藏
   lunbotu.addEventListener('mouseleave', function () {
    leftBox.style.display = 'none';
    rightBox.style.display = 'none';
    timer = setInterval(function () {
     right.click();
    }, 4000)
 
   })
   // 第二步：
   // 1.动态生成小圆圈
   // 2.小圆圈的个数要跟图片一样
   // 3.先得到ul里面图片的张数(图片放入li里面，所以就是li的个数)
   // 4.利用循环动态生成小圆圈(这个小圆圈要放入ol里面)
   // 5.创建节点createElement('li')]
   // 6.插入节点ol.appendChild(li)
   // 7.第一个小圆圈需要添加current类
   for (var i = 0; i < ul.children.length; i++) {
    // 创建一个li
    var li = document.createElement('li')
    // 记录当前小圆圈的索引号 通过自定义属性来做
    li.setAttribute('index', i);
    // 把li添加到ol
    ol.appendChild(li);
   }
   // 排他思想：让小Li变白色
   for (var i = 0; i < ol.children.length; i++) {
    ol.children[i].addEventListener('click', function () {
     for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
     } this.className = 'current';
 
     // 点击小圆圈的时候切换到对应的图片
     // 得到索引号 index
     var index = this.getAttribute('index');
     // 解决小bug
     num = index;
     num_ol = index;
     // console.log(lunbotuWidth);
     // console.log(index)
     animation(ul, - index * lunbotuWidth)
    })
   }
   // 给第一个li变颜色
   ol.children[0].className = 'current';
   // 克隆第一个li
   var first = ul.children[0].cloneNode(true);
   ul.appendChild(first);
   // 第三步:
   // 点击右边按钮事件
   var num = 0;
   // 点击右侧按钮的时候小圆圈跟着滚动
   var num_ol = 0;
   // 节流阀，防止点击过快，最后才加这句优化
   var flag = true;
   // 右侧按钮：
   right.addEventListener('click', function () {
    if (flag) {
     flag = false; // 关闭节流阀
     if (num == ul.children.length - 1) {
      ul.style.left = 0;
      num = 0;
     }
     num++;
     animation(ul, -num * lunbotuWidth, function () {
      flag = true;
     });
     num_ol++;
     if (num_ol == ol.children.length) {
      num_ol = 0
     }
     for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
     }
     ol.children[num_ol].className = 'current';
    }
   });
   // 左侧按钮：
   left.addEventListener('click', function () {
    if (flag) {
     flag = false;
     if (num == 0) {
      ul.style.left = -(ul.children.length - 1) * lunbotuWidth + 'px';
      num = ul.children.length - 1;
     }
     num--;
     animation(ul, -num * lunbotuWidth, function () {
      flag = true;
     });
     num_ol--;
     // num_ol=0的时候需要，点击左侧按钮，需要转跳到ol.children.length-1的位置
     if (num_ol < 0) {
      num_ol = ol.children.length - 1;
     }
     for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
     }
     ol.children[num_ol].className = 'current';
    }
   });
   // 自动播放图片
   var timer = setInterval(function () {
    right.click();
   }, 4000)
    // 封装了一个动画js文件
function animation(obj,target,fn1){
 // console.log(fn1);
 // fn是一个回调函数，在定时器结束的时候添加
 // 每次开定时器之前先清除掉定时器
 clearInterval( obj.timer);
 obj.timer = setInterval(function(){
 // 步长计算公式 越来越小
 // 步长取整
 var step = (target - obj.offsetLeft) /10;
 step = step > 0 ? Math.ceil(step) :Math.floor(step); 
 
 if(obj.offsetLeft == target){
  clearInterval( obj.timer);
  // 如果fn1存在，调用fn1
  if(fn1){
  fn1();
  }
 }else{
  // 每30毫秒就将新的值给obj.left
 obj.style.left = obj.offsetLeft +step +'px';
 }
 },30)
}
$("#erweima1").hide();
$(document).ready(function(){
    $("#xiazaiapp").mouseenter(function(){
    $("#erweima1").show();
});
$("#erweima1").mouseenter(function(){
    $("#erweima1").show();
});
$("#xiazaiapp").mouseleave(function(){
    $("#erweima1").hide();
});
$("#erweima1").mouseleave(function(){
    $("#erweima1").hide();
});
})
$("#gouwuchexinxi").hide();
$(document).ready(function(){
    $("#gouwuche").mouseenter(function(){
    $("#gouwuchexinxi").show();
});
$("#gouwuchexinxi").mouseenter(function(){
    $("#gouwuchexinxi").show();
});
$("#gouwuche").mouseleave(function(){
    $("#gouwuchexinxi").hide();
});
$("#gouwuchexinxi").mouseleave(function(){
    $("#gouwuchexinxi").hide();
});
})
$(".erweima2").hide();
$(document).ready(function(){
    $("#saosao").mouseenter(function(){
    $(".erweima2").show();
});
$("#saosao").mouseleave(function(){
    $(".erweima2").hide();
});
})
$("#one").hide();
$(document).ready(function(){
    $("#onem").mouseenter(function(){
    $("#one").show();
});
$("#one").mouseenter(function(){
    $("#one").show();
});
$("#onem").mouseleave(function(){
    $("#one").hide();
});
$("#one").mouseleave(function(){
    $("#one").hide();
});
})
$("#two").hide();
$(document).ready(function(){
    $("#twom").mouseenter(function(){
    $("#two").show();
});
$("#two").mouseenter(function(){
    $("#two").show();
});
$("#twom").mouseleave(function(){
    $("#two").hide();
});
$("#two").mouseleave(function(){
    $("#two").hide();
});
})
$("#three").hide();
$(document).ready(function(){
    $("#threem").mouseenter(function(){
    $("#three").show();
});
$("#three").mouseenter(function(){
    $("#three").show();
});
$("#threem").mouseleave(function(){
    $("#three").hide();
});
$("#three").mouseleave(function(){
    $("#three").hide();
});
})
$("#four").hide();
$(document).ready(function(){
    $("#fourm").mouseenter(function(){
    $("#four").show();
});
$("#four").mouseenter(function(){
    $("#four").show();
});
$("#fourm").mouseleave(function(){
    $("#four").hide();
});
$("#four").mouseleave(function(){
    $("#four").hide();
});
})
$("#five").hide();
$(document).ready(function(){
    $("#fivem").mouseenter(function(){
    $("#five").show();
});
$("#five").mouseenter(function(){
    $("#five").show();
});
$("#fivem").mouseleave(function(){
    $("#five").hide();
});
$("#five").mouseleave(function(){
    $("#five").hide();
});
})
$("#six").hide();
$(document).ready(function(){
    $("#sixm").mouseenter(function(){
    $("#six").show();
});
$("#six").mouseenter(function(){
    $("#six").show();
});
$("#sixm").mouseleave(function(){
    $("#six").hide();
});
$("#six").mouseleave(function(){
    $("#six").hide();
});
})
$("#seven").hide();
$(document).ready(function(){
    $("#sevenm").mouseenter(function(){
    $("#seven").show();
});
$("#seven").mouseenter(function(){
    $("#seven").show();
});
$("#sevenm").mouseleave(function(){
    $("#seven").hide();
});
$("#seven").mouseleave(function(){
    $("#seven").hide();
});
})
$("#m1").hide();
$(document).ready(function(){
    $("#m1m").mouseenter(function(){
    $("#m1").show();
});
$("#m1").mouseenter(function(){
    $("#m1").show();
});
$("#m1m").mouseleave(function(){
    $("#m1").hide();
});
$("#m1").mouseleave(function(){
    $("#m1").hide();
});
})
$("#m2").hide();
$(document).ready(function(){
    $("#m2m").mouseenter(function(){
    $("#m2").show();
});
$("#m2").mouseenter(function(){
    $("#m2").show();
});
$("#m2m").mouseleave(function(){
    $("#m2").hide();
});
$("#m2").mouseleave(function(){
    $("#m2").hide();
});
})
$("#m3").hide();
$(document).ready(function(){
    $("#m3m").mouseenter(function(){
    $("#m3").show();
});
$("#m3").mouseenter(function(){
    $("#m3").show();
});
$("#m3m").mouseleave(function(){
    $("#m3").hide();
});
$("#m3").mouseleave(function(){
    $("#m3").hide();
});
})
$("#m4").hide();
$(document).ready(function(){
    $("#m4m").mouseenter(function(){
    $("#m4").show();
});
$("#m4").mouseenter(function(){
    $("#m4").show();
});
$("#m4m").mouseleave(function(){
    $("#m4").hide();
});
$("#m4").mouseleave(function(){
    $("#m4").hide();
});
})
$("#m5").hide();
$(document).ready(function(){
    $("#m5m").mouseenter(function(){
    $("#m5").show();
});
$("#m5").mouseenter(function(){
    $("#m5").show();
});
$("#m5m").mouseleave(function(){
    $("#m5").hide();
});
$("#m5").mouseleave(function(){
    $("#m5").hide();
});
})
$("#m6").hide();
$(document).ready(function(){
    $("#m6m").mouseenter(function(){
    $("#m6").show();
});
$("#m6").mouseenter(function(){
    $("#m6").show();
});
$("#m6m").mouseleave(function(){
    $("#m6").hide();
});
$("#m6").mouseleave(function(){
    $("#m6").hide();
});
})
$("#m7").hide();
$(document).ready(function(){
    $("#m7m").mouseenter(function(){
    $("#m7").show();
});
$("#m7").mouseenter(function(){
    $("#m7").show();
});
$("#m7m").mouseleave(function(){
    $("#m7").hide();
});
$("#m7").mouseleave(function(){
    $("#m7").hide();
});
})
$("#m8").hide();
$(document).ready(function(){
    $("#m8m").mouseenter(function(){
    $("#m8").show();
});
$("#m8").mouseenter(function(){
    $("#m8").show();
});
$("#m8m").mouseleave(function(){
    $("#m8").hide();
});
$("#m8").mouseleave(function(){
    $("#m8").hide();
});
})
$("#m9").hide();
$(document).ready(function(){
    $("#m9m").mouseenter(function(){
    $("#m9").show();
});
$("#m9").mouseenter(function(){
    $("#m9").show();
});
$("#m9m").mouseleave(function(){
    $("#m9").hide();
});
$("#m9").mouseleave(function(){
    $("#m9").hide();
});
})
$("#m10").hide();
$(document).ready(function(){
    $("#m10m").mouseenter(function(){
    $("#m10").show();
});
$("#m10").mouseenter(function(){
    $("#m10").show();
});
$("#m10m").mouseleave(function(){
    $("#m10").hide();
});
$("#m10").mouseleave(function(){
    $("#m10").hide();
});
})
window.onscroll=function(){
    scrollFunction();
};
function scrollFunction(){
    console.log(121);
    if(document.body.scrollTop>20||document.documentElement.scrollTop>20){
        document.getElementById("huidingbu1").style.display="block";
    }else{
        document.getElementById("huidingbu1").style.display="none";
    }
};
$("#huidingbu1").click(function(){
    $("html body").animation({scrollTop:0},1000);
    return false;
})
var chuandai=document.getElementById("chuandai");
var remen=document.getElementById("remen");
var chuandai1=document.getElementById("chuandai1");
var remen1=document.getElementById("remen1");
var xiangzuo=document.getElementById("xiangzuo");
$(document).ready(function(){
    $("#chuandai").mouseenter(function(){
    chuandai.style.color="orange";
    document.getElementById("chuandai").style["border-bottom"]="1px solid orange";
    remen.style.color="black";
    document.getElementById("remen").style["border-bottom"]="none";
    chuandai1.style.display="block";
    remen1.style.display="none";
    chuandai1.style.position="relative";
    chuandai1.style.left="350px";
    chuandai1.style.top="-550px";
    xiangzuo.style.position="relative";
    xiangzuo.style.left="-295px";
    xiangzuo.style.top="550px";
});
$("#remen").mouseenter(function(){
    remen.style.color="orange";
    document.getElementById("remen").style["border-bottom"]="1px solid orange";
    chuandai.style.color="black";
    document.getElementById("chuandai").style["border-bottom"]="none";
    chuandai1.style.display="none";
    remen1.style.display="block";
    remen1.style.position="relative";
    remen1.style.left="350px";
    remen1.style.top="-550px";
    xiangzuo1.style.position="relative";
    xiangzuo1.style.left="-295px";
    xiangzuo1.style.top="550px";
});
})
var chuandai2=document.getElementById("chuandai2");
var remen2=document.getElementById("remen2");
var chuandai3=document.getElementById("chuandai3");
var remen3=document.getElementById("remen3");
var xiangzuo3=document.getElementById("xiangzuo3");
$(document).ready(function(){
    $("#chuandai2").mouseenter(function(){
    chuandai2.style.color="orange";
    document.getElementById("chuandai2").style["border-bottom"]="1px solid orange";
    remen2.style.color="black";
    document.getElementById("remen2").style["border-bottom"]="none";
    chuandai3.style.display="block";
    remen3.style.display="none";
    chuandai3.style.position="relative";
    chuandai3.style.left="350px";
    chuandai3.style.top="-550px";
    xiangzuo3.style.position="relative";
    xiangzuo3.style.left="-295px";
    xiangzuo3.style.top="550px";
});
$("#remen2").mouseenter(function(){
    remen2.style.color="orange";
    document.getElementById("remen2").style["border-bottom"]="1px solid orange";
    chuandai2.style.color="black";
    document.getElementById("chuandai2").style["border-bottom"]="none";
    chuandai3.style.display="none";
    remen3.style.display="block";
    remen3.style.position="relative";
    remen3.style.left="350px";
    remen3.style.top="-550px";
    xiangzuo4.style.position="relative";
    xiangzuo4.style.left="-295px";
    xiangzuo4.style.top="550px";
});
})
var remen4=document.getElementById("remen4");
var chuandai4=document.getElementById("chuandai4");
var chuandai5=document.getElementById("chuandai5");
var chaundai6=document.getElementById("chuandai6");
var remen5=document.getElementById("remen5");
var chuandai7=document.getElementById("chuandai7");
var chuandai8=document.getElementById("chuandai8");
var chuandai9=document.getElementById("chuandai9");
var xiangzuo5=document.getElementById("xiangzuo5");
var xiangzuo6=document.getElementById("xiangzuo6");
var xiangzuo7=document.getElementById("xiangzuo7");
var xiangzuo8=document.getElementById("xiangzuo8");
$(document).ready(function(){
    $("#chuandai4").mouseenter(function(){
    chuandai4.style.color="orange";
    document.getElementById("chuandai4").style["border-bottom"]="1px solid orange";
    remen4.style.color="black";
    document.getElementById("remen4").style["border-bottom"]="none";
    chuandai5.style.color="black";
    document.getElementById("chuandai5").style["border-bottom"]="none";
    chuandai6.style.color="black";
    document.getElementById("chuandai6").style["border-bottom"]="none";
    chuandai7.style.display="block";
    chuandai8.style.display="none";
    chuandai9.style.display="none";
    remen5.style.display="none";
    chuandai7.style.position="relative";
    chuandai7.style.left="350px";
    chuandai7.style.top="-550px";
    xiangzuo5.style.position="relative";
    xiangzuo5.style.left="-295px";
    xiangzuo5.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai5").mouseenter(function(){
    chuandai5.style.color="orange";
    document.getElementById("chuandai5").style["border-bottom"]="1px solid orange";
    remen4.style.color="black";
    document.getElementById("remen4").style["border-bottom"]="none";
    chuandai4.style.color="black";
    document.getElementById("chuandai4").style["border-bottom"]="none";
    chuandai6.style.color="black";
    document.getElementById("chuandai6").style["border-bottom"]="none";
    chuandai8.style.display="block";
    chuandai7.style.display="none";
    chuandai9.style.display="none";
    remen5.style.display="none";
    chuandai8.style.position="relative";
    chuandai8.style.left="350px";
    chuandai8.style.top="-550px";
    xiangzuo6.style.position="relative";
    xiangzuo6.style.left="-295px";
    xiangzuo6.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai6").mouseenter(function(){
    chuandai6.style.color="orange";
    document.getElementById("chuandai6").style["border-bottom"]="1px solid orange";
    remen4.style.color="black";
    document.getElementById("remen4").style["border-bottom"]="none";
    chuandai4.style.color="black";
    document.getElementById("chuandai4").style["border-bottom"]="none";
    chuandai5.style.color="black";
    document.getElementById("chuandai5").style["border-bottom"]="none";
    chuandai9.style.display="block";
    chuandai8.style.display="none";
    chuandai7.style.display="none";
    remen5.style.display="none";
    chuandai9.style.position="relative";
    chuandai9.style.left="350px";
    chuandai9.style.top="-550px";
    xiangzuo7.style.position="relative";
    xiangzuo7.style.left="-295px";
    xiangzuo7.style.top="550px";
});
})
$(document).ready(function(){
    $("#remen4").mouseenter(function(){
        remen4.style.color="orange";
        document.getElementById("remen4").style["border-bottom"]="1px solid orange";
        chuandai4.style.color="black";
        document.getElementById("chuandai4").style["border-bottom"]="none";
        chuandai5.style.color="black";
        document.getElementById("chuandai5").style["border-bottom"]="none";
        chuandai6.style.color="black";
        document.getElementById("chuandai6").style["border-bottom"]="none";
        chuandai7.style.display="none";
        chuandai8.style.display="none";
        chuandai9.style.display="none";
        remen5.style.display="block";
        remen5.style.position="relative";
        remen5.style.left="350px";
        remen5.style.top="-550px";
        xiangzuo8.style.position="relative";
        xiangzuo8.style.left="-295px";
        xiangzuo8.style.top="550px";
    });
})
var remen6=document.getElementById("remen6");
var chuandai10=document.getElementById("chuandai10");
var chuandai11=document.getElementById("chuandai11");
var chaundai12=document.getElementById("chuandai12");
var remen7=document.getElementById("remen7");
var chuandai13=document.getElementById("chuandai13");
var chuandai14=document.getElementById("chuandai14");
var chuandai15=document.getElementById("chuandai15");
var xiangzuo9=document.getElementById("xiangzuo9");
var xiangzuo10=document.getElementById("xiangzuo10");
var xiangzuo11=document.getElementById("xiangzuo11");
var xiangzuo12=document.getElementById("xiangzuo12");
$(document).ready(function(){
    $("#chuandai10").mouseenter(function(){
    chuandai10.style.color="orange";
    document.getElementById("chuandai10").style["border-bottom"]="1px solid orange";
    remen6.style.color="black";
    document.getElementById("remen6").style["border-bottom"]="none";
    chuandai11.style.color="black";
    document.getElementById("chuandai11").style["border-bottom"]="none";
    chuandai12.style.color="black";
    document.getElementById("chuandai12").style["border-bottom"]="none";
    chuandai13.style.display="block";
    chuandai14.style.display="none";
    chuandai15.style.display="none";
    remen7.style.display="none";
    chuandai13.style.position="relative";
    chuandai13.style.left="350px";
    chuandai13.style.top="-550px";
    xiangzuo9.style.position="relative";
    xiangzuo9.style.left="-295px";
    xiangzuo9.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai11").mouseenter(function(){
    chuandai11.style.color="orange";
    document.getElementById("chuandai11").style["border-bottom"]="1px solid orange";
    remen6.style.color="black";
    document.getElementById("remen6").style["border-bottom"]="none";
    chuandai10.style.color="black";
    document.getElementById("chuandai10").style["border-bottom"]="none";
    chuandai12.style.color="black";
    document.getElementById("chuandai12").style["border-bottom"]="none";
    chuandai14.style.display="block";
    chuandai15.style.display="none";
    chuandai13.style.display="none";
    remen7.style.display="none";
    chuandai14.style.position="relative";
    chuandai14.style.left="350px";
    chuandai14.style.top="-550px";
    xiangzuo10.style.position="relative";
    xiangzuo10.style.left="-295px";
    xiangzuo10.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai12").mouseenter(function(){
    chuandai12.style.color="orange";
    document.getElementById("chuandai12").style["border-bottom"]="1px solid orange";
    remen6.style.color="black";
    document.getElementById("remen6").style["border-bottom"]="none";
    chuandai10.style.color="black";
    document.getElementById("chuandai10").style["border-bottom"]="none";
    chuandai11.style.color="black";
    document.getElementById("chuandai11").style["border-bottom"]="none";
    chuandai15.style.display="block";
    chuandai13.style.display="none";
    chuandai14.style.display="none";
    remen7.style.display="none";
    chuandai15.style.position="relative";
    chuandai15.style.left="350px";
    chuandai15.style.top="-550px";
    xiangzuo11.style.position="relative";
    xiangzuo11.style.left="-295px";
    xiangzuo11.style.top="550px";
});
})
$(document).ready(function(){
    $("#remen6").mouseenter(function(){
        remen6.style.color="orange";
        document.getElementById("remen6").style["border-bottom"]="1px solid orange";
        chuandai10.style.color="black";
        document.getElementById("chuandai10").style["border-bottom"]="none";
        chuandai11.style.color="black";
        document.getElementById("chuandai11").style["border-bottom"]="none";
        chuandai12.style.color="black";
        document.getElementById("chuandai12").style["border-bottom"]="none";
        chuandai13.style.display="none";
        chuandai14.style.display="none";
        chuandai15.style.display="none";
        remen7.style.display="block";
        remen7.style.position="relative";
        remen7.style.left="350px";
        remen7.style.top="-550px";
        xiangzuo12.style.position="relative";
        xiangzuo12.style.left="-295px";
        xiangzuo12.style.top="550px";
    });
})
var remen8=document.getElementById("remen8");
var chuandai16=document.getElementById("chuandai16");
var chuandai17=document.getElementById("chuandai17");
var chaundai18=document.getElementById("chuandai18");
var remen9=document.getElementById("remen9");
var chuandai19=document.getElementById("chuandai19");
var chuandai20=document.getElementById("chuandai20");
var chuandai21=document.getElementById("chuandai21");
var xiangzuo13=document.getElementById("xiangzuo13");
var xiangzuo14=document.getElementById("xiangzuo14");
var xiangzuo15=document.getElementById("xiangzuo15");
var xiangzuo16=document.getElementById("xiangzuo16");
$(document).ready(function(){
    $("#chuandai16").mouseenter(function(){
    chuandai16.style.color="orange";
    document.getElementById("chuandai16").style["border-bottom"]="1px solid orange";
    remen8.style.color="black";
    document.getElementById("remen8").style["border-bottom"]="none";
    chuandai17.style.color="black";
    document.getElementById("chuandai17").style["border-bottom"]="none";
    chuandai18.style.color="black";
    document.getElementById("chuandai18").style["border-bottom"]="none";
    chuandai19.style.display="block";
    chuandai20.style.display="none";
    chuandai21.style.display="none";
    remen9.style.display="none";
    chuandai19.style.position="relative";
    chuandai19.style.left="350px";
    chuandai19.style.top="-550px";
    xiangzuo13.style.position="relative";
    xiangzuo13.style.left="-295px";
    xiangzuo13.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai17").mouseenter(function(){
    chuandai17.style.color="orange";
    document.getElementById("chuandai17").style["border-bottom"]="1px solid orange";
    remen8.style.color="black";
    document.getElementById("remen8").style["border-bottom"]="none";
    chuandai18.style.color="black";
    document.getElementById("chuandai18").style["border-bottom"]="none";
    chuandai16.style.color="black";
    document.getElementById("chuandai16").style["border-bottom"]="none";
    chuandai20.style.display="block";
    chuandai21.style.display="none";
    chuandai19.style.display="none";
    remen9.style.display="none";
    chuandai20.style.position="relative";
    chuandai20.style.left="350px";
    chuandai20.style.top="-550px";
    xiangzuo14.style.position="relative";
    xiangzuo14.style.left="-295px";
    xiangzuo14.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai18").mouseenter(function(){
    chuandai18.style.color="orange";
    document.getElementById("chuandai18").style["border-bottom"]="1px solid orange";
    remen8.style.color="black";
    document.getElementById("remen8").style["border-bottom"]="none";
    chuandai17.style.color="black";
    document.getElementById("chuandai17").style["border-bottom"]="none";
    chuandai16.style.color="black";
    document.getElementById("chuandai16").style["border-bottom"]="none";
    chuandai21.style.display="block";
    chuandai20.style.display="none";
    chuandai19.style.display="none";
    remen9.style.display="none";
    chuandai21.style.position="relative";
    chuandai21.style.left="350px";
    chuandai21.style.top="-550px";
    xiangzuo15.style.position="relative";
    xiangzuo15.style.left="-295px";
    xiangzuo15.style.top="550px";
});
})
$(document).ready(function(){
    $("#remen8").mouseenter(function(){
        remen8.style.color="orange";
        document.getElementById("remen8").style["border-bottom"]="1px solid orange";
        chuandai16.style.color="black";
        document.getElementById("chuandai16").style["border-bottom"]="none";
        chuandai17.style.color="black";
        document.getElementById("chuandai17").style["border-bottom"]="none";
        chuandai18.style.color="black";
        document.getElementById("chuandai18").style["border-bottom"]="none";
        chuandai19.style.display="none";
        chuandai21.style.display="none";
        chuandai20.style.display="none";
        remen9.style.display="block";
        remen9.style.position="relative";
        remen9.style.left="350px";
        remen9.style.top="-550px";
        xiangzuo16.style.position="relative";
        xiangzuo16.style.left="-295px";
        xiangzuo16.style.top="550px";
    });
})
var remen10=document.getElementById("remen10");
var chuandai22=document.getElementById("chuandai22");
var chuandai23=document.getElementById("chuandai23");
var chaundai24=document.getElementById("chuandai24");
var remen11=document.getElementById("remen11");
var chuandai25=document.getElementById("chuandai25");
var chuandai26=document.getElementById("chuandai26");
var chuandai27=document.getElementById("chuandai27");
var xiangzuo17=document.getElementById("xiangzuo17");
var xiangzuo18=document.getElementById("xiangzuo18");
var xiangzuo19=document.getElementById("xiangzuo19");
var xiangzuo20=document.getElementById("xiangzuo20");
$(document).ready(function(){
    $("#chuandai22").mouseenter(function(){
    chuandai22.style.color="orange";
    document.getElementById("chuandai22").style["border-bottom"]="1px solid orange";
    remen10.style.color="black";
    document.getElementById("remen10").style["border-bottom"]="none";
    chuandai23.style.color="black";
    document.getElementById("chuandai23").style["border-bottom"]="none";
    chuandai24.style.color="black";
    document.getElementById("chuandai24").style["border-bottom"]="none";
    chuandai25.style.display="block";
    chuandai26.style.display="none";
    chuandai27.style.display="none";
    remen11.style.display="none";
    chuandai25.style.position="relative";
    chuandai25.style.left="350px";
    chuandai25.style.top="-550px";
    xiangzuo17.style.position="relative";
    xiangzuo17.style.left="-295px";
    xiangzuo17.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai23").mouseenter(function(){
    chuandai23.style.color="orange";
    document.getElementById("chuandai23").style["border-bottom"]="1px solid orange";
    remen10.style.color="black";
    document.getElementById("remen10").style["border-bottom"]="none";
    chuandai24.style.color="black";
    document.getElementById("chuandai24").style["border-bottom"]="none";
    chuandai22.style.color="black";
    document.getElementById("chuandai22").style["border-bottom"]="none";
    chuandai26.style.display="block";
    chuandai27.style.display="none";
    chuandai25.style.display="none";
    remen11.style.display="none";
    chuandai26.style.position="relative";
    chuandai26.style.left="350px";
    chuandai26.style.top="-550px";
    xiangzuo18.style.position="relative";
    xiangzuo18.style.left="-295px";
    xiangzuo18.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai24").mouseenter(function(){
    chuandai24.style.color="orange";
    document.getElementById("chuandai24").style["border-bottom"]="1px solid orange";
    remen10.style.color="black";
    document.getElementById("remen10").style["border-bottom"]="none";
    chuandai23.style.color="black";
    document.getElementById("chuandai23").style["border-bottom"]="none";
    chuandai22.style.color="black";
    document.getElementById("chuandai22").style["border-bottom"]="none";
    chuandai27.style.display="block";
    chuandai26.style.display="none";
    chuandai25.style.display="none";
    remen11.style.display="none";
    chuandai27.style.position="relative";
    chuandai27.style.left="350px";
    chuandai27.style.top="-550px";
    xiangzuo19.style.position="relative";
    xiangzuo19.style.left="-295px";
    xiangzuo19.style.top="550px";
});
})
$(document).ready(function(){
    $("#remen10").mouseenter(function(){
        remen10.style.color="orange";
        document.getElementById("remen10").style["border-bottom"]="1px solid orange";
        chuandai22.style.color="black";
        document.getElementById("chuandai22").style["border-bottom"]="none";
        chuandai23.style.color="black";
        document.getElementById("chuandai23").style["border-bottom"]="none";
        chuandai24.style.color="black";
        document.getElementById("chuandai24").style["border-bottom"]="none";
        chuandai25.style.display="none";
        chuandai27.style.display="none";
        chuandai26.style.display="none";
        remen11.style.display="block";
        remen11.style.position="relative";
        remen11.style.left="350px";
        remen11.style.top="-550px";
        xiangzuo20.style.position="relative";
        xiangzuo20.style.left="-295px";
        xiangzuo20.style.top="550px";
    });
})
var remen12=document.getElementById("remen12");
var chuandai28=document.getElementById("chuandai28");
var chuandai29=document.getElementById("chuandai29");
var chaundai30=document.getElementById("chuandai30");
var remen13=document.getElementById("remen13");
var chuandai31=document.getElementById("chuandai31");
var chuandai32=document.getElementById("chuandai32");
var chuandai33=document.getElementById("chuandai33");
var xiangzuo21=document.getElementById("xiangzuo21");
var xiangzuo22=document.getElementById("xiangzuo22");
var xiangzuo23=document.getElementById("xiangzuo23");
var xiangzuo24=document.getElementById("xiangzuo24");
$(document).ready(function(){
    $("#chuandai28").mouseenter(function(){
    chuandai22.style.color="orange";
    document.getElementById("chuandai28").style["border-bottom"]="1px solid orange";
    remen12.style.color="black";
    document.getElementById("remen12").style["border-bottom"]="none";
    chuandai29.style.color="black";
    document.getElementById("chuandai29").style["border-bottom"]="none";
    chuandai30.style.color="black";
    document.getElementById("chuandai30").style["border-bottom"]="none";
    chuandai31.style.display="block";
    chuandai32.style.display="none";
    chuandai33.style.display="none";
    remen13.style.display="none";
    chuandai31.style.position="relative";
    chuandai31.style.left="350px";
    chuandai31.style.top="-550px";
    xiangzuo21.style.position="relative";
    xiangzuo21.style.left="-295px";
    xiangzuo21.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai29").mouseenter(function(){
    chuandai29.style.color="orange";
    document.getElementById("chuandai29").style["border-bottom"]="1px solid orange";
    remen12.style.color="black";
    document.getElementById("remen12").style["border-bottom"]="none";
    chuandai28.style.color="black";
    document.getElementById("chuandai28").style["border-bottom"]="none";
    chuandai30.style.color="black";
    document.getElementById("chuandai30").style["border-bottom"]="none";
    chuandai32.style.display="block";
    chuandai33.style.display="none";
    chuandai31.style.display="none";
    remen13.style.display="none";
    chuandai32.style.position="relative";
    chuandai32.style.left="350px";
    chuandai32.style.top="-550px";
    xiangzuo22.style.position="relative";
    xiangzuo22.style.left="-295px";
    xiangzuo22.style.top="550px";
});
})
$(document).ready(function(){
    $("#chuandai30").mouseenter(function(){
    chuandai30.style.color="orange";
    document.getElementById("chuandai30").style["border-bottom"]="1px solid orange";
    remen12.style.color="black";
    document.getElementById("remen12").style["border-bottom"]="none";
    chuandai29.style.color="black";
    document.getElementById("chuandai29").style["border-bottom"]="none";
    chuandai28.style.color="black";
    document.getElementById("chuandai28").style["border-bottom"]="none";
    chuandai33.style.display="block";
    chuandai32.style.display="none";
    chuandai31.style.display="none";
    remen13.style.display="none";
    chuandai33.style.position="relative";
    chuandai33.style.left="350px";
    chuandai33.style.top="-550px";
    xiangzuo23.style.position="relative";
    xiangzuo23.style.left="-295px";
    xiangzuo23.style.top="550px";
});
})
$(document).ready(function(){
    $("#remen12").mouseenter(function(){
        remen12.style.color="orange";
        document.getElementById("remen12").style["border-bottom"]="1px solid orange";
        chuandai28.style.color="black";
        document.getElementById("chuandai28").style["border-bottom"]="none";
        chuandai29.style.color="black";
        document.getElementById("chuandai29").style["border-bottom"]="none";
        chuandai30.style.color="black";
        document.getElementById("chuandai30").style["border-bottom"]="none";
        chuandai31.style.display="none";
        chuandai33.style.display="none";
        chuandai32.style.display="none";
        remen13.style.display="block";
        remen13.style.position="relative";
        remen13.style.left="350px";
        remen13.style.top="-550px";
        xiangzuo24.style.position="relative";
        xiangzuo24.style.left="-295px";
        xiangzuo24.style.top="550px";
    });
})