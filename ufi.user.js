// ==UserScript==
// @name         UFI
// @namespace    UFI
// @version      2025.10.10
// @description  Custom UFI-TOOLS
// @author       ytzong
// @match        http://192.168.0.1:2333/
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`

:root {
  --dark-bg-color: white!important;
  --dark-bgi-color: white!important;
  --dark-title-color: white!important;
  --dark-text-color: #333!important;
  --dark-card-bg: white!important;
  --dark-btn-color: white!important;
  --dark-btn-color-active: lightgray!important;
  --dark-tag-color: white!important;
}
.nice-table thead{background-color:lightgray!important;}
body{text-shadow:none!important}
.deviceList strong:hover, .deviceList strong:active, .deviceList .card-item:hover, .deviceList .card-item:active{box-shadow:none!important;}
.title{padding-left:0!important}
button{cursor: pointer;}
.toolbar,
.footer{display:none!important}

`);