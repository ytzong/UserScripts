// ==UserScript==
// @name         Auto Play
// @version      2022.01.19
// @author       ytzong
// @description  auto play
// @include      *javhdporn*/*
// @include      *bestjavporn*/*
// @copyright    2016+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @user-agent   Mozilla/5.0 (iPad; CPU OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1
// ==/UserScript==
//

window.setTimeout(function () {
    $('.play-button').click()
}, 1000)
window.setTimeout(function () {
    $('#player_3x2_close').click()
}, 2000)
window.setTimeout(function () {
    $('video')[0].play()
}, 3000)
