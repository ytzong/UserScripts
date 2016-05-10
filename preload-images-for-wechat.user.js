// ==UserScript==
// @name         Preload Images for WeChat
// @namespace    http://twitter.com/ytzong
// @version      0.5
// @description  Preload Images for WeChat
// @author       ytzong
// @match        http://mp.weixin.qq.com/*
// @match        https://mp.weixin.qq.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==

function main() {
    //$('title').text($('#activity-name:eq(0)').text());
    $('img').each(function(){
        var dataSrc = $(this).attr('data-src');
        if (dataSrc)
            $(this).attr('src', dataSrc).removeAttr('style').removeAttr('data-s').removeAttr('data-w').removeAttr('data-ratio');
    })
}
window.setTimeout(main, 2000);