// ==UserScript==
// @name         jiuse
// @version      2026.3.8
// @author       ytzong
// @description  91Porny
// @include      http*://*jiuse*/*
// @include      http*://*91porny*/*
// @copyright    2016+
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @require      https://cdn.plyr.io/3.8.3/plyr.js
// @require      https://cdn.jsdelivr.net/npm/hls.js@1
// @user-agent   Mozilla/5.0 (iPad; CPU OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1
// ==/UserScript==

(function () {
    'use strict';

    const pathname = window.location.pathname;
    let shouldRedrict = false;
    const is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // 添加全局样式
    GM_addStyle(`
        #rd0, #rd1, #rd2, #rd7, #btm-tags,
        a[href='https://xhdwp1044.com'],
        .notification.is-warning,
        .page-jump-to, .jsv, .jsv-g1, .col-lg-1,
        #noticeModal, #warningModal, .modal-backdrop {
            display: none !important;
        }
        #main {
            margin: 0 !important;
            padding: 0 !important;
            max-width: none !important;
        }
        .highlight {
            background-color: yellow;
        }
        .pagination{padding-bottom:30px}
        @media screen and (min-width: 769px) {
              .column.is-10, .column.is-10-tablet {
                  width: 90%!important;
              }
              .column.is-2, .column.is-2-tablet {
                  width: 10%!important;
              }
        }
    `);

    // 布局调整
    $('.cateContainer').removeClass('col-lg-11').addClass('col-lg-5');
    $('.col-60').removeClass('col-lg-48').addClass('col-lg-54');
    $('.jsv').prev('.container-fluid').hide();

    // 防止模态框锁定
    setInterval(() => $('body').removeClass('modal-open'), 1000);

    $('#videoListPage, #videoShowPage').prevAll('.container-fluid').hide();

    // 高亮高播放量视频
    $('.video-elem .text-muted').each(function () {
        let text = $(this).text();
        if (text.includes('万次播放')) {
            $(this).parents('.video-elem').addClass('highlight');
            let playCount = text.split('|').pop().trim().replace('次播放', '');
            let html = text.replace(playCount, '<strong>' + playCount + '</strong>');
            $(this).html(html);
        }
    });

    // 作者页面处理
    if (pathname.includes('/author/')) {
        $(document).keydown(function (e) {
            if (e.keyCode == 83) { // S键
                let userID = pathname.split('/').pop();
                let url91 = 'https://91porn.com/search_result.php?search_type=search_users&search_id=' + userID;
                if (url91.length > 0) window.location.href = url91;
            }
        });

        $('.video-elem .text-muted').each(function () {
            if ($(this).text().includes('作者')) $(this).hide();
        });
    }

    // 高清重定向检查
    if (pathname.includes('/video/view/')) {
        let hd = $('.notification.is-success a').eq(0);
        if (hd.text().includes('高清')) {
            let hdURL = hd.attr('href');
            if (hdURL && hdURL.includes('/viewhd/')) {
                let redirect = getUrlParameter('redirect');
                if (redirect != '0') location.href = hdURL;
            }
        }
    }

    // 分类页面刷新
    if (pathname.includes('/video/category')) {
        if ($('.navTab + .row').text().includes('暂无推荐视频')) location.reload();
    }

    // 视频播放页面处理
    if (pathname.includes('/video/view')) {
        // 加载 Plyr 样式
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://cdn.plyr.io/3.8.3/plyr.css';
        document.getElementsByTagName("HEAD")[0].appendChild(link);

        // 添加视频页面样式
        GM_addStyle(`
            header, .alert, .notification,
            .vjs-error-display, .vjs-text-track-display, .vjs-control-bar,
            .vjs-loading-spinner, .vjs-poster,
            .link-secondary, .fa-bug {
                display: none !important;
            }
            #videoShowPage {
                max-width: none !important;
            }
            .downloadBtn, #video .is-danger {
                float: right;
            }
            .adv-pr, .row {
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
            .container-title, .videoInfos, #nav-tabContent {
                width: 100% !important;
            }
            #videoShowTabDownload {
                display: block !important;
            }
            #video-play, .videoPlayContainer {
                width: 100vw !important;
                height: 100vh !important;
                overflow: hidden !important;
            }
            .plyr {
                width: 100vw !important;
                height: 100vh !important;
            }
            .plyr video {
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
            }
            .yt-download {
                width: 100%;
                height: 50px;
            }
            #yt-download {
                position: absolute;
                right: 0;
                top: 0;
                padding: 3px 6px;
            }
        `);

        $('#video-play').parent().css('height', '100vh').css('padding-top', '0');

        const paths = pathname.split('/');
        const id = paths.slice(-1)[0];
        const user = $('.content.is-size-7 a').text().trim();
        const userid = getUrlParameter('userid');
        const count = getUrlParameter('count');
        const name = $('h4.container-title').text().trim();
        const videoURL = $('video').eq(0).attr('data-src');

        // 处理高清和默认视图
        if (pathname.includes('/video/viewhd')) {
            $('#video .column').eq(0).hide();
            $('#video .column').eq(1).addClass('is-full').removeClass('is-offset-2').removeClass('is-8');
            $('.tabs.is-centered ul').append('<li><a href="/video/view/' + id + '?redirect=0">默认</a></li>');
        } else {
            $('#video .column').eq(0).addClass('is-full').removeClass('is-offset-2').removeClass('is-8');
        }

        $('.videoPlayContainer').unwrap();
        $('#videoShowTabDownload').addClass('show');
        $('header').removeClass('d-block').removeClass('d-md-block');


        // 等待 DOM 稳定后初始化播放器
        setTimeout(function () {
            initPlayer2();
        }, 1500);

        function initPlayer2() {
            const video = $('video').eq(0)
            video.prop("muted", true);
            video.attr('controls', '').trigger('play');
        }
        function initPlayer() {

            // 获取视频源
            const src = $('video').eq(0).attr('data-src');
            if (!src) {
                console.error('视频源未找到');
                return;
            }

            // 创建新的视频元素
            const playerHTML = `
                <div id="yt-top" style="height:0;overflow:hidden"></div>
                <video id="yt-video" playsinline controls loop preload="auto"></video>
            `;

            // 替换原有播放器
            $('.videoPlayContainer').eq(0).html(playerHTML);

            const video = document.getElementById('yt-video');
            if (!video) {
                console.error('无法创建视频元素');
                return;
            }

            // 初始化 Plyr
            const player = new Plyr('#yt-video', {
                keyboard: {
                    focused: false,
                    global: true
                },
                controls: [
                    'play-large',
                    'play',
                    'progress',
                    'current-time',
                    'duration',
                    'mute',
                    'volume',
                    'settings',
                    'fullscreen'
                ],
                settings: ['quality', 'speed', 'loop'],
                speed: {
                    selected: 1,
                    options: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
                },
                hideControls: false,
                clickToPlay: true,
                disableContextMenu: false,
                autoplay: true,
                muted: false,
                loop: { active: true }
            });

            // 使用 HLS.js 加载视频
            if (Hls.isSupported()) {
                const hls = new Hls({
                    debug: false,
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 90
                });

                hls.loadSource(src);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    console.log('HLS manifest 已解析');

                    // 尝试自动播放
                    const playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            console.log('自动播放成功');
                        }).catch(error => {
                            console.log('自动播放失败，尝试静音播放:', error);
                            video.muted = true;
                            video.play().then(() => {
                                console.log('静音播放成功');
                                // 提示用户点击取消静音
                                setTimeout(() => {
                                    video.muted = false;
                                }, 1000);
                            }).catch(err => {
                                console.error('播放完全失败:', err);
                            });
                        });
                    }
                });

                hls.on(Hls.Events.ERROR, function (event, data) {
                    console.error('HLS 错误:', data);
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.log('网络错误，尝试恢复...');
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.log('媒体错误，尝试恢复...');
                                hls.recoverMediaError();
                                break;
                            default:
                                console.log('无法恢复的错误');
                                hls.destroy();
                                break;
                        }
                    }
                });

                // 保存 hls 实例以便后续使用
                window.hlsPlayer = hls;
                window.plyrInstance = player;

            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Safari 原生支持 HLS
                video.src = src;
                video.addEventListener('loadedmetadata', function () {
                    video.play().catch(error => {
                        console.log('自动播放失败:', error);
                        video.muted = true;
                        video.play().then(() => {
                            setTimeout(() => video.muted = false, 1000);
                        });
                    });
                });

                window.plyrInstance = player;
            }

            // Plyr 事件监听
            player.on('ready', event => {
                console.log('Plyr 播放器准备就绪');
            });

            player.on('playing', event => {
                console.log('视频正在播放');
            });

            player.on('error', event => {
                console.error('播放器错误:', event);
            });
        }

        // Safari 重定向处理
        if (shouldRedrict) {
            location.href = 'https://rss.ytzong.com/player.htm?url=' + encodeURIComponent(videoURL) +
                '&id=' + encodeURIComponent(id) + '&user=' + encodeURIComponent(user) +
                '&userid=' + encodeURIComponent(userid) + '&name=' + encodeURIComponent(name) +
                '&count=' + encodeURIComponent(count) + '&from=91porn';
        }

        // 设置视频标题
        const videoTitle = user + ' - ' + $('h1').eq(0).text().trim() + ' - ' + id;
        $('.container-title').eq(0)
            .after('<textarea class="yt-download">ffmpeg -i "' + videoURL + '" -c copy "' + videoTitle + '.mp4"</textarea>')
            .text(videoTitle);
        $('title').text(videoTitle);

        // 检查视频播放状态
        const mp4Param = getUrlParameter('mp4');
        if (mp4Param != '1') {
            setTimeout(function () {
                const videoElem = $('video')[0];
                if (videoElem && videoElem.currentTime == 0 && !videoElem.paused) {
                    // 视频未开始播放，尝试切换线路
                    const url = new URL(location.href);
                    let server = url.searchParams.get('server');

                    if (server == 'line1') {
                        url.searchParams.set('server', 'line2');
                    } else if (server == 'line2') {
                        url.searchParams.set('server', 'line3');
                    } else if (server == 'line3') {
                        url.searchParams.set('server', 'line1');
                    }

                    url.searchParams.set('mp4', '1');
                    // location.href = url;
                }
            }, 5000);
        }

        // 获取下载链接
        setTimeout(function () {
            GM_xmlhttpRequest({
                method: "GET",
                url: "/apiDownloadUrl/hd/" + id,
                onload: function (response) {
                    let mp4 = response.responseText.trim();
                    const url = new URL(mp4);
                    mp4 = url.toString();
                    $('.downloadBtn').after('<a id="yt-download" href="' + mp4 + '" download>下载</a>');
                }
            });
        }, 1000);

        // 复制功能
        $('.yt-download, .container-title').click(function () {
            copyString($(this).text());
        });

        function copyString(str) {
            const $temp = $("<input>");
            $("body").append($temp);
            $temp.val(str).select();
            document.execCommand("copy");
            $temp.remove();
        }

        // 视频旋转功能
        function rotate(deg) {
            const height = $(window).height();
            const width = $('video').eq(0).width();
            let zoom = 1;

            if (deg % 360 == 90 || deg % 360 == 270) {
                zoom = height / width;
            }

            $('video').css({
                'transform': `rotate(${deg}deg) scale(${zoom}, ${zoom})`,
                'transform-origin': 'center center'
            });
        }

        function scrollToPlayer() {
            $('html, body').animate({ scrollTop: 0 }, 0);
        }

        function copyTitle() {
            const $temp = $("<input>");
            $("body").append($temp);
            $temp.val($('title').text()).select();
            document.execCommand("copy");
            $temp.remove();
        }

        // 键盘快捷键
        let degree = 0;
        $(document).keydown(function (e) {
            const video = $('video').eq(0)[0];
            const videoWrapper = $('video').eq(0).parent();

            if (!video) return;

            switch (e.keyCode) {
                case 82: // R - 旋转
                    if (video.paused) video.play();
                    degree += 90;
                    rotate(degree);
                    scrollToPlayer();
                    break;

                case 187: // + - 放大
                    let zoomIn = parseFloat(videoWrapper.attr('yt-zoom')) || 1;
                    zoomIn += 0.2;
                    videoWrapper.css('transform', `scale(${zoomIn}, ${zoomIn})`).attr('yt-zoom', zoomIn);
                    break;

                case 189: // - - 缩小
                    let zoomOut = parseFloat(videoWrapper.attr('yt-zoom')) || 1;
                    if (zoomOut > 1) zoomOut -= 0.2;
                    videoWrapper.css('transform', `scale(${zoomOut}, ${zoomOut})`).attr('yt-zoom', zoomOut);
                    break;

                case 220: // \ - 重置缩放
                    videoWrapper.css('transform', 'scale(1, 1)').attr('yt-zoom', 1);
                    break;

                case 219: // [ - 左移
                    let leftMove = parseFloat(videoWrapper.attr('yt-left')) || 0;
                    leftMove -= 10;
                    videoWrapper.css('left', leftMove + '%').attr('yt-left', leftMove);
                    break;

                case 221: // ] - 右移
                    let rightMove = parseFloat(videoWrapper.attr('yt-left')) || 0;
                    rightMove += 10;
                    videoWrapper.css('left', rightMove + '%').attr('yt-left', rightMove);
                    break;

                case 68: // D - 下载
                    const downloadBtn = $('#yt-download')[0];
                    if (downloadBtn) downloadBtn.click();
                    break;

                case 67: // C - 复制标题
                    copyTitle();
                    break;

                case 80: // P - 播放/暂停
                    if (video.paused) video.play();
                    else video.pause();
                    break;

                case 70: // F - 跳转到高清
                    const hdLink = $('.tabs.is-centered a').eq(-1).attr('href');
                    if (hdLink && hdLink.length > 0) window.location.href = hdLink;
                    break;

                case 65: // A - 跳转到作者页面
                    const authorLink = $('.content.is-size-7 a').eq(0).attr('href');
                    if (authorLink && authorLink.length > 0) window.location.href = authorLink;
                    break;

                case 83: // S - 搜索用户
                    let userID = $('.content.is-size-7 a').text().trim();
                    if (pathname.includes('/author/')) userID = pathname.split('/').slice(-1)[0];
                    const url91 = 'https://91porn.com/search_result.php?search_type=search_users&search_id=' + userID;
                    if (url91.length > 0) window.location.href = url91;
                    break;

                case 39: // 右箭头 - 快进
                    if (video.paused) video.play();
                    scrollToPlayer();
                    video.currentTime += e.altKey ? 25 : 7;
                    break;

                case 37: // 左箭头 - 快退
                    if (video.paused) video.play();
                    scrollToPlayer();
                    video.currentTime -= e.altKey ? 25 : 7;
                    break;

                case 188: // , - 逐帧后退
                    scrollToPlayer();
                    video.currentTime -= 1 / 24;
                    break;

                case 190: // . - 逐帧前进
                    scrollToPlayer();
                    video.currentTime += 1 / 24;
                    break;

                case 81: // Q - 下一个
                case 74: // J - 下一个
                    const next = $('span.pagingnav').next().attr('href');
                    if (next && next.length > 0) self.location = next;
                    break;

                case 87: // W - 上一个
                case 75: // K - 上一个
                    const prev = $('span.pagingnav').prev().attr('href');
                    if (prev && prev.length > 0) self.location = prev;
                    break;
            }
        });
    }

    // 工具函数：获取URL参数
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }



})();
