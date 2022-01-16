// ==UserScript==
// @name         H5 Player
// @version      0.1
// @author       ytzong
// @description  H5 Player
// @include      http*://*av28.com/video/*

// @copyright    2019+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdn.plyr.io/3.5.2/plyr.js
// ==/UserScript==

var cssURL = 'https://cdn.plyr.io/3.5.2/plyr.css';
var domain = location.host;
var pathname = location.pathname;

if ($('video').length > 0) {
    GM_addStyle('.none{display:none !important}#yt-video{height:100vh}');
    var videoSlector = '';
    
    if (domain.includes('av28.com')) {
        GM_addStyle('.top-nav, .navbar, .big-title-truncate, .col-md-4{display:none !important} body{padding-top:0!important}.container, .col-md-8{box-sizing: border-box;width:100%!important;padding:0 !important}.row{margin:0!important}')
        videoSlector = '.video-container';
    }
    if (domain.includes('celebjihad.com')) {
        videoSlector = 'div[itemprop="video"]';
    }
    
    var link = window.document.createElement('link');
	link.href = cssURL;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	document.getElementsByTagName("HEAD")[0].appendChild(link);

	window.setInterval(function() {
		YTPlay(videoSlector);
	}, 1000);
    
    var degree = 0;
var jump = 7;
var longjump = 15;
var zooms = [];
$(document).keydown(function(e) {
	var videoWrapper = $('#yt-video').parent();
	//video.attr('controls', 'controls');
	//R
	if (e.keyCode == 82) {
		degree += 90;
		rotate(degree);
		//$('#yt-top').get(0).scrollIntoView();
		scrollToPlayer();
	}
	//+ - \
	if (e.keyCode == 187 || e.keyCode == 189 || e.keyCode == 220) {
		var zoom = videoWrapper.attr('yt-zoom');
		if (zoom) {
			zoom = parseFloat(zoom);
		} else {
			zoom = 1;
		}
		if (e.keyCode == 187) zoom = zoom + 0.2;
		if (e.keyCode == 189) {
			if (zoom > 1) zoom = zoom - 0.2;
		}
		if (e.keyCode == 220) zoom = 1;

		videoWrapper.css('transform', 'scale(' + zoom + ', ' + zoom + ')').attr('yt-zoom', zoom);
	}
	//[ ]
	if (e.keyCode == 219 || e.keyCode == 221 || e.keyCode == 220) {
		var left = videoWrapper.attr('yt-left');
		if (left) {
			left = parseFloat(left);
		} else {
			left = 0;
		}
		if (e.keyCode == 219) left = left - 10;
		if (e.keyCode == 221) left = left + 10;
		if (e.keyCode == 220) left = 0;

		videoWrapper.css('left', left + '%').attr('yt-left', left);
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

function usePlyr() {
	const player = new Plyr('#yt-video', {
		keyboard: {
			focused: false,
			global: true
		},
		hideControls: false,
		clickToPlay: false,
		seekTime: 5,
		disableContextMenu: false,
		autoplay: true,
		speed: {
			selected: 1,
			options: [0.25, 0.5, 1, 1.5, 2]
		},
		muted: true
	});
}

function YTPlay(videoSlector) {
	if ($('video').length > 0 && $('#yt-video').length == 0) {
		//if (window.location.pathname.includes('clipplayer')) {
		var str = $('video').src;
		if ($('video source[type="video/mp4"]').length > 0) str = $('video source[type="video/mp4"]').attr('src');
		//
		$('video').prop('muted', true).remove();
		$(videoSlector).html('<div id="yt-top" style="height:0;overflow:hidden"></div><video id="yt-video" src="' + str + '" controls autoplay loop preload="auto" muted="muted"></video>');
		var title = $('title').text().replace(' - AV28', '');
		$('#yt-top').append(' <a id="yt-download" class="none" href="' + str + '" download="' + title + '.mp4">' + title + '</a>');
		$("#yt-video").on("error", function(err) {
			location.reload(true);
		});
		$("#yt-video").trigger('play');
		window.setTimeout(usePlyr, 1000);
	}
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
		zoom = height / width;
	} else {
		zoom = 1;
	}
	$('video').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ');transform-origin:center center;');
}

function scrollToPlayer() {
	$('html, body').animate({
		scrollTop: $("#yt-top, #sk-body-content").offset().top
	}, 0);
}