// ==UserScript==
// @name         Douban to IMDb
// @version      2022.12.12
// @author       ytzong
// @description  Douban Movie Score to IMDb
// @include      http*://www.imdb.com/*
// @include      http*://movie.douban.com/subject/*
// @copyright    2019+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require      https://cdn.rawgit.com/jprichardson/string.js/master/dist/string.min.js
// @require      https://greasyfork.org/scripts/426455-imdb-link-back/code/imdb%20link%20back.user.js
// ==/UserScript==

//使用说明在最下面

if (location.hostname == 'movie.douban.com') {
    GM_addStyle('#dale_movie_subject_inner_middle{display:none!important}');

    var status = $('.a_stars').text();
    let id = location.pathname.split('/')[2]
    let imdb = $('#info a').eq(-1).text().trim()
    let imdbLink
    if (imdb.includes('tt')) {
        imdbLink = 'https://www.imdb.com/title/' + imdb + '/'
    }
    if (status.includes('我看过这部')) {
        var dbscore = $('input[id="n_rating"]').val();
        var score = parseInt(dbscore) * 2;

        if (imdb.includes('tt')) {
            imdbLink += '#' + score
            window.open(imdbLink);
            //window.setTimeout(function() { window.close() }, 1000);
        }
    }

    let title = $('html head title').text();
    title = title.replace('(豆瓣)', '').trim()
    let title_en = $('span[property="v:itemreviewed"]').text() + ' ' + $('.year').eq(0).text().replace('(', '').replace(')', '')
    title_en = title_en.replace(title, '').trim()
    if (imdb.includes('tt')) { }
    else {
        imdb = title
    }

    $('.aside').prepend('<div class="tags"><h2><i>下载</i>· · · · · ·</h2><div id="dl-sites" class="tags-body"></div></div><div class="tags"><h2><i>字幕</i>· · · · · ·</h2><div id="sub-sites" class="tags-body"></div></div>')

    let dl_sites = {
        'SubDH': 'https://subdh.com/d/' + id,
        '片库': 'https://www.btnull.org/s/1---1/' + imdb + '.html',
        '片吧': 'http://so.pianbar.net/search.aspx?s=movie&q=' + title,
        //'下片片': 'http://search.xiepp.com/search.aspx?s=movie&q=' + title,
        'BT之家': 'https://www.btbtt17.com/search-index-keyword-' + title + '.htm',
        '音范丝4K': 'https://www.yinfans.me/?s=' + title,
        '电影蜜蜂': 'https://www.idybee.com/?post_type=post&s=' + title,
        '极影': 'https://www.jiyingw.net/?s=' + title,
        'Mini4K': 'https://www.mini4k.com/search?term=' + title,
        //'爱笑聚': 'https://www.aixiaoju.com//app-thread-run?app=search&keywords=' + imdb,
        'BTSOW': 'https://btsow.beauty/search/' + title_en,
        'RARBG': 'https://rarbg.to/torrents.php?order=size&by=DESC&search=' + imdb,
        'IBit': 'https://ibit.to/torrent-search/' + title_en + '/Movies/size:desc/1/',
        'BD2020': 'https://www.bd2020.co/search.jspx?q=' + imdb
    }
    for (name in dl_sites) {
        link = dl_sites[name];
        link = $('<a></a>').attr('href', link);
        link.attr('target', '_blank').attr('rel', 'nofollow');
        link.html(name);
        $('#dl-sites').append(link);
    }

    let sub_sites = {
        'SubHD': 'https://subhd.tv/d/' + id,
        '字幕库': 'http://www.zimuku.org/search?q=' + imdb,
        'A4K': 'https://www.a4k.net/search?term=' + title,
        '伪射手': 'http://assrt.net/sub/?searchword=' + title
    };
    for (name in sub_sites) {
        link = sub_sites[name];
        link = $('<a></a>').attr('href', link);
        link.attr('target', '_blank').attr('rel', 'nofollow');
        link.html(name);
        $('#sub-sites').append(link);
    }
}

if (location.hostname == 'www.imdb.com') {
    if (S(location.pathname).startsWith('/title/')) {
        GM_addStyle('#yt-message{position:absolute;top:0;left:50%; margin-left:-100px;width:200px;height:15px;line-height:15px;background:yellow;border-radius: 2px;text-align:center;font-size:11px;}#yt-links{display:block;border-top: 1px solid #cccccc;padding: 10px 20px;background-color:#EFE3A4;text-align:center}#yt-links a{display:inline-block;margin-right:20px;padding:8px 16px;background-color: #0091EA;color:white;text-transform:capitalize;border-radius: 2px;}');

        let origin = $('li[data-testid="title-details-origin"] ul').text()
        //if (origin.includes('India')) window.close()

        let genres = $('li[data-testid="storyline-genres"] ul').text()
        //if (genres.includes('Documentary') || genres.includes('Animation')) window.close()
        //新版
        let id = location.pathname.split('/')[2]
        window.setTimeout(function () {
            let doubanLink = 'https://movie.douban.com/subject_search?search_text=' + id
            $('ul[data-testid="hero-subnav-bar-topic-links"]').append('<li role="presentation" class="ipc-inline-list__item"><a target="_blank" href="' + doubanLink + '" class="ipc-link ipc-link--baseAlt ipc-link--inherit-color" data-testid="hero-subnav-bar-imdb-pro-link">Douban</a></li>')
        }, 1000);

        let score = location.hash.replace('#', '')
        if (score.length > 0) {
            window.setTimeout(function () {
                $('div[data-testid="hero-rating-bar__user-rating"] .ipc-button').click()
            }, 6000);
            window.setTimeout(function () {
                $('button[aria-label="Rate ' + score + '"]').click()
            }, 7000);
            window.setTimeout(function () {
                $('.ipc-starbar + .ipc-button').click()

                $('ul[data-testid="hero-subnav-bar-topic-links"]').append('<li role="presentation" class="ipc-inline-list__item"><a href="https://search.douban.com/movie/subject_search?search_text=' + id + '&cat=1002" class="ipc-link ipc-link--baseAlt ipc-link--inherit-color">Douban</a></li>')
            }, 8000);
        }

        /*
        window.setTimeout(function() {
            if (score.length > 0) {
                $.post( "https://graphql.imdb.com/", {query:"mutation UpdateTitleRating($rating: Int!, $titleId: ID!) {\
  rateTitle(input: {rating: $rating, titleId: $titleId}) {\
    rating {\
      value\
      __typename\
    }\
    __typename\
  }\
}\
",operationName:"UpdateTitleRating",variables:{"rating":' + score + ',"titleId":"' + id + '"}} )
                .done(function( data ) {
                    var msg = '';
                    if (data.status == 200) {
                        msg = '打 ' + score + ' 分成功';
                        //window.close()
                    }
                    else msg = '错误码：' + data.status.toString();
                    $('body').append('<div id="yt-message">' + msg + '</div>');
                 });

            }
        }, 2000);

        */
        /*
          var id = $('meta[property="pageId"]').attr('content')
          var title = $('meta[name="title"]').attr('content')
          title = S(title).replaceAll(' - IMDb', '').s
          $('.title_block').after(insertLinks(id, title))

          window.setTimeout(function() {
              var score = location.hash.replace('#', '');
              if (score.length > 0) {
                  var auth = $('#star-rating-widget').attr('data-auth')

                  $.post( "/ratings/_ajax/title", { tconst: id, rating: score, auth: auth, tracking_tag: "title-maindetails", pageId: id, pageType: "title", subpageType: "main" } )
                  .done(function( data ) {
                      var msg = '';
                      if (data.status == 200) {
                          msg = '打 ' + score + ' 分成功';
                          //window.close()
                      }
                      else msg = '错误码：' + data.status.toString();
                      $('body').append('<div id="yt-message">' + msg + '</div>');
                   });

              }
          }, 2000);

          */
    }
    if (location.pathname.includes('/search/') || location.pathname.includes('/list/')) {
        GM_addStyle('#yt-links a{display:inline-block;margin-right:6px;text-transform:capitalize;}');
        $('.rating-star.user-rating').each(function () {
            $(this).parents('.lister-item').hide()
        })
        $('.ipl-rating-interactive__star').each(function () {
            if ($(this).is(':visible')) {
                $(this).parents('.lister-item').hide()
            }
        })
        $('.genre').each(function () {
            if ($(this).text().includes('Animation') || $(this).text().includes('Documentary')) {
                $(this).parents('.lister-item').hide()
            }
        })
        $('.lister-item-header a').each(function () {
            $(this).attr('target', '_blank')
        })
        $('.lister-item-header').each(function () {
            var title = $(this).find('a').text() + ' ' + $(this).find('.lister-item-year').text()
            var id = $(this).find('a').attr('href').split('/')[2]
            $(this).parent().after(insertLinks(id, title))
        })
    }
}
function insertLinks(id, title) {
    var entitle = encodeURIComponent(title)
    var douban = '<a href="https://movie.douban.com/subject_search?search_text=' + id + '&cat=1002" target="_blank">douban</a>'
    var sub1 = '<a href="https://www.zimuku.la/search?q=' + id + '" target="_blank">zimuku</a>'
    var sub2 = '<a href="https://subhd.tv/search0/' + entitle + '" target="_blank">subhd</a>'
    var dl1 = '<a href="http://search.xiepp.com/search.aspx?q=' + entitle + '" target="_blank">xiepp</a>'
    var dl2 = '<a href="https://www.88btbtt.com/search-index-keyword-' + entitle + '.htm" target="_blank">btbtt</a>'

    return '<span id="yt-links">' + douban + '</span>';
}
function openNewBackgroundTab(url) {
    var a = document.createElement("a");
    a.href = url
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
        true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}
/*
使用说明：

1. 安装扩展 https://chrome.google.com/webstore/detail/lfpjkncokllnfokkgpkobnkbkmelfefj 此扩展的作用是按 shift + 鼠标左键批量打开链接，注意设置页面打开间隔为3秒以上
2. 在我看过的电影页面批量打开看过电影，脚本就开始执行了，执行完会自动关闭页面。没做自动翻页，需手动翻页
3. 转移完成后记得关闭脚本
*/
