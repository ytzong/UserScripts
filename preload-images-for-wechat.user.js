// ==UserScript==
// @name         Preload Images for WeChat
// @namespace    http://twitter.com/ytzong
// @version      0.1
// @description  Preload Images for WeChat
// @author       ytzong
// @match        http://mp.weixin.qq.com/*
// @match        https://mp.weixin.qq.com/*
// @grant        none
// ==/UserScript==


function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {
    $('title').text($('#activity-name:eq(0)').text());
    $('img').each(function(){
        var dataSrc = $(this).attr('data-src');
        if (dataSrc)
            $(this).attr('src', dataSrc).attr('style', '');
    })
}
addJQuery(window.setTimeout(main, 2000));