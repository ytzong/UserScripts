// ==UserScript==
// @name       Torrent Auto Download
// @namespace  http://twitter.com/ytzong
// @version    0.7
// @description  Torrent Auto Download
// @match      http://www.ffh6.com/*
// @match      http://www.yyyy1.info/*
// @match      http://www.rmdown.com/*
// @match      http://www.jandown.com/*
// @match      http://www.xahka.com/*
// @match      http://www.222888.info/*
// @copyright  2014+, ytzong
// ==/UserScript==

function ytDownloadTorrent(){
    var strDomain = window.location.hostname;
    if (strDomain == 'www.ffh6.com' || strDomain == 'www.yyyy1.info')
    	document.getElementsByClassName('button')[0].click();
    if (strDomain == 'www.rmdown.com')
        document.forms[0].submit.click();
    if (strDomain == 'www.jandown.com' || strDomain == 'www.xahka.com')
        document.forms[0].submit();
    if (strDomain == 'www.222888.info')
    	document.getElementsByClassName('button')[0].click()
}
window.setTimeout(ytDownloadTorrent, 2000);
