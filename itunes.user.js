// ==UserScript==
// @name         iTunes
// @namespace    http://twitter.com/ytzong
// @version      0.2
// @author       ytzong
// @include      https://itunes.apple.com/*
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle('.truncate{height:auto !important}.price, .release-date, .in-app-purchases {background-color:yellow !important}');

var coverURL = $('div#left-stack div.artwork img').attr('src');
console.log(coverURL);
coverURL = coverURL.replace(/175x175/, "1024x1024");
$('div#left-stack div.artwork img').closest('a').attr('href', coverURL);