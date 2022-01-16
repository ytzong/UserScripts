// ==UserScript==
// @name         PianKu
// @version      2020.07.11
// @author       ytzong
// @description  PianKu
// @include      http*://*pianku.*/*
// @copyright    2020+
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

GM_addStyle('.icon-qrcode{display:none!important}.down123 span, .down123 i {zoom:2}');

$('.zkjj_a, .sq_jj').hide()
$('.sqjj_a').show()

$('.tag').each(function(){
  let tag = $(this).text()
  let blacks = ['纪录', '动画', '歌舞', '真人秀', '脱口秀', '印度', '同性', '日本', '韩国', '香港', '大陆']
  if (new RegExp(blacks.join("|")).test(tag)) {
      $(this).parents('li').hide()
  }
})

let douban = $('.douban').attr('href')

GM_xmlhttpRequest ( {
  method:     "GET",
  timeout:     10000,

  ignoreCache: true,
  redirectionLimit: 0,
    url:        douban,
    //data:       "url=" + encodeURIComponent ('http://91porn.com/view_video.php?viewkey=' + id) + "&hash=",
    headers:    {
        //"Content-Type": "application/x-www-form-urlencoded"
    },
    onload:     function (res) {
        console.log ("gut response");
        console.log (res.responseText);
        var bodyHtml = $($.parseHTML( res.responseText ));
        var text = bodyHtml.find('.a_stars').text();
        console.log (text);
        if (text.includes('我看过')) {
          $('title, h1').prepend('✓ ')
          window.close()
        }
    },
    onerror: function(res) {
      //window.location.href = vdURL
    },
    ontimeout: function () { 
      //window.location.href = vdURL 
    }
} );    
