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
.data-table tr td .app-info-wrap .icon{position:relative}
.data-table tr td .app-info-wrap .icon>img{width:100px!important;height:100px!important;border:0 none!important;border-radius:0 !important}
.data-table tr td .app-info-wrap .icon:after{content: "";width:100px;height:100px;background-image: url("https://rss.ytzong.com/css/img/mask100_2x.png");background-size: cover;position: absolute;top: 0;left: 0;}
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
        $('.app-icon a').each(function () {
            $(this).attr('target', '_blank')
        })
        $('.app-info .name').each(function () {
            let appID = $(this).attr('href').split('/').slice(-2)[0]
            let appURL = 'https://apps.apple.com/us/app/id' + appID
            $(this).attr('href', appURL).attr('target', '_blank')
        })
    }, 2000)

}
