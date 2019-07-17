// ==UserScript==
// @name         Douban Movie Score to IMDb
// @version      0.1
// @author       ytzong
// @description  Douban Movie Score to IMDb
// @include      http*://www.imdb.com/title/*
// @include      http*://movie.douban.com/subject/*
// @copyright    2019+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

//使用说明在最下面

if (location.hostname == 'movie.douban.com') {
    GM_addStyle('');

    var status = $('.a_stars').text();
    
    if (status.includes('我看过这部电影')) {
        var dbscore = $('input[id="n_rating"]').val();
        var score = parseInt(dbscore) * 2;
        var imdb = $('#info a[rel="nofollow"]').text();
        
        $('#info a').each(function(){
            var link = $(this).attr('href');
            if (link.includes('imdb.com')) {
                var imdb = $(this).text();
                if (imdb.length > 0) {
                    imdb = 'https://www.imdb.com/title/' + imdb + '/#' + score
                    window.open(imdb);
                    window.setTimeout(function() { window.close() }, 300);
                }
            }
        })
    }
}

if (location.hostname == 'www.imdb.com') {
    GM_addStyle('#yt-message{position:absolute;top:0;left:50%; margin-left:-100px;width:200px;height:15px;line-height:15px;background:yellow;border-radius: 2px;text-align:center;font-size:11px;}');
    
    window.setTimeout(function() {
        var score = location.hash.replace('#', '');
        if (score.length > 0) {
            var auth = $('#star-rating-widget').attr('data-auth')
            var id = $('meta[property="pageId"]').attr('content')

            $.post( "/ratings/_ajax/title", { tconst: id, rating: score, auth: auth, tracking_tag: "title-maindetails", pageId: id, pageType: "title", subpageType: "main" } )
            .done(function( data ) {
                var msg = '';
                if (data.status == 200) {
                    msg = '打 ' + score + ' 分成功';
                    window.close()
                }
                else msg = '错误码：' + data.status.toString();
                $('body').append('<div id="yt-message">' + msg + '</div>');
             }); 
        }
    }, 2000);
}

/*
使用说明：

1. 安装扩展 https://chrome.google.com/webstore/detail/lfpjkncokllnfokkgpkobnkbkmelfefj 此扩展的作用是按 shift + 鼠标左键批量打开链接，注意设置页面打开间隔为3秒以上
2. 在我看过的电影页面批量打开看过电影，脚本就开始执行了，执行完会自动关闭页面。没做自动翻页，需手动翻页
3. 转移完成后记得关闭脚本
*/