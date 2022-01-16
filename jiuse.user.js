// ==UserScript==
// @name         jiuse
// @version      2022.01.16
// @author       ytzong
// @description  91Porny
// @include      http*://*jiuse*/*
// @include      http*://*91porny*/*
// @copyright    2016+
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @require      https://cdn.plyr.io/3.6.2/plyr.js
// @user-agent   Mozilla/5.0 (iPad; CPU OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1
// ==/UserScript==
//

function getServer() {
  let nowServer = getUrlParameter('server')
  if (nowServer) {
     return nowServer
  }
    else {
       return 'line' + Random(1, 3)
    }

}
function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

var pathname = window.location.pathname
let shouldRedrict = false

var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// 只有 safari 支持 m3m8
//if (is_safari) {
//  shouldRedrict = true
//}

GM_addStyle('.page-jump-to, .jsv, .jsv-g1, #noticeModal, #warningModal, .modal-backdrop{display:none!important}#main{margin:0!important;padding:0!important;max-width:none!important}')
$('.jsv').prev('.container-fluid').hide()
  window.setInterval(function(){
    $('body').removeClass('modal-open')
  }, 1000);

$('#videoListPage, #videoShowPage').prevAll('.container-fluid').hide()

if (pathname.includes('/video/view/')) {
    let hdURL = $('.alert-link').eq(0).attr('href')
    if (hdURL && hdURL.includes('/viewhd/')) {
        location.href = hdURL + '?server=' + getServer()
    }
}
if (pathname.includes('/video/category')) {
    if ($('.navTab + .row').text().includes('暂无推荐视频')) location.reload()
}
if (pathname.includes('/video/view')) {
    let nowServer = getUrlParameter('server')
    if (!nowServer) {
        location.href += '?server=' + getServer()
    }
/*      window.setTimeout(function(){
        let msg = $('.vjs-remaining-time-display').text()
        if (msg.includes('-0:00')) {
            location.href = location.href.split('?')[0]
        }
  }, 7000);
  */
  GM_addStyle('header, .alert, .vjs-error-display,.vjs-text-track-display,.vjs-control-bar,.vjs-loading-spinner{display:none!important} .adv-pr, .row{margin-left:0!important;margin-right:0!important;}.container-title, .videoInfos,#nav-tabContent{width:100%!important}#videoShowTabDownload{display:block!important}')
  GM_addStyle('.videoPlayContainer{width:100vw!important;height:100vh!important;overflow:hidden!important}.yt-download{width:100%;height:50px}')
  $('.videoPlayContainer').unwrap()
    $('#videoShowTabDownload').addClass('show')
  $('header').removeClass('d-block').removeClass('d-md-block')
  window.setTimeout(function(){
    $('#video-play_html5_api').trigger('play').attr('controls', 'controls').attr('loop', 'true').focus()
    
    $('.vjs-big-play-button').trigger('click')
  }, 2000);
  window.setInterval(function(){
    
  }, 2000);

  let paths = pathname.split('/')
  

  let id = paths.slice(-1)[0]
  let user =  $('#videoShowTabAbout .fa-user').next().text().trim() //getUrlParameter('user')
  let userid = getUrlParameter('userid')
  let count = getUrlParameter('count')
  let name =  $('h4.container-title').text().trim() //getUrlParameter('name')
  let videoURL = $('video').eq(0).attr('data-src')

  if (shouldRedrict) location.href = 'https://rss.ytzong.com/player.htm?url=' + encodeURIComponent(videoURL) + '&id=' + encodeURIComponent(id) + '&user=' + encodeURIComponent(user) + '&userid=' + encodeURIComponent(userid) + '&name=' + encodeURIComponent(name) + '&count=' + encodeURIComponent(count)  + '&from=91porn'

  let videoTitle = user + ' - ' + $('.container-title').eq(0).text().trim() + ' - ' + id
    $('.container-title').eq(0)
     .after('<textarea class="yt-download">ffmpeg -i "' + videoURL + '" -c copy "' + videoTitle + '.mp4"</textarea>')
     .text(videoTitle)
  
  let mp4 = 1;
  if (getUrlParameter('mp4') && getUrlParameter('mp4') == '0') mp4 = 0
  if (mp4 == 1) {
    window.setTimeout(function(){
      GM_xmlhttpRequest({
        method: "GET",
        url: "/apiDownloadUrl/hd/" + id,
        onload: function(response) {
          let mp4 = response.responseText.trim()
          const url = new URL(mp4);
          url.searchParams.set('n', videoTitle);
          mp4 = url.toString();
          //alert(videoURL)
          $('#video-play_html5_api').attr('src', mp4).trigger('play')
          $('.downloadBtn').after('<a href="' + mp4 + '">下载</a>')
          window.setTimeout(function(){
             let msg = $('.vjs-error-display').text()
             if (msg.includes('could not be loaded')) {
                location.href += '&mp4=0'
             }
          }, 4000);
        }
      });
    }, 1000);    
  }

  //$('#videoShowTabAbout a').attr('href', 'http://91porn.com/uvideos.php?UID=' +  userid).attr('rel', 'noreferrer')

$('.yt-download, .container-title').click(function(){
  let magnet = $(this).text()
  console.log(magnet)
  copyString(magnet)
})

function copyString(str){
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(str).select();
  document.execCommand("copy");
  $temp.remove();
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
        } else {
            zoom = 1;
        }
        $('video').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ');transform-origin:center center;');
    }
    var degree = 0;
    $(document).keydown(function(e) {
        var video = $('video').eq(0);
        var videoWrapper = $('video').eq(0).parent();
        //video.attr('controls', 'controls');
        //R
        if (e.keyCode == 82) {
            degree += 90;
            rotate(degree);
            //$('#yt-top').get(0).scrollIntoView();
            scrollToPlayer();
        }
        //+ - \\
        if (e.keyCode == 187 || e.keyCode == 189 || e.keyCode == 220) {
            var zoom = videoWrapper.attr('yt-zoom');
            if (zoom) {
                zoom = parseFloat(zoom);
            } else {
                zoom = 1;
            }
            if (e.keyCode == 187) zoom = zoom + 0.2;
            if (e.keyCode == 189) {
                if (zoom > 1) zoom = zoom - 0.2;
            }
            if (e.keyCode == 220) zoom = 1;

            videoWrapper.css('transform', 'scale(' + zoom + ', ' + zoom + ')').attr('yt-zoom', zoom);
        }
        //[ ]
        if (e.keyCode == 219 || e.keyCode == 221 || e.keyCode == 220) {
            var left = videoWrapper.attr('yt-left');
            if (left) {
                left = parseFloat(left);
            } else {
                left = 0;
            }
            if (e.keyCode == 219) left = left - 10;
            if (e.keyCode == 221) left = left + 10;
            if (e.keyCode == 220) left = 0;

            videoWrapper.css('left', left + '%').attr('yt-left', left);
        }
        //D
        if (e.keyCode == 68) {
            //copyTitle();
            $('.downloadBtn button').get(0).click();
            let fileTitle = $('.container-title').eq(0).text()
            copyString(fileTitle)
      /*
      var _videoURL = $('#yt-download').attr('href')
      var _videoTitle = $('#viewvideo-title a').eq(2).text().trim() + ' - ' + $('#yt-download').text().trim() + ' - ' + getUrlParameter('viewkey') + '.mp4'
      var arg = { url: _videoURL, name: _videoTitle} ;
      var result = GM_download(arg);
      */
        }

        function copyTitle() {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($('#viewvideo-title a').eq(2).text().trim() + ' - ' + $('#yt-download').text().trim() + ' - ' + getUrlParameter('viewkey')).select();
            document.execCommand("copy");
            $temp.remove();
        }
        //C
        if (e.keyCode == 67) {
            copyTitle();
        }
        //P
        if (e.keyCode == 80) {
            if (video.paused) video.play();
            else video.pause();
        }
        //V
        if (e.keyCode == 86) {
            copyTitle();
            window.location.href = window.location.href.replace('view_video.php', 'view_video_hd.php');
        }
        //A
        if (e.keyCode == 65) {
            var authorLink = $('#videoShowTabAbout a').eq(0).attr('href');
            if (authorLink.length > 0) {
                window.location.href = authorLink;
            }
        }
        //S
        if (e.keyCode == 83) {
            let userID = $('#videoShowTabAbout .fa-user').next().text().trim();
            if (pathname.includes('/author/')) userID = pathname.split('/').slice(-1)[0]
            let url91 = 'https://91porn.com/search_result.php?search_type=search_users&search_id=' + userID
            var allLink = url91
            if (allLink.length > 0)
                window.location.href = allLink;
        }
        //右箭头
        if (e.keyCode == 39) {
            scrollToPlayer();
            //ALT
            if (e.keyCode == 18) {
                video.currentTime = video.currentTime + 25;
            }
            video.play();
        }
        //左箭头
        if (e.keyCode == 37) {
      if (video.paused) video.play();
            scrollToPlayer();
            //ALT
            if (e.keyCode == 18) {
                video.currentTime = video.currentTime - 25;
            }
        }
        //,
        if (e.keyCode == 188) {
            scrollToPlayer();
            video.currentTime = video.currentTime - 0.0416;
        }
        if (e.keyCode == 190) {
            scrollToPlayer();
            video.currentTime = video.currentTime + 0.0416;
        }
        //Q 或 J
        if (e.keyCode == 81 || e.keyCode == 74) {
            var next = $('span.pagingnav').next().attr('href');
            if (next.length > 0) self.location = next;
        }
        //W 或 K
        if (e.keyCode == 87 || e.keyCode == 75) {
            var prev = $('span.pagingnav').prev().attr('href');
            if (prev.length > 0) self.location = prev;
        }
    });
}

function scrollToPlayer() {
    $('html').animate({
        scrollTop: $('body').offset().top
    }, 0);
}
//https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
    name = name.replace(/[\\[]/, '\\\\[').replace(/[\\]]/, '\\\\]');
    var regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
}
