// ==UserScript==
// @name         Just998
// @version      0.6
// @author       ytzong
// @description  Just998
// @include      http://*just998.com/*
// @include      https://*just998.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('.container{max-width:888px !important}#footer, .like_tip, .xianbao-tip, .declare, .swiper-top, .panel-footer, .side-qr, .hb_pop, .hb_pop_cover,.col-sm-3, #jGrowl{display:none !important}');
if (location.href.includes('xianbao')) {
    GM_addStyle('.youhui-item{display:none!important}.bottombar .favorite{top:0!important;left:auto!important;right:0!important}');
}

$('.col-sm-9').removeClass('col-sm-9');
$('.pp-10').each(function(i){
	$(this).hide().next().hide();
});
$('.panel-heading').each(function(i){
	$(this).parent().hide();
});
$('.content a').each(function(i){
	var real = $(this).attr('onclick');
	var reals = real.split(',');
	real = reals[reals.length - 1];
	reals = real.split("'");
	var href = '';
	if (reals.length > 2) {
		href = reals[1];
	}
	else {
		var text = $(this).text();
		if (text.includes('http') && !text.includes('...')) {
			href = text;
		}
	}
	$(this).attr('href', href);
	$(this).removeAttr('onclick');
});