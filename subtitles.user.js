// ==UserScript==
// @name         Subtitles
// @version      2019.12.23
// @author       ytzong
// @description  zimuku
// @include      http*://*subhd.*/*
// @include      http*://*zimuku.*/*
// @include      http*://*zmk.*/*
// @include      http*://www.subku.net/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

if (location.hostname.includes('subhd')) {
    let douban = $('.bg-douban').parents('a')
    let strLink = douban.attr('href').replace('https://huo720.com/sub/', 'https://movie.douban.com/subject/')
    douban.attr('href', strLink)
}
else {
    GM_addStyle('.modal-open{overflow:auto!important}');

    $('a').each(function () {
        $(this).removeAttr('target')
    })

    if (location.host == 'www.subku.net' || location.pathname.includes('/dld/')) {
        var url = $('.btn').eq(1).attr('href');
        location.href = url;
        window.setInterval(window.close, 10000);
    }

    var keyword = $('input[name="q"]').val();
    if (keyword.includes('?')) {
        keyword = keyword.split('?')[0];
        location.href = 'https://zimuku.cn/search?q=' + keyword;
    }

    $('#down1').removeAttr('target')
}  
