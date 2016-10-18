// ==UserScript==
// @name         Feng
// @version      0.2
// @author       ytzong
// @description  Clean BBS
// @include      http://bbs.feng.com/*
// @include      https://bbs.feng.com/*
// @copyright    2016+
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

GM_addStyle('#bbs_top_news,#bbs_top_news + .wrap,.bm.bml.pbn,.wrap.fl_row,.wea_d_panel_980 {display: none !important;}');