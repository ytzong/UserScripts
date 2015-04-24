// ==UserScript==
// @name         CocoaPods to GitHub
// @namespace    http://twitter.com/ytzong
// @version      0.1
// @description  CocoaPods to GitHub
// @author       ytzong
// @match        http://cocoapods.org/pods/*
// @match        https://cocoapods.org/pods/*
// @grant        none
// ==/UserScript==

window.location.href = $('.github-link a').attr('href');