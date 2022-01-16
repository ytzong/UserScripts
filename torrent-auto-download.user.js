// ==UserScript==
// @name       Torrent Auto Download
// @namespace  http://twitter.com/ytzong
// @version    2019.11.28
// @description  Torrent Auto Download
// @match      http://www.ffh6.com/*
// @match      http://www.yyyy1.info/*
// @match      http://www.rmdown.com/*
// @match      http://www.jandown.com/*
// @match      http://www.xahka.com/*
// @match      http://www.222888.info/*
// @match      http://www.bforu.info/*
// @match      http://www.viidii.info/*
// @match      http://*51svp.*/*
// @include    http://*.btbbt.*/attach-dialog*
// @include    http://*.btbtt.*/attach-dialog*

// @match      http://*.dfpan.com/file/down/*
// @copyright  2014+, ytzong

// ==/UserScript==
var strDomain = window.location.hostname;

function ytDownloadTorrent(){
    if (strDomain == 'www.ffh6.com' || strDomain == 'www.yyyy1.info' || strDomain == 'www.222888.info' || strDomain == 'www.bforu.info') document.getElementsByClassName('button')[0].click();
    if (strDomain == 'www.rmdown.com') document.forms[0].submit.click();
    if (strDomain == 'www.jandown.com' || strDomain == 'www.xahka.com') document.forms[0].submit();
    if (strDomain == 'www.viidii.info') document.getElementsByClassName('bglink')[0].click();
    if (strDomain.includes('dfpan')) downSubmit(2);
}
function ytDownloadTorrent2(){
     if (strDomain.includes('51svp')) document.querySelector('.btn-success').click();
}
window.setTimeout(ytDownloadTorrent, 2000);
window.setTimeout(ytDownloadTorrent2, 5000);
