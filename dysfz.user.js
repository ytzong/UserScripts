// ==UserScript==
// @name         dysfz
// @version      0.1
// @author       ytzong
// @description  dysfz
// @include      *://*dysfz.*/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// ==/UserScript==

GM_addStyle('body{padding-bottom:25vh}.item-fifth-dl, .actGotop{display:none !important;}.dbscore{color:#12c}.movie-list .des .txt{line-height:1.5!important}.movie-list .des .txt p{position:absolute;bottom:20px;right:20px;text-align: right;}');

let blacks = ['红包', '不要错过', '【日本】', '动画', '纪录片', '歌舞'];

$('.movie-list li').each(function(){
    let title = $(this).find('h2').text();
    let shoudHide = 0;
	for (let b of blacks) {
		if (S(title).contains(b)) shoudHide = 1;
	}
	if (shoudHide == 1) $(this).hide();
    
    $(this).find('.des .txt p br').remove();
    
    let doubanLink = $(this).find('.des .txt p a[rel="nofollow"]').eq(0).attr('href');
    $(this).find('.dbscore').wrap('<a href="' + doubanLink +  '" target="_blank" />')
})


//http://joji.me/zh-cn/blog/how-to-develop-high-performance-onscroll-event

var next = $('a.next').attr('href');
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