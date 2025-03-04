// ==UserScript==
// @name        BTSOW
// @namespace   BTSOW
// @description BTSOW
// @include     http*://*btsow.*/*
// @include     http*://*cilipa.*/*
// @include     http*://*newfanhao.*/*
// @include     http*://*bt4g*.*/*
// @version     2025.01.27
// @grant       GM_addStyle
// @run-at      document-end
// @require     https://code.jquery.com/jquery-3.5.1.slim.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/js/jquery.tablesorter.min.js
// @require     https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// ==/UserScript==

let domain = location.hostname
let url = location.href
let path = location.pathname

if (domain.includes('cilipa')) {
  function cleanMagnet(magnet) {
    let str = S(magnet).replaceAll('&dn=Www.CiLiPa.Me', '').s
    return str
  }

  $('.item-title a').each(function () {
    let href = $(this).attr('href')
    $(this).attr('href', cleanMagnet(href))
  })
  $('.mag-link').each(function () {
    let href = $(this).attr('value')
    $(this).attr('value', cleanMagnet(href))
  })

}
if (domain.includes('btsow')) {
  GM_addStyle(`
  .input-group{width:100%!important}
.w728c, .search + h3{display:none!important}
.container h3{font-size:12px !important;font-weight:normal !important}#magnetLink{height:200px!important}
  `)

  $('.tags-box.hidden-xs').remove()
  $('.tags-box.visible-xs-block').removeClass('visible-xs-block')

  $('#magnetLink').val($('#magnetLink').val())

  if (path.includes('/search/')) {
    GM_addStyle(`
.data-list{display:none}.tablesorter{width:100%;margin-bottom:100px} th, td{padding:15px;} tr{border-bottom:1px #ece4cc solid}
.tablesorter a{/*display:block;*/color:black}
.tablesorter a:hover{text-decoration:none}
.tablesorter em {color: #d80456;font-style: normal;}.col2, .col3{text-align:right}.col2{width:70px;}.col3{width:150px}
    `)
    let table = '<table class="tablesorter">'
    let tbody = "<tbody>"
    $('.data-list .row').each(function () {
      if ($(this).hasClass('hidden-xs')) {
        table += '<thead><tr><th class="col1">' + $(this).find('div').eq(0).text() + '</th><th class="col2">' + $(this).find('div').eq(1).text() + '</th><th class="col3">' + $(this).find('div').eq(2).text() + '</th><tr></thead>'
      }
      else {
        let link = $(this).find('a').attr('href')
        let size = $(this).find('div').eq(2).text()
        if (size.endsWith('MB')) {
          size = size.slice(0, -2)
          let sizeNum = Number(size) / 1000
          size = sizeNum.toFixed(3).toString() + 'GB'
        }
        tbody += '<tr><td class="col1"><a href="' + link + '">' + $(this).find('div').eq(0).html() + '</a></td><td class="col2">' + size + '</td><td class="col3">' + $(this).find('div').eq(3).text() + '</td><tr>'
      }
    })
    table += tbody + '</tbody></table>'
    $('.data-list').before(table)
    $(".tablesorter").tablesorter({
      sortList: [[2, 1]]
    });

    $('.tablesorter tr').click(function () {
      $(this).addClass('bg-light')
      let magnet = $(this).find('a').attr('href').split('/').slice(-1)
      magnet = 'magnet:?xt=urn:btih:' + magnet
      console.log(magnet)
      copyString(magnet)
      let magnets = $('#magnets').val() + '\n' + magnet
      magnets = magnets.trim()
      $('#magnets').val(magnets)
    })

  }
}
if (domain.includes('btsow')) {
  GM_addStyle('#magnets{position:fixed;right:0;bottom:0;width:300px;height:300px;background-color:transparent}.bg-light{background-color:lightgray}')

  $('body').append('<textarea id="magnets" />')
}
if (domain.includes('bt4g')) {
  if (path.includes('/magnet')) {
    GM_addStyle('#magnets{display:block;width:100%;margin-bottom:10px;}')

    let link = $('.card-body .btn').eq(0)
    let hash = link.attr('href').split('/').pop()
    hash = hash.split('?')[0]

    let magnet = 'magnet:?xt=urn:btih:' + hash

    link.before('<textarea id="magnets">' + magnet + '</textarea>')

    $('#magnets').click(function () {
      copyString(magnet)
    })
  }
}

if (url.includes('newfanhao.com/you')) {
  GM_addStyle('.loadimg a{display:block}')
}
if (url.includes('newfanhao.com/fan')) {
  GM_addStyle('.loadimg a{display:block}.home{text-align:center} .home a{display:inline-block!important;width:30%;margin:0 10px;background:#ff253a !important}')

  let no = path.split('/').slice(-1)[0].split('.')[0]
  let search = 'https://www.google.com/search?q=' + no
  let bt = 'https://btsow.rest/search/' + no

  let html = '<a href="' + search + '" target="_blank" rel="noreferrer noopener">Google</a> <a href="' + bt + '" target="_blank" rel="noreferrer noopener">BT</a>'
  $('.home').html(html)

}
function copyString(str) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(str).select();
  document.execCommand("copy");
  $temp.remove();
}