// ==UserScript==
// @name         JD auto click
// @version      2020.03.25
// @author       ytzong
// @description  Chaturbate
// @include      http*://pro.m.jd.com/mall/active/*
// @copyright    2018+
// @run-at       document-end
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js

// ==/UserScript==

window.setTimeout(clickCoupon, 1000)

function clickCoupon() {
    let link = $('.free_coupon_module a').eq(0)
    //link.attr('target', '_blank')
    //let href = link.attr('href')
    //if (!href.includes('void(0)'))
    link.click()
}
