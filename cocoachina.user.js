// ==UserScript==
// @name         CocoaChina
// @namespace    https://twitter.com/ytzong
// @version      0.2
// @author       ytzong
// @include      http://www.cocoachina.com/bbs/thread.php?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    jQuery('td.tal a').each(function(){
        if (jQuery(this).text() == '[广告投放]') jQuery(this).parent().parent().hide();
        //console.log(jQuery(this).text());
    });
})();