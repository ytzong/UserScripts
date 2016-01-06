// ==UserScript==
// @name         DMM Large Photo
// @namespace    http://twitter.com/ytzong
// @version      1.1
// @description  DMM Large Photo
// @author       ytzong
// @match        http://www.dmm.co.jp/*
// @match        http://dmm.co.jp/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('.d-item #list li {float:none !important; width:auto !important} #main-src .tmb:hover .img img{opacity:1 !important} #main-src[class*="digital"] .sample { top: 0!important;  left: 0!important;  margin-left: 0!important;}');


function YTFunc(){
    $('.d-item .img img').each(function(){
        var img = $(this).attr('src');
        img = img.replace('pt.jpg', 'pl.jpg');
        $(this).attr('src', img);
        $(this).attr('style', 'max-width:none;max-height:none;margin-left:12px');
    })
    $('.d-item #list a').each(function(){
        $(this).attr('target', '_blank');
    })
    
    $('#sample-image-block img').each(function(){
        var img = $(this).attr('src');
        img = img.replace('-', 'jp-');
        $(this).attr('src', img);
        $(this).attr('style', 'display:block;position:static; margin-left:auto;margin-right:auto;width:auto ;height:auto;cursor:default;');
    })
    $('#sample-image-block a').each(function(){
        $(this).attr('style', 'width:auto ;height:auto;').attr('onmouseup', '');
    })
    $('#sample-image-block').attr('class', '');
    
    var numObj = $('table.mg-b20 tr:nth-last-child(3) td:nth-last-child(1)');
    if ($('#main-ppm').length > 0) numObj = $('table.mg-b20 tr:nth-last-child(4) td:nth-last-child(1)');

    var num = numObj.text();
    var mid = num.substring(num.length - 5, num.length - 5 + 2);
    if (mid == '00') num = num.substring(0, num.length - 5) + '-' + num.substring(num.length - 3);;
    numObj.append('<form action="http://btkitty.pw/" method="post" name="search"><input type="text" name="keyword" id="kwd" value="' + num + '"> <button type="submit">搜索BT种子</button></form>');
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