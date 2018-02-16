// ==UserScript==
// @name         HiHBT
// @version      0.1
// @author       ytzong
// @description  HiHBT
// @include      http*://hih18.com/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('#sidebar,#related-img,a[href="http://hih18.com/AC18"],a[href="https://hih18.com/AC18"],a[href="http://hihbt.com/asian17"]{display:none!important}#content,.single-content img{width:90% !important}#primary{float:none!important;width:auto!important}.thumbnail{max-width:800px!important}.thumbnail a img{max-width:none!important;width:700px!important}.pagination{padding-bottom:300px!important}article{position:relative}.entry-more a{position: absolute;left: 0;top: 0;bottom: 0;right: 0;width: 100%;height: 100%;background-color:transparent!important}');

var titleEle = $('h1.entry-title');
var searchLink = titleToSearch(titleEle);
titleEle.parent().parent().attr('href', searchLink);

$('.thumbnail a img').each(function(){
    var src = $(this).attr('data-original');
    if (src.length > 0) {
        src = src.replace('http://hih18.com/wp-content/themes/begin/timthumb.php?src=', '');
        src = src.replace('&w=280&h=210&a=&zc=1', '');
        $(this).attr('src', src);
    }
});
$('.entry-more a').each(function(){
    $(this).attr('target', '_blank');
});
$('.single-content p a').each(function(){
    var searchLink = titleToSearch($(this));
    $(this).attr('href', searchLink);
});

function titleToSearch(titleEle) {
    var title = titleEle.text();
    title = title.replace(/～/g, '');
    title = title.replace(/\(/g, ' ');
    title = title.replace(/\)/g, ' ');
    title = title.replace(/／/g, ' ');
    title = title.replace(/｜/g, ' ');
    title = title.replace(/：/g, ' ');
    title = title.replace(/BT/g, ' ');
    title = title.replace(/點此下載/g, ' ');
    var searchLink = 'http://www.bobobt.com/search/' + encodeURIComponent(title) + '.html';
    return searchLink;
}

var next = $('.page-numbers.current').next().attr('href');
console.log(next);
if (next.length > 0) {
    var $window = $(window);
    var $document = $(document);
    var scroll = function () {
        if($window.scrollTop() + $window.height() == $document.height()) {
           window.location.href = next;
        }
    };
    var raf = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    var $window = $(window);
    var lastScrollTop = $window.scrollTop();

    if (raf) {
        loop();
    }

    function loop() {
        var scrollTop = $window.scrollTop();
        if (lastScrollTop === scrollTop) {
            raf(loop);
            return;
        } else {
            lastScrollTop = scrollTop;

            // 如果进行了垂直滚动，执行scroll方法
            scroll();
            raf(loop);
        }
    }
}
