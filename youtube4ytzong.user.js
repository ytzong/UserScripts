// ==UserScript==
// @name        Youtube for ytzong
// @author      ytzong
// @include     https://www.youtube.com/watch*
// @version     0.1
// @grant       GM_addStyle
// @run-at      document-idle
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==

/* depends on https://chrome.google.com/webstore/detail/nkdalpbojfdilmiboaiedicdbigdabpb */

GM_addStyle('#masthead-positioner{position:absolute!important}');

function main() {
	function rotate(deg) {
        var zoom = 1;
        if (deg % 360 == 90 || deg % 360 == 270) {
            zoom = $(window).height()/$(window).width();
        }
        else {
            zoom = 1;
        }
        $('.html5-video-container').attr('style', 'transform:rotate(' + deg + 'deg) scale(' + zoom + ', ' + zoom + ') !important;transform-origin:50% 50%;width:100% !important;height: 100% !important;left:0 !important;top:0 !important;');
	}
	var degree = 0;
	$(document).keydown(function(e) {
		//R
		if(e.keyCode == 82) {
			degree += 90;
			rotate(degree);
		}
	});
}
main();