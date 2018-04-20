// ==UserScript==
// @name         0818tuan
// @version      0.3
// @author       ytzong
// @description  0818tuan
// @include      http://*0818tuan.com/*
// @include      https://*0818tuan.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('');

$('.post-content a').each(function(i){
	var text = $(this).text();
	if (text.includes('http') && !text.includes('...')) {
		$(this).attr('href', text);
	}
	var url = $(this).attr('href');
	url = url.replace('http://jd.0818tuan.com/url/?u=', '');
	url = decodeURIComponent(url);
	$(this).attr('href', url);
});