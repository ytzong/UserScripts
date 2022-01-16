// ==UserScript==
// @name         91Porn HTML5 Player
// @version      19.10.23
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
// @require      https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @require      https://cdn.plyr.io/3.5.6/plyr.js
// @user-agent   Mozilla/5.0 (iPad; CPU OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1
// ==/UserScript==
// 

var alwaysHD = 0;
var shoudRedirect = 1;
/*
if (window.localStorage.getItem('hd') === null) window.localStorage.setItem('hd', '1');
if (window.localStorage.getItem('hd') == '0') alwaysHD = 0;
*/
var domain = window.location.host;
var pathname = window.location.pathname;

console.log(pathname);
if (pathname == '/view_video_hd.php' || pathname == '/view_video.php') {
	GM_addStyle('#head, #headnav, #navsubbar, #containersearch{display:none!important}');
	var link = window.document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://cdn.plyr.io/3.5.6/plyr.css';
	document.getElementsByTagName("HEAD")[0].appendChild(link);
	window.setTimeout(usePlyr, 2000);
}

var blacklist = ['随风雨', '枫随风', '初恋音', 'cnmok', '我的胖妻骚妻', 'zhwgj', 'liudi2019', '傲慢先生-S', '艾瑶世纪网络', '740675263', '最爱的你', 'Liaison00', 'nmslndsl', '情爱教炼', '小妈至上5200', 'sexbook1000', 'cuixiao19860306', 'kk66', 'xuexue9191', 'vitas79', '91暖暖', 'wcs19860714520', '湘西赶尸886', '小雨', 'geiyi', '一只老污龟', '寂寞d老王', '无丝不欢', 'huangmeng789789', 'chenyuyuhou', 'xxoxxbb', '148061931', 'HuTutuu', '夜色醉美', '911993', 'walvrppp', 'pts86918', '康康2011', '左秀秀', 'aini888888', 'milky100', 'a332096261', 'huaduyibai', '狐臭者', '约炮神人', '好大你就来！', 'haokeyue', 'mxl0333', 'lichao588', 'zhutou1121', 'hl550350', 'pptppp', 'qaz907200', 'Ezreal佐耳', '猛男大鸡', '寂寞d老王', '夫妻拳交', '碧池·卡戴珊', 'song000828', '话话唠唠', '灵狩者', 'viking1', 'taitailala', 'chunliang88', 'yingdangwu', 'ttdz988888', 'senkyou', 'jiahao1069', 'ilililling', '91欣然', '91小万', '曹晓雪', '仿冒全家死', '双拳交女王', '最爱老熟', '熟女露脸大合集', '你的最爱', '娜娜公主少妇', 'libin2008', 'xiaogaogao9527', 'freeziyuan', 'poisonsfx', 'kim666', 'jackpatrick'];
var myservers = ['185.38.13.130', '198.255.82.91', '192.240.120.34', 'v.x5p.space', 'g.t4k.space', '192.133.81.234:8080', '192.133.81.234', '198.255.82.90', '192.240.120.35', '185.38.13.159', '192.240.120.75', '192.240.120.100', '192.240.120.108'];
var current = 0;

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
	//myservers = ['192.133.81.234:8080', '198.255.82.90', '185.38.13.130', '192.240.120.34'];
	if (alwaysHD == 0) window.location.href = window.location.href.replace(/view_video_hd/g, 'view_video');
	else window.setTimeout(YTPlay('1'), 1000);
}
if (pathname == '/view_video.php') {
	var name = $('#viewvideo-title').text().trim();
	var user = $('#videodetails-content a').eq(0).text().trim()
	var userid = $('#videodetails-content a').eq(0).attr('href').replace('http://91porn.com/uprofile.php?UID=', '')
	var count = $('#videodetails-content .title a').eq(0).text()
	var id = getUrlParameter('viewkey')
	var freeLink = 'https://p.91s5.xyz/vip.php?link=http://91porn.com/view_video.php?viewkey=' + id + '&id=' + id + '&count=' + count + '&userid=' + userid + '&user=' + encodeURIComponent(user) + '&name=' + encodeURIComponent(name)
    if (!location.hash) {
            try {
            var str = document.getElementsByTagName('source')[0].getAttribute('src');
            if ( shoudRedirect == 1 ) location.href = 'https://rss.ytzong.com/player.htm?url=' + encodeURIComponent(str) + '&id=' + encodeURIComponent(id) + '&user=' + encodeURIComponent(user) + '&userid=' + encodeURIComponent(userid) + '&name=' + encodeURIComponent(name) + '&count=' + encodeURIComponent(count)  + '&from=91porn'
        } catch (e) {
            //setTimeout(location.reload(true), 15000);
            var str = 'https://www.vlogdownloader.com/#http://91porn.com/view_video.php?viewkey=' + encodeURIComponent(id) + '&id=' + encodeURIComponent(id) + '&user=' + encodeURIComponent(user) + '&userid=' + encodeURIComponent(userid) + '&name=' + encodeURIComponent(name) + '&count=' + encodeURIComponent(count)  + '&from=91porn'
            location.href = str
            //window.open(str)
        }   
    }

	var filename = user + ' - ' + name + ' - ' + id;
	$('title').html(filename);
	$('#viewvideo-title').html('<a id="yt-download">' + name + '</a>');
	$('#viewvideo-title').append($('#videodetails-content a').eq(0).clone());


	var mp4 = 0;
	if ($('.videoplayer img[src="images/hd.png"]').length > 0 || $('#hd_video').length > 0) {
		mp4 = 1;
	}
	mp4 = 0;
	console.log(mp4);
	if (mp4 > 0) {
		if (alwaysHD == 1) window.location.href = window.location.href.replace(/view_video/g, 'view_video_hd');
		else window.setTimeout(YTPlay('0'), 1000);
	} else {
		window.setTimeout(YTPlay('0'), 1000);
	}
	if (mp4 == '0') $('#viewvideo-title').append($('#videodetails-content .title a').eq(0).clone());
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
		if ( shoudRedirect == 1 ) location.href = 'https://rss.ytzong.com/player.htm?url=' + encodeURIComponent(str) + '&id=' + encodeURIComponent(id) + '&user=' + encodeURIComponent(user) + '&userid=' + encodeURIComponent(userid) + '&name=' + encodeURIComponent(name) + '&count=' + encodeURIComponent(count)  + '&from=91porn'
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
if (pathname == '/v.php' || pathname == '/search_result.php') {
	var strURL = window.location.href;
	var strContain = 'viewtype=detailed';
	if (!strURL.includes(strContain)) {
		if (strURL.includes('?')) window.location.href = strURL + '&' + strContain;
		else window.location.href = strURL + '?' + strContain;
	}
}
GM_addStyle('@media (max-width:1080px) {.listchannellarge .imagechannel a:nth-child(odd){display:none}}a:visited {color: lightslategrey !important;}.videoplayer,video,.plyr video{width:100%;height:100vh !important}.plyr__video-wrapper--fixed-ratio{padding-bottom:100vh!important} body{width:100%;overflow-x:hidden;}table, tr, td { border-collapse:collapse;border:0 }#viewvideo-title a{display:inline-block; padding:0.5em 1em;}.border-box{box-sizing:border-box;}.fixed{position: fixed;top: 0;right:0;z-index: 9999999999}.pagingnav a, span.pagingnav{padding: 10px 20px !important;margin:6px !important}input.page_number {margin: 6px !important;padding: 9px !important;}.none{display:none !important}.full-width{width:100% !important}.no-float{float:none !important}.auto-height{height:auto !important}.auto-width{width:auto !important}.clearfix{overflow:hidden;}.text-center{text-align:center;}.text-left{text-align:left;}.preview{margin-bottom:10px;width:352px !important;height:198px !important;overflow:hidden;}.preview, .preview img{padding:0 !important;}.preview img{border: 0!important;width:100%; height:auto !important} .preview, .myvideo .maindescwithoutborder{width:272px !important;} .preview{height:153px !important}.bg-white{background-color:white !important}.bg-white, .bg-white a{color:#333 !important;}.margin-auto, video{margin:0 auto !important}.no-margin{margin:0 !important;}.no-padding{padding:0 !important;}.inline-block{display:inline-block !important;vertical-align: top;}.no-border{border:0 !important}.no-bg{background-image:none !important}.white{color:white!important}.hightlight{position:relative;}.good{position:absolute;right:0;top:0;background-color:#71b404;color:white;padding:3px 6px;font-weight:bold;font-size:18px;border-radius:7px;}.preview img{max-height:100% !important}');

main();

//if (pathname == '/uprofile.php' || pathname == '/view_video_hd.php' || pathname == '/view_video_hd.php') PlayerInit();
if (pathname == '/video.php' || pathname == '/v.php' || pathname == '/search_result.php') {
	setTimeout(function() {
		$('.imagechannelinfo').contents().not("a, span, br").wrap("<b>");
	}, 0)
	
	setTimeout(function() {
		$('.imagechannelinfo').each(function(i) {
			var author = $(this).children('.info').eq(2).next().next().text().trim();
			//alert(author);
			if ($.inArray(author, blacklist) > -1) {
				//alert('true');
				$(this).parent().removeClass('inline-block').addClass('none');
			}
			var fav = parseInt($(this).children('.info').eq(4).next().text())
			var view = parseInt($(this).children('.info').eq(3).next().text())
			var percent = parseInt(10000 * fav / view);
            if (percent > 0) $(this).prev().addClass('hightlight').append('<span class="good">' + percent + '</span>')
            if (percent < 35) {
                $(this).parent().removeClass('inline-block').addClass('none');
            }
		});
	}, 100)

	$('#videobox a').each(function(i) {
		var href = $(this).attr('href');
		if (href.includes('view_video.php')) {
			href = href.substring(0, href.indexOf('&'));
			$(this).attr('href', href);
		}
	});
}

function scrollToPlayer() {
	$('html').animate({
		scrollTop: $("#yt-top").offset().top
	}, 0);
}

function main() {
	$('td[width="0"], #topbar').remove();
	$('#videodetails-content .title').eq(1).attr('style', 'background-color:yellow;color:black');
	$('#container td[align="right"],#container td[align="left"],#container_video > table > tbody > tr > td:nth-child(1),#container_video > table > tbody > tr > td:nth-child(3),#container_video #rightside, .arrow-general, #mediaspace').addClass('none');
	$('#submenu, #subcontent, #container, #leftside, #myvideo, .myvideo, #fullside, #fullbox, .listchannellarge, #paging,.pagingnav').addClass('auto-width');
	$('#leftside, .myvideo, .maindescwithoutborder, .listchannellarge, .listchannellarge .imagechannel, .listchannellarge .imagechannelinfo, .videothumb, #subcontent p, #viewvideo_hd').addClass('no-float');
	$('#myvideo-content, #viewvideo-content, #viewvideo-title').addClass('no-bg');
	$('#myvideo-content, #videobox table tr td').addClass('text-center');
	$('.maindescwithoutborder, .imagechannelinfo, .listchannellarge').addClass('text-left');
	$('.myvideo').addClass('clearfix');
	$('.myvideo, .listchannellarge .imagechannel, .imagechannelinfo, #subcontent p').addClass('inline-block');
	$('.myvideo').removeClass('blue');
	$('.videothumb, .listchannellarge .imagechannel img, #subcontent p a img').addClass('preview');
	$('.videothumb a, .maindescwithoutborder a').attr('target', '_blank');
	$('.imagechannelinfo .title').each(function() {
		var des = $(this).parent();
		des.attr('target', '_blank');
	});
	//$('#myvideo-content, #videobox table tr td, #viewvideo-content').addClass('bg-white');
	$('table[width="800"], table[width="760"], table[width="99%"], td[width="900"], td[width="784"], td[width="784"] table, #viewvideo, #viewvideo-title, #hd_video, #viewvideo_hd').addClass('full-width');
	$('#videobox table tr td, .listchannellarge, #fullbox-content,#viewvideo-content, #viewvideo').addClass('no-padding');
	$('#viewvideo, #viewvideo_hd').addClass('no-border');
	$('#viewvideo-content, .videoplayer').addClass('no-margin');
	$('.imagechannelinfo, #useraction, #search').addClass('margin-auto');
	$('.imagechannelinfo').css('max-width', '400px');
	$('.imagechannelinfo a[target="_parent"]').addClass('white');
	$('#subcontent p').addClass('border-box');
	$('#subcontent p').css('width', '49%');
	$('#navsubbar p').attr('style', 'text-align: center !important;text-indent: 0 !important;');
	//$('#videodetails-content .title a').attr('style', 'right:0; padding:0 2em;font-size:16px;line-height:22px;');
	//$('#videodetails-content a .title').attr('style', 'right:10em; padding:0 2em;font-size:16px;line-height:22px;');
	$('#viewvideo-title').addClass('fixed').addClass('height');;
	$('#latestvideo').attr('style', 'position: absolute;left:50%;top:200px');
	$('#headnav td').attr('background', '');
	$('#myvideo-content .maindescwithoutborder p').each(function() {
		var des = $(this).find('strong');
		$(this).html(des.html());
	});

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
	$(document).keydown(function(e) {
		var video = $('video')[0];
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
		//D
		if (e.keyCode == 68) {
			copyTitle();
			$('#yt-download').get(0).click();
		}

		function copyTitle() {
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val($('#videodetails-content a').eq(0).text().trim() + ' - ' + $('#viewvideo-title').text().trim() + ' - ' + getUrlParameter('viewkey')).select();
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
			var allLink = $('#videodetails-content .title a').attr('href');
			if (pathname == '/uprofile.php') allLink = $('#navsubbar a').eq(1).attr('href');
			if (allLink.length > 0)
				window.location.href = allLink;
		}
		//S
		if (e.keyCode == 83) {
			var authorLink = $('#videodetails-content a').eq(0).attr('href');
			if (pathname == '/uvideos.php') authorLink = $('#navsubbar a').eq(0).attr('href');
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

function YTPlay(hd) {
	var str = $('video source').attr('src');
	if (str > 0) {
		var parser = document.createElement('a');
		parser.href = str;
		var urlreplace = parser.hostname;
		if (parser.port.length > 0) urlreplace = parser.hostname + ':' + parser.port;
		if (hd == '0') {
			var mp4path = '/mp43';
			if (!str.includes(mp4path)) str = str.replace(urlreplace, myservers[current] + mp4path);
		} else {
			str = str.replace(urlreplace, myservers[current]);
		}

		console.log(str);
		var height = $(window).height();
		$('.videoplayer, .example-video-container').html('<div id="yt-top" style="height:0;overflow:hidden"></div><video id="yt-video" src="' + str + '" playsinline controls autoplay loop muted="muted" preload="auto"></video>');

		$('#rightside').parent().attr('width', '0');
		$('#yt-video').trigger('play');
		//window.setTimeout(scrollToPlayer, 1000);
		$("#yt-video").on("error", function(err) {
			current++;
			if (current < myservers.length) {
				str = str.replace(myservers[current - 1], myservers[current]);
				$("video").attr('src', str);
				$('#yt-download').attr('href', str);
			} //else location.reload(true);
		});
	} else {

	}
}
//https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}