// ==UserScript==
// @name         DMM Large Photo
// @namespace    https://twitter.com/ytzong
// @version      2022.01.31
// @description  DMM Large Photo
// @author       ytzong
// @include      http*://*dmm.co.jp/*
// @include      http://unblockdmm.com/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

GM_addStyle(`
.area-tablebskt, .vline, .price a{display:none!important}
.box-rank{clear:both}
.tmb a{display:block}
#sample-video img{width:100% !important;height:auto !important}
.d-item #list li {display:inline-block;float:none !important; width:24% !important;overflow:hidden} 
#main-src .tmb:hover .img img{opacity:1 !important} 
#main-src[class*="digital"] .sample { top: 0!important;  left: 0!important;  margin-left: 0!important;}
#main-src .tmb .img {display:inline-block !important;width:auto !important;height:auto !important;margin:auto !important;}
#main-src .tmb .img img{display:inline-block !important}
.highlight{background-color:yellow}
`);


function YTFunc(){
    $('#sample-video').parent().removeClass('float-l').removeClass('mg-r12')
    $('#sample-video img').each(function(){
        var img = $(this).parent().attr('href');
        //img = img.replace('ps.jpg', 'pl.jpg');
        $(this).attr('src', img);
        //$(this).attr('style', 'max-width:none;max-height:none;margin-left:12px');
    });
    $('.d-item .img img').each(function(){
        var img = $(this).attr('src');
        img = img.replace('pt.jpg', 'pl.jpg');
        $(this).attr('src', img);
        $(this).attr('style', 'max-width:100%;max-height:none;margin-left:12px');
    });
    $('.d-item #list a').each(function(){
        $(this).attr('target', '_blank');
    });
    $('#sample-image-block img').each(function(){
        if ($(this).parent().attr('class') == 'crs_full') {
            var img = $(this).attr('src');
            img = img.replace('-', 'jp-');
            $(this).attr('src', img);
            $(this).attr('style', 'display:block;position:static; margin-left:auto;margin-right:auto;width:auto ;height:auto;cursor:default;max-width:100%');
        }
    });
    $('#sample-image-block a').each(function(){
        $(this).attr('style', 'width:auto ;height:auto;').attr('onmouseup', '');
    });
    $('#sample-image-block').attr('class', '')
    var numObj = $('.dcd-review__anchor_title').parent().prev().addClass('highlight').find('td').eq(1)

    var num = numObj.text();
    var mid = num.substring(num.length - 5, num.length - 5 + 2);
    if (mid == '00') num = num.substring(0, num.length - 5) + '-' + num.substring(num.length - 3);
    numObj.append(' ' + num);
}

YTFunc();
