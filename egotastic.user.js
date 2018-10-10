// ==UserScript==
// @name         Egotastic
// @version      0.2
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

//index
GM_addStyle('.single-post-lg{display:inline-block;width:33%;vertical-align: top;}.malinky-ajax-pagination-loading{text-align:center}.pagination{display:block !important;padding-bottom:100px;}#cookie-law-info-bar, .h-fixed-footer, #cookie-law-info-again{display:none}.h-maincontent .h-whitebg h1{margin-bottom:15px !important; font-size: 24px !important;}.h-maincontent .h-whitebg{padding:15px !important}');
$('.h-sidecontent').insertBefore('.h-maincontent');

//detail 
GM_addStyle('@media (min-width: 992px){.col-md-8, .col-md-4, .container, .e-box-comments, .h-box-comments{width:100%!important;}.e-box{width:33.3%!important;}.e-big-pic{margin-bottom:0 !important}}');
GM_addStyle('.e-circle-image, #e-comments, .p-comments{display:none}#yt-img{padding:100px 0 300px;margin:0 -30px;background-color:black;text-align:center;}#yt-img img{display:block;margin:15px auto;/*width:100%;*/max-width:100%}#yt-close{display:none;margin:0 -30px -50px;padding:70px;background-color:yellow;color:yellow;text-align:center;}');

$('.e-right').insertBefore('.e-left');
$('.e-big-pic').append('<div id="yt-img"></div><a href="javascript:window.close()" id="yt-close">Close</a>');

var next = $('.e-circle-image a').attr('href');
getNext(next);

function getNext(url) {
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
