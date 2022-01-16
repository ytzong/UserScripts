// ==UserScript==
// @name         Chaturbate
// @version      2022.01.16
// @author       ytzong
// @description  Chaturbate
// @include      http*://*chaturbate*/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/string.js/3.3.3/string.min.js
// ==/UserScript==
GM_addStyle('.full-height{height:100vh!important;background:none!important}#defchat>div.section:first-child{overflow:hidden!important}body, .list{min-width:0!important}.list{margin-left:2px!important}.content .c-1{margin-left:0 !important;margin-right:0!important}.room_list_room{/*width:200px!important;*/max-height:none!important;margin:0 !important;border:none!important}.room_list_room a{color:#f0f1f1!important}.list .title a{color: #0A5B83!important;}.room_list_room img{box-sizing:border-box!important; width:100%!important;height:auto!important;border-width:3px !important;border-style:solid !important;}.list .thumbnail_label,.list .thumbnail_label_c_private_show{top:3px !important;left:3px !important;right:auto!important}.list .sub-info li.cams, .list .subject,.message{display:none!important}');
GM_addStyle('@media (max-width: 800px) {.room_list_room{width:50%!important}}')
GM_addStyle('@media (min-width: 801px) and (max-width: 1010px) {.room_list_room{width:33%!important}}')
GM_addStyle('@media (min-width: 1011px) {.room_list_room{width:25%!important}}')
var pathname = window.location.pathname;
console.log(pathname);
var recLink = 'https://www.rec-tube.com/recent/search' + pathname;
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
    GM_addStyle('.BaseRoomContents{margin:0!important;padding:0!important;border:0 none!important}#VideoPanel{border:0 none!important;width:100%!important;}.videoPlayerDiv{position:relative;left:50%!important;top:0!important;margin-left:-89vh!important;width:178vh!important;height:100vh!important;background-image:none!important}')
    GM_addStyle('#header, .top-section, .reportAbuseLink, .tooltip.modern, .cbLogo{display:none!important}.contentText *{position:static!important;background-image:none!important}#volume-mute + div + span{position:absolute}')

    window.setInterval(toHD, 1000)
    window.setInterval(reloadPlayer, 3000)
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
    window.setTimeout(hideList, 1500);
    window.setTimeout(stopRefresh, 5000);
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
  for (i = 0; i < 100; i++) {
    window.clearInterval(i);
  }
}
function hideList() {
  // $('.thumbnail_label_c_private_show, .thumbnail_label_offline').each(function(){
  // 	$(this).parent().hide();
  // })
  if (pathname != '/followed-cams/') {
    GM_addStyle('.room_list_room a:visited {color:yellow!important}.list .title a:visited{color: #0A5B83!important;}');

    $('.icon_following').each(function () {
      $(this).parent().hide();
    })
  }
}
function toHD() {
  //console.log('to HD')
  if ($('#video-mode').text() == 'Theater Mode') $('#video-mode').click()

  $('.reportAbuseLink').next().hide()
  if (!$('.roomSubjectTooltip').next().hasClass('full-height')) $('.roomSubjectTooltip').next().addClass('full-height')
  if (!$('.videoPlayerDiv').next().hasClass('full-height')) $('.videoPlayerDiv').next().addClass('full-height')

  var btnHD = $('.roomSubjectTooltip').next().children(':last-child').children(':first-child')
  if (btnHD.css('color') == 'rgb(255, 255, 255)') btnHD.trigger('click')

  if ($('.chatInnerDiv').is(':visible')) {
    $('#chat-btn').click()
  }

  $("video").prop('muted', true)
  $('video').trigger('play')

  let T = $('title').text()
  T = S(T)
    .replaceAll('Chat with ', '')
    .replaceAll(' in a Live Adult Video Chat Room Now', '')
    .s
  $('title').text(T)

  if ($('.BioContents h1 a').length == 0) {
    $('.BioContents h1').html('<a target="_blank" href="' + recLink + '">RECORD</a>');

    $('.BioContents .label').each(function () {
      if ($(this).text() == 'Location:') {
        $(this).parent().css('background-color', 'yellow');
      }
      if ($(this).text() == 'I am:') {
        $(this).parent().css('background-color', 'yellow');
        if ($(this).next().text() == 'Trans' || $(this).next().text() == 'Male') window.close()
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

