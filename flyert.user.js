// ==UserScript==
// @name         flyert
// @version      2023.08.17
// @author       ytzong
// @description  flyert
// @include      http*://*flyert.*/*
// @copyright    2023+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`

body{font-family: Helvetica!important;}
.t_f .post_message, #article_content{font-weight:normal!important;}
.dzlabfont{font-weight:600!important}

`);
