// ==UserScript==
// @name         BTKitty Magnet to Torrent
// @namespace    http://twitter.com//ytzong
// @version      0.9
// @description  BTKitty Magnet to Torrent
// @author       ytzong
// @match        http://btkitty.org/*
// @match        http://btkitty.la/*
// @match        http://btkitty.me/*
// @match        http://storebt.com/torrent/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('#abcffddafae, .list-box .list dl:nth-child(1), .topbar{display: none !important} .midbox .search .searchBox .kwd input {margin-top:0 !important;font-size:20px !important;padding-left:1% !important}');

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
        window.setInterval(window.close, 3000);
    }
    else {
        $('#kwd').focus();
        
        var sort = $('.search-option a:nth-last-child(3)');
        if (sort.length > 0 && sort.attr('class') != 'active') {
            window.location.href = sort.attr('href');
        }
        $('.detail a').each(function(){
            if ($(this).text() == '[下载BT种子]') {
                window.location.href = $(this).attr('href');
            }   
        })  
    }
}
addJQuery(window.setTimeout(main, 1000));