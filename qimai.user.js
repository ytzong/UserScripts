// ==UserScript==
// @name         QiMai
// @version      2023.03.04
// @author       ytzong
// @description  QiMai
// @include      http*://*qimai.*/*
// @include      http*://app.sensortower.com/*
// @copyright    ytzong
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// ==/UserScript==

let domain = location.host
let pathname = location.pathname
if (domain.includes('qimai')) {
    GM_addStyle(`
body{overflow-x:hidden}
  #footer-guide, .tool-side, a[href="http://u.qimai.cn/3xk"],
  .data-table th, .data-table tr td:nth-child(1), .data-table tr td:nth-child(3), .data-table tr td:nth-child(5), .data-table tr td:nth-child(6), .data-table tr td:nth-child(8), .data-table tr td .rank-wrap .category,
  #rank-top-list .data-table .comment-num,
  #rank-top-list .data-table .app-info-wrap .app-info .company,
  .ivu-tooltip, .ivu-tooltip-rel,
  #footer,
  .no-data,
  .cm-explain-bottom{display:none!important}
.layout-header, .head-box .head .container, .head-box .head, .jumbotron, .jumbotron>div .container{min-width:0!important}
  .jumbotron>div .container{padding-left:30px!important;padding-right:30px!important}
.tab-container{width:400px}
  .data-table tr td .app-info-wrap .rank-day{top:0!important;right:0!important}
  .data-table tr{box-sizing: content-box;display:inline-block!important;vertical-align:top;position: relative;padding:0 0 15px;margin: 0 0 15px;width: 130px;}
  .data-table td{display:block;width:auto!important;border:0 none !important}
  .data-table tr td .app-info-wrap .app-info{margin-left:0!important;float:none!important}
  #rank-top-list .data-table .app-info-wrap{min-width:0!important}
  #rank-top-list .data-table .app-info-wrap .app-info .company,
  #rank-top-list .data-table .rank-wrap{width:auto!important;max-width:100%!important;}
  #rank-top-list .data-table .app-info-wrap .app-info .app-name{margin-top:5px!important;width:100%;white-space:normal!important;line-height:1.4;max-height:4.5em;-webkit-line-clamp:2;font-size:13px!important;text-align:center!important;font-weight:500}
  #rank-top-list .data-table .rank-wrap .rank-box,
  .data-table tr td .rank-wrap .rank{display:inline-block!important;vertical-align:top;position:static!important; float:none!important;width:auto!important;margin-top:0!important}
  .data-table tr td:nth-child(4){position:absolute;top:0;left:0;font-size:13px!important}
  #rank-top-list .data-table .comment-rating{display:none;position:absolute;right:0;top:0}
  .data-table tr td .app-info-wrap{padding:25px 0 0 !important}
.data-table tr td .app-info-wrap .icon{position:relative;margin-left: 15px;}
.data-table tr td .app-info-wrap .icon>img{width:100px!important;height:100px!important;border:0 none!important;border-radius:0 !important}
.data-table tr td .app-info-wrap .icon:after{content: "";width:100px;height:100px;background-image: url("https://rss.ytzong.com/css/img/mask100_2x.png");background-size: cover;position: absolute;top: 0;left: 0;}
  .app-info .basic-info .app-screenshot .screenshot-list .screenshot-box img{max-height:500px!important;height:auto!important}
  `);

    if (pathname.includes('/rank/')) {
        (function (history) {
            var pushState = history.pushState;
            history.pushState = function (state) {
                window.setTimeout(function () {
                    location.reload()
                }, 500)
                return pushState.apply(history, arguments);
            };
        })(window.history);
    }


    window.setTimeout(function () {
        let pub = $('.ivu-breadcrumb-item-link a').eq(0)
        if (pub.length > 0) {
            var publisherID = pub.attr('href')
            console.log(publisherID)
            if (publisherID.includes('/publisher/')) {
                publisherID = publisherID.replace('/cn', '/us')
                pub.attr('href', publisherID)
                publisherID = publisherID.split('/')[4]
                console.log(publisherID)
                let sensortower = 'https://app.sensortower.com/ios/publisher/publisher/' + publisherID
                $('.pub').wrap('<a href="' + sensortower + '" target="_blank" />').append(' »')
                //location.href = sensortower
            }
        }


    }, 2000)
    window.setInterval(function () {
        $('.head').removeClass('fixed')

        $('.data-table a.icon').each(function () {
            let appid = $(this).attr('href')
            if (!appid.includes('apple.com')) {
                appid = S(appid).replaceAll('/app/rank/appid/', '').replaceAll('/country/us', '').s
                appid = 'https://apps.apple.com/us/app/id' + appid
                $(this).attr('href', appid)
            }

        })

        $('.app-name, .info-content .medium-txt a').each(function () {
            let appName = $(this).text()
            appName = S(appName)
                .replaceAll('***', 'VPN')
                .s
            appName = appName.replace(/\\'/g, "'");
            $(this).text(appName)
        })
        $('.data-table tr td:nth-child(4) .rank-txt').each(function () {
            let rank = $(this).text()

            rank = S(rank)
                .replaceAll('新进榜', 'NEW')
                .s
            rank = rank.replace(/\\'/g, "'");
            $(this).text(rank)

            if (S(rank).contains('NEW')) {
                $(this).parents('tr').css('background-color', 'yellow')
            }
        })
        $('td:nth-child(5) .rank-a').each(function () {
            if ($(this).text() != '-') {
                $(this).parents('tr').css('background-color', 'yellow')
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

        $('div[data-test="app-overview-non-unified"]').prev().hide()
        $('th.app-metric').eq(-1).click()

        $('td.app-metric:last-child a').each(function () {
            if (!$(this).text().includes('< $5k')) {
                $(this).parents('tr').addClass('yt-highlight')
            }
        })
        $('.app-icon a').each(function () {
            let appID = $(this).attr('href').split('/').slice(-2)[0]
            let appURL = 'https://apps.apple.com/us/app/id' + appID
            $(this).attr('href', appURL).attr('target', '_blank')
        })
        $('.app-info .name').each(function () {
            let appID = $(this).attr('href').split('/').slice(-2)[0]
            let appURL = 'https://app.sensortower.com/overview/' + appID + '?country=US'
            $(this).attr('href', appURL).attr('target', '_blank')
        })

    }, 1000)

}
