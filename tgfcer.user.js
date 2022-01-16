// ==UserScript==
// @name         tgfcer
// @version      0.1
// @author       ytzong
// @description  tgfcer
// @include      http*://*tgfcer.*/*
// @copyright    2019+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle('');

$('.postmessage img').each(function(){
  let imgURL = $(this).attr('src')
    // imgURL = imgURL.replace('http:', 'https:')
    $(this).attr('src', 'https://images.weserv.nl/?url=' + imgURL)
})