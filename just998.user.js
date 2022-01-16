// ==UserScript==
// @name         Just998
// @version      0.8
// @author       ytzong
// @description  Just998
// @include      http://*just998.com/*
// @include      https://*just998.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('.container{max-width:888px !important}#footer, .like_tip, .xianbao-tip, .declare, .swiper-top, .panel-footer, .side-qr, .hb_pop, .hb_pop_cover,.col-sm-3, #jGrowl, .swiper-slide{display:none !important}');

var pathname = location.pathname;

if (pathname.includes('xianbao/') && pathname.includes('.html')) {
    GM_addStyle('.youhui-item, blockquote{display:none!important}.bottombar .favorite{top:0!important;left:auto!important;right:0!important}');
    
    $('.panel').each(function(){
        if ($(this).find('h1').length > 0) {
            
        }
        else $(this).hide();
    })
    $('.table-responsive').parent().hide()
}
if (pathname == '/') {
    $('.xianbao-item.panel').prev().hide();
        $('.panel-heading').each(function(i){
        $(this).parent().hide();
    });
}
$('.col-sm-9').removeClass('col-sm-9');
$('a[href="/xianbao/re"]').parent().parent().hide();
$('.pp-10').each(function(i){
    var text = $(this).text();
    if (text.includes('天猫双11预售会场导航')) {
        $(this).parent().hide();
    }
    if (text.includes('完美支持手机端访问')) {
        $(this).hide();
    }
	//$(this).hide().next().hide();
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