// ==UserScript==
// @name        Mr Skin
// @author      ytzong
// @namespace   MrSkin
// @description MsSkin
// @include     http*://*mrskin.com/*
// @version     2023.01.15
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://cdn.plyr.io/3.6.2/plyr.js
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// ==/UserScript==

let pathname = location.pathname;
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

if (pathname.includes("/clips")) {
	GM_addStyle(`
.video-carousel-wrapper,.slick-slider .slick-list,.video-carousel-item {margin-left:0!important;margin-right:0!important}
#clips .col-xs-12,.slick-arrow{display:none !important}
.slick-track{width:auto!important}
.video-carousel-item{float:none!important; display:inline-block !important;vertical-align:top; width:25%!important;height:auto!important}
.video-carousel-item .thumbnail{padding-right:10px;}
.video-carousel-link{max-height:none!important}.img-responsive{width:100%!important}
.slick-track, .video-carousel-item{position:static !important;}.slick-track{transform: translate3d(-0, 0px, 0px) !important;}
.thumbnail-column{margin-left:0!important;margin-right:0 !important}.thumbnail{margin-bottom:10px !important}
a.clip{display:block;box-sizing: border-box;border-width:3px;border-style: solid;}
a.clip:visited {color:yellow !important;}
.thumbnail-image img.delayed-thumb{opacity:1!important}
  `)
}

GM_addStyle(`
@media (min-width: 992px){.row-r .col-md-4 {width:20% !important;padding-left: 1px!important;padding-right: 1px!important;}.sk-wallpapereda{max-width:none!important}}
a:visited {color:lightgray !important;}
.none,#suggestion_box,#subnavigation,.sk-wallpaper-top-container,.sk-wallpaper, #fc_frame, .parallax-container{display:none !important}
.container,.media-scene-player{max-width:none !important}
#watchSceneContainer,#watchSceneView,body.has-adult-network{padding:0!important}
#navigation{position:static!important}
.video_container_video-dimensions.vjs-fluid{padding-top:100vh!important;}
.thumbnail.clip:hover .scene-description, .col-xs-12.col-xxs-12{display:none !important}
.title{user-select:text!important}.scene-keywords{background-color:yellow}



.sk-media-modal{padding-bottom:0!important}
.sk-slideshow-modal .sk-media-infobar-container{position:static!important}
.sk-media-content{width:100%!important}
.sk-media-modal.sk-slideshow-modal .sk-media-content-container .sk-media-controls,.sk-media-modal.sk-slideshow-modal.sk-media-content-scene-media .sk-media-content-container .sk-media-content,.sk-video-player{max-width:none!important}
.sk-video-player{height:100%!important}
`);

let T = $('title').text()
T = S(T).replaceAll('Mr. Skin - ', '').s
$('title').text(T)

$('#application').removeClass('sk-wallpapered');
scrollToPlayer()

window.setTimeout(function () {
	if ($('video').length > 0) {
		$('video').trigger('play')
	}
}, 3000);

window.setInterval(function () {
	var btnHD = $('.vjs-quality-picker-button li:last-child')
	if (!btnHD.hasClass('vjs-selected')) btnHD.trigger('click')

	/*
	  $('.media-item').each(function() {
		  $(this).removeClass('media-item');
	  });
	*/
	$('.thumbnails .az').each(function () {
		$(this).parent().hide();
	});
	$('.col-md-4').each(function () {
		if ($(this).attr('data-index')) $(this).hide();
	});
	$('button[title="Pause"]').blur();
	$('#video_container_video').removeClass('vjs-user-inactive').addClass('vjs-user-active');
}, 1000);

if (pathname != '/') {
	GM_addStyle('#navigation{display:none !important}');
}
if (pathname.includes('gateway')) {
	location.href = '/';
}
if (pathname.includes('/clip')) {
	if (urlParams.has('sort')) {
		const sort = urlParams.get('sort')
		console.log(sort);
		let targetSort = 'content_nudity';
		if (sort != targetSort) {
			let url = location.href
			url = url.replace(sort, targetSort)
			location.href = url
		}
	}
	else {

	}
}
$('.pagination').click(function () {
	scrollToPlayer()
})
let videoFlag = 0;
window.setInterval(function () {
	if (videoFlag == 0) {
		if ($('video').length > 0) {
			var paths = pathname.split('-')
			var path = paths[paths.length - 1]

			if (S(path).startsWith('p')) {
				$('.video-carousel-link').click(function () {
					scrollToPlayer()
				})
			}
			else {


				if (pathname.includes('/clipplayer/')) {
					GM_addStyle('video, .plyr video {width: 100%;height: 100vh !important;}.plyr__video-wrapper{position:relative;}')
					$('video').attr('loop', 'loop')
				}
				/*
						var link = window.document.createElement('link');
						link.rel = 'stylesheet';
						link.type = 'text/css';
						link.href = 'https://cdn.plyr.io/3.6.2/plyr.css';
						document.getElementsByTagName("HEAD")[0].appendChild(link);

						YTPlay();
						*/
			}
			videoFlag = 1;
		}
	}
}, 1000);

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
			options: [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2]
		}
		//volume: 0.1
	});
}
function YTPlay() {
	if ($('#yt-video').length == 0) {
		var str = $('video source').eq(0).attr('src');
		alert(str)
		$('.media-view, .video_wrapper').html('<div id="yt-top" style="height:0;overflow:hidden"></div><video id="yt-video" src="' + str + '" playsinline controls autoplay loop muted="muted" preload="auto"></video>');
		$('#yt-video').trigger('play');
		window.setTimeout(scrollToPlayer, 1000);

		usePlyr();
	}
}

function scrollToPlayer() {
	// $('html, body').animate({
	// 	scrollTop: $("#sk-body-content").offset().top
	// }, 0);
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
var degree = 0;
var jump = 7;
var longjump = 15;
$(document).keydown(function (e) {
	var video = $('video')[0];
	//R
	if (e.keyCode == 82) {
		degree += 90;
		rotate(degree);
		scrollToPlayer();
	}
	//P
	if (e.keyCode == 80) {
		if (video.paused) video.play();
		else video.pause();
	}
	//右箭头
	if (e.keyCode == 39) {
		scrollToPlayer();

		if (e.ctrlKey) video.volume = video.volume + 0.1;
		else if (e.altKey) $('.icon-angle-right').trigger('click');
		else if (e.metaKey) $('.icon-angle-right').trigger('click');
		video.currentTime = video.currentTime + jump;
	}
	//左箭头
	if (e.keyCode == 37) {
		scrollToPlayer();

		if (e.ctrlKey) video.volume = 0.1;
		else if (e.altKey) $('.icon-angle-left').trigger('click');
		else if (e.metaKey) $('.icon-angle-left').trigger('click');
		video.currentTime = video.currentTime - jump;
	}
	//A
	if (e.keyCode == 65) {
		var allLink = $('.description a').eq(0).attr('href');
		if (pathname.includes('clipplayer')) allLink = $('.media-title a').eq(0).attr('href');
		if (allLink.length > 0)
			window.location.href = allLink;
	}
});