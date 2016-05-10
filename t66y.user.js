// ==UserScript==
// @name           t66y
// @namespace      t66y
// @description    t66y
// @version        0.4
// @author         ytzong
// @include        http://www.t66y.com/*
// @include        http://t66y.com/*
// @include        http://cl.eye.rs/*
// @include        http://cl.yo.fi/*
// @include        http://cl.orc.st/*
// @include        http://cl.babi.info/*
// @include        http://cl.tedx.ee/*
// @include        http://cl.cn.mu/*
// @include        http://cl.bearhk.info/*
// @match        http://videowood.me/embed/*
// @match        http://videowood.tv/embed/*
// @grant          GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// ==/UserScript==

GM_addStyle('img, input{max-width:1000px;height:auto !important}#tbl1, #text1, .tips{display:none !important}.bd{position:relative;}.bd-link{position:absolute;bottom:6px;right:12px;background-color:yellow}.bd table, .bd tbody, .bd tr, .bd th, .bd td{display:block!important; width:100%!important;padding:0 !important}.bd h4{font-size:2em !important;margin-top:0 !important;}.bd h4, .bd .tpc_content{ text-align:center!important}.bd .r_two,.bd .tiptop{display:none!important}.tpc_content.do_not_catch:first-child{min-height:1000px}#iframe1{margin-top:90px}');

function main() {
	$(".tpc_content").first().css('min-height', '1000px');
    $('#iframe1').prev().prev().click()
    function rotate(deg) {
        var height = 100;
        var top = 0;
        if (deg % 360 == 90 || deg % 360 == 270) {
            height = 60;
            top = 10;
        }
        else {
            height = 100;
            top = 0;
        }
        $('#iframe1').attr('style', 'transform:rotate(' + deg + 'deg);');
	}
	var degree = 0;
    
	$(document).keydown(function(e) {
		//R
		if(e.keyCode == 82) {
			degree += 90
			rotate(degree)
		}
	})

	function resetImages() {
		$('.tpc_content a').each(function() {
			var str = $(this).attr('href');
			//str = str.replace(/http:\/\/www.viidii.info\/\?/g, "");
            str = str.replace('http://www.viidii.info/?', '');
            
			str = str.replace(/______/ig, ".");
			str = str.substring(0,str.length -2);
			$(this).attr("href", str);
		})

		$('.tpc_content input:image').each(function() {
			var imgUrl = $(this).attr("src");
            /*
			imgUrl = imgUrl.replace("window.open('http://www.viidii.com/?", "");
			imgUrl = imgUrl.replace("&z');return false;", "");
			imgUrl = imgUrl.replace(/______/ig, ".");
            */
			//alert(imgUrl);
			$(this).replaceWith("<img src=" + imgUrl + ">");
		})
	}

	resetImages();

	var listSelector = '#ajaxtable';
	if($(listSelector).length > 0) {
		var bdIndex = 0;
		var bdSelector = '.t2:eq(0)';
		var linkSelector = $(listSelector + ' h3 a');
		var pageNow = $('.pages b');
		var linkCount = linkSelector.length;
		$(listSelector).before('<div id="bd-1"></div>');

		var nextPage = pageNow.next().attr('href');
		var prevPage = pageNow.prev().attr('href');
var currentBdLink = '';
		function loadBd() {
			if($(listSelector)) {

				var link = document.location.href;
				var links = link.split('#');
				if(links.length > 1) {
					var num = parseInt(links[links.length - 1].replace('bd', ''));
					bdIndex = num + 1;
					$('.bd').hide();
					$('#bd' + bdIndex).show();
					link = links[0] + '#bd' + bdIndex.toString();
					if(bdIndex + 1 > linkCount)
						link = nextPage;
currentBdLink = linkSelector.get(bdIndex);
					for(var i = bdIndex; i < bdIndex + 5; i++) {
						if($('#bd' + i).length < 1) {
							$('#bd-1').append('<div id="bd' + i + '" class="bd" style="display:none"><div id="bd-inner' + i + '"></div></div>');
							$('#bd' + bdIndex).show();
							var bdLink = linkSelector.get(i);
							$('#bd-inner' + i).load(bdLink + ' ' + bdSelector, resetImages());
							$('#bd' + i).append('<a class="bd-link" target="_blank" href=' + bdLink + '>' + bdLink + '</a>');
						}
					}
				} else
					link += '#bd-1';
				window.location.href = link;
			};

		}

		loadBd();
        //V
    $(document).keydown(function (e) {
        if(e.keyCode == 86) {
            window.open(currentBdLink);
        }
    })
		//J 或 Q
		$(document).keydown(function(e) {
			if(e.keyCode == 74 || e.keyCode == 81) {
				loadBd();
			}
		})
		//K 或 W
		$(document).keydown(function(e) {
			if(e.keyCode == 75 || e.keyCode == 87) {
				var link = document.location.href;
				var links = link.split('#');
				if(links.length > 1) {
					var num = parseInt(links[links.length - 1].replace('bd', ''));
					if(num < 0)
						window.location.href = prevPage;
					else {
						bdIndex = num - 1;
						$('.bd').hide();
						for(var i = bdIndex; i < bdIndex + 1; i++) {
							if($('#bd' + i).length < 1) {
								$('#bd-1').append('<div id="bd' + i + '" class="bd" style="display:none"><div id="bd-inner' + i + '"></div></div>');
								var bdLink = linkSelector.get(i);
								$('#bd-inner' + i).load(bdLink + ' ' + bdSelector, resetImages());
								$('#bd' + i).append('<a class="bd-link" target="_blank" href=' + bdLink + '>' + bdLink + '</a>');
							}
						}
						link = links[0] + '#bd' + bdIndex.toString();
						window.location.href = link;
						$('#bd' + bdIndex).show();
					}
				}
			}
		})
	}
}

main();