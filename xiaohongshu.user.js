// ==UserScript==
// @name         XiaoHongShu
// @version      2023.05.02
// @author       ytzong
// @description  XiaoHongShu
// @include      *://*xiaohongshu.*/*
// @copyright    ytzong
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

let pathname = location.pathname

GM_addStyle(`
.header-container{z-index:0!important}
.note-container{transform:none!important;height:100vh!important;width:100vw!important}
.close-box{left:0!important;top:0!important}
.right{width: auto!important;}
.arrow-controller.right{width:36px!important}
.media-container,.interaction-wrapper{height:100vh!important}
.media-container{width: calc(100vw - 550px)!important}
.interaction-wrapper,.interaction-container{width:550px!important}
.content{width:400px!important}
.interaction-wrapper{position:absolute;right:0;top:0}
.close-tooltip{display:none!important}
.note-detail-mask.header{top:0!important;height:100vh!important}
`)

