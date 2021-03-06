// ==UserScript==
// @name        Youtube for ytzong
// @author      ytzong
// @include     https://www.youtube.com/watch*
// @version     1.4
// @grant       GM_addStyle
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==
GM_addStyle('#masthead-container.ytd-app {display:none !important; position:absolute!important;top:100vh !important}#page-manager.ytd-app{margin-top:0 !important}#player.ytd-watch,#player-theater-container.ytd-watch-flexy, #player-theater-container.ytd-watch-flexy,ytd-watch-flexy[theater] #player-theater-container.ytd-watch-flexy, ytd-watch-flexy[fullscreen] #player-theater-container.ytd-watch-flexy {height: 100vh !important;max-height:none !important}video{left:50%!important;top:0!important;margin-left:-89vh!important;width:178vh!important;height:100vh!important}');
GM_addStyle('ytd-watch-flexy:not([theater]):not([fullscreen]) #primary.ytd-watch-flexy, ytd-watch-flexy:not([theater]):not([fullscreen]) #secondary.ytd-watch-flexy{padding:0!important;margin:0!important}ytd-watch-flexy:not([theater]):not([fullscreen]) #player-container-inner{padding-top:100vh!important}ytd-watch-flexy:not([theater]):not([fullscreen]) .ytp-chrome-bottom{width:100%!important;left:0!important}');
function main() {
    $('video').attr('loop', 'loop');
    function rotate(deg) {
        var zoom = 1;
        if (deg % 360 == 90 || deg % 360 == 270) {
            zoom = $(window).height()/$(window).width();
        }
        else {
            zoom = 1;
        }
        $('.html5-video-container').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ') !important;transform-origin:50% 50%;width:100% !important;height: 100% !important;left:0 !important;top:0 !important;');
        document.getElementById('page-container').scrollIntoView();
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
        var jump = 0;
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

        var longjump = 15;
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

