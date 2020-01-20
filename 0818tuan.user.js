// ==UserScript==
// @name         0818tuan
// @version      2019.11.14
// @author       ytzong
// @description  0818tuan
// @include      http://*0818tuan.com/*
// @include      https://*0818tuan.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cirocosta.github.io/qcode-decoder/build/qcode-decoder.min.js
// ==/UserScript==

GM_addStyle('iframe, .hb_pop, .hb_pop_cover{display:none!important}.col-md-4, .col-md-8 {float:none!important;width:auto !important;}.yt-source{margin-top:3em;text-align:center}.post-content img{display:inline !important;vertical-align: top;margin:1em 1em 1em 0;}.col-md-4, .panel + .panel, .list-group img, .list-group img + a {display: none !important}');

document.querySelectorAll('.list-group a').forEach(function(ele) {
    let shoudHide = 0;
    
    let url = ele.href;
    if (!url.includes('.html')) shoudHide = 1;
    
    let title = ele.innerText;
	let blacks = ['促销活动', '必看活动', '微信专享', '：', '买单吧', 'A股', 'Air', '快撸京东支付礼包', '&gt;&gt;', '>>'];
	
	//if ($(this).find('img').length) shoudHide = 1;
	for (let b of blacks) {
		if (title.includes(b)) shoudHide = 1;
	}
	if (shoudHide == 1) ele.style.display = 'none';
});
document.querySelectorAll('.post-content p').forEach(function(ele) {
    let shoudHide = 0;
    let blacks = ['上一篇：', '下一篇：'];
    let title = ele.innerText;
	for (let b of blacks) {
		if (title.includes(b)) shoudHide = 1;
	}
	if (shoudHide == 1) ele.style.display = 'none';
});
/*
document.querySelectorAll('.post-content img').forEach(function(ele) {
    let url = ele.src;
    if (url.includes('zuanke8.com')){
        var wrapper = document.createElement('a');
        wrapper.href = 'x-icabmobile://x-callback-url/open?url=' + url
        ele.parentNode.insertBefore(wrapper, ele);
        wrapper.appendChild(ele);
    }
});
*/
var pathname = location.pathname;

if (location.pathname.includes('/xbhd/')) {
	$('img + br').remove();

	var time = 1000;
	var images = document.querySelectorAll('.post-content img');
	for (let image of images) {
		setTimeout(function() {
			var imgsrc = image.src;
            console.log(image.src);
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

document.querySelectorAll('.post-content a').forEach(function(ele) {
    let text = ele.innerText;
	if (text.includes('http') && !text.includes('...') && !text.includes('…')) {
		ele.href = text;
	}

	let url = ele.href;
	url = url.replace(/http:\/\/jd.0818tuan.com\/url\/\?u=/g, '');
	url = url.replace(/http:\/\/www.0818tuan.com\/jd\/url\/\?u=/g, '');
	url = url.replace(/http:\/\/u.0818tuan.com\/jd\/\?u=/g, '');
	url = url.replace(/http:\/\/m.0818tuan.com\/jd\/\?u=/g, '');
    url = url.replace(/http:\/\/m.0818tuan.com\/suning\/\?visitUrl=/g, '');
	url = url.replace(/\/jump\/uland\/\?url=/g, '');
    url = url.replace(/http:\/\/www.0818tuan.com\/tao\/taoke.php\?item_id=/g, 'https://item.taobao.com/item.htm?id=');
	url = decodeURIComponent(url);
    
	url = JDMall2Mobile(url);
    ele.href = url;
    ele.rel = 'noreferrer';
});

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

