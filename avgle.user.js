// ==UserScript==
// @name         Avgle
// @version      0.1
// @author       ytzong
// @description  rectube
// @include      http*://*avgle.com/*
// @include      http*://*tokyomotion.*/*
// @copyright    2022.04.22
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
body{padding-top:0!important}
.top-nav{position:static!important}
.container{width:100%!important;/*padding-left:0!important;padding-right:0!important*/}
.navbar{top:0!important}
`);
$('.navbar').removeClass('navbar-fixed-top')

let domain = location.hostname
let path = location.pathname

$('.well a').attr('target', '_blank')

window.setInterval(function () {
    $('.thumb-overlay .lazy').trigger('mouseover')
    $('*').unbind('mouseout');
}, 1000)
window.setInterval(function () {
    $('.thumb-overlay video').trigger('play')
}, 1000)

if (path.includes('/search')) {

    if (domain.includes('avgle')) {
        $('#exo-native, .col-md-3').hide()
    }

    $('.col-md-9').removeClass('col-md-9').addClass('col-md-12')
    //3列变2列
    //$('.col-lg-4').removeClass('col-lg-4').addClass('col-lg-6')

}

if (path.includes('/video/')) {
    GM_addStyle(`
.col-md-4, .top-nav, .navbar, .alert-dismissable, .hd-text-icon, .fps60-text-icon, .modal-backdrop, .modal{display:none!important}
.video-container, .game-container{padding-top:0 !important}
.video-container{height:100vh!important}
.video-js .vjs-slider,.video-js .vjs-progress-holder .vjs-load-progress, .video-js .vjs-progress-holder .vjs-load-progress div, .video-js .vjs-progress-holder .vjs-play-progress, 
.video-js .vjs-progress-holder .vjs-tooltip-progress-bar{height:20px!important}
`);
    $('.video-banner').parent().hide()
    $('.container').prev().css('margin-top', '0')
    $('#wrapper div').eq(0).css('margin-bottom', '0')
    $('.container .row').eq(1).after($('.container .row').eq(0))
    $('h1.big-title-truncate').before($('h1.big-title-truncate a'))

    let title = $('h1.big-title-truncate').text()
    //$('h1.big-title-truncate').wrap('<a href="https://btsow.rest/search/' + title + '" target="_blank"/>')

    $('.col-md-8').removeClass('col-sm-7').removeClass('col-lg-8').removeClass('col-md-8').addClass('col-md-12')

    $('#video-player').trigger('click')
    window.setTimeout(function () {
        //$('.vjs-big-play-button').trigger('click')
        $('#aclose').trigger('click')
    }, 1000)
    window.setTimeout(function () {
        $('video').prop('muted', true);
        //$('div[title="Quality"] li').eq(0).trigger('click')
    }, 2000)

    //
}
