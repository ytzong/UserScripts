// ==UserScript==
// @name         Chaturbate
// @version      2025.08.18
// @author       ytzong
// @description  Chaturbate
// @include      http*://*chaturbate*/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @require      https://cdnjs.cloudflare.com/ajax/libs/string.js/3.3.3/string.min.js
// ==/UserScript==


// -------------------- CSS 注入 --------------------
GM_addStyle(`
.full-height{height:100vh!important;background:none!important}
#defchat>div.section:first-child{overflow:hidden!important}
body, .list{min-width:0!important}
.list{margin-left:2px!important}
#room_list, .topSectionWrapper{display:block!important}
.content .c-1{margin-left:0 !important;margin-right:0!important}
.room_list_room{max-height:none!important;margin:0 !important;border:none!important}
.room_list_room a{color:#f0f1f1!important}
.list .title a{color: #0A5B83!important;}
#discover_root .carousel{margin:0!important;border:0 none !important;background-color:transparent !important}
#discover_root .carousel-header{margin-left:0!important}
#discover_root ul.list{display:block!important;width:auto !important;height:auto!important;}
#discover_root .single-row ul.list>*:first-child,
#discover_root ul.list>*:first-child{margin-left:0!important}
.roomCard{max-height:none !important;margin-right:0!important;height:auto !important;}
.room_list_room img, .roomCard img{box-sizing:border-box!important; width:100%!important;height:auto!important;border-width:3px !important;border-style:solid !important;}
.list .thumbnail_label,.list .thumbnail_label_c_private_show,
.content div.labelContainer, .MoreRooms div.labelContainer{top:3px !important;left:3px !important;right:auto!important;bottom:auto!important}
.list .sub-info li.cams, .list .subject,.message{display:none!important}
#discover_root .room-list-carousel ul.list>li {float:left!important;}
#roomlist_root #room_list, #roomlist_root .roomlist_container ul.list, #roomlist_root .placeholder_roomlist_container ul.list{display:block!important}
/* 隐藏浮动聊天窗口 */
[data-testid="chat-floating-window"]{display:none!important !important;}
`);

// -------------------- 响应式 --------------------
GM_addStyle('@media (max-width: 800px) {.room_list_room,.roomCard{width:50%!important}}');
GM_addStyle('@media (max-width: 550px) {.room_list_room,.roomCard{width:100%!important}}');
GM_addStyle('@media (min-width: 801px) and (max-width: 1010px) {.room_list_room,.roomCard{width:33%!important}}');
GM_addStyle('@media (min-width: 1011px) {.room_list_room,.roomCard{width:24.5%!important}}');

// -------------------- 用户名 --------------------
const pathname = window.location.pathname;
const username = S(pathname).replaceAll('/', '').s;

// -------------------- 通用函数：生成 recSites URL --------------------
function makeRecURL(site, username) {
  const templates = {
    'rec-tube': `https://www.rec-tube.com/recent/search/${username}/`,
    'rectube': `https://www.rectube.webcam/models/${username}`,
    'fuckit': `https://www.fuckit.cc/models/${username}-chaturbate/`,
    'x1080hd': `https://x1080hd.com/tags/${username}`,
    'xcamladyx': `https://xcamladyx.com/tags/${username}`,
    'someonesister': `https://someonesister.com/tags/${username}`,
    'wxx.wtf': `https://www.wxx.wtf/search/${username}`,
    'xhomealone': `https://xhomealone.com/search/${username}`,
    'webcamleak': `https://webcamleak.com/search/${username}`,
    'livecamrips': `https://www.livecamrips.com/search/${username}/1`,
    'archivebate': `https://archivebate.com/profile/${username}`
  };
  return templates[site] || '#';
}

// -------------------- recSites --------------------
const recSites = {};
['rec-tube', 'rectube', 'fuckit', 'x1080hd', 'xcamladyx', 'someonesister', 'wxx.wtf', 'xhomealone', 'webcamleak', 'livecamrips', 'archivebate']
  .forEach(site => recSites[site] = makeRecURL(site, username));

// -------------------- 外链跳转 --------------------
if (pathname === '/external_link/') {
  const linkEl = document.getElementById('link');
  if (linkEl) location.href = linkEl.getAttribute('href');
}

// -------------------- Bio 高亮 --------------------
function highlightBioLabels() {
  document.querySelectorAll('.BioContents .label').forEach(label => {
    const text = label.textContent.trim();
    if (text === 'Location:' || text === 'I am:') {
      label.parentElement.style.backgroundColor = 'yellow';
      // 如果需要屏蔽某些用户，可以取消下面的注释
      // const nextText = label.nextElementSibling?.textContent?.trim() || '';
      // if (nextText.includes('Trans') || nextText === 'Male') window.close();
    }
  });
}

// -------------------- 主函数 --------------------
function main() {
  const observer = new MutationObserver(() => {
    const chatRoom = document.querySelector('.chat_room, .chat_roomlogin');
    if (chatRoom) {
      initPlayerPage();
      observer.disconnect();
    } else if (document.body) {
      initListPage();
      observer.disconnect();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

// -------------------- 播放页面初始化 --------------------
function initPlayerPage() {
  GM_addStyle(`
    .BaseRoomContents{margin:0!important;padding:0!important;border:0 none!important}
    #VideoPanel{border:0 none!important;width:100%!important;}
    .videoPlayerDiv{position:relative;left:50%!important;top:0!important;margin-left:-89vh!important;width:178vh!important;height:100vh!important;background-image:none!important}
    div[id^="neatDiv"], #header, .top-section, .reportAbuseLink, .tooltip.modern, .cbLogo, .playerTitleBar, .floatingPlayer, #footer-holder{display:none!important}
    .contentText *{position:static!important;background-image:none!important}
    #volume-mute + div + span{position:absolute}
    .BioContents h1 a, #tsContent h1 a{margin-right:.5em}
  `);

  document.querySelectorAll('.draggableCanvasWindow')?.forEach(el => el.parentElement?.remove());
  document.getElementById('SplitModeTipCallout')?.remove();

  // 首次执行 Bio 高亮
  highlightBioLabels();

  // -------------------- 按键检测 --------------------
  let degree = 0;
  document.addEventListener('keydown', e => { if (e.key === 'r' || e.key === 'R') { degree += 90; rotate(degree); } });

  // -------------------- 合并 MutationObserver + 定时器 --------------------
  function updateAll() {
    switchToHD();
    adjustUI();
    setTitleAndLinks();
    freezeChatFloatingWindow();
    highlightBioLabels(); // 保证动态加载也高亮
  }

  const playerContainer = document.querySelector('.videoPlayerDiv');
  if (playerContainer) {
    const obs = new MutationObserver(throttle(updateAll, 3000));
    obs.observe(playerContainer, { childList: true, subtree: true, attributes: true });
  }
  setInterval(updateAll, 3000);

  // -------------------- 捕获 m3u8 --------------------
  initM3U8Catcher();
}

// -------------------- 非播放页初始化 --------------------
function initListPage() {
  // 初次执行一次
  hideList();

  // 监听 room_list 容器
  const listContainer = document.querySelector('#room_list, .roomlist_container, .carousel-root');
  if (listContainer) {
    const listObserver = new MutationObserver(throttle(hideList, 1000));
    listObserver.observe(listContainer, { childList: true, subtree: true });
  }

  // 额外监听 body，确保 AJAX 动态注入时也会调用 hideList
  const bodyObserver = new MutationObserver(throttle(hideList, 1500));
  bodyObserver.observe(document.body, { childList: true, subtree: true });
}

// -------------------- switchToHD / adjustUI / setTitleAndLinks --------------------
function switchToHD() {
  try {
    const btnHD = document.querySelector('.vjs-icon-hd')?.nextElementSibling?.children?.[0]?.children?.[0];
    if (btnHD && getComputedStyle(btnHD).color !== 'rgb(244, 115, 33)') btnHD.click();
  } catch (e) { console.log('switchToHD error', e); }
}

function adjustUI() {
  try {
    document.querySelector('#VideoPanel .videoPlayerDiv')?.parentElement?.style?.setProperty('height', '100vh');
    if (document.getElementById('video-mode')?.textContent === 'Theater Mode')
      document.getElementById('video-mode').click();

    document.querySelectorAll('.reportAbuseLink + *')?.forEach(el => el.style.display = 'none');

    ['.roomSubjectTooltip', '.videoPlayerDiv'].forEach(selector => {
      const el = document.querySelector(selector)?.nextElementSibling;
      if (el && !el.classList.contains('full-height')) el.classList.add('full-height');
    });

    if (document.querySelector('.chatInnerDiv')?.offsetParent !== null)
      document.getElementById('chat-btn')?.click();

    document.querySelector('video')?.play();
  } catch (e) { console.log('adjustUI error', e); }
}

function setTitleAndLinks() {
  try {
    let T = document.querySelector('meta[property="og:title"]')?.content || '';
    T = S(T).replaceAll('Watch ', '').replaceAll(' live on Chaturbate!', '').s;
    document.title = T;

    if (!document.querySelector('.BioContents h1 a,#tsContent h1 a')) {
      const bioH1 = document.querySelector('.BioContents h1,#tsContent h1');
      if (bioH1) {
        bioH1.innerHTML = '';
        for (let name in recSites) {
          const link = document.createElement('a');
          link.href = recSites[name];
          link.target = '_blank';
          link.rel = 'nofollow';
          link.textContent = name;
          bioH1.appendChild(link);
        }
      }
    }
  } catch (e) { console.log('setTitleAndLinks error', e); }
}

// -------------------- 隐藏并冻结浮动聊天窗口 --------------------
function freezeChatFloatingWindow() {
  const chatEl = document.querySelector('[data-testid="chat-floating-window"]');
  if (chatEl) {
    chatEl.style.display = 'none';
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.addedNodes.length > 0) {
          m.addedNodes.forEach(n => {
            if (n.parentNode === chatEl) chatEl.removeChild(n);
          });
        }
      });
    });
    observer.observe(chatEl, { childList: true, subtree: true });
  }
}

// -------------------- hideList --------------------
function hideList() {
  if (pathname !== '/followed-cams/') {
    GM_addStyle(`
      .room_list_room a:visited, .roomCard a:visited, .room-list-carousel-wrapper a:visited{color:yellow!important}
      .list .title a:visited{color: #0A5B83!important;}
    `);
    document.querySelectorAll('.icon_following')?.forEach(el => el.parentElement?.style?.setProperty('display', 'none'));
  }
  if (pathname.includes('/discover/')) {
    document.querySelectorAll('.category-title')?.forEach(titleEl => {
      const catTitle = titleEl.textContent || '';
      if (catTitle.includes('Recently Watched') || catTitle.includes('Spy Shows') || catTitle.includes('Followed')) {
        titleEl.closest('.carousel-root')?.style?.setProperty('display', 'none');
      }
    });
  }
}

// -------------------- 视频旋转 --------------------
function rotate(deg) {
  const videoEl = document.querySelector('video');
  if (!videoEl) return;
  const height = window.innerHeight;
  const width = videoEl.offsetWidth;
  const zoom = (deg % 360 === 90 || deg % 360 === 270) ? height / width : 1;
  videoEl.style.transform = `rotate(${deg}deg) scale(${zoom},${zoom})`;
  videoEl.style.transformOrigin = 'center center';
}

// -------------------- 节流函数 --------------------
function throttle(fn, wait) { let lastTime = 0; return function (...args) { const now = Date.now(); if (now - lastTime > wait) { lastTime = now; fn.apply(this, args); } } }

// -------------------- m3u8 捕获 --------------------
function initM3U8Catcher() {
  function generateCommand(url) {
    let userMatch = url.match(/amlst:([^-\s]+)/);
    let username = userMatch ? userMatch[1] : "unknown";
    let now = new Date();
    let timestamp = now.getFullYear() + "-" +
      String(now.getMonth() + 1).padStart(2, '0') + "-" +
      String(now.getDate()).padStart(2, '0') + "-" +
      String(now.getHours()).padStart(2, '0') + "." +
      String(now.getMinutes()).padStart(2, '0') + "." +
      String(now.getSeconds()).padStart(2, '0');
    return `mkdir -p ~/Downloads/Video/${username}/\nffmpeg -i "${url}" -c copy ~/Downloads/Video/${username}/${timestamp}.mp4`;
  }

  function insertUI(command) {
    function createUI() {
      let h1 = document.querySelector("h1.bioHeader");
      if (!h1) return false;
      if (document.querySelector("#ffmpegCommandBox")) return true;
      let container = document.createElement("div");
      container.style.marginBottom = "10px";
      container.style.position = "relative";
      let textarea = document.createElement("textarea");
      textarea.id = "ffmpegCommandBox";
      textarea.style.width = "100%";
      textarea.style.height = "60px";
      textarea.style.cursor = "pointer";
      textarea.value = command;
      let label = document.createElement("span");
      label.textContent = "";
      label.style.position = "absolute";
      label.style.right = "3px";
      label.style.top = "3px";
      textarea.onclick = () => {
        const copyAction = () => { label.textContent = "✅ 复制成功"; setTimeout(() => { label.textContent = ""; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textarea.value).then(copyAction).catch(() => { GM_setClipboard(textarea.value); copyAction(); });
        } else { GM_setClipboard(textarea.value); copyAction(); }
      };
      container.appendChild(textarea);
      container.appendChild(label);
      h1.parentNode.insertBefore(container, h1);
      return true;
    }
    if (!createUI()) {
      const observer = new MutationObserver(() => { if (createUI()) observer.disconnect(); });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  function handleM3U8(url) {
    if (!url.includes(".m3u8")) return;
    let cmd = generateCommand(url);
    console.log("%c[FFmpeg Command]", "color:green;font-weight:bold;", cmd);
    insertUI(cmd);
  }

  const origFetch = window.fetch;
  window.fetch = function (...args) {
    if (args[0] && typeof args[0] === "string" && args[0].includes(".m3u8")) handleM3U8(args[0]);
    return origFetch.apply(this, args);
  };
  const origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    if (url && typeof url === "string" && url.includes(".m3u8")) handleM3U8(url);
    return origOpen.call(this, method, url, ...rest);
  };
  console.log("%c[Userscript] Chaturbate M3U8 catcher running...", "color: blue; font-weight: bold;");
}

// -------------------- 启动 --------------------
main();