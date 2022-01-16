// ==UserScript==
// @name         JD Sign
// @namespace    https://twitter.com/ytzong
// @version      0.1
// @author       ytzong
// @include      http*://*.jd.com/*
// @run-at       document-end
// @grant        GM_addStyle
// @description  JD Sign
// ==/UserScript==

var domain = location.hostname;
var pathname = location.pathname;
var url = location.href

if (pathname == '/error.aspx' || pathname == '/error2.aspx' || pathname == '/error.html' || url == 'https://vip.jd.com/sign/index') {
    closeWindow(5000);
}

if (domain == 'shop.m.jd.com') {
    window.setTimeout(function () {
        $('.shop_gift_modal_button, .wei_shop_gift_button2').trigger('click');
    }, 3000);
    window.setTimeout(function () {
        if ($('.wei_shop_gift_button2 .button').text() == '已领取' || location.href.endsWith('#')) {
            window.close();
        }
    }, 10000);
}
if (domain == 'mall.jd.com') {
    if (pathname.includes('shopSign')) {
        closeWindow(5000);
    }
    else {
        location.href = JDMall2Mobile(location.href);
    } 
}
if (domain == 'vip.jr.jd.com') {
    if (pathname == '/') {
        window.setTimeout(function () {
            //location.href = $('.now-go').attr('href');
        }, 1000);
        window.setTimeout(function () {
            $('#index-qian-btn').trigger('click');
        }, 3000);
        closeWindow(20000);
    }
}
if (domain == 'ljd.m.jd.com') {
    window.setTimeout(function () {
        $('#receiveAward').trigger('click');
    }, 3000);
}
if (domain == 'm.jr.jd.com' && pathname == '/spe/qyy/hzq/index.html') {
    window.setTimeout(function () {
        $('.gangbeng .btn').trigger('click');
    }, 3000);
    window.setTimeout(function () {
        $('.gift-dialog-btn').trigger('click');
    }, 5000);
    closeWindow(10000);
}
if (domain == 'm.jr.jd.com' && pathname == '/vip/sign/html/index.html') {
    window.setTimeout(function () {
        $('.sign-btn').trigger('click');
    }, 3000);
    closeWindow(10000);
}
if (url == 'https://wqs.jd.com/my/fav/shop_fav.shtml') {
    window.setTimeout(function () {
        $('#shoplist_edit').click();
    }, 5000);
    window.setTimeout(function () {
        $('#selectAllBtn').click();
    }, 7000);
    window.setTimeout(function () {
        $('#multiCancle').click();
    }, 9000);
    window.setTimeout(function () {
        $('#ui_btn_confirm').click();
    }, 13000);
}

function closeWindow(time) {
    window.setTimeout(function () {
        window.close();
    }, time);
}
function JDMall2Mobile(url) {
    var newURL = url;
    if (url.includes('mall.jd.com/index')) {
        var pathnames = url.split('/');
        var pathname = pathnames[pathnames.length - 1];
        pathnames = pathname.split('.');
        pathname = pathnames[0];
        pathname = pathname.replace(/index-/g, '');
        newURL = 'https://shop.m.jd.com/?shopId=' + pathname + '#';
    }
    return newURL;
}