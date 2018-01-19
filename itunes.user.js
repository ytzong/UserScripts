// ==UserScript==
// @name         iTunes
// @namespace    https://twitter.com/ytzong
// @version      0.7
// @author       ytzong
// @include      https://itunes.apple.com/*
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @description Show large icon
// ==/UserScript==

GM_addStyle('.inline-list__item--bulleted{background-color:yellow !important}');

window.setTimeout(main, 3000);
function main(){
	var appLink = location.href;
	appLink = appLink.replace('http://', 'https://');
	appLink = appLink.replace('https://', 'itms://');
	var button = '<div class="product-header__routes"><p class="product-header__routes__cta"><a href="'+ appLink +'" aria-label="View in iTunes" class="we-button we-button--outlined we-button--external ember-view">View in <span class="we-button__app-text">iTunes</span></a></p></div>';
	if ($('.product-header__routes').length == 0) $('.product-header').append(button);

	var time = $('.version-history__item__release-date').eq(0).text();
	$('.product-header').append('<span style="background:yellow;color:#8e8e93">' + time + '</span>');

	var coverURL = $('.product-hero__artwork img').attr('src');
	console.log(coverURL);
	coverURL = coverURL.replace(/246x0w/, "1024x0w");
	coverURL = coverURL.replace(/.jpg/, ".png");
	$('.product-hero__artwork').wrap('<a href="' + coverURL + '" target="_blank"></a>');

	var badge = $('.badge--product-title');
	badge.remove();
	var title = $('.product-header__title').text();
	title = $.trim(title);
	$('.product-header__title').append(badge);
	$('.product-header__title').wrap('<a href="https://www.appannie.com/search/?q=' + encodeURIComponent(title) + '" target="_blank"></a>');
}
