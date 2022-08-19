// ==UserScript==
// @name         SMZDM
// @version      2022.05.11
// @author       ytzong
// @description  SMZDM
// @include      http://*.smzdm.*/*
// @include      https://*.smzdm.*/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
#focus-notice,.seaAll, #cover{display:none !important}
.zan,.price-btn-up,.good,.J_zhi_like_fav {background-color:yellow !important}
.comment_con{height:auto!important}
`);


let pathname = location.pathname;
if (pathname.includes('/p/')) {
    let url = pathname.split('/').reverse()[1];
    url = 'smzdm://faxian/' + url + '/';
    document.getElementsByClassName('sub-right-content')[0].innerHTML += '<a class="search-other-btn" href="' + url + '">Open App</a>';
}