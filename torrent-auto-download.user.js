// ==UserScript==
// @name       Torrent Auto Download
// @namespace  http://twitter.com/ytzong
// @version    0.9
// @description  Torrent Auto Download
// @match      http://www.ffh6.com/*
// @match      http://www.yyyy1.info/*
// @match      http://www.rmdown.com/*
// @match      http://www.jandown.com/*
// @match      http://www.xahka.com/*
// @match      http://www.222888.info/*
// @match      http://www.bforu.info/*
// @match      http://www.viidii.info/*
// @include    http://www.btbbt.cc/attach-dialog*
// @copyright  2014+, ytzong
// ==/UserScript==

function ytDownloadTorrent(){
    var strDomain = window.location.hostname;
    if (strDomain == 'www.ffh6.com' || strDomain == 'www.yyyy1.info' || strDomain == 'www.222888.info' || strDomain == 'www.bforu.info')
    	document.getElementsByClassName('button')[0].click();
    if (strDomain == 'www.rmdown.com')
        document.forms[0].submit.click();
    if (strDomain == 'www.jandown.com' || strDomain == 'www.xahka.com')
        document.forms[0].submit();
    if (strDomain == 'www.viidii.info')
        document.getElementsByClassName('bglink')[0].click();
    if (strDomain == 'www.btbbt.cc') {
        window.location = $('.icon-download').parent().attr('href');
        window.setInterval(window.close, 4000);
    }
}
window.setTimeout(ytDownloadTorrent, 2000);
