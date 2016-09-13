// ==UserScript==
// @name        Youtube for ytzong
// @author      ytzong
// @include     https://www.youtube.com/watch*
// @version     0.6
// @grant       GM_addStyle
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==

/* depends on https://chrome.google.com/webstore/detail/nkdalpbojfdilmiboaiedicdbigdabpb */

GM_addStyle('#masthead-positioner{position:absolute!important}');

/* depends on https://chrome.google.com/webstore/detail/magic-actions-for-youtube/abjcfabbhafbcdfjoecdgepllmpfceif */

GM_addStyle('.html5-progress-bar {width: 100% !important}.html5-video-container{width: 100% !important;height: 100% !important}');


function main() {
    function fullscreen(){
        $('div[title="Expand"]').click();
        $('iframe').attr('style', 'display: none !important;');
    }
    window.setTimeout(fullscreen, 1000);
    function rotate(deg) {
        var zoom = 1;
        if (deg % 360 == 90 || deg % 360 == 270) {
            zoom = $(window).height()/$(window).width();
        }
        else {
            zoom = 1;
        }
        $('.html5-video-container').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ') !important;transform-origin:50% 50%;width:100% !important;height: 100% !important;left:0 !important;top:0 !important;');
    }
    var degree = 0;
    $(document).keydown(function(e) {
        //R
        if(e.keyCode == 82) {
            degree += 90;
            rotate(degree);
        }
        //B
        if(e.keyCode == 66) {
            fullscreen();
        }
        var video = $('video')[0];
        //P
        if (e.keyCode == 80) {
            if (video.paused) video.play();
            else video.pause();
        }
        var jump = 5;
        //右箭头
        if (e.keyCode == 39) {
            if (e.metaKey) video.volume = video.volume + 0.1;
            else video.currentTime = video.currentTime + jump;
        }
        //左箭头
        if (e.keyCode == 37) {
            if (e.metaKey) video.volume = 0.1;
            else video.currentTime = video.currentTime - jump;
        }
        var longjump = 30;
        //ALT + 右箭头
        if (e.altKey && e.keyCode == 39) {
            video.currentTime = video.currentTime + longjump;
        }
        //ALT + 左箭头
        if (e.altKey && e.keyCode == 37) {
            video.currentTime = video.currentTime - longjump;
        }
    });
}
window.setTimeout(main, 1500);