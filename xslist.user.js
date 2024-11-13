// ==UserScript==
// @name        XsList
// @namespace   XsList
// @description XsList
// @include     http*://*xslist.*/*/model/*
// @version     2024.11.13
// @grant       GM_addStyle
// @run-at      document-end
// @require     https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

GM_addStyle(`
#relatedPost{display:none!important}
#movices{margin-bottom:300px}
#movices td:nth-child(1){font-weight:bold !important}
`)

$('#movices td:nth-child(1)').each(function () {
    let no = $(this).text()
    console.log(no)
    $(this).next().prepend('<a target="_blank" href="https://btsow.motorcycles/search/' + no + '">BTSOW</a> ')
    $(this).html('<a target="_blank" href="https://www.google.com/search?q=' + no + '">' + no + '</a>')
})