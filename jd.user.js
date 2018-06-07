// ==UserScript==
// @name         JD
// @namespace    https://twitter.com/ytzong
// @version      1.1.8
// @author       ytzong
// @include      http*://www.jd.com/*
// @include      http*://re.jd.com/*
// @include      http*://re.m.jd.com/*
// @include      http*://m.jd.com/sale/act/*
// @include      http*://item.m.jd.com/product/*
// @include      http*://item.jd.com/*
// @include      http*://wqs.jd.com/*
// @include      http*://pcashier.jd.com/*
// @run-at       document-end
// @grant        GM_addStyle
// @description JD for ytzong
// ==/UserScript==

GM_addStyle('#bjd_yifenqian_detail, #right_info,.more-prom-ins,.view-all-promotions,.jdm-toolbar-footer, #id-pcprompt-mask{display:none !important}.itemInfo-wrap .summary-price-wrap .z-has-more-promotion .p-promotions-wrap,.itemInfo-wrap .summary-price-wrap .z-has-more-promotion .prom-item, .itemInfo-wrap .summary-price-wrap .z-has-more-promotion .prom-quan,.itemInfo-wrap .summary-price-wrap .z-has-more-promotion{height:auto!important;white-space: normal !important;}.itemInfo-wrap .summary-price-wrap .summary-top .z-promotions-all-show{position:static!important;}.itemInfo-wrap .summary-price-wrap .summary-top .p-promotions-wrap{padding-bottom:5px !important}.summary-service{background-color:yellow}');

var domain = window.location.hostname;
if (domain == 'pcashier.jd.com') {
    GM_addStyle('.paybox-bankCard{display:block !important}');
	//window.setInterval(YTPay, 1000);
}
if (window.location.href == 'http://www.jd.com/') {
    location.href = 'https://www.jd.com/';
}
if (domain == 'm.jd.com') {
    var pathnames = location.pathname.split('/');
    location.href = 'https://sale.jd.com/act/' + pathnames[pathnames.length - 1];
}

if (domain == 'item.m.jd.com' || domain == 're.jd.com' || domain == 're.m.jd.com') {

    var pathnames = location.pathname.split('/');
    location.href = 'https://item.jd.com/' + pathnames[pathnames.length - 1];
}

if (domain == 'item.jd.com') {
	//if ($('#InitCartUrl').hasClass('btn-disable')) {
    	$('#choose-btns').append('<a class="btn-special1 btn-lg" href="https://cart.jd.com/gate.action?pid=' + window.location.pathname.replace('/', '').replace('.html', '') + '&pcount=1&ptype=1">+ 购物车</a>');
	//}
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