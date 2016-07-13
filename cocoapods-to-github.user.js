// ==UserScript==
// @name         CocoaPods to GitHub
// @namespace    http://twitter.com/ytzong
// @version      0.2
// @description  CocoaPods to GitHub
// @author       ytzong
// @match        http://cocoapods.org/pods/*
// @match        https://cocoapods.org/pods/*
// @grant        none
// ==/UserScript==

var gitlink = $('.github-link a');
if (gitlink.length > 0) window.location.href = gitlink.attr('href');