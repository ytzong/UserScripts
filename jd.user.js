// ==UserScript==
// @name         JD
// @namespace    https://twitter.com/ytzong
// @version      1.5.2
// @author       ytzong
// @include      http*://*.jd.com/*
// @run-at       document-end
// @grant        GM_addStyle
// @description JD for ytzong
// ==/UserScript==

GM_addStyle('#bjd_yifenqian_detail, #right_info,.more-prom-ins,.view-all-promotions,.jdm-toolbar-footer, #id-pcprompt-mask{display:none !important}.itemInfo-wrap .summary-price-wrap .z-has-more-promotion .p-promotions-wrap,.itemInfo-wrap .summary-price-wrap .z-has-more-promotion .prom-item, .itemInfo-wrap .summary-price-wrap .z-has-more-promotion .prom-quan,.itemInfo-wrap .summary-price-wrap .z-has-more-promotion{height:auto!important;white-space: normal !important;}.itemInfo-wrap .summary-price-wrap .summary-top .z-promotions-all-show{position:static!important;}.itemInfo-wrap .summary-price-wrap .summary-top .p-promotions-wrap{padding-bottom:5px !important}.summary-service,.free_delivery_zhong{background-color:yellow}');

if (location.protocol == 'http:') {
    location.href = location.href.replace(/http\:/, 'https:');
}

var domain = window.location.hostname;
if (domain == 'pcashier.jd.com') {
    GM_addStyle('.paybox-bankCard{display:block !important}');
	//window.setInterval(YTPay, 1000);
}
if (domain == 'coupon.m.jd.com' || domain == 'coupon.jd.com') {
    //$('#pcprompt-viewpc').click();
	var link = location.href;
	location.href = 'https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={"activityId":"3otnUZEkGA4YVeLpTxAfef3gVJn9","from":"H5node","scene":"1","args":"key=' + getUrlParameter('key') + ',roleId=' + getUrlParameter('roleId') + '"}&client=wh5&clientVersion=1.0.0&callback=jsonp';
}
if (domain == 'm.jd.com') {
    var pathnames = location.pathname.split('/');
	//if (!navigator.userAgent.includes('Mobile')) location.href = 'https://sale.jd.com/act/' + pathnames[pathnames.length - 1];
}

if (domain == 'item.m.jd.com' || domain == 're.jd.com' || domain == 're.m.jd.com') {
    var pathnames = location.pathname.split('/');
    if (!navigator.userAgent.includes('Mobile'))  location.href = 'https://item.jd.com/' + pathnames[pathnames.length - 1];
}

if (domain == 'item.jd.com') {
	//if ($('#InitCartUrl').hasClass('btn-disable')) {
    	$('#choose-btns').append('<a class="btn-special1 btn-lg" href="https://cart.jd.com/gate.action?pid=' + window.location.pathname.replace('/', '').replace('.html', '') + '&pcount=1&ptype=1">+ 购物车</a>');
	//}
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
    var pathname = location.pathname;
    if (pathname.includes('shopSign')) {
        window.setTimeout(function () {
            window.close();
        }, 5000);
    }
    else {
        location.href = JDMall2Mobile(location.href);
    }
/*    
    if (pathname.includes('index')) {
        var pathnames = location.pathname.split('/');
        var pathname = pathnames[pathnames.length - 1];
        pathnames = pathname.split('.');
        pathname = pathnames[0];
        pathname = pathname.replace(/index-/g, '');
        location.href = 'https://shop.m.jd.com/?shopId=' + pathname;
    }
*/    
}
if (domain == 'vip.jr.jd.com') {
    window.setTimeout(function () {
        $('#index-qian-btn').trigger('click');
    }, 3000);
}
if (domain == 'ljd.m.jd.com') {
    window.setTimeout(function () {
        $('#receiveAward').trigger('click');
    }, 3000);
}
if (domain == 'm.jr.jd.com') {
    window.setTimeout(function () {
        $('.gangbeng .btn').trigger('click');
    }, 3000);
    window.setTimeout(function () {
        $('.gift-dialog-btn').trigger('click');
    }, 5000);
    
    window.setTimeout(function () {
        window.close();
    }, 10000);
}
function YTPay() {
	$('.ui-shortPwd-input').eq(0).val('');
	$('.ui-shortPwd-input').eq(1).val('');
	$('.ui-shortPwd-input').eq(2).val('');
	$('.ui-shortPwd-input').eq(3).val('');
	$('.ui-shortPwd-input').eq(4).val('');
	$('.ui-shortPwd-input').eq(5).val('');
	$('.p-k-check').each(function(){
		if ($(this).text().includes('工商')) {
			$(this).click();
		}
	});
}
//https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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