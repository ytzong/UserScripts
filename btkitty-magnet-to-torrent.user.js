// ==UserScript==
// @name         BTKitty Magnet to Torrent
// @namespace    http://twitter.com//ytzong
// @version      0.1
// @description  BTKitty Magnet to Torrent
// @author       ytzong
// @match        http://btkitty.org/t/*
// @match        http://storebt.com/torrent/*
// @grant        none
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.3.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {
    if (document.domain == 'storebt.com') {
        window.location.href = $('.down a').attr('href');
    }
    else {
        $('.detail a').each(function(){
            if ($(this).text() == '[下载BT种子]') {
                window.location.href = $(this).attr('href');
            }   
        })
    }
}
addJQuery(window.setTimeout(main, 300));