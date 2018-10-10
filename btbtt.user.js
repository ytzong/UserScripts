// ==UserScript==
// @name         BTBTT
// @version      0.6
// @author       ytzong
// @description  Auto download torrent
// @include      http://*btbbt.*/*
// @include      http://*btbtt.*/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// @namespace    https://greasyfork.org/users/670
// ==/UserScript==

GM_addStyle('body {background-image:none !important}.width{width:auto !important}hr{display:none!important}.thread{border-top:1px solid #E0E0E0!important}');
let blackList = ['[有广告]', 'TC-MP4'];
if (location.pathname.includes('attach-dialog')) {
    var url = location.protocol + '//' + location.hostname + '/' + $('.icon-download').parent().attr('href');
    location.href = url;
    window.setInterval(window.close, 10000);
}
$('.subject').each(function(){
	var text = $(this).text();
	console.log(text);
	// https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript
	if (blackList.some(function(v) { return text.indexOf(v) >= 0; })) {
        $(this).parents('.thread').hide();
		console.log('hide');
    }
})
