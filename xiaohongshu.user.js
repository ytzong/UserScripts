// ==UserScript==
// @name         XiaoHongShu
// @version      2023.07.09
// @author       ytzong
// @description  XiaoHongShu
// @include      *://*xiaohongshu.*/*
// @copyright    ytzong
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

let pathname = location.pathname

GM_addStyle(`
.reds-button-new-text{font-size:12px !important}
.feeds-page .divider.rec-filter{border:0 !important}
.note-item .author-wrapper .name{background-color:yellow!important}
.reds-sticky{top:0 !important}
.mask-paper,
.header-container,
.channel-scroll-container,
.tab-scroll-container,
.reds-sticky{height:50px !important}
.feeds-page{padding-top:55px !important}
.outer-link-container{margin-top:55px !important;height: calc(100% - 0) !important;width: calc(80vw + 5px) !important;}
.note-container{transform:none!important;height:100vh!important;width:100vw!important;border:0 !important}
.outer-link-container .note-container{height:calc(100vh - 55px) !important}
.close-box{left:0!important;top:0!important}
/* .right{width: auto!important;} */
.arrow-controller.right{width:36px!important}
.media-container,.interaction-wrapper{height:100vh!important}
.media-container{width: calc(100vw - 550px)!important}
.interaction-wrapper,.interaction-container{width:550px!important}
.content{width:400px!important}
.interaction-wrapper{position:absolute;right:0;top:0}
.close-tooltip{display:none!important}
.note-detail-mask.header{top:0!important;height:100vh!important}
.author-container{margin-top:-6px!important}
/* .interactions{padding:12px 24px !important; height:110px!important;flex-basis:100px !important} */
.interactions .comment-comp{margin-top:12px !important}
`)

