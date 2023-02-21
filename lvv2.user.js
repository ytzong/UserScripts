// ==UserScript==
// @name         Lvv2
// @version      2022.12.22
// @author       ytzong
// @description  Lvv2
// @include      http*://*lvv2.*/*
// @include      http*://good.news/*
// @copyright    2022+
// @run-at       document-start
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle(`
* {font-family:SF Pro SC,SF Pro Text,SF Pro Icons,PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif !important}
iframe, .lvv2_nav, .interest-news-area{display:none!important}
.tl_page {padding-top:0!important}
body {background-color:white!important}

`)

window.setInterval(loadImage, 1000)

function loadImage() {
    $('.img_loading').each(function () {
        let src = $(this).attr('data-src')
        if (src) {
            $(this).attr('src', src).removeClass('img_loading')
        }
    })
}
