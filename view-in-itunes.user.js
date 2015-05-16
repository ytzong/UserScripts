// ==UserScript==
// @name         View in iTunes
// @namespace    http://twitter.com/ytzong
// @version      0.2
// @description  View in iTunes
// @author       ytzong
// @match        https://itunes.apple.com/*
// @grant        none
// ==/UserScript==

$('#left-stack .view-in-itunes:eq(0)').click();

window.setTimeout(window.close, 1000);
