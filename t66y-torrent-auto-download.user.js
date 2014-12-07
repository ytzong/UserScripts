// ==UserScript==
// @name       Torrent Auto Download
// @namespace  http://twitter.com/ytzong
// @version    0.4
// @description  Torrent Auto Download
// @match      http://www.ffh6.com/*
// @match      http://www.yyyy1.info/*
// @match      http://www.rmdown.com/*
// @match      http://www.jandown.com/*
// @copyright  2014+, ytzong
// ==/UserScript==

function ytDownloadTorrent(){
    var strDomain = window.location.hostname;
    if (strDomain == 'www.ffh6.com' || strDomain == 'www.yyyy1.info')
    	document.getElementsByClassName('button')[0].click();
    if (strDomain == 'www.rmdown.com')
        document.forms[0].submit.click();
    if (strDomain == 'www.jandown.com')
        document.forms[0].submit();
}
window.setTimeout(ytDownloadTorrent, 2000);
