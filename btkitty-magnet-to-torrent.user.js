// ==UserScript==
// @name         BTKitty Magnet to Torrent
// @namespace    http://twitter.com/ytzong
// @version      1.4
// @description  BTKitty Magnet to Torrent
// @author       ytzong

// @include      http://btkitty.*/*
// @include      http://storebt.com/torrent/*
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==

GM_addStyle('#abcffddafae, .list-box .list dl:nth-child(1), .topbar{display: none !important} .midbox .search .searchBox .kwd input {margin-top:0 !important;font-size:20px !important;padding-left:1% !important}');

function main() {
    if (document.domain == 'storebt.com') {
        window.location.href = $('.down a').attr('href');
        window.setInterval(window.close, 4000);
    }
    else {
        $('#kwd').focus();
        var sort = $('.search-option a:nth-last-child(3)');
        if (sort.length > 0 && sort.attr('class') != 'active') {
            window.location.href = sort.attr('href');
        }
        $('.detail a').eq(0).each(function(){
            window.location.href = $(this).attr('href');
        });
    }
}
window.setTimeout(main, 1500);