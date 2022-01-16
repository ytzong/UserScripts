// ==UserScript==
// @name         hao4k
// @version      2020.07.28
// @author       ytzong
// @description  hao4k
// @include      http*://*hao4k.*/*
// @copyright    2020+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('');

jQuery('body').removeAttr('oncopy').removeAttr('ondragstart').removeAttr('onkeydown')

let blacks = ['蓝大仙人', '15972168676', '上海臻灵电器']

jQuery('.deanforump1').each(function(){
  var author = jQuery(this).text()
  if (new RegExp(blacks.join("|")).test(author)) {
    jQuery(this).parents('tbody').hide()
  }
})

jQuery('#separatorline').prevAll('tbody').hide()

let title =  jQuery('.typeoption td').eq(1).text().trim().replace('4k', '').replace('4K', '')
let douban = 'https://movie.douban.com/subject_search?search_text=' + encodeURIComponent(title)

jQuery('#thread_subject').wrap('<a href="' + douban + '"/>')

if (title.length > 1 && location.pathname.includes('/thread-')) location.href = douban