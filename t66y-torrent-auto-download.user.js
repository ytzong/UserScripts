// ==UserScript==
// @name       T66Y Torrent Auto Download
// @namespace  http://twitter.com/ytzong
// @version    0.1
// @description  FFH6 Auto Download
// @match      http://www.ffh6.com/*
// @match      http://www.yyyy1.info/bt*
// @match      http://www.rmdown.com/link.php*
// @copyright  2014+, ytzong
// ==/UserScript==

function ytDownloadTorrent(){
    var strDomain = window.location.hostname;
    if (strDomain == 'www.ffh6.com' || strDomain == 'www.yyyy1.info')
    	document.getElementsByClassName('button')[0].click();
    if (strDomain == 'www.rmdown.com')
        document.forms[0].submit.click();
}
window.setTimeout(ytDownloadTorrent, 3000);
