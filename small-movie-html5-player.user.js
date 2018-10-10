// ==UserScript==
// @name         Small Movie HTML5 Player
// @version      0.1
// @author       ytzong
// @description  Small Movie HTML5 Player
// @include      http*://*lvv2.com/*
// @include      http*://*ppx*.com/*
// @include      http*://*yuese*.com/*
// @include      http*://*yaoshe*.com/*
// @include      http*://*clf2d.com/*
// @include      http*://*99nn*.com/*
// @include      http*://*fcw*.com/*
// @include      http*://*kdwcl.com/*
// @include      http*://*seku.tv/*
// @include      http*://*sejie*.com/*
// @include      http*://*sepp*.com/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/string.js/3.3.3/string.min.js
// @require      https://cdn.plyr.io/3.3.9/plyr.js
// ==/UserScript==
if (document.domain == 'lvv2.com') {
	if (S(location.pathname).startsWith('/t/')) {
        location.href = $('.format_output').eq(0).attr('href');
	}
}
GM_addStyle('video,.plyr video{width:100%!important;height:100vh!important;background-color:black;}.none{display:none !important}body{margin:0!important;padding:0!important}');
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://cdn.plyr.io/3.3.9/plyr.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
window.setTimeout(YTPlay, 1000);
window.setTimeout(usePlyr, 2000);
window.setTimeout($('#yt-video').get(0).play(), 5000);

function usePlyr() {
    const player = new Plyr('#yt-video', {
        keyboard: { focused: false, global: true },
        hideControls: false,
        clickToPlay: false,
        seekTime: 7,
        disableContextMenu: false,
		autoplay: true,
		speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] }
		//volume: 0.1
    });
	//$('#yt-video').get(0).play();
}
function YTPlay() {
    if ($('video').length > 0) {
        var str = $('video').attr('src');
        //
        $("video").prop('muted', true).remove();
        $('body').html('<div id="yt-top" style="height:0;overflow:hidden"></div><video id="yt-video" src="' + str + '" controls  autoplay="autoplay" loop preload="auto"></video>');
        scrollToPlayer();
        var title = $('title').text().replace(' / Embed Player', '');
        $('#yt-top').append(' <a id="yt-download" class="none" href="' + str + '" download="' + title + '.mp4">' + title + '</a>');
        $('#yt-video').get(0).play();
        $("#yt-video").on("error", function(err) {
            location.reload(true);
        });
    }
    var degree = 0;
    $(document).keydown(function(e) {
        var video = $('video')[0];
        //R
        if (e.keyCode == 82) {
            degree += 90;
            rotate(degree);
            scrollToPlayer();
        }
        //D
        if (e.keyCode == 68) {
            $('#yt-download').get(0).click();
        }
        function copyTitle() {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($('#yt-download').text().trim()).select();
            document.execCommand("copy");
            $temp.remove();
        }
        //C
        if (e.keyCode == 67) {
            copyTitle();
        }
        //P
        if (e.keyCode == 80) {
            if (video.paused) video.play();
            else video.pause();
        }
        //A
        if (e.keyCode == 65) {
            var allLink = $('.media-title a').last().attr('href');
            if (allLink.length > 0)
                window.location.href = allLink;
        }
        //S
        if (e.keyCode == 83) {
            var authorLink = $('.media-title a').eq(0).attr('href');
            if (authorLink.length > 0)
                window.location.href = authorLink;
        }
        //右箭头
        if (e.keyCode == 39) {
            scrollToPlayer();
        }
        //左箭头
        if (e.keyCode == 37) {
            scrollToPlayer();
        }
    });
}

function rotate(deg) {
    var height = $(window).height();
    var width = $(window).width();
    /*
            var bestHeight = width * 9/16;
            if (bestHeight > height) width = height * 16/9;
            else height = bestHeight;
            */
    var zoom = 1;
    if (deg % 360 == 90 || deg % 360 == 270) {
        zoom = height/width;
    }
    else {
        zoom = 1;
    }
    $('video').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ');transform-origin:center center;');
}
function scrollToPlayer() {
    $('html, body').animate({
        scrollTop: $("#yt-top").offset().top
    }, 0);
}
