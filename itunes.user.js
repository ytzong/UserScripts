// ==UserScript==
// @name         iTunes
// @namespace    https://twitter.com/ytzong
// @version      2023.10.03
// @author       ytzong
// @include      *://apps.apple.com/*
// @grant        GM_addStyle
// @run-at       document-start
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @description  Show large icon
// ==/UserScript==

GM_addStyle(`
#globalheader,
#localnav,
.we-banner{display:none!important}
.inline-list__item--bulleted,
.version-history button{background-color:yellow!important}
`);

setInterval(function () {
	main()
}, 500);

function main() {

	let pathname = location.pathname
	if (pathname.includes('/developer/')) {
		if ($('#yt-link').length == 0) {
			let publisherID = pathname.split('/').slice(-1)[0].replace('id', '')
			$('.page-header__title').after(' <a id="yt-link" href="' + 'https://app.sensortower.com/ios/publisher/publisher/' + publisherID + '">»</a>')
		}
	}
	if (pathname.includes('/app/')) {
		$('body').removeClass('has-modal--page-overlay')

		if ($('#yt-icon').length == 0) {
			// $('#modal-trigger-ember11').click()

			var time = $('.version-history__item__release-date').eq(0).text();
			if ($('#yt-time').length == 0) $('.product-header').append('<span id="yt-time" style="background-color:yellow;color:#8e8e93">' + time + '</span>');

			let coverURL = $('.product-hero__media source').eq(0).attr('srcset').split(',')[0].split(' ')[0]
			console.log(coverURL);
			coverURL = coverURL.replace(coverURL.split('/').slice(-1)[0], '1024x0w.png');
			$('.product-hero__artwork').wrap('<a id="yt-icon" href="' + coverURL + '" target="_blank"></a>');

			let publisher = $('.product-header__identity a').eq(0)
			let publisherID = publisher.attr('href').split('/').slice(-1)[0].replace('id', '')
			publisher.after(' <a target="_blank" href="' + 'https://app.sensortower.com/ios/publisher/publisher/' + publisherID + '">»</a>')

			let appID = $('meta[name="apple:content_id"]').attr('content')
			$('.badge--product-title').after(' <a target="_blank" href="' + 'https://www.qimai.cn/app/rank/appid/' + appID + '/country/us">»</a>')

			$('.app-header__subtitle').append(' <a target="_blank" href="' + 'https://www.data.ai/apps/ios/app/' + appID + '/aso">»</a>')

			$('.information-list__item .we-truncate__button').eq(-1).click()
			$('.information-list__item').eq(-1).css('background-color', 'yellow')

		}

		if ($('.yt-screenshot').length == 0) {
			$('.we-screenshot-viewer__screenshots picture').each(function () {
				let screenshotURL = $(this).find('source').eq(-1).attr('srcset').split(',')[0].split(' ')[0]
				console.log(screenshotURL.split('/').slice(-1)[0]);
				screenshotURL = screenshotURL.replace(screenshotURL.split('/').slice(-1)[0], '5000x0w.png');
				$(this).wrap('<a class="yt-screenshot" href="' + screenshotURL + '" target="_blank"></a>');
			})

			$('.whats-new').before($('.section--information'))
		}
		$('.section__description .we-truncate__button').click()
	}
}