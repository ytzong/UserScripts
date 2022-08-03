// ==UserScript==
// @name         Douban
// @version      2022.02.22
// @author       ytzong
// @description  Douban
// @include      http*://www.douban.com/doulist/*
// @include      http*://m.douban.com/subject_collection/*
// @copyright    2020+
// @run-at       document-end
// @grant        GM_addStyle
//// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle('.yt-year, .yt-type, .yt-country {background-color:yellow}')

pathname = location.pathname

if (pathname.includes('/subject_collection/')) {
    GM_addStyle('.TalionNav-static, .items + div{display:none!important}')

    window.setTimeout(function () {
        $('.interest-done').each(function () {
            $(this).parents('.movie').parent().parent().parent().hide()
        })
        $('div').each(function () {
            //if ($(this).text().includes('打开App')) $(this).parent().hide()
        })
    }, 2000)
}


if (pathname.includes('/doulist/')) {
    jQuery('.abstract').each(function () {
        jQuery(this).contents().not('a, span, br').wrap('<span>')
        jQuery(this).children('span').eq(-1).addClass('yt-year')
        jQuery(this).children('span').eq(-2).addClass('yt-country')
        jQuery(this).children('span').eq(-3).addClass('yt-type')

        let shoudHide = 0
        let des = jQuery(this).text()

        //if (!des.includes('年份: 198')) shoudHide = 1

        let blacks = [
            '印度',
            '动画'
            //'同性'
        ]
        for (let b of blacks) {
            if (des.includes(b.trim())) shoudHide = 1;
        }

        if (shoudHide == 1) jQuery(this).parents('.doulist-item').hide()

    })
}


