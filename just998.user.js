// ==UserScript==
// @name         Just998
// @version      0.2
// @author       ytzong
// @description  Just998
// @include      http://*just998.com/*
// @include      https://*just998.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

$('.content a').each(function(i){
	var href = $(this).text();
	if (href.indexOf('...')) {
	
	} 
	else {
		if (href.indexOf('http'))
			$(this).attr('href', href).removeAttr('onclick');
	}
}); 