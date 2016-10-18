// ==UserScript==
// @name         Preload Images for WeChat
// @namespace    http://twitter.com/ytzong
// @version      0.6
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

GM_addStyle('img{width:auto !important;height:auto !important}');
function main() {
    //$('title').text($('#activity-name:eq(0)').text());
    $('img').each(function(){
        var dataSrc = $(this).attr('data-src');
        if (dataSrc)
            $(this).attr('src', dataSrc);
			//.removeAttr('style').removeAttr('data-s').removeAttr('data-w').removeAttr('data-ratio');
    });
	if (window.location.host == 'rd.wechat.com') {
        //gotoURL();
		window.location.href = $('#url').text();
	}
}
window.setTimeout(main, 1500);