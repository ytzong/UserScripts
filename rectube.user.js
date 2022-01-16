// ==UserScript==
// @name         rectube
// @version      2022.01.16
// @author       ytzong
// @description  rectube
// @include      http*://*rec-tube.com/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

let pathname = location.pathname

GM_addStyle('@media (min-width: 1200px) {.container {width: 96% !important;}}.container {margin-left:0 !important;}');
$('.images-rotation').trigger('mouseover');
$('.images-rotation-link, .images-rotation, .images-rotation img').unbind('mouseout');
$('.images-rotation img').each(function () {
    $(this).removeAttr('onmouseout');
})
//$('.col-md-3').removeClass('col-md-3').addClass('col-md-4')

//alert($("iframe").contents().find("a").attr('href'))

if (pathname.includes('/watch/')) {
    GM_addStyle('center{display:none}')
}