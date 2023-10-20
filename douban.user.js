// ==UserScript==
// @name         Douban
// @version      2023.10.20
// @author       ytzong
// @description  Douban
// @include      http*://www.douban.com/doulist/*
// @include      http*://m.douban.com/subject_collection/*
// @include      https://movie.douban.com/explore
// @copyright    2020+
// @run-at       document-end
// @grant        GM_addStyle
//// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle('.yt-year, .yt-type, .yt-country {background-color:yellow}')

let pathname = location.pathname

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
function isInView(el) {
    let box = el.getBoundingClientRect();
    return box.top < window.innerHeight && box.bottom >= 0;
}


if (pathname.includes('/explore')) {
    GM_addStyle(`
 #content{padding-bottom:300px}   
    `)
    window.setInterval(function () {
        hideExplore()
    }, 1000)

    window.addEventListener("scroll", function () {
        var footer = document.getElementById("footer");
        var visible = isInView(footer);
        if (visible) {
            document.querySelector('.explore-more button').click()
        }
    })
}
function hideExplore() {
    let blacks = [
        '短片'
        , '动画'
        , '纪录片'
        , '音乐'
        , '戏曲'
        , '歌舞'
        , '脱口秀'
        , '家庭'
        , '/ 英国 /'
        , '/ UK 英国 /'
    ]
    jQuery('.drc-subject-info-subtitle').each(function () {
        let shoudHide = 0
        let des = jQuery(this).text()

        for (let b of blacks) {
            if (des.includes(b.trim())) shoudHide = 1
        }
        if (!des.startsWith('199') && !des.startsWith('2')) {
            shoudHide = 1
        }
        if (shoudHide == 1) jQuery(this).parents('li').hide()

    })
    if (!jQuery('.drc-checkbox-simulation').hasClass('checked')) {
        jQuery('.simulation').click()
    }
    // if (jQuery('.base-selector-title').eq(-1).text() == '排序') {
    //     jQuery('.base-selector-title').eq(-1).click()
    // }
}

if (pathname.includes('/doulist/')) {
    let blacks = [
        '印度'
        , '动画'
        //,'同性'
    ]
    jQuery('.abstract').each(function () {
        jQuery(this).contents().not('a, span, br').wrap('<span>')
        jQuery(this).children('span').eq(-1).addClass('yt-year')
        jQuery(this).children('span').eq(-2).addClass('yt-country')
        jQuery(this).children('span').eq(-3).addClass('yt-type')

        let shoudHide = 0
        let des = jQuery(this).text()

        //if (!des.includes('年份: 198')) shoudHide = 1


        for (let b of blacks) {
            if (des.includes(b.trim())) shoudHide = 1;
        }

        let whites = [
            '美国'
        ]
        for (let w of whites) {
            if (!des.includes(w.trim())) shoudHide = 1;
        }

        if (shoudHide == 1) jQuery(this).parents('.doulist-item').hide()

    })
}


