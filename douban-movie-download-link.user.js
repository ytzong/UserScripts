// ==UserScript==
// @name           Douban Movie Download Search
// @namespace      Douban Movie Download Search
// @description    Douban Movie Download Search
// @match        http://movie.douban.com/subject/*
// @version    0.2
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
		jQuery('#info').append('<div><span class="pl">下载链接:</span> <a href="http://simplecd.me/search/entry/?query=' + movieTitle + '" target="_balnk">SimpleCD</a> / <a href="http://btmee.net/search/?q=' + movieTitle + '" target="_balnk">BTmee</a> / <a href="http://www.mp4ba.com/search.php?keyword=' + movieTitle + '" target="_balnk">MP4BA</a><br><span class="pl">字幕链接:</span> <a href="http://shooter.cn/search/' + movieTitle + '" target="_balnk">Shooter</a><div>');
    }
    catch (e) { }
}
addJQuery(main);