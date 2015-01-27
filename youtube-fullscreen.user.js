// ==UserScript==
// @name        Youtube Fullscreen
// @namespace   Youtube Fullscreen
// @description Youtube Fullscreen
// @include     https://www.youtube.com/watch*
// @version     0.7
// @grant       none
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
    //
    function fullscreen(){
        $('div[title="Expand"]').click()
        $("iframe[id*='watch7']").attr('style', 'display: none !important;')
    }
    window.setTimeout(fullscreen, 2000);

    $(document).keydown(function(e) {
    	//F
		if(e.keyCode == 70) {
			fullscreen()
		}
	})

	function rotate(deg) {
		$('.html5-main-video').css('transform', 'rotate(' + deg + 'deg)')
	}
	var degree = 0;
	$(document).keydown(function(e) {
		//R
		if(e.keyCode == 82) {
			degree += 90
			rotate(degree)
		}
	})
}

addJQuery(main);