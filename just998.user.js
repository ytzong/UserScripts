// ==UserScript==
// @name         Just998
// @version      0.3
// @author       ytzong
// @description  Just998
// @include      http://*just998.com/*
// @include      https://*just998.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

$('.content a').each(function(i){
	var real = $(this).attr('onclick');
	var reals = real.split(',');
	real = reals[reals.length - 1];
	reals = real.split("'");
	var href = '';
	if (reals.length > 2) {
		href = reals[1];
	}
	else {
		var text = $(this).text();
		if (text.includes('http') && !text.includes('...')) {
			href = text;
		}
	}
	$(this).attr('href', href);
	$(this).removeAttr('onclick');
});