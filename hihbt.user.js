// ==UserScript==
// @name        HiHBT
// @namespace   HiHBT
// @description HiHBT
// @include     http*://*hihbt.*/*
// @include     http*://*51svp.*/*
// @include     http*://*51btsite.*/*
// @include     http*://*2x5t.*/*
// @version     2022.04.14
// @grant       GM_addStyle
// @run-at      document-end
// @require     https://code.jquery.com/jquery-3.6.0.slim.min.js 
// @require     https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// ==/UserScript==

let domain = location.hostname
let pathname = location.pathname


GM_addStyle('#sidebar, .s-weixin, .nav-single, .post-navigation, .single-cat-tag, #social, #related-img, #comments, a[href="/am"]{display:none!important}#primary{width:100%!important}.single-content{padding-bottom:300px!important}')

if (pathname.includes('18APPTZ') || domain.includes('365ksp')) {
    window.close()
}
if (domain.includes('51bt')) {
    GM_addStyle('h3, img{display:none !important}')
    $('.caption-full p').eq(-1).hide()
}

setTimeout(scrollToYT, 3000)

function scrollToYT() {
    window.scrollTo(0, document.body.scrollHeight)
}

$('body').removeAttr('ondragstart').removeAttr('oncontextmenu').removeAttr('onselectstart')
