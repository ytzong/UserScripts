// ==UserScript==
// @name         BTBTT
// @version      0.7
// @author       ytzong
// @description  Auto download torrent
// @include      http*://*btbbt*.*/*
// @include      http*://*btbtt*.*/*
// @include      http*://*btxiaba.*/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js

// ==/UserScript==

GM_addStyle('hr{display:none!important}body {background-image:none !important}.width{width:auto !important}.thread{border-top:1px solid #E0E0E0!important}');


let blackList = ['[有广告]', 'TC-MP4', '低码版']
let blackListAuthor = ['q3r3', '飞越未来']

$('.subject').each(function(){
	var text = $(this).text();
	console.log(text);
	// https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript
	if (blackList.some(function(v) { return text.indexOf(v) >= 0; })) {
    $(this).parents('.thread').remove();
		console.log('hide');
  }
})


$('.username').each(function(){
	var text = $(this).text();
	console.log(text);
	// https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript
	if (blackListAuthor.some(function(v) { return text.indexOf(v) >= 0; })) {
      $(this).parents('.thread').remove();
		  console.log('hide');
  }
})

if (location.pathname.includes('attach-dialog')) {
    var url = location.protocol + '//' + location.hostname + '/' + $('.icon-download').parent().attr('href');
    location.href = url;
    //window.setInterval(window.close, 10000);
}
if (location.pathname.includes('vod-down-id')) {
    location.href = $('.p_list_down_link a').attr('href');
    window.setInterval(window.close, 10000);
}
