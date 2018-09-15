// ==UserScript==
// @name           discuz
// @namespace      discuz
// @description    discuz
// @version        0.2
// @author         ytzong
// @include        http://www.wdsz.net/thread*
// @include        http://www.wdxxsz.com/thread*
// @include        http://www.liangyingjie.com/thread*
// @include        http://www.rilee.cn/forum*
// @include        http://www.laolaosi.com/forum*
// @include        http://www.yhx256.com/forum*
// @include        http://www.wet123.net/forumdisplay*
// @include        http://www.sexinsex.net/bbs/forum*
// @run-at         document-end
// @grant          GM_addStyle
// @require        https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==
GM_addStyle('img, input{max-width:100%}.bd{position:relative;}.bd-link{position:absolute;top:10px;right:20px;background-color:yellow}#scrollBar, #imgList_0_small, .imgList h4{display:none}#imgList_0_all{display:block !important}');

var bdIndex = 0;
var url = document.location.href;
var urls = url.split('/');
var domain = urls[2];
if (domain == 'www.wdsz.net' || domain == 'www.wdxxsz.com' || domain == 'www.liangyingjie.com') {
    var listSelector = '#ajaxtable';
    var bdSelector = '#readfloor_tpc';
    var linkSelector = $(listSelector + ' .subject_t');
    //$(listSelector + ' tbody:eq(1)').hide();
    var pageNow = $('.pages b');
}
else if (domain == 'www.rilee.cn' || domain == 'www.laolaosi.com' || domain == 'www.wet123.net') {
    var listSelector = '.datatable';
    var bdSelector = '.firstpost';
    var linkSelector = $(listSelector + ' .subject span').not($('.threadpages')).find('a');
    //$(listSelector + ' tbody').hide();
    var pageNow = $('.pages strong');
}
else if (domain == 'www.yhx256.com') {
    var listSelector = '.threadlist';
    var bdSelector = '.mainbox.viewthread:eq(0)';
    var linkSelector = $(listSelector + ' .hot span').not($('.threadpages')).find('a');
    //$(listSelector).hide();
    var pageNow = $('.pages strong');
}
else if (domain == 'www.sexinsex.net') {
    var listSelector = 'form table';
    var bdSelector = '.defaultpost:eq(0)';
    var linkSelector = $(listSelector + ' .new span').not($('.threadpages')).find('a');
    //$(listSelector).hide();
    var pageNow = $('.pages strong');
}

var linkCount = linkSelector.length;
$(listSelector).before('<div id="bd-1"></div>');

var nextPage = pageNow.next().attr('href');
var prevPage = pageNow.prev().attr('href');

var currentBdLink = '';

function loadBd() {
    var link = document.location.href;
    var links = link.split('#');
    if (links.length > 1) {
        var num = parseInt(links[links.length - 1].replace('bd', ''));
        bdIndex = num + 1;
        $('.bd').hide();
        $('#bd' + bdIndex).show();
        link = links[0] + '#bd' + bdIndex.toString();
        if (bdIndex + 1 > linkCount)
            window.location.href = nextPage;
        currentBdLink = linkSelector.get(bdIndex);
        for (var i = bdIndex; i < bdIndex + 5; i++) {
            if ($('#bd' + i).length < 1) {
                $('#bd-1').append('<div id="bd' + i + '" class="bd" style="display:none"><div id="bd-inner' + i + '"></div></div>');
                $('#bd' + bdIndex).show();
                var bdLink = linkSelector.get(i);
                $('#bd-inner' + i).load(bdLink + ' ' + bdSelector);
                $('#bd' + i).append('<a class="bd-link" target="_blank" href=' + bdLink +'>' + $(bdLink).text() +'</a>');
            }
        }
    }
    else
        link += '#bd-1';
    window.history.pushState(null, null, link);
    $('#bd-1').get(0).scrollIntoView();
}
loadBd();

$(document).keydown(function (e) {
    //V
    if(e.keyCode == 86) {
        window.open(currentBdLink);
    }
    //J
    if(e.keyCode == 74 || e.keyCode == 81) {
        loadBd();
    }
    //K
    if(e.keyCode == 75 || e.keyCode == 87) {
        var link = document.location.href;
        var links = link.split('#');
        if (links.length > 1) {
            var num = parseInt(links[links.length - 1].replace('bd', ''));
            if (num < 0)
                window.location.href = prevPage;
            else {
                bdIndex = num - 1;
                $('.bd').hide();
                currentBdLink = linkSelector.get(bdIndex);
                for (var i = bdIndex; i < bdIndex + 1; i++) {
                    if ($('#bd' + i).length < 1) {
                        $('#bd-1').append('<div id="bd' + i + '" class="bd" style="display:none"><div id="bd-inner' + i + '"></div></div>');
                        var bdLink = linkSelector.get(i);
                        $('#bd-inner' + i).load(bdLink + ' ' + bdSelector);
                        $('#bd' + i).append('<a class="bd-link" target="_blank" href=' + bdLink +'>' + $(bdLink).text() +'</a>');
                    }
                }
                link = links[0] + '#bd' + bdIndex.toString();
                window.history.pushState(null, null, link);
                $('#bd-1').get(0).scrollIntoView();
                $('#bd' + bdIndex).show();
            }
        }
    }
});
