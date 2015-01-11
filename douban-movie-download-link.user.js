// ==UserScript==
// @name           Douban Movie Download Search
// @namespace      Douban Movie Download Search
// @description    Douban Movie Download Search
// @match        http://movie.douban.com/subject/*
// @version    0.3
// @copyright  2012+, ytzong
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "about:blank");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.head.appendChild(script);
    }, false);
    document.head.appendChild(script);
}

function main() {
    try {
    	var movieTitle = jQuery('h1 span:eq(0)').text();
		jQuery('#info').append('<div><span class="pl">下载链接:</span> <a href="http://dianying.fm/category/key_' + movieTitle + '" target="_balnk">电影FM</a> / <a href="http://btmee.net/search/?q=' + movieTitle + '" target="_balnk">BTmee</a> / <a href="https://www.google.com/search?sourceid=chrome&ie=UTF-8&q=' + movieTitle + '+720p" target="_balnk">百度云</a><br><span class="pl">字幕链接:</span> <a href="http://subhd.com/search/' + movieTitle + '" target="_balnk">SubHD</a><div>');
    }
    catch (e) { }
}
addJQuery(main);