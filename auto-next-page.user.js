// ==UserScript==
// @name         Auto Next Page
// @version      2023.08.17
// @author       ytzong
// @namespace    Auto Next Page
// @include      *://*google.*/*
// @include      *://*github.com/*
// @include      *://*91porn*/*
// @include      *://*91porny*/*
// @include      *://*jiuse*/*
// @include      *://*xvideos*/*
// @include      *://*t66y.com/*
// @include      *://*fytt*/*
// @include      *://*javhdporn.*/*
// @include      *://*bestjavporn.*/*
// @include      *://*avgle.com/*
// @include      *://*tokyomotion.*/*
// @include      *://*chaturbate*/*
// @include      *://*0818tuan*/*
// @include      *://tb.zuanke8.com/*
// @include      *://*lanmaoyouhui.com/*
// @include      *://*dysfz.*/*
// @include      *://*btbtt*.*/*
// @include      *://*btbbt*.*/*
// @include      *://*btsow.*/*
// @include      *://*wuhaozhan.*/*
// @include      *://*.feng.com/*
// @include      *://*.v2ex.com/*
// @include      *://*.mrskin.com/*
// @include      *://*smzdm.com/*
// @include      *://*zuanke8.com/*
// @include      *://*rec-tube.com/*
// @include      *://*tgfcer.com/*
//// @include      *://*nga.cn/*
// @include      *://bbs.a9vg.com/*
// @include      *://*jdbbs.com/*
// @include      *://*zimuku.*/*
// @include      *://*mp4ba.*/*
// @include      *://*xclient.info/*
// @include      *://tieba.baidu.com/*
// @include      *://*.douban.com/*
// @include      *://*.xiepp.com/*
// @include      *://*.pianbar.com/*
// @include      *://*cocoachina.com/bbs/*
// @include      *://*celebsdude.com/*
// @include      *://*chiphell.com/*
// @include      *://*koolshare.cn/*
// @include      *://*pianku.*/*
// @include      *://*hostloc.com/*
// @include      *://*4ksj.*/*
// @include      *://*hxm5.com/*
// @include      *://*right.com.cn/*
// @include      *://*avforums.com/threads/*
// @include      *://*avsforum.com/threads/*

// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

var domain = location.host;
var pathname = location.pathname;
var $next = document.querySelector('.next');
if (domain.includes('91porn.')) {
    $next = document.querySelector('span.pagingnav').nextElementSibling;
}
if (domain.includes('91porny.') || domain.includes('jiuse')) {
    $next = document.querySelector('.pagination a[aria-label="Next »"]');
    if ($next === null) $next = document.querySelector('.page-item.active').nextElementSibling.querySelector('a');
}
if (domain.includes('avgle.com') || domain.includes('tokyomotion')) {
    $next = document.querySelector('.prevnext');
}
if (domain.includes('mrskin.com')) {
    $next = document.querySelector('.next a');
}
if (domain.includes('btbbt') || domain.includes('btbtt')) {
    $next = document.querySelector('.page .checked').nextElementSibling;
}
if (domain.includes('feng.com')) {
    $next = document.querySelector('.fast_next');
}
if (domain.includes('github.com')) {
    $next = document.querySelector('.next_page');
}

if (domain.includes('4ksj') || domain.includes('flyert')) {
    $next = document.querySelector('.nxt');
}
if (domain.includes('nga.cn')) {
    $next = document.querySelector('.uitxt1');
}
if (domain.includes('celebsdude')) {
    $next = document.querySelector('.next');
}
if (domain.includes('xvideos')) {
    $next = document.querySelector('.next-page');
}
if (domain.includes('pianku')) {
    $next = document.querySelector('.pages span').nextElementSibling;
}
if (domain.includes('dysfz')) {
    $next = document.querySelector('.pageturn .next');
}
if (domain.includes('tieba.baidu.com')) {
    $next = document.querySelector('#frs_list_pager .next');
}
if (domain.includes('google')) {
    $next = document.querySelector('#pnnext');
}
if (domain.includes('mp4ba')) {
    $next = document.querySelector('.pagelink_a');
}
if (domain.includes('avforums') || domain.includes('avsforum')) {
    $next = document.querySelector('.pageNav-jump--next');
}
if (domain.includes('wuhaozhan')) {
    $next = document.querySelector('.pure-button-primary + a');
}
if (domain.includes('pornhub')) {
    //有bug
    $next = document.querySelector('.page_next a');
}
if (domain.includes('xclient') || domain.includes('douban.com')) {
    $next = document.querySelector('.next a');
}
if (domain.includes('0818tuan') || domain.includes('tb.zuanke8') || domain.includes('lanmaoyouhui')) {
    try {
        document.querySelector('.pager a[title="总数"]').remove();
    } catch { }

    $next = document.querySelector('.pager b').nextElementSibling;
}
if (domain.includes('btsow')) {
    $next = document.querySelector('.pagination a[name="nextpage"]')
}
if (domain.includes('fytt')) {
    $next = document.querySelector('.pagination .active').nextElementSibling.querySelector('a');
}
if (domain.includes('hxm5')) {
    $next = document.querySelector('.pagebar .disabled').nextElementSibling.querySelector('a');
}
if (domain.includes('smzdm')) {
    if (pathname.includes('/p/')) $next = document.querySelector('.pagedown a');
    else $next = document.querySelector('.pagenation-list .current').nextElementSibling.querySelector('a');
}
if (domain.includes('right.com.cn') || domain.includes('a9vg') || domain.includes('chiphell') || domain.includes('jdbbs') || domain.includes('hostloc') || domain.includes('koolshare')) {
    $next = document.querySelector('.pg strong').nextElementSibling;
}
if (domain.includes('zimuku')) {
    $next = document.querySelector('.pagination .current').nextElementSibling;
}
if (domain.includes('cocoachina')) {
    $next = document.querySelector('.pages b').nextElementSibling;
}
if (domain.includes('v2ex')) {
    $next = document.querySelector('.page_current').nextElementSibling;
}
if (domain.includes('tgfcer')) {
    $next = document.querySelector('.pages strong').nextElementSibling;
}
if (domain.includes('xiepp') || domain.includes('pianbar')) {
    Array.from(document.querySelectorAll('a[target="_blank"]'))
        .forEach(link => link.removeAttribute('target'));

    $next = document.querySelector('.serch_page strong').nextElementSibling;
}
if (domain.includes('t66y')) {
    $next = document.querySelector('a.w70').nextElementSibling;
    //document.querySelector('.tips').setAttribute("style", "height:0;overflow:hidden;padding:0;border:0");

}
if (domain.includes('rec-tube')) {
    $next = document.querySelector('.col-xs-12 .pagination li:nth-last-child(2) a');
}
if (domain.includes('javhdporn') || domain.includes('bestjavporn')) {
    $next = document.querySelector('.pagination li:nth-last-child(2) a');
}

next = $next.getAttribute('href');
console.log(next);

if (next.length > 0) {
    var debounce_timer;
    window.onscroll = function () {
        if (debounce_timer) {
            window.clearTimeout(debounce_timer);
        }

        debounce_timer = window.setTimeout(function () {
            // run your actual function here
            var d = document.documentElement;
            var offset = d.scrollTop + window.innerHeight;
            var height = d.offsetHeight;

            console.log('offset = ' + offset);
            console.log('height = ' + height);

            if (offset + 1 >= height) {
                window.location.href = next;
                console.log('At the bottom');
            }
            console.log('Fire');
        }, 300);
    };
    try {
        document.querySelector('html').setAttribute('style', 'height:auto;padding-bottom:400px');
    } catch { }
}
