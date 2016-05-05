// ==UserScript==
// @name        Youtube Fullscreen
// @namespace   Youtube Fullscreen
// @author       ytzong
// @description Youtube Fullscreen
// @include     https://www.youtube.com/watch*
// @version     1.3
// @grant       GM_addStyle
// @run-at      document-end
// ==/UserScript==

/* depends on https://chrome.google.com/webstore/detail/magic-actions-for-youtube/abjcfabbhafbcdfjoecdgepllmpfceif */

GM_addStyle('.html5-progress-bar {width: 100% !important}.html5-video-container{width: 100% !important;height: 100% !important}');

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.3.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
    //$('#watch-header').append('<input class="yt-uix-form-input-text share-panel-url" style="margin:5px 0" value="u2bbest ' + window.location.href + '">');
    function fullscreen(){
        $('div[title="Expand"]').click();
        $('iframe').attr('style', 'display: none !important;');
    }
    window.setTimeout(fullscreen, 1000);

    $(document).keydown(function(e) {
    	//B
		if(e.keyCode == 66) {
			fullscreen();
		}
	});

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

addJQuery(main);