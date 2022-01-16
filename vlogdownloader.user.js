// ==UserScript==
// @name         vlogdownloader
// @version      2020.02.20
// @author       ytzong
// @include      http*://*.vlogdownloader.com/*
// @copyright    2019+
// @run-at       document-end
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle('');

var pathname = location.pathname;
if (pathname == '/download.html') {
    var url = $('a[data-aa="video"]').attr('data-video')
    if (url.includes('http')) {
      let str = location.href
      let index = str.indexOf('?') + 1
      str = str.slice(index, str.length)
      str = '&' + str

      let id = getUrlParameter('id')
      let url91 = 'http://91porn.com/view_video.php?viewkey=' + id
      location.href = url91 + '&url='  + encodeURIComponent(url)
      //'https://rss.ytzong.com/player.htm?url=' + encodeURIComponent(url) + str  
    }
    
}
if (pathname == '/') {
  var hash = location.hash;
  if (hash.length > 1) {
      if (hash.slice(0, 1) == '#') {
        let id = hash.split('=')[1]
        window.localStorage.setItem(id,  id)
        location.href = 'https://www.vlogdownloader.com/'
        /*
          window.setTimeout(function(){
              let str = location.href
              //str = S(str).replaceAll('_hd.php', '.php').s
              let index = str.indexOf('&id=') + 1
              str = str.slice(index, str.length)
              str = '?' + str
              let form = $('#vlog').attr('action')
              form = form + str
              $('#vlog').attr('action', form)

              $('.btn-primary').click()
          }, 2500)
          */
      }
  } 
  else {
    let id = window.localStorage.key(0)
    let url91 = 'http://www.91porn.com/view_video.php?viewkey=' + id
    $('input[name="url"]').val(url91)
    
    let form = $('#vlog').attr('action')
    form = form + '?id=' + id
    $('#vlog').attr('action', form)
    $('.btn-primary').click()
    window.localStorage.removeItem(id)
  }
}

if (getUrlParameter('code') == '403') {
    window.history.back()
}
function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}