// ==UserScript==
// @name         Schwab
// @version      2024.11.01
// @author       ytzong
// @description  Schwab
// @match        https://client.schwab.com/Areas/Trade/FixedIncomeSearch/FISearch.aspx/TradeBondsProductRates*
// @match        https://client.schwab.com/Areas/Trade/FixedIncomeSearch/FISearch.aspx/BondSearch*
// @copyright    2024+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
// ==/UserScript==


GM_addStyle('.yt-highlight{background-color:yellow!important}');

let pathname = location.pathname

if (pathname.includes('/TradeBondsProductRates')) {
    $('th').each(function () {
        if ($(this).text().includes('U.S. Treasuries')) {
            $(this).parents('tr').addClass('yt-highlight')
        }
    })
}

if (pathname.includes('/BondSearch')) {
    $('.automation-description').each(function () {
        if ($(this).text().includes('%')) {
            $(this).parents('tr').hide()
        }
    })

}

