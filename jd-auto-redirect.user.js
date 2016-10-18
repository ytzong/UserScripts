// ==UserScript==
// @name         JD Auto Redirect
// @namespace    http://twitter.com/ytzong
// @version      0.9
// @description  JD Auto Redirect
// @author       ytzong
// @include      http*://www.jd.com/*
// @include      http*://re.jd.com/*
// @include      http*://re.m.jd.com/*
// @include      http*://m.jd.com/sale/act/*
// @include      http*://item.m.jd.com/product/*
// @include      http*://item.jd.com/*
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

var domain = window.location.hostname;

if (window.location.href == 'http://www.jd.com/') {
    location.href = 'https://www.jd.com/';
}
if (domain == 'm.jd.com') {
    var pathnames = location.pathname.split('/');
    location.href = 'http://sale.jd.com/act/' + pathnames[pathnames.length - 1];
}
if (domain == 'item.m.jd.com' || domain == 're.jd.com' || domain == 're.m.jd.com') {
    var pathnames = location.pathname.split('/');
    location.href = 'http://item.jd.com/' + pathnames[pathnames.length - 1];
}
if (domain == 'item.jd.com') {
    $('#choose-btns').append('<div class="btn"><a class="btn-append" href="http://gate.jd.com/InitCart.aspx?pid=' + window.location.pathname.replace('/', '').replace('.html', '') + '&pcount=1&ptype=1">加入购物车</a></div>');
}
