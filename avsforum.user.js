// ==UserScript==
// @name         avsforum
// @version      2019.10.4
// @author       ytzong
// @description  avsforum
// @include      http*://*avsforum.*/*
// @copyright    2019+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/string.js/3.3.3/string.min.js
// ==/UserScript==

GM_addStyle('#sidebar, .item-social{display:none!important}#main-content_wrapper{width:auto!important}');

window.setInterval(toHD, 3000);

function toHD(){
    jQuery('.thumbnail').each(function(){
        src = jQuery(this).attr('src')
        src = S(src).replaceAll('&thumb=1', '').s
        jQuery(this).attr('src', src)
    })    
}
