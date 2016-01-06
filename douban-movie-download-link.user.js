// ==UserScript==
// @name           Douban Movie & Book Download Search
// @namespace      Douban Movie & Book Download Search
// @description    Douban Movie & Book Download Search
// @match        http://movie.douban.com/subject/*
// @match        http://book.douban.com/subject/*
// @match        https://movie.douban.com/subject/*
// @match        https://book.douban.com/subject/*
// @version    0.8
// @copyright  2012+, ytzong
// ==/UserScript==

var movieTitle = jQuery('h1 span:eq(0)').text();

var downloadContent;

if (document.domain == 'book.douban.com') {
	downloadContent = '<div><span class="pl">下载链接:</span> <a href="https://www.google.com/search?sourceid=chrome&ie=UTF-8&q=' + movieTitle + '+azw3" target="_balnk">azw3</a> / <a href="https://www.google.com/search?sourceid=chrome&ie=UTF-8&q=' + movieTitle + '+mobi" target="_balnk">mobi</a> / <a href="https://www.google.com/search?sourceid=chrome&ie=UTF-8&q=' + movieTitle + '+epub" target="_balnk">epub</a> / <a href="http://readcolor.com/books/search?utf8=%E2%9C%93&s=' + movieTitle + '" target="_balnk">readfar</a><div>';
}
else {
	downloadContent = '<div><span class="pl">下载链接:</span> <a href="http://dianying.fm/category/key_' + movieTitle + '" target="_balnk">电影FM</a> / <a href="http://btmee.net/search/?q=' + movieTitle + '" target="_balnk">BTmee</a> / <a href="http://www.btexe.com/search?kw=' + movieTitle + '" target="_balnk">BT磁力</a> / <a href="https://www.google.com/search?sourceid=chrome&ie=UTF-8&q=' + movieTitle + '+1080p" target="_balnk">Google</a><br><span class="pl">字幕链接:</span> <a href="http://subhd.com/search/' + movieTitle + '" target="_balnk">SubHD</a><div>';
}

jQuery('#info').append(downloadContent);
