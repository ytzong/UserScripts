// ==UserScript==
// @name         Preload for Zhihu
// @namespace    http://twitter.com/ytzong
// @version      0.2
// @description  Preload for Zhihu
// @author       ytzong
// @match        http://*.zhihu.com/*
// @match        https://*.zhihu.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==



function main() {
	var rsslink = 'https://rss.lilydjwg.me/zhihuzhuanlan';
	if (window.location.pathname.indexOf('following/columns') !== -1) {
		$('.ContentItem-title').each(function(){
			var link = rsslink + '/' + $(this).find('.ColumnLink').attr('href').split('/')[3];
			if ($(this).find('.yt-rss').length === 0) $(this).append('(<a href="' + link + '" target="_blank" class ="yt-rss">RSS</a>)');
		});
	}
	if (window.location.hostname == 'zhuanlan.zhihu.com') {
		var title = $('.column-about .title');
		if (title.find('.yt-rss').length === 0) {
			var link = rsslink + title.attr('href');
			title.append('(<a href="' + link + '" target="_blank" class ="yt-rss">RSS</a>)');
		}
	}
    $('img').each(function(){
        var dataSrc = $(this).attr('data-original');
        if (dataSrc && dataSrc != $(this).attr('src'))
            $(this).attr('src', dataSrc).attr('style', '');
    });
    //console.log('run');
}

window.setInterval(main, 1000);