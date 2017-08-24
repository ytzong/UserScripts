// ==UserScript==
// @name         BTBTT
// @version      0.4
// @author       ytzong
// @description  Auto download torrent
// @include    http://*btbbt.*/*
// @include    http://*btbtt.*/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle('body {background-image:none !important}.width{width:auto !important}');

if (location.pathname.includes('attach-dialog')) {
    var url = location.protocol + '//' + location.hostname + '/' + $('.icon-download').parent().attr('href');
    location.href = url;
    window.setInterval(window.close, 10000);
}
