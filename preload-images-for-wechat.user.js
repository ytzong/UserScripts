// ==UserScript==
// @name         Preload Images for WeChat
// @namespace    http://twitter.com/ytzong
// @version      0.8
// @description  Preload Images for WeChat
// @author       ytzong
// @match        http://mp.weixin.qq.com/*
// @match        https://mp.weixin.qq.com/*
// @match        http://rd.wechat.com/*
// @match        https://rd.wechat.com/*
// @grant        GM_addStyle
// @run-at       document-start
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==

Object.defineProperty(navigator, 'userAgent', {
    value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Safari/602.1.50'
});

GM_addStyle('@media screen and (min-width: 1024px) {.rich_media,.not_in_mm .qr_code_pc_inner {width:80% !important}}.rich_media_content {overflow:visible !important}.rich_media_content p, .rich_media_content p *{font-size:16px !important;line-leight:1.6 !important}.rich_media_content img{max-width:100% !important;width:auto !important;height:auto !important} .not_in_mm .qr_code_pc{position:fixed !important;top:auto !important;bottom:0 !important;right:0 !important;padding: 10px 0px !important;}');
function main() {
    //$('title').text($('#activity-name:eq(0)').text());
    
    $('img').each(function(){
        var dataSrc = $(this).attr('data-src');
        var ext = '?';
        if(typeof dataSrc !== "undefined")
            if (dataSrc.indexOf('?') !== -1) ext = '&';
        ext = ext + 'tp=png&wxfrom=5&wx_lazy=1';
            $(this).attr('src', dataSrc ).removeAttr('style');
            //.removeAttr('data-s').removeAttr('data-w').removeAttr('data-ratio');
    });
    
    if (window.location.host == 'rd.wechat.com') {
        //gotoURL();
        window.location.href = $('#url').text();
    }
}
window.setTimeout(main, 500);