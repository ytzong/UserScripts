// ==UserScript==
// @name         Douban Celebrity
// @version      0.1
// @author       ytzong
// @description  Douban Celebrity
// @include      https://movie.douban.com/celebrity/*/photo/*

// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle('#yt-img a{display:block;margin:1em 0;text-align:center;}');

var first = $('.magnifier a').eq(0).attr('href');
$('#comments').before('<div id="yt-img"></div>');

var next = $('.mainphoto').attr('href');

getNext(next);

function getNext(url) {
    console.log(url);
    if (url.length > 0) {
        $.get(url, function (result) {
            var html = $.parseHTML(result);
            var img = $(html).find('.magnifier a').eq(0).attr('href');
            if (img != first) {
                $('#yt-img').append('<a href="' + url + '"><img src="' + img + '"></a>');
                next = $(html).find('.mainphoto').attr('href');
                setTimeout(getNext(next), 1000);
            }
        }).fail(function () {
            setTimeout(getNext(url), 2000);
        });
    }
}
