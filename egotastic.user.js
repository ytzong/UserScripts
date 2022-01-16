// ==UserScript==
// @name         Egotastic
// @version      2020.01.06
// @author       ytzong
// @description  Egotastic
// @include      http*://*egoallstars.com/*
// @include      http*://*egotastic.com/*

// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

if ($('.e-headline').text().trim() == 'PAGE NOT FOUND') {
    setTimeout(location.reload(), 2000);
}
GM_addStyle('#yt-close{display:block;margin:0 -50px -100px;padding:50vh 0;background-color:black;color:white;text-align:center;}');
$('body').append('<a href="javascript:window.close()" id="yt-close" title="Close This Tab">Close This Tab</a>');
//index
GM_addStyle('.single-post-lg{display:inline-block;width:33%;vertical-align: top;}.malinky-ajax-pagination-loading{text-align:center}.pagination{display:block !important;padding-bottom:100px;}#cookie-law-info-bar, .h-fixed-footer, #cookie-law-info-again{display:none}.h-maincontent .h-whitebg h1{margin-bottom:15px !important; font-size: 24px !important;}.h-maincontent .h-whitebg{padding:15px !important}');
$('.h-sidecontent').insertBefore('.h-maincontent');

//detail 
GM_addStyle('@media (min-width: 992px){.col-md-8, .col-md-4, .container, .e-box-comments, .h-box-comments{width:100%!important;}.e-box{width:33.3%!important;}.e-big-pic{margin-bottom:0 !important}}');
GM_addStyle('.e-circle-image, #e-comments, .p-comments,.e-image-wrapper.whitespace, .h-adholder,.p-wraper-box,div[data-mh="p-group-posts"], .ps-circle-image{display:none}#yt-img{padding:150px 0 30px;margin:0 -30px -1px;background-color:black;text-align:center;}#celebs imag, #yt-img img{display:block;margin:30px auto;/*width:100%;*/max-width:100%}.wp-video, .mejs-video{width:100%!important;height:95vh!important}');

$('.e-right').insertBefore('.e-left');
$('.e-big-pic, .p-big-pic').append('<div id="yt-img"></div>');
$('.g-slider').after('<div id="yt-img"></div>');

var next = $('.e-circle-image a').attr('href');
if (location.host == 'www.wwtdd.com') {
    next = $('.ps-circle-image a').attr('href');
}
if ($('.g-slider').length > 0) {
    $('.g-slider').hide();
    var img = $('.g-fancybox');
    $('#yt-img').append(img);
    next = $('#nextLink').attr('href');
}
getNext(next);

function getNext(url) {
    if (url) {
        console.log(url);
        if (url.length > 0) {
            $.get(url, function(result) {
                var html = $.parseHTML( result );
                var img = $(html).find('.g-fancybox');
                $('#yt-img').append(img);
                next = $(html).find('#nextLink').attr('href');
                setTimeout(getNext(next), 1000);
            }).fail(function() {
                setTimeout(getNext(url), 2000);
            });
        }        
    }
}

if (location.host.includes('egoallstars.com') && location.pathname == '/') {
    window.setInterval(hideItems, 2000);
}
function hideItems() {
    $('.single-post h1').each(function(){
        if ($(this).text().includes('Fine Things')) {
            $(this).parents('.single-post').hide()
        }
    })
}


