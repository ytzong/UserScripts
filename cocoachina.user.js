// ==UserScript==
// @name         CocoaChina
// @namespace    https://twitter.com/ytzong
// @version      0.4
// @author       ytzong
// @include      http://www.cocoachina.com/bbs/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

GM_addStyle('#feedback,.tpc_content .fr,.tips,.r_one iframe,#ads_c_tpc,#newjob {display:none !important}# read_tpc, .tpc_content{max-width:650px;}');

(function() {
    'use strict';

    // Your code here...
    jQuery('td.tal a').each(function(){
        if (jQuery(this).text() == '[广告投放]') jQuery(this).parent().parent().hide();
        //console.log(jQuery(this).text());
    });
})();