// ==UserScript==
// @name        Youtube Fullscreen
// @namespace   Youtube Fullscreen
// @description Youtube Fullscreen
// @include     https://www.youtube.com/watch*
// @version     0.1
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
    function download(){
        $('div[title="Expand"]').click()
    }
    window.setTimeout(download, 2000);
}

addJQuery(main);