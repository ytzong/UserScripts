// ==UserScript==
// @name        Youtube Fullscreen
// @namespace   Youtube Fullscreen
// @description Youtube Fullscreen
// @include     https://www.youtube.com/watch*
// @version     1.1
// @grant       GM_addStyle
// ==/UserScript==

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
    //
    function fullscreen(){
        $('div[title="Expand"]').click()
        $("iframe[id*='watch7']").attr('style', 'display: none !important;')
    }
    window.setTimeout(fullscreen, 2000);

    $(document).keydown(function(e) {
    	//B
		if(e.keyCode == 66) {
			fullscreen()
		}
	})

	function rotate(deg) {
        var height = 100;
        var top = 0;
        if (deg % 360 == 90 || deg % 360 == 270) {
            height = 60;
            top = 10;
        }
        else {
            height = 100;
            top = 0;
        }
        $('.html5-main-video').attr('style', 'transform:rotate(' + deg + 'deg);width:100% !important;height:' + height + '% !important;left:0 !important;top:0 !important;margin-top:' + top + '% !important');
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