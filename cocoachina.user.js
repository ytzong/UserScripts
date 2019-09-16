// ==UserScript==
// @name         CocoaChina
// @namespace    https://twitter.com/ytzong
// @version      0.6
// @author       ytzong
// @include      http://www.cocoachina.com/bbs/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

GM_addStyle('#feedback,.tpc_content .fr,.tips,.r_one iframe,#ads_c_tpc,#newjob {display:none !important}# read_tpc, .tpc_content{max-width:650px;}');

if (location.pathname == '/bbs/read.php') document.title = jQuery('#subject_tpc').text()

jQuery('td.tal a').each(function(){
	if (jQuery(this).text() == '[广告投放]') jQuery(this).parent().parent().hide();
	//console.log(jQuery(this).text());
});