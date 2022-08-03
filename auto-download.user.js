// ==UserScript==
// @name       Auto Download
// @namespace  http://twitter.com/ytzong
// @version    2022.04.09
// @description Auto Download
// @match      http://www.ffh6.com/*
// @match      http://www.yyyy1.info/*
// @match      http://www.rmdown.com/*
// @match      http://www.jandown.com/*
// @match      http://www.xahka.com/*
// @match      http://www.222888.info/*
// @match      http://www.bforu.info/*
// @match      http://www.viidii.info/*
// @match      http://*51svp.*/*
// @include    *://*lanzout.*/*
// @include    *://*lanzoug.*/*
// @include    http://*.btbbt.*/attach-dialog*
// @include    http://*.btbtt.*/attach-dialog*
// @match      http://*.dfpan.com/file/down/*
// @copyright  2014+, ytzong

// ==/UserScript==
var domain = window.location.hostname;

function ytDownload() {
    if (domain == 'www.ffh6.com' || domain == 'www.yyyy1.info' || domain == 'www.222888.info' || domain == 'www.bforu.info') document.getElementsByClassName('button')[0].click();
    if (domain == 'www.rmdown.com') document.forms[0].submit.click();
    if (domain == 'www.jandown.com' || domain == 'www.xahka.com') document.forms[0].submit();
    if (domain == 'www.viidii.info') document.getElementsByClassName('bglink')[0].click();
    if (domain.includes('dfpan')) downSubmit(2);
    if (domain.includes('lanzou')) document.querySelectorAll('#go a, #sub div')[0].click()
}
function ytDownload2() {
    if (domain.includes('51svp')) document.querySelector('.btn-success').click();
    if (domain.includes('lanzou')) document.querySelectorAll('#go a, #sub div')[0].click()
}
window.setTimeout(ytDownload, 2000);
window.setTimeout(ytDownload2, 5000);
