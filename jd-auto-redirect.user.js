// ==UserScript==
// @name         JD Auto Redirect
// @namespace    http://twitter.com/ytzong
// @version      0.3
// @description  JD Auto Redirect
// @author       ytzong
// @match        http://re.jd.com/cps/item/*
// @match        http://list.jd.com/*
// @match        http://search.jd.com/*
// @match        http://m.jd.com/sale/act/*
// @grant        none
// ==/UserScript==

var domain = window.location.hostname;

if (domain == 'm.jd.com') {    
    $('#m_common_bottom_pc').trigger('click');
}

if (domain == 're.jd.com') {
    window.location.href = $('.gobuy a').attr('href');
}

if (domain == 'list.jd.com') {
    var have = $('. instock  a');
    if (!have.hasClass('selected')) 
        window.location.href = have.attr('href');
    
    var isJD = $('.f-feature a:eq(0)');
    if (!isJD.hasClass('selected')) 
        window.location.href = isJD.attr('href');
}

if (domain == 'search.jd.com') {
    var have = $('. instock  div:eq(0)');
    if (!have.hasClass('selected')) 
        window.location.href = have.children('a').attr('href');
    
    var isJD = $('#ware_type a:eq(0)');
    if (!isJD.hasClass('selected')) 
        window.location.href = isJD.attr('href');
}




