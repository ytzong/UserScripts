// ==UserScript==
// @name         JD Auto Redirect
// @namespace    http://twitter.com/ytzong
// @version      0.5
// @description  JD Auto Redirect
// @author       ytzong
// @include      http://re.jd.com/*
// @include      http://re.m.jd.com/*
// @include      http://m.jd.com/sale/act/*
// @include      http://item.m.jd.com/product/*
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

var domain = window.location.hostname;

if (domain == 'm.jd.com') {
    var pathnames = location.pathname.split('/');
    location.href = 'http://sale.jd.com/act/' + pathnames[pathnames.length - 1];
}
if (domain == 'item.m.jd.com' || domain == 're.jd.com' || domain == 're.m.jd.com') {
    var pathnames = location.pathname.split('/');
    location.href = 'http://item.jd.com/' + pathnames[pathnames.length - 1];
}