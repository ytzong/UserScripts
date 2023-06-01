// ==UserScript==
// @name         91Porn HTML5 Player
// @version      2023.05.25
// @author       ytzong
// @description  91Porn
// @include      http*://*91porn*/*
// @include      http*://91.p9p.co/*
// @include      http*://627.workarea7.live/*
// @include      http*://*.91s5.xyz/*
// @include      http*://d.u6p.co//*
// @include      http*://*91dizhi*/*
// @include      http*://*91*.space/*
// @copyright    2016+
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @require      https://cdn.plyr.io/3.7.8/plyr.js
// @require      https://cdn.jsdelivr.net/npm/hls.js@1
// @user-agent   Mozilla/5.0 (iPad; CPU OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1
// ==/UserScript==
//

var blacklist = ['康康2011', 'boa0', 'jlbjs', 'KKLL1562795463', '浅笑心柔1998', '165136848946', 'juncheng123', 'foxxer', 'cc52917264', 'bboby', '大熊', '国产交换爱', '247991285', 'CRonald123456789', 'qinger8899', 'lsxia520', '爱胖妹', 'qiuguoqiang1987', 'poo小赵', '小葵花', '406262326', '17703511', '随风雨', '荣爷', 'latinass', '蓝色幻想s', '西北老熟888', 'duoduoha999', '花开馨雅', '枫随风', '青海小马哥', '偶唔系小贼', '初恋音', '专肏熟女逼', 'cnmok', '我的胖妻骚妻', 'zhwgj', 'liudi2019', '傲慢先生-S', '艾瑶世纪网络', '740675263', '最爱的你', 'Liaison00', 'nmslndsl', '情爱教炼', '小妈至上5200', 'sexbook1000', 'cuixiao19860306', 'kk66', 'xuexue9191', 'vitas79', '91暖暖', 'wcs19860714520', '湘西赶尸886', '小雨', 'geiyi', '一只老污龟', '寂寞d老王', '无丝不欢', 'huangmeng789789', 'chenyuyuhou', 'xxoxxbb', '148061931', 'HuTutuu', '夜色醉美', '911993', 'walvrppp', 'pts86918', '康康2011', '左秀秀', 'aini888888', 'milky100', 'a332096261', 'huaduyibai', '狐臭者', '约炮神人', '好大你就来！', 'haokeyue', 'mxl0333', 'lichao588', 'zhutou1121', 'hl550350', 'pptppp', 'qaz907200', 'Ezreal佐耳', '猛男大鸡', '寂寞d老王', '夫妻拳交', '碧池·卡戴珊', 'song000828', '话话唠唠', '灵狩者', 'viking1', 'taitailala', 'chunliang88', 'yingdangwu', 'ttdz988888', 'senkyou', 'jiahao1069', 'ilililling', '91欣然', '91小万', '曹晓雪', '仿冒全家死', '双拳交女王', '最爱老熟', '熟女露脸大合集', '你的最爱', '娜娜公主少妇', 'libin2008', 'xiaogaogao9527', 'freeziyuan', 'poisonsfx', 'kim666', 'jackpatrick'];
var myservers = ['198.255.82.91'];
//, '1729546148.rsc.cdn77.org'];
var current = 0;

var domain = window.location.host;
var pathname = window.location.pathname;

console.log(pathname);
if (pathname == '/uvideos.php') {
	GM_addStyle('.login_register_header a{color:white}')
	$('.login_register_header').append('<a href="http://91porn.com/uprofile.php?UID=' + getUrlParameter('UID') + '">关注</a>')
}
if (pathname == '/my_subs.php') {
	GM_addStyle('.well .duration{display:none!important}')
}
if (pathname == '/uprofile.php') {
	GM_addStyle('.col-xs-12{width:50%!important}')
	$('.btn-primary').eq(0).hide()
}
GM_addStyle('.gotop, .original-text-icon{display:none!important}html,body{height:auto!important;padding-top:0!important}.row{margin:0!important}.col-sm-12{padding:0!important}.top-nav,.navbar{position:static!important}.navbar-nav.navbar-right:last-child{margin-right:0!important}.container{width:auto!important;padding-left:0!important;padding-right:0!important;}.footer-container{margin-top:150px;}.input-group{margin-top:40px!important}.row a:visited{color:lightslategrey !important}.row .well a{display:block}.col-4{display: inline-block;vertical-align: top;width:24.5%}.col-5{width:20%}.col-6{width:16.6%}.col-xs-12{padding:0!important}.well{padding:1px !important;background-color:black!important}.img-responsive{max-height:202px!important}.row .yt-info{text-align:left;}.video-title{padding-left:0!important}.hd-text-icon{right:auto!important;left:5px!important}.hightlight .good{position:absolute;top:5px;right:5px;padding:0 5px;background-color:#f80;font-weight:bold;border-radius:3px;color:black}')
GM_addStyle('@media (max-width:768px) {.col-4, .col-5,.col-6{width:100%}.thumb-overlay{float:left;width:270px!important;}.row .yt-info{float:left;margin-left:10px;width:360px;}.row .well{overflow:hidden}}')
GM_addStyle('#paging{margin:20px auto 40px!important}#paging a, #paging span.pagingnav{display:inline-block;margin:0 5px!important;padding:3px 16px !important;font-size:14px!important}')
GM_addStyle('#viewvideo-title{position:absolute;right:10px;top:10px;z-index:1;padding:0!important;background-image:none!important;text-align:right}#viewvideo-title a{margin:20px 10px 0}')
$('.col-sm-4').removeClass('col-sm-4').removeClass('col-md-3').removeClass('col-lg-3').removeClass('col-xs-12').addClass('col-4')
$('.row .video-title').removeClass('m-t-5')
$('.well').removeClass('well-sm')


$('.row .well').each(function () {
	var link = $(this).find('a')

	var href = link.attr('href');
	if (href.includes('view_video.php') && href.includes('&')) {
		const url = new URL(href);

		console.log(url.searchParams.get('viewkey'));
		href = '/view_video.php?viewkey=' + url.searchParams.get('viewkey')
	}

	var strLink = '<a href="' + href + '"></a>'
	var thumb = $(this).find('.thumb-overlay')
	var title = $(this).find('.video-title')
	thumb.wrapInner(strLink)
	title.wrapInner(strLink)

	link.remove()
	$(this).prepend(title.clone())
	$(this).wrapInner('<div class="yt-info"></div>')
	$(this).prepend(thumb.clone())

	$(this).find('.yt-info').children('.info').removeClass('text-left')
	$(this).find('.yt-info').contents().not("a, span, br").wrap("<b>");

	var author = $(this).find('.yt-info').children('.info').eq(1).next().text().trim();
	if ($.inArray(author, blacklist) > -1) {
		//alert('true');
		$(this).parent().hide();
	}
	var fav = parseInt($(this).find('.yt-info').children('.info').eq(3).next().text())
	var view = parseInt($(this).find('.yt-info').children('.info').eq(2).next().text())
	var percent = parseInt(10000 * fav / view);
	if (percent > 0) {
		$(this).addClass('hightlight').find('.thumb-overlay a').append('<span class="good">' + percent + '</span>')
	}
	if (percent < 35) {
		var cat = getUrlParameter('category')
		if (cat != 'tf' && cat != 'mf' && cat != 'top') {
			if (pathname == '/v.php') {
				$(this).parent().hide();
			}
		}
	}
})
var alwaysHD = 0;
var shoudRedirect = 0;
/*
if (window.localStorage.getItem('hd') === null) window.localStorage.setItem('hd', '1');
if (window.localStorage.getItem('hd') == '0') alwaysHD = 0;
*/

if (pathname == '/view_video_hd.php' || pathname == '/view_video.php') {
	GM_addStyle('.top-nav,.navbar,#search_form,.col-md-4, #videodetails h4,#videodetails br{display:none!important}#videodetails{padding:0!important;border:0!important}.video-container{padding:0!important;background-color:black!important}.row{margin:0!important}');

	GM_addStyle('.video-container video {width: 100%;height: 100vh !important;}.plyr__video-wrapper{position:relative;}.yt-download{width:100%;height:50px}')
	var link = window.document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://cdn.plyr.io/3.7.8/plyr.css';
	document.getElementsByTagName("HEAD")[0].appendChild(link);
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
			options: [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2]
		}
		//volume: 0.1
	});
}

if (pathname == '/view_video_hd.php') {
	if (alwaysHD == 0) window.location.href = window.location.href.replace(/view_video_hd/g, 'view_video');
	else window.setTimeout(YTPlay('1'), 1000);
}
if (pathname == '/view_video.php') {
	$('.col-md-8').removeClass('col-md-8')

	var name = $('#videodetails h4').eq(0).text().trim();
	var user = $('.title-yakov .title').eq(0).text().trim()
	var userid = $('.title-yakov a').eq(0).attr('href')
	if (userid) userid = userid.replace('http://91porn.com/uprofile.php?UID=', '')
	var count = $('#videodetails-content .title a').eq(0).text()
	var id = getUrlParameter('viewkey')

	if (shoudRedirect == 1 && !getUrlParameter('url')) {
		var str = 'https://jiuse.vip/video/view/' + encodeURIComponent(id) + '?server=line1&user=' + encodeURIComponent(user) + '&userid=' + encodeURIComponent(userid) + '&name=' + encodeURIComponent(name) + '&count=' + encodeURIComponent(count) + '&from=91porn'
		location.href = str
	}

	var filename = user + ' - ' + name + ' - ' + id;
	$('title').html(filename);
	$('#videodetails').prepend('<div id="viewvideo-title"></div>')
	$('#viewvideo-title').html('<a id="yt-refresh" target="_blank" href="https://www.vlogdownloader.com/#http://www.91porn.com/view_video.php?viewkey=' + getUrlParameter('viewkey') + '">刷新</a>');
	$('#viewvideo-title').append('<a id="yt-download">' + name + '</a>');
	$('#viewvideo-title').append($('.title-yakov a').eq(0).clone());
	$('#viewvideo-title').append($('#videodetails-content .title a').eq(0).clone());


	var vdURL = $('#yt-refresh').attr('href')
	window.setTimeout(function () {
		var videoURL = $('#player_one_html5_api source').eq(0).attr('src')
		YTPlay(videoURL)
	}, 1000);
}
if (pathname == '/ev.php' || pathname == '/vip.php') {
	GM_addStyle('brde{display:none!important}')
	var name = getUrlParameter('name')
	var id = getUrlParameter('id')
	var user = getUrlParameter('user')
	var userid = getUrlParameter('userid')
	var count = getUrlParameter('count')

	addMeta('pragma', 'no-cache')
	addMeta('Cache-Control', 'no-cache, must-revalidate')
	addMeta('expires', '0')

	try {
		var str = document.getElementsByTagName('source')[0].getAttribute('src');
		if (shoudRedirect == 1) location.href = 'https://rss.ytzong.com/player.htm?url=' + encodeURIComponent(str) + '&id=' + encodeURIComponent(id) + '&user=' + encodeURIComponent(user) + '&userid=' + encodeURIComponent(userid) + '&name=' + encodeURIComponent(name) + '&count=' + encodeURIComponent(count) + '&from=91porn'
	} catch (e) {
		//setTimeout(location.reload(true), 15000);
	}
}

function addMeta(http, content) {
	var meta = document.createElement('meta');
	meta.httpEquiv = http
	meta.content = content
	document.getElementsByTagName('head')[0].appendChild(meta);
}
/*
if (pathname == '/v.php' || pathname == '/search_result.php') {
	var strURL = window.location.href;
	var strContain = 'viewtype=detailed';
	if (!strURL.includes(strContain)) {
		if (strURL.includes('?')) window.location.href = strURL + '&' + strContain;
		else window.location.href = strURL + '?' + strContain;
	}
}
*/
main();

function scrollToPlayer() {
	$('html').animate({
		scrollTop: $("#yt-top").offset().top
	}, 0);
}

function main() {
	Cookies.set('watch_times', '0');

	function rotate(deg) {
		var height = $(window).height();
		var width = $('#yt-video').width();
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
	$(document).keydown(function (e) {
		var video = $('video')[0];
		var videoWrapper = $('.plyr').eq(0);
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
		//D
		if (e.keyCode == 68) {
			//copyTitle();
			//$('#yt-download').get(0).click();
			/*
			var _videoURL = $('#yt-download').attr('href')
			var _videoTitle = $('#viewvideo-title a').eq(2).text().trim() + ' - ' + $('#yt-download').text().trim() + ' - ' + getUrlParameter('viewkey') + '.mp4'
			var arg = { url: _videoURL, name: _videoTitle} ;
			var result = GM_download(arg);
			*/
		}

		function copyTitle() {
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val($('#viewvideo-title a').eq(2).text().trim() + ' - ' + $('#yt-download').text().trim() + ' - ' + getUrlParameter('viewkey')).select();
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
		//V
		if (e.keyCode == 86) {
			copyTitle();
			window.location.href = window.location.href.replace('view_video.php', 'view_video_hd.php');
		}
		//A
		if (e.keyCode == 65) {
			var allLink = $('#viewvideo-title a').eq(-1).attr('href');
			if (pathname == '/uprofile.php') allLink = $('#divAccInfo a').eq(0).attr('href');
			if (allLink.length > 0)
				window.location.href = allLink;
		}
		//S
		if (e.keyCode == 83) {
			var authorLink = $('#viewvideo-title a').eq(2).attr('href');
			if (pathname == '/uvideos.php') authorLink = $('.submenu .navbar-nav a').eq(0).attr('href');
			if (authorLink.length > 0)
				window.location.href = authorLink;
		}
		//右箭头
		if (e.keyCode == 39) {
			scrollToPlayer();
			//ALT
			if (e.keyCode == 18) {
				video.currentTime = video.currentTime + 25;
			}
		}
		//左箭头
		if (e.keyCode == 37) {
			scrollToPlayer();
			//ALT
			if (e.keyCode == 18) {
				video.currentTime = video.currentTime - 25;
			}
		}
		//,
		if (e.keyCode == 188) {
			scrollToPlayer();
			video.currentTime = video.currentTime - 0.0416;
		}
		if (e.keyCode == 190) {
			scrollToPlayer();
			video.currentTime = video.currentTime + 0.0416;
		}
		//Q 或 J
		if (e.keyCode == 81 || e.keyCode == 74) {
			var next = $('span.pagingnav').next().attr('href');
			if (next.length > 0) self.location = next;
		}
		//W 或 K
		if (e.keyCode == 87 || e.keyCode == 75) {
			var prev = $('span.pagingnav').prev().attr('href');
			if (prev.length > 0) self.location = prev;
		}
	});
}

function YTPlay(videoURL) {
	var src = videoURL
	//$('video source').attr('src');
	//if (getUrlParameter('url')) str = getUrlParameter('url')

	if (src) {

	}
	else {
		var VID = $("#favorite #VID")[0].innerText
		src = "https://cdn77.91p49.com/m3u8/" + VID + "/" + VID + ".m3u8"
	}
	console.log(src)
	var height = $(window).height();
	$('#yt-download').attr('href', src)

	var playerHTML = '<div id="yt-top" style="height:0;overflow:hidden"></div><video id="yt-video" playsinline controls autoplay loop muted="muted" preload="auto"></video>'
	$('.video-container').remove()
	$('.videodetails-yakov').eq(0).prepend('<div class="video-container">' + playerHTML + '</div>')
	// else $('.video-container').html(playerHTML);
	$('#useraction').prepend('<textarea class="yt-download">ffmpeg -i "' + src + '" -c copy "' + $('title').text() + '.mp4"</textarea>')
	//window.setTimeout(scrollToPlayer, 1000);

	usePlyr();

	var video = document.getElementById('yt-video');
	if (Hls.isSupported()) {
		var hls = new Hls();
		hls.loadSource(src);
		hls.attachMedia(video);
	}

	$('#yt-video').trigger('play');

	scrollToPlayer()
}
$('.yt-download').click(function () {
	let magnet = $(this).text()
	console.log(magnet)
	copyString(magnet)
})

function copyString(str) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(str).select();
	document.execCommand("copy");
	$temp.remove();
}
//https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}