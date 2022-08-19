// ==UserScript==
// @name         iTunes
// @namespace    https://twitter.com/ytzong
// @version      2022.08.18
// @author       ytzong
// @include      https://itunes.apple.com/*
// @include      https://apps.apple.com/*
// @grant        GM_addStyle
// @run-at       document-end
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @description  Show large icon
// ==/UserScript==

GM_addStyle('.inline-list__item--bulleted{background-color:yellow !important}');

let ok = false
window.setInterval(main, 1000);

function main() {
	console.log('exe')
	let pathname = location.pathname
	if (pathname.includes('/developer/')) {
		if ($('#yt-link').length > 0) ok = true
		if (!ok) {
			let publisherID = pathname.split('/').slice(-1)[0].replace('id', '')
			$('.page-header__title').after(' <a id="yt-link" href="' + 'https://app.sensortower.com/ios/publisher/publisher/' + publisherID + '">»</a>')
		}
	}
	if (pathname.includes('/app/')) {
		if ($('#yt-icon').length > 0) ok = true

		if (!ok) {

			var time = $('.version-history__item__release-date').eq(0).text();
			if ($('#yt-time').length == 0) $('.product-header').append('<span id="yt-time" style="background:yellow;color:#8e8e93">' + time + '</span>');

			let coverURL = $('source').eq(0).attr('srcset').split(',')[0].replace(' 1x', '')
			console.log(coverURL);
			coverURL = coverURL.replace(coverURL.split('/').slice(-1)[0], '1024x0w.png');
			$('.product-hero__artwork').wrap('<a id="yt-icon" href="' + coverURL + '" target="_blank"></a>');

			let publisher = $('.product-header__identity a').eq(0)
			let publisherID = publisher.attr('href').split('/').slice(-1)[0].replace('id', '')
			publisher.after(' <a href="' + 'https://app.sensortower.com/ios/publisher/publisher/' + publisherID + '">»</a>')

			ok = true
		}
	}


}
