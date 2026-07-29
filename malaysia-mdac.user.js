// ==UserScript==
// @name         Malaysia MDAC Enable Copy Paste
// @namespace    https://github.com/
// @version      1.0
// @description  Enable copy paste on Malaysia Digital Arrival Card
// @match        https://imigresen-online.imi.gov.my/mdac/*
// @match        https://*.imi.gov.my/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // 移除阻止粘贴的监听
    const eventTypes = ['paste', 'copy', 'cut'];

    eventTypes.forEach(type => {
        window.addEventListener(type, e => {
            e.stopImmediatePropagation();
        }, true);

        document.addEventListener(type, e => {
            e.stopImmediatePropagation();
        }, true);
    });

    // 页面加载后清除 input 上的限制
    window.addEventListener('load', () => {
        document.querySelectorAll('input, textarea').forEach(el => {
            el.onpaste = null;
            el.oncopy = null;
            el.oncut = null;

            el.removeAttribute('onpaste');
            el.removeAttribute('oncopy');
            el.removeAttribute('oncut');
        });
    });

})();