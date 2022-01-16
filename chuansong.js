// ==UserScript==
// @name         chuansong
// @version      2020.4.1
// @author       ytzong
// @description  chuansong
// @include      *://*jintiankansha.me/*
// @include      *://*chuansongme.com/*
// @include      *://*weiwenku.org/*
// @copyright    2020+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// ==/UserScript==

GM_addStyle('.text-muted, .sep5{display:none!important}.list-group-item a{display:inline-block}')

$('#page-content img').each(function(){
  let src = $(this).attr('src')
  src = S(src).replaceAll('http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=', '').s
  $(this).attr('src', src)
})


//反转列表
var list = $('.feed_body, .entries');
var listItems = list.children('.pagedlist_item, .item');
list.append(listItems.get().reverse());
