// ==UserScript==
// @name         Pornhub
// @version      2020.02.02
// @author       ytzong
// @description  Pornhub
// @include      http*://*pornhub*/*
// @copyright    2019+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==


var pathname = window.location.pathname;
console.log(pathname);
if (pathname == '/view_video.php') {
    GM_addStyle('body{overflow-x:hidden!important}.container{margin-top:0!important}#header,.networkBar, .abovePlayer{display:none!important}.container, .section_wrapper{width:auto!important;min-width:none!imporant;max-width:none!important}#player.wide{width:100vw!important;height:100vh!important;min-width:none!imporant;max-width:none!important}#hd-rightColVideoPage.wide{margin-top:100vh!important}#main-container .video-wrapper{border-width:0 0 1px !important;background-color:black!important}#relatedVideosVPage{margin-top:3px !important}');
    localStorage.setItem("player_quality", '{"quality":"1080"}');
    $('#player, #hd-rightColVideoPage').addClass('wide')

    var degree = 0;
    $(document).keydown(function (e) {
        var video = $('video')[0];
        //R
        if (e.keyCode == 82) {
            degree += 90;
            rotate(degree);
        }
        //右箭头
        if (e.keyCode == 39) {
            video.currentTime = video.currentTime + 7;
            //video.play();
        }
        //左箭头
        if (e.keyCode == 37) {
            video.currentTime = video.currentTime - 7;
            //video.play();
        }
    })

    window.setTimeout(function () {
        var video = $('video')[0];
        video.play();
    }, 3000);
    window.setInterval(function () {
        $('#player').removeAttr('style').removeClass('videoSize3x4')
        $('video').attr('loop', 'loop')
    }, 1000);
}
else {
    //window.setTimeout(main, 1000);
}

function rotate(deg) {
    var height = $(window).height();
    var width = $('#player').width();
    var zoom = 1;
    if (deg % 360 == 90 || deg % 360 == 270) {
        zoom = height / width;
    }
    else {
        zoom = 1;
    }
    $('video').parent().attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ');transform-origin:center center;');
}

