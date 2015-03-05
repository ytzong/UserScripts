// ==UserScript==
// @name         Preload for Zhihu
// @namespace    http://twitter.com/ytzong
// @version      0.1
// @description  Preload for Zhihu
// @author       ytzong
// @match        http://*.zhihu.com/*
// @match        https://*.zhihu.com/*
// @grant        none
// ==/UserScript==


function main() {
    $('img').each(function(){
        var dataSrc = $(this).attr('data-original');
        if (dataSrc && dataSrc != $(this).attr('src'))
            $(this).attr('src', dataSrc).attr('style', '');
    });
    //console.log('run');
}

window.setInterval(main, 1000);