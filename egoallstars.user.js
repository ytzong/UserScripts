// ==UserScript==
// @name         Egotastic All Stars
// @version      0.1
// @author       ytzong
// @description  Egotastic All Stars
// @include      http://*egoallstars.com/*
// @include      https://*egoallstars.com/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle('@media (min-width: 992px){.col-md-8, .col-md-4, .container, .e-box-comments{width:100%!important;}.e-box{width:33.3%!important;}.e-big-pic{margin-bottom:0 !important}}');
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
        });
    }
}
