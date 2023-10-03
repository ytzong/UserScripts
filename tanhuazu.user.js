// ==UserScript==
// @name        TanHuaZu
// @version     2023.10.02.6
// @namespace   TanHuaZu
// @description TanHuaZu
// @include     http*://*tanhuazu.*/*
// @grant       GM_addStyle
// @run-at      document-end
// @require     https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==


$('.bbImageWrapper img').each(function () {
    let src = $(this).attr('data-url')
    if (src.length == 0) src = $(this).attr('src')

    $(this).after('<a href="' + src + '" target="_blank"><img src="' + src + '"></a>').remove()
})