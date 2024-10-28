// ==UserScript==
// @name         Chaturbate
// @version      2024.07.01
// @author       ytzong
// @description  Chaturbate
// @include      http*://*chaturbate*/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/string.js/3.3.3/string.min.js
// ==/UserScript==
GM_addStyle(`.full-height{height:100vh!important;background:none!important}
  #defchat>div.section:first-child{overflow:hidden!important}
  body, .list{min-width:0!important}
  .list{margin-left:2px!important}
  #room_list, .topSectionWrapper{display:block!important}
  .content .c-1{margin-left:0 !important;margin-right:0!important}
  .room_list_room{/*width:200px!important;*/max-height:none!important;margin:0 !important;border:none!important}
  .room_list_room a{color:#f0f1f1!important}
  .list .title a{color: #0A5B83!important;}
#discover_root .carousel{margin:0!important;border:0 none !important;background-color:transparent !important}
#discover_root .carousel-header{margin-left:0!important}
#discover_root ul.list{display:block!important;width:auto !important;height:auto !important;}
#discover_root .single-row ul.list>*:first-child,
#discover_root ul.list>*:first-child{margin-left:0!important}
  .roomCard{max-height:none !important;margin-right:0!important;height:auto !important;}
  .room_list_room img, .roomCard img{box-sizing:border-box!important; width:100%!important;height:auto!important;border-width:3px !important;border-style:solid !important;}
  .list .thumbnail_label,.list .thumbnail_label_c_private_show{top:3px !important;left:3px !important;right:auto!important;bottom:auto!important}
  .list .sub-info li.cams, .list .subject,.message{display:none!important}
#discover_root .room-list-carousel ul.list>li {float:left!important;}
#roomlist_root #room_list, #roomlist_root .roomlist_container ul.list, #roomlist_root .placeholder_roomlist_container ul.list{display:block!important}
`);

GM_addStyle('@media (max-width: 800px) {.room_list_room,.roomCard{width:50%!important}}')
GM_addStyle('@media (max-width: 550px) {.room_list_room,.roomCard{width:100%!important}}')
GM_addStyle('@media (min-width: 801px) and (max-width: 1010px) {.room_list_room,.roomCard{width:33%!important}}')
GM_addStyle('@media (min-width: 1011px) {.room_list_room,.roomCard{width:24.5%!important}}')
var pathname = window.location.pathname;
var username = S(pathname).replaceAll('/', '').s
console.log(username);

let recSites = {
  'rec-tube': 'https://www.rec-tube.com/recent/search/' + username + '/',
  'rectube': 'https://www.rectube.webcam/models/' + username,
  'fuckit': 'https://www.fuckit.cc/models/' + username + '-chaturbate/',
  // 'recurbate': 'https://recurbate.com/performer/' + username,
  // 'onlinestars': 'https://onlinestars.net/models/' + username,
  'x1080hd': 'https://x1080hd.com/tags/' + username,
  'xcamladyx': 'https://xcamladyx.com/tags/' + username,
  'someonesister': 'https://someonesister.com/tags/' + username,
  // 'relaxxxtime': 'https://relaxxxtime.com/search/' + username,
  'wxx.wtf': 'https://www.wxx.wtf/search/' + username,
  'xhomealone': 'https://xhomealone.com/search/' + username,
  'webcamleak': 'https://webcamleak.com/search/' + username,
  'livecamrips': 'https://www.livecamrips.com/search/' + username + '/1',
  'archivebate': 'https://archivebate.com/profile/' + username
}

if (pathname == '/external_link/') {
  location.href = $('#link').attr('href');
}
else {
  window.setTimeout(main, 1000);
}
function main() {
  //播放页面
  if ($('.chat_room').length > 0) {

    //新版播放器
    GM_addStyle(`.BaseRoomContents{margin:0!important;padding:0!important;border:0 none!important}#VideoPanel{border:0 none!important;width:100%!important;}

                .videoPlayerDiv{position:relative;left:50%!important;top:0!important;margin-left:-89vh!important;width:178vh!important;height:100vh!important;background-image:none!important}
`)
    GM_addStyle(`
div[id^="neatDiv"],
#header, .top-section, .reportAbuseLink, .tooltip.modern, .cbLogo, .playerTitleBar, .floatingPlayer, #footer-holder{display:none!important}
.contentText *{position:static!important;background-image:none!important}
#volume-mute + div + span{position:absolute}
.BioContents h1 a{margin-right:.5em}
`)
    $('.draggableCanvasWindow').parent().remove()
    $('#SplitModeTipCallout').remove()

    window.setInterval(toHD, 500)
    window.setInterval(reloadPlayer, 3000)

    // setTimeout(function repeat() {
    //   toHD();
    //   setTimeout(repeat, 1000);
    // }, 1000);

    var degree = 0;
    $(document).keydown(function (e) {
      var video = $('video')[0];
      //video.attr('controls', 'controls');
      //R
      if (e.keyCode == 82) {
        degree += 90;
        rotate(degree);
      }
    })
  }
  else {
    window.setInterval(hideList, 300);
    // window.setTimeout(stopRefresh, 1000);
  }
}

function reloadPlayer() {
  let imgURL = $('.videoPlayerDiv img').attr('src')
  if (imgURL.includes('stream?room=')) {
    location.reload()
    //console.log(imgURL)
  }
}
function stopRefresh() {
  for (i = 0; i < 99; i++) {
    window.clearInterval(i);
  }
  console.log('stop')
}
function hideList() {
  // $('.thumbnail_label_c_private_show, .thumbnail_label_offline').each(function(){
  // 	$(this).parent().hide();
  // })
  if (pathname != '/followed-cams/') {
    GM_addStyle(`
.room_list_room a:visited,
.roomCard a:visited,
.room-list-carousel-wrapper a:visited{color:yellow!important}
.list .title a:visited{color: #0A5B83!important;}
`);

    $('.icon_following').each(function () {
      $(this).parent().hide();
    })
  }
  if (pathname.includes('/discover/')) {
    $('.category-title').each(function () {
      let catTitle = $(this).text()
      if (catTitle.includes('Recently Watched') || catTitle.includes('Spy Shows') || catTitle.includes('Followed')) {
        $(this).parents('.carousel-root').hide()
      }
    })
  }
}
function toHD() {
  console.log('to HD')
  $('#VideoPanel .videoPlayerDiv').parent().css('height', '100vh')
  if ($('#video-mode').text() == 'Theater Mode') $('#video-mode').click()

  $('.reportAbuseLink').next().hide()
  if (!$('.roomSubjectTooltip').next().hasClass('full-height')) $('.roomSubjectTooltip').next().addClass('full-height')
  if (!$('.videoPlayerDiv').next().hasClass('full-height')) $('.videoPlayerDiv').next().addClass('full-height')

  var btnHD = $('.vjs-icon-hd').next().children(':last-child').children(':first-child')
  if (btnHD.css('color') == 'rgb(255, 255, 255)') btnHD.trigger('click')

  if ($('.chatInnerDiv').is(':visible')) {
    $('#chat-btn').click()
  }

  // $("video").prop('muted', true)
  $('video').eq(0).trigger('play')

  let T = $('meta[property="og:title"]').attr('content')
  T = S(T)
    .replaceAll('Watch ', '')
    .replaceAll(' live on Chaturbate!', '')
    .s
  $('title').text(T)

  if ($('.BioContents h1 a').length == 0) {
    $('.BioContents h1').html('')
    for (let name in recSites) {
      let link = recSites[name];
      console.log(link)
      link = $('<a></a>').attr('href', link);
      link.attr('target', '_blank').attr('rel', 'nofollow');
      link.html(name);
      $('.BioContents h1').append(link);
    }

    $('.BioContents .label').each(function () {
      if ($(this).text() == 'Location:') {
        $(this).parent().css('background-color', 'yellow');
      }
      if ($(this).text() == 'I am:') {
        $(this).parent().css('background-color', 'yellow');
        // if ($(this).next().text().includes('Trans') || $(this).next().text() == 'Male') window.close()
      }
    })
  }
}
function scrollToPlayer() {
  // $('html, body').animate({
  // 	scrollTop: $("#player").offset().top
  // }, 0);
}
function rotate(deg) {
  var height = $(window).height();
  var width = $('video').eq(0).width();
  /*
    var bestHeight = width * 9/16;
    if (bestHeight > height) width = height * 16/9;
    else height = bestHeight;
    */
  var zoom = 1;
  if (deg % 360 == 90 || deg % 360 == 270) {
    zoom = height / width;
  }
  else {
    zoom = 1;
  }
  $('video').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ');transform-origin:center center;');
}
