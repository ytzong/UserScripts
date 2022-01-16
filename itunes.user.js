// ==UserScript==
// @name         iTunes
// @namespace    https://twitter.com/ytzong
// @version      2022.01.16
// @author       ytzong
// @include      https://itunes.apple.com/*
// @include      https://apps.apple.com/*
// @grant        GM_addStyle
// @run-at       document-end
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @description Show large icon
// ==/UserScript==



var url = window.location.href;
if (url.indexOf('?') != -1) {
	url = url.substr(0, url.indexOf('?'));
	window.location.href = url;
}

var ok = false;
window.setInterval(main, 1000);

function main() {

	if ($('#yt-icon').length == 0) {
		GM_addStyle('.inline-list__item--bulleted{background-color:yellow !important}');

		console.log('exe')
		var time = $('.version-history__item__release-date').eq(0).text();
		if ($('#yt-time').length == 0) $('.product-header').append('<span id="yt-time" style="background:yellow;color:#8e8e93">' + time + '</span>');

		var coverURL = $('source').eq(0).attr('srcset').split(',')[0].replace(' 1x', '')
		console.log(coverURL);
		coverURL = coverURL.replace(/230x0w/, "1024x0w");
		coverURL = coverURL.replace(/.jpg/, ".png")
		coverURL = coverURL.replace(/.webp/, ".png")
		if ($('#yt-icon').length == 0) $('.product-hero__artwork').wrap('<a id="yt-icon" href="' + coverURL + '" target="_blank"></a>');
	}

}
