// ==UserScript==
// @name         zimuku
// @version      0.3
// @author       ytzong
// @description  zimuku
// @include      http*://www.zimuku.*/*
// @include      http*://www.subku.net/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle('.modal-open{overflow:auto!important}');
if (location.host == 'www.subku.net') {
    var url = $('.btn').eq(1).attr('href');
    location.href = url;
    window.setInterval(window.close, 10000);
}