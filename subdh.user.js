// ==UserScript==
// @name         SubDH
// @version      2020.11.04
// @author       ytzong
// @description  
// @include      http*://*subdh.*/*
// @copyright    2020+
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==
// 

GM_addStyle('.btn-info{display:none} #magnets{position:fixed;right:0;bottom:0;width:300px;height:300px}')

$('body').append('<textarea id="magnets" />')
$('.mt-2 tr').click(function () {
    $(this).addClass('bg-light')
    let magnet = $(this).find('.btn-primary').attr('href')
    console.log(magnet)
    copyString(magnet)
    let magnets = $('#magnets').val() + '\n' + magnet
    magnets = magnets.trim()
    $('#magnets').val(magnets)
})



function copyString(str) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(str).select();
    document.execCommand("copy");
    $temp.remove();
}