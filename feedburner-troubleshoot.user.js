// ==UserScript==
// @name       feedburner-troubleshoot
// @namespace  http://twitter.com/ytzong
// @version    0.2
// @description  feedburner-troubleshoot
// @match      https://feedburner.google.com/fb/a/troubleshoot?id=*
// @copyright  2015+, ytzong
// ==/UserScript==

function YTFunc(){
	if (document.getElementsByClassName('confirm message').length == 0)
        document.forms[3].submit();
}
window.setTimeout(YTFunc, 2000);
