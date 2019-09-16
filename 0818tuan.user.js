// ==UserScript==
// @name         0818tuan
// @version      0.9.1
// @author       ytzong
// @description  0818tuan
// @include      http://*0818tuan.com/*
// @include      https://*0818tuan.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// @require      https://cirocosta.github.io/qcode-decoder/build/qcode-decoder.min.js
// ==/UserScript==

GM_addStyle('.hb_pop, .hb_pop_cover{display:none!important}.col-md-4, .col-md-8 {float:none!important;width:auto !important;}.yt-source{margin-top:3em;text-align:center}.post-content img{display:inline !important;vertical-align: top;margin:1em 1em 1em 0;}');

var pathname = location.pathname;
if (pathname.includes('/list-1')) {
    $('.col-md-4').hide();
}
if (location.pathname.includes('/xbhd/')) {
	$('img + br').remove();

	var time = 1000;
	var images = document.querySelectorAll('.post-content img');
	for (let image of images) {
		setTimeout(function() {
//			console.log(image.src);
			var imgsrc = image.src;
            //imgsrc = imgsrc.replace(/img.zuanke8.com\/forum/g, 'www.zuanke8.com/data/attachment/forum');
            console.log(image.src);
			//imgsrc = imgsrc.replace(/http:\/\/www.0818tuan.com\/jd\/getimg\/z8.php\?url=/g, '');
			//imgsrc = imgsrc.replace(/http:\/\/jd.0818tuan.com\/getimg\/z8.php\?url=/g, '');

			toDataURL(imgsrc, function(imageURI) {
				console.log(imageURI);

				QCodeDecoder().decodeFromImage(imageURI, function(err, strQR) {
					if (err) {
						console.log(err);
					} else {
						var strElement = '<p>';
						if (S(strQR).startsWith('http')) {
							strQR = decodeURIComponent(strQR);
							strQR = JDMall2Mobile(strQR);
							strElement += '👍<a target="_blank" rel="noreferrer" href="' + strQR + '">' + strQR + '</a>';
						} else {
							strElement += strQR;
						}
						strElement += '</p>';
						image.insertAdjacentHTML('afterend', strElement);
						image.parentNode.removeChild(image);
					}
				});

			});
			console.log('paused');
		}, time);
		time += 100;
	}
}
$('.list-group a').each(function(i) {
	let title = $(this).text();
	let blacks = ['促销活动', '必看活动', '微信专享', '：', '买单吧', 'A股', '快撸京东支付礼包'];
	let shoudHide = 0;
	if ($(this).find('img').length) shoudHide = 1;
	for (let b of blacks) {
		if (S(title).contains(b)) shoudHide = 1;
	}
	if (shoudHide == 1) $(this).hide();
});
$('.post-content p').each(function(i) {
	let title = $(this).text();
	let blacks = ['上一篇：', '下一篇：'];
	let shoudHide = 0;
	for (let b of blacks) {
		if (S(title).contains(b)) shoudHide = 1;
	}
	if (shoudHide == 1) $(this).hide();
});
$('.post-content a').each(function(i) {
	var text = $(this).text();
	if (text.includes('http') && !text.includes('...')) {
		$(this).attr('href', text);
	}
	var url = $(this).attr('href');
	url = S(url)
		.replaceAll('http://jd.0818tuan.com/url/?u=', '')
		.replaceAll('http://www.0818tuan.com/jd/url/?u=', '')
        .replaceAll('http://u.0818tuan.com/jd/?u=', '')
        .replaceAll('http://m.0818tuan.com/jd/?u=', '')
		.replaceAll('/jump/uland/?url=', '')
		.replaceAll('sho___', 'shopId')
        .replaceAll('sho...', 'shopId')
		.s;
	url = decodeURIComponent(url);
	url = JDMall2Mobile(url);
	$(this).attr('href', url).attr('rel', 'noreferrer');;
});
$('.caption a.btn').each(function(){
    var url = $(this).attr('href');
	url = S(url)
		.replaceAll('http://jd.0818tuan.com/url/?u=', '')
		.replaceAll('http://www.0818tuan.com/jd/url/?u=', '')
        .replaceAll('http://u.0818tuan.com/jd/?u=', '')
        .replaceAll('http://m.0818tuan.com/jd/?u=', '')
		.s;
	url = decodeURIComponent(url);
    $(this).attr('href', url).attr('rel', 'noreferrer');;
})
var sourceURL = $('.post-content .text-center a').eq(0);
var sourceHTML = sourceURL.attr('href');
if (S(sourceHTML).startsWith('http')) {
	sourceHTML = '<p class="yt-source">来源：<a rel="noreferrer" href="' + sourceHTML + '">' + sourceHTML + '</a></p>';
	$('.post-content').append(sourceHTML);
}
sourceURL.parent().hide();

function JDMall2Mobile(url) {
	var newURL = url;
	if (url.includes('mall.jd.com/index')) {
		var pathnames = url.split('/');
		var pathname = pathnames[pathnames.length - 1];
		pathnames = pathname.split('.');
		pathname = pathnames[0];
		pathname = pathname.replace(/index-/g, '');
		newURL = 'https://shop.m.jd.com/?shopId=' + pathname + '#';
	}
	if (url.includes('shop.m.jd.com')) {
		newURL += '#';
	}
	return newURL;
}

function toDataURL(url, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onload = function() {
		var fileReader = new FileReader();
		fileReader.onloadend = function() {
			callback(fileReader.result);
		}
		fileReader.readAsDataURL(httpRequest.response);
	};
	httpRequest.open('GET', url);
	httpRequest.responseType = 'blob';
	httpRequest.send();
}