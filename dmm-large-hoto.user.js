// ==UserScript==
// @name         DMM Large Photo
// @namespace    http://twitter.com/ytzong
// @version      0.2
// @description  DMM Large Photo
// @author       ytzong
// @match        http://www.dmm.co.jp/*
// @match        http://dmm.co.jp/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('.d-item li {float:none !important; width:auto !important} #main-src .tmb:hover .img img{opacity:1 !important} #main-src[class*="digital"] .sample { top: 0!important;  left: 0!important;  margin-left: 0!important;}');


function YTFunc(){
    $('.d-item .img img').each(function(){
        var img = $(this).attr('src');
        img = img.replace('pt.jpg', 'pl.jpg');
        $(this).attr('src', img);
        $(this).attr('style', 'max-width:none;max-height:none;margin-left:12px');
    })
    $('.d-item a').each(function(){
        $(this).attr('target', '_blank');
    })
    
    $('#sample-image-block img').each(function(){
        var img = $(this).attr('src');
        img = img.replace('-', 'jp-');
        $(this).attr('src', img);
        $(this).attr('style', 'display:block;margin-left:auto;margin-right:auto');
    })
}

// Content Script Injection, see http://wiki.greasespot.net/Content_Script_Injection
function contentEval( source ) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(YTFunc);