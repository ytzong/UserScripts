// ==UserScript==
// @name         Lofter
// @version      0.1
// @author       ytzong
// @include      http://*lofter.com/*
// @copyright    2016+
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle('.p-homepage .g-mnc{padding-bottom:300px !important}');

$(window).scrollTop(0);

var next = $('#m-pager-idx .next').attr('href');
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
