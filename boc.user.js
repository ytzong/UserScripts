// ==UserScript==
// @name        BOC
// @namespace   Violentmonkey Scripts
// @include       https://jf365.boc.cn/*
// @grant       none
// @version     1.0
// @author      -
// @description 2019/11/29 下午6:02:55
// ==/UserScript==


window.setInterval(hideGoods, 2000);

function hideGoods() {
    $('.poc_ul li').each(function(){
        var txt = $(this).find('.money').text()
        if (txt.includes('期')) {
            $(this).hide()
        }
    })  
}
