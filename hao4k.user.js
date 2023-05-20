// ==UserScript==
// @name         hao4k
// @version      2023.05.20
// @author       ytzong
// @description  hao4k
// @include      http*://*hao4k.*/*
// @include      http*://*4ksj.*/*
// @copyright    2020+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
.nex_common_movie_out{display:none!important}
.highlight {background-color:yellow}
`);

jQuery('body').removeAttr('oncopy').removeAttr('ondragstart').removeAttr('onkeydown')

jQuery('.nex_cmo_details a').each(function () {
  var link = jQuery(this).attr('href')
  jQuery(this).parents('dd').wrap('<a target="_blank" href="' + link + '"/>')
})

jQuery('.nex_cmi_txt p').each(function () {
  var text = jQuery(this).text()
  if (text.includes('豆瓣评分：7') || text.includes('豆瓣评分：8') || text.includes('豆瓣评分：9')) {
    jQuery(this).addClass('highlight')
  }
  else {
    jQuery(this).parents('dd').hide()
  }
})


let blacks = ['蓝大仙人', '15972168676', '上海臻灵电器']

jQuery('.deanforump1').each(function () {
  var author = jQuery(this).text()
  if (new RegExp(blacks.join("|")).test(author)) {
    jQuery(this).parents('tbody').hide()
  }
})

jQuery('#separatorline').prevAll('tbody').hide()

let title = jQuery('.nex_drama_Top h5').text().trim().replace('4k', '').replace('4K', '')
let douban = 'https://movie.douban.com/subject_search?search_text=' + encodeURIComponent(title)

jQuery('#thread_subject').wrap('<a href="' + douban + '"/>')

if (title.length > 1 && location.pathname.includes('/thread-')) location.href = douban