// ==UserScript==
// @name       Github Clone Button Fix
// @namespace  http://twitter.com/ytzong
// @version    0.1
// @description  Github Clone Button Fix
// @match      https://github.com/*
// @copyright  2012+, You
// ==/UserScript==

$('.js-conduit-rewrite-url:eq(0)').attr('href', $('.js-conduit-rewrite-url:eq(0)').attr('data-url'));