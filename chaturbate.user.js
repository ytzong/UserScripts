// ==UserScript==
// @name         Chaturbate
// @version      19.8.7
// @author       ytzong
// @description  Chaturbate
// @include      http*://*chaturbate*/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/string.js/3.3.3/string.min.js
// ==/UserScript==
GM_addStyle('body, .list{min-width:0!important}.list{margin-left:2px!important}.content .c-1{margin-left:0 !important;margin-right:0!important}.room_list_room{width:230px!important;max-height:none!important;margin:0 3px 3px 0 !important;border:none!important}.room_list_room a{color:#f0f1f1!important}.list .title a{color: #0A5B83!important;}.room_list_room img{box-sizing:border-box!important; width:100%!important;height:auto!important;border-width:3px !important;border-style:solid !important;}.list .thumbnail_label{top:152px !important}.list .sub-info li.cams, .list .subject,.message{display:none!important}');

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
        GM_addStyle('#player,.video-box, #still_video_object, video{position:relative;left:50%!important;top:0!important;margin-left:-89vh!important;width:178vh!important;height:100vh!important}#header, .top-section, .video-box .title,.tip_shell,.chat-holder,.footer-holder, .bio a[rel="nofollow"], .bio img[rel="nofollow"]{display:none!important}.content{padding-top:0!important}#defchat .section{height:auto!important}.video-box,.block,.info-user{border:0!important;-webkit-border-radius:0!important}.block{padding:0!important}.block .section{margin-bottom:0!important}.info-user{min-height:0!important}video{background-color:white}.bio dd *{position:static!important;background-image:none!important}');
        window.setInterval(toHD, 7000);
		scrollToPlayer();
        
        $('#tabs_content_container dt').each(function(){
            if ($(this).text() == 'Location:') {
                $(this).next().css('background-color', 'yellow');
            }
        })
        
        var recLink = 'https://rec-tube.com/recent/search' + pathname;
        $('#tabs_content_container h1').html('<a target="_blank" href="' + recLink + '">RECORD</a>');
        
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
	else {
		window.setTimeout(hideList, 3000);
        window.setTimeout(stopRefresh, 5000);
	}
}
function stopRefresh() {
    for(i=0; i<100; i++) {
        window.clearInterval(i);
    }
}
function hideList() {
    $('.thumbnail_label_c_private_show, .thumbnail_label_offline').each(function(){
		$(this).parent().hide();
	})
    if (pathname != '/followed-cams/') {
        GM_addStyle('.room_list_room a:visited {color:yellow!important}.list .title a:visited{color: #0A5B83!important;}');
        
        $('.icon_following').each(function(){
            $(this).parent().hide();
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

