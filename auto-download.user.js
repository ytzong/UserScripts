// ==UserScript==
// @name         Auto Download
// @version      2023.10.21
// @description  Auto Download
// @include      *://www.ffh6.com/*
// @include      *://www.yyyy1.info/*
// @include      *://www.rmdown.com/*
// @include      *://www.jandown.com/*
// @include      *://www.xahka.com/*
// @include      *://www.222888.info/*
// @include      *://www.bforu.info/*
// @include      *://www.viidii.info/*
// @include      *://*51svp.*/*
// @include      *://*lanzout.*/*
// @include      *://*lanzoug.*/*
// @include      *://*.btbbt.*/attach-dialog*
// @include      *://*.btbtt.*/attach-dialog*
// @include      *://*.dfpan.com/file/down/*
// @include      *://webhd.top/d/*
// @copyright    2014+, ytzong

// ==/UserScript==
var domain = window.location.hostname;

function ytDownload() {
    if (domain == 'www.ffh6.com' || domain == 'www.yyyy1.info' || domain == 'www.222888.info' || domain == 'www.bforu.info') document.getElementsByClassName('button')[0].click();
    if (domain == 'www.rmdown.com') document.forms[0].submit.click();
    if (domain == 'www.jandown.com' || domain == 'www.xahka.com') document.forms[0].submit();
    if (domain == 'www.viidii.info') document.getElementsByClassName('bglink')[0].click();
    if (domain.includes('dfpan')) downSubmit(2);
    if (domain.includes('lanzou')) document.querySelectorAll('#go a, #sub div')[0].click()

    if (domain.includes('webhd')) {
        document.querySelector('button[control-id="ControlID-4"]').click()
    }
}
function ytDownload2() {
    if (domain.includes('51svp')) document.querySelector('.btn-success').click();
    //if (domain.includes('lanzou')) document.querySelectorAll('#go a, #sub div')[0].click()
}
window.setTimeout(ytDownload, 2000);
window.setTimeout(ytDownload2, 5000);

