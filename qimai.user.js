// ==UserScript==
// @name         QiMai
// @version      2022.09.07
// @author       ytzong
// @description  QiMai
// @include      http*://*qimai.*/*
// @include      http*://app.sensortower.com/ios/publisher/publisher/*
// @copyright    ytzong
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

let domain = location.host
if (domain.includes('qimai')) {
    GM_addStyle(`
  #footer-guide, .tool-side, a[href="http://u.qimai.cn/3xk"]{display:none!important}
  #rank-top-list .data-table .app-info-wrap .app-info .app-name{max-width:none!important}
  .data-table tr td .app-info-wrap .icon>img{width:60px!important;height:60px!important}
  .app-info .basic-info .app-screenshot .screenshot-list .screenshot-box img{max-height:500px!important;height:auto!important}
  `);

    window.setTimeout(function () {

        $('.ivu-breadcrumb-item-link a').each(function () {
            let publisherID = $(this).attr('href')
            console.log(publisherID)
            if (publisherID.includes('/publisher/')) {
                publisherID = publisherID.split('/')[4]
                console.log(publisherID)
                let sensortower = 'https://app.sensortower.com/ios/publisher/publisher/' + publisherID
                $(this).attr('href', sensortower)
                $(this).text($(this).text() + ' »')
                location.href = sensortower
            }
        })

    }, 2000)
}
if (domain.includes('sensortower')) {
    GM_addStyle(`
    .summary-item:last-child a,
    .yt-highlight{background-color:yellow!important}
  `);
    window.setTimeout(function () {
        $('td.app-metric:last-child a').each(function () {
            if (!$(this).text().includes('< $5k')) {
                $(this).parents('tr').addClass('yt-highlight')
            }
        })
    }, 2000)

}
