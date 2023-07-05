// ==UserScript==
// @name         12321
// @version      2022.08.19
// @author       ytzong
// @description  12321
// @include      http*://*12321.*/*
// @copyright    ytzong
// @run-at       document-start
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle(`
#hq1{display:none!important}
#hq2{display:block!important}
`);

window.setInterval(function () {
    $('#btnAgree').removeAttr('disabled').click()
}, 1000)

