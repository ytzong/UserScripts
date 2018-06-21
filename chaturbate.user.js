// ==UserScript==
// @name         Chaturbate
// @version      0.4
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
        GM_addStyle('body{min-width:960px!important}video{max-height:100vh!important}#header, .top-section, .video-box .title,.tip_shell,.chat-holder,.footer-holder{display:none!important}.content{padding-top:0!important}#defchat .section, #player,.video-box{height:auto!important}#player, .video-box{width:100%!important;}.video-box,.block,.info-user{border:0!important;-webkit-border-radius:0!important}.block{padding:0!important}.block .section{margin-bottom:0!important}.info-user{min-height:0!important}');
	    scrollToPlayer();
        window.setInterval(toHD, 3000);
	}
}
function toHD() {
	var btnLi = $('.vjs-icon-hd li').eq(0);
    if (!btnLi.hasClass('vjs-selected')) btnLi.trigger('click');
	var btnHD = $('#hls_stream_source_overlay');
	if (btnHD.text() == 'HI BW') btnHD.trigger('click');
}
function scrollToPlayer() {
	$('html').animate({
		scrollTop: $("#player").offset().top
	}, 0);
}