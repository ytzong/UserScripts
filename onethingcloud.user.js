// ==UserScript==
// @name         OneThingCloud
// @version      2020.07.11
// @author       ytzong
// @description  OneThingCloud
// @include      http*://*onethingpcs.com/*
// @copyright    2020+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

function startMain() {
    console.log('start ' + new Date().toTimeString())
    try {
        /*
              let n = jQuery('.task-list .btn-download').length
              jQuery('.task-list .btn-download').eq(getRandomInt(n)).click()
              jQuery('.task-list .btn-download').eq(getRandomInt(n)).click()
              jQuery('.task-list .btn-download').eq(getRandomInt(n)).click()
              //jQuery('.task-list .btn-download').click()
              */

        jQuery('.task-list .btn-download').eq(-5).click()
        jQuery('.task-list .btn-download').eq(1).click()
        jQuery('.task-list .btn-download').eq(0).click()

    }
    catch (e) {

    }
}
function reload() {

    if (new Date().getMinutes() % 2 == 0 && new Date().getSeconds() == 0) {
        console.log('refresh ' + new Date().toTimeString())
        window.location.reload(true)
    }
}
function stop() {

    if (new Date().getMinutes() % 2 == 0 && new Date().getSeconds() == 5) {
        console.log('stop ' + new Date().toTimeString())
        try {
            //jQuery('.task-list .btn-pause').click()

            jQuery('.task-item').each(function () {
                let speed = jQuery(this).find('.download span').text()
                if (!speed.includes('MB')) {
                    jQuery(this).find('.btn-pause').click()
                }
            })


        }
        catch (e) {

        }
    }
}
function start() {
    if (new Date().getMinutes() % 2 == 0 && new Date().getSeconds() == 20) {
        startMain()
    }
    if (new Date().getMinutes() % 2 == 0 && new Date().getSeconds() == 30) {
        startMain()
    }
}

window.setInterval(reload, 1000)
window.setInterval(stop, 1000)
window.setInterval(start, 1000)



