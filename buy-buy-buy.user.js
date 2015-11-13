// ==UserScript==
// @name         Buy Buy Buy
// @namespace    Buy Buy Buy
// @version      0.1
// @description  Buy Buy Buy
// @author       ytzong
// @match        http://re.jd.com/cps/item/*
// @grant        GM_addStyle
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

window.location.href = $('.btn-append').attr('href')