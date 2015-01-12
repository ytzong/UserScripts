// ==UserScript==
// @name       feedburner-troubleshoot
// @namespace  http://twitter.com/ytzong
// @version    0.4
// @description  feedburner-troubleshoot
// @match      https://feedburner.google.com/fb/a/troubleshoot?id=*
// @copyright  2015+, ytzong
// ==/UserScript==

function YTFunc(){
	if (document.getElementsByClassName('confirm message').length == 0)
        document.forms[3].submit();
    else
    	window.location.href = document.querySelector('#thingActions a').getAttribute('href');
}
window.setTimeout(YTFunc, 1000);
