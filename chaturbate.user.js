// ==UserScript==
// @name         Chaturbate
// @version      0.5
// @author       ytzong
// @description  Chaturbate
// @include      http*://*chaturbate*/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle('body, .list{min-width:0!important}.content .c-1{margin-left:0 !important;margin-right:0 !important}');

var pathname = window.location.pathname;
console.log(pathname);
if (pathname == '/external_link/') {
    location.href = $('#link').attr('href');
}
else {
    window.setTimeout(main, 1000);
}

function main() {
	if ($('#player').length > 0) {
		$("video").prop('muted', true);
		$('video').trigger('play');
        GM_addStyle('body{min-width:960px!important}#player,.video-box, #still_video_object, video{max-height:100vh!important;width:100%!important;height:100vh!important}#header, .top-section, .video-box .title,.tip_shell,.chat-holder,.footer-holder{display:none!important}.content{padding-top:0!important}#defchat .section{height:auto!important}.video-box,.block,.info-user{border:0!important;-webkit-border-radius:0!important}.block{padding:0!important}.block .section{margin-bottom:0!important}.info-user{min-height:0!important}video{background-color:white}');
        window.setInterval(toHD, 7000);
		scrollToPlayer();

		var degree = 0;
		$(document).keydown(function(e) {
			var video = $('video')[0];
			//video.attr('controls', 'controls');
			//R
			if (e.keyCode == 82) {
				degree += 90;
				rotate(degree);
				//$('#yt-top').get(0).scrollIntoView();
				//scrollToPlayer();
			}
		})
	}
}
function toHD() {
	var btnLi = $('.vjs-icon-hd li').eq(0);
    if (!btnLi.hasClass('vjs-selected')) btnLi.trigger('click');
	var btnHD = $('#hls_stream_source_overlay');
	if (btnHD.text() == 'HI BW') btnHD.trigger('click');
}
function scrollToPlayer() {
	$('html, body').animate({
		scrollTop: $("#player").offset().top
	}, 0);
}
function rotate(deg) {
	var height = $(window).height();
	var width = $('#player').width();
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
