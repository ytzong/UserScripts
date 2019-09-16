// ==UserScript==
// @name         rectube
// @version      0.1
// @author       ytzong
// @description  rectube
// @include      http*://*rec-tube.com/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('@media (min-width: 1200px) {.container {width: 96% !important;}}.container {margin-left:0 !important;}');
$('.images-rotation').trigger('mouseover');
$('.images-rotation-link, .images-rotation, .images-rotation img').unbind('mouseout');
$('.images-rotation img').each(function(){
    $(this).removeAttr('onmouseout');
})