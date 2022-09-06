// ==UserScript==
// @name         QiMai
// @version      2022.09.06
// @author       ytzong
// @description  QiMai
// @include      http*://*qimai.*/*
// @copyright    ytzong
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

GM_addStyle(`
#footer-guide, .tool-side, a[href="http://u.qimai.cn/3xk"]{display:none!important}
#rank-top-list .data-table .app-info-wrap .app-info .app-name{max-width:none!important}
.data-table tr td .app-info-wrap .icon>img{width:60px!important;height:60px!important}
`);

window.setTimeout(function () {

    $('.ivu-breadcrumb-item-link a').each(function () {
        let publisherID = $(this).attr('href')
        console.log(publisherID)
        if (publisherID.includes('/publisher/')) {
            publisherID = publisherID.split('/')[4]
            console.log(publisherID)
            $(this).attr('href', 'https://app.sensortower.com/ios/publisher/publisher/' + publisherID)
            $(this).text($(this).text() + ' »')
        }
    })

}, 2000)
