// ==UserScript==
// @name         dysfz
// @version      0.1
// @author       ytzong
// @description  dysfz
// @include      *://*dysfz.*/*
// @copyright    2018+
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/string.js/3.3.3/string.min.js
// ==/UserScript==

GM_addStyle('body{padding-bottom:25vh}.item-fifth-dl, .actGotop{display:none !important;}.dbscore b{font-size:20px;color:#12c}.movie-list .des .txt{line-height:1.5!important}.movie-list .des .txt p{/*position:absolute;bottom:20px;right:20px;text-align: right;*/}');

let blacks = ['红包', '不要错过', '【日本】', '动画', '纪录片', '歌舞', '演唱会', '短片', '真人秀', '音乐剧'];

$('.movie-list li').each(function(i, e){
    let title = $(this).find('h2').text();
    console.log(title)
    let tag = $(this).find('.des .txt p').text();
    let shoudHide = 0;
	for (let b of blacks) {
		if (S(title).contains(b)) shoudHide = 1;
        if (S(tag).contains(b)) shoudHide = 1;
	}
    if (shoudHide == 1) $(this).hide();
    
    $(this).find('.des .txt p br').remove();
    
    let doubanLinks = $(this).find('.des .txt p a[rel="nofollow"]');
    if (doubanLinks.length > 0) {
        let doubanLink = doubanLinks[0]
        console.log(doubanLink)
        if (S(doubanLink).contains('douban.com')) {
            $(this).find('.dbscore b').wrap('<a href="' + doubanLink +'"></a>')
        }
    }
    
})
$('.actGotop').remove()
/*
let doubanLink = 'https://movie.douban.com/subject/26636712/';
setTimeout(function(){
   //$('body').append('<iframe id="yt-iframe" src ="' + doubanLink + '"></iframe>');
   //$('.footer').load(doubanLink + ' .a_stars');
   jQuery.ajax({
     url: doubanLink,
     //dataType: 'json',
     xhrFields: { withCredentials: true },
     success: function(data) {
     console.log(data);
     }
    });

}, 3000);
*/
/*
setTimeout(function(){
   var mine = $('#yt-iframe').contents().find('.a_stars').text();
   console.log(mine);
}, 15000);
*/
