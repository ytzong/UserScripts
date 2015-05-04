// ==UserScript==
// @name         iTunes Connect URL Bug Fix
// @namespace    http://twitter.com/ytzong
// @version      0.1
// @description  iTunes Connect URL Bug Fix
// @author       ytzong
// @match        https://itunesconnect.apple.com/*
// @grant        none
// ==/UserScript==

var url = window.location.href;

if (url.substr(-2) == '#/') {
    window.location.href = url.substring(0, url.length -2)
}    