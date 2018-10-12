// ==UserScript==
// @name         0818tuan
// @version      0.8
// @author       ytzong
// @description  0818tuan
// @include      http://*0818tuan.com/*
// @include      https://*0818tuan.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// ==/UserScript==

GM_addStyle('.yt-source{margin-top:3em;text-align:center}');
if (location.pathname.includes('/xbhd/')) {

}
$('.list-group a').each(function(i){
	let title = $(this).text();
	let blacks = ['促销活动', '必看活动', '微信专享', '：'];
	let shoudHide = 0;
	if ($(this).find('img').length) shoudHide = 1;
	for (let b of blacks) {
		if (S(title).contains(b)) shoudHide = 1;
	}
	if (shoudHide == 1) $(this).hide();
});
$('.post-content p').each(function(i){
	let title = $(this).text();
	let blacks = ['上一篇：', '下一篇：'];
	let shoudHide = 0;
	for (let b of blacks) {
		if (S(title).contains(b)) shoudHide = 1;
	}
	if (shoudHide == 1) $(this).hide();
});
$('.post-content a').each(function(i){
	var text = $(this).text();
	if (text.includes('http') && !text.includes('...')) {
		$(this).attr('href', text);
	}
	var url = $(this).attr('href');
	url = S(url)
            .replaceAll('http://jd.0818tuan.com/url/?u=', '')
            .replaceAll('http://www.0818tuan.com/jd/url/?u=', '')
            .replaceAll('/jump/uland/?url=', '')
            .s;
	url = decodeURIComponent(url);
	$(this).attr('href', url);
});

var sourceURL = $('.post-content .text-center a').eq(0);
var sourceHTML = sourceURL.attr('href');
if (S(sourceHTML).startsWith('http')) {
    sourceHTML = '<p class="yt-source">来源：<a href="' + sourceHTML + '">' + sourceHTML + '</a></p>';
    $('.post-content').append(sourceHTML);
}
sourceURL.parent().hide();

