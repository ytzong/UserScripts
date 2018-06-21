// ==UserScript==
// @name         iTunes
// @namespace    https://twitter.com/ytzong
// @version      0.9
// @author       ytzong
// @include      https://itunes.apple.com/*
// @grant        GM_addStyle
// @run-at       document-end
// @description Show large icon
// ==/UserScript==

GM_addStyle('.inline-list__item--bulleted{background-color:yellow !important}');

var url = window.location.href;
if (url.indexOf('?') != -1) {
	url = url.substr(0, url.indexOf('?'));
    window.location.href = url;
}

var ok = false;
window.setInterval(main, 2000);

function main(){
	if (ok == false){
		var appLink = location.href;
		appLink = appLink.replace('http://', 'https://');
		appLink = appLink.replace('https://', 'itms://');
		var button = '<div id="yt-button" class="product-header__routes"><p class="product-header__routes__cta"><a href="'+ appLink +'" aria-label="View in iTunes" class="we-button we-button--outlined we-button--external ember-view">View in <span class="we-button__app-text">iTunes</span></a></p></div>';
		if ($('.product-header__routes').length == 0) $('.product-header').append(button);

		var time = $('.version-history__item__release-date').eq(0).text();
		if ($('#yt-time').length == 0) $('.product-header').append('<span id="yt-time" style="background:yellow;color:#8e8e93">' + time + '</span>');

		var coverURL = $('.product-hero__artwork img').attr('src');
		console.log(coverURL);
		coverURL = coverURL.replace(/246x0w/, "1024x0w");
		coverURL = coverURL.replace(/.jpg/, ".png");
		if ($('#yt-icon').length == 0) $('.product-hero__artwork').wrap('<a id="yt-icon" href="' + coverURL + '" target="_blank"></a>');

		var badge = $('.badge--product-title');
		badge.remove();
		var title = $('.product-header__title').text();
		title = $.trim(title);
		$('.product-header__title').append(badge);
		if ($('#yt-link').length == 0) $('.product-header__title').wrap('<a id="yt-link" href="https://www.appannie.com/search/?q=' + encodeURIComponent(title) + '" target="_blank"></a>');

		if ($('#yt-time').length > 0 && $('#yt-button').length > 0 && $('#yt-link').length > 0) ok = true;
	}
}
