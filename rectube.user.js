// ==UserScript==
// @name         rectube
// @version      2025.11.7
// @author       ytzong
// @description  rectube - auto play all animations
// @include      http*://*rec-tube.com/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    let pathname = location.pathname;

    GM_addStyle('@media (min-width: 1200px) {.container {width: 96% !important;}}.container {margin-left:0 !important;}');

    if (pathname.includes('/watch/')) {
        GM_addStyle('center{display:none}');
    }

    function startAutoPlay() {
        // 触发所有图片的 mouseover
        $('.images-rotation').each(function () {
            $(this).trigger('mouseover');
        });

        // 移除所有可能导致暂停的鼠标事件
        $('*').unbind('mouseout mouseleave');
    }

    // 立即执行
    startAutoPlay();

    // 延迟再执行一次
    setTimeout(startAutoPlay, 1000);

})();