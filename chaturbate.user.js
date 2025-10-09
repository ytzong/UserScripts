// ==UserScript==
// @name         Chaturbate
// @version      2025.09.03
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
#header .ad,
/* 隐藏浮动聊天窗口 */
[data-testid="chat-floating-window"]{display:none!important;}
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

// -------------------- 优化后的节流函数 --------------------
function throttle(fn, wait) {
  let lastTime = 0;
  let timeoutId = null;

  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0) {
      // 立即执行
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timeoutId) {
      // 设置延迟执行
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        timeoutId = null;
        fn.apply(this, args);
      }, remaining);
    }
  }
}

// -------------------- 防抖函数（用于快速连续触发的场景）--------------------
function debounce(fn, wait) {
  let timeoutId = null;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), wait);
  };
}

// -------------------- 优化后的主函数 --------------------
function main() {
  // 使用更精确的检测
  const checkPageType = () => {
    const chatRoom = document.querySelector('.chat_room, .chat_roomlogin');
    const hasBody = document.body;

    if (chatRoom) {
      initPlayerPage();
      return 'player';
    } else if (hasBody) {
      initListPage();
      return 'list';
    }
    return null;
  };

  // 立即检查一次
  const pageType = checkPageType();

  if (!pageType) {
    // 如果页面还没准备好，使用优化的观察器
    const observer = new MutationObserver((mutations, obs) => {
      // 只检查添加的节点，忽略属性变化
      const hasSignificantChange = mutations.some(mutation =>
        mutation.addedNodes.length > 0 &&
        Array.from(mutation.addedNodes).some(node =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node.classList?.contains('chat_room') ||
           node.classList?.contains('chat_roomlogin') ||
           node === document.body)
        )
      );

      if (hasSignificantChange && checkPageType()) {
        obs.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: false  // 不监听属性变化
    });

    // 设置超时保护，避免观察器永远不断开
    setTimeout(() => {
      observer.disconnect();
      if (!checkPageType()) {
        initListPage(); // 默认初始化为列表页
      }
    }, 5000);
  }
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
  setInterval(updateAll, 1000);

  // -------------------- 捕获 m3u8 --------------------
  initM3U8Catcher();
}

// -------------------- 优化后的非播放页初始化 --------------------
function initListPage() {
  // 立即执行一次
  hideList();

  // 创建优化的节流/防抖函数
  const throttledHideList = throttle(hideList, 300);  // 减少到300ms
  const debouncedHideList = debounce(hideList, 100);   // 100ms防抖用于快速连续变化

  // 监听具体的房间列表容器，减少监听范围
  const specificSelectors = [
    '#room_list',
    '.roomlist_container',
    '.carousel-root',
    '#discover_root',
    '.room-list-carousel-wrapper'
  ];

  specificSelectors.forEach(selector => {
    const container = document.querySelector(selector);
    if (container) {
      const observer = new MutationObserver((mutations) => {
        // 检查是否有相关的DOM变化
        const hasRelevantChanges = mutations.some(mutation =>
          Array.from(mutation.addedNodes).some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.classList?.contains('room_list_room') ||
             node.classList?.contains('roomCard') ||
             node.querySelector?.('.room_list_room, .roomCard'))
          )
        );

        if (hasRelevantChanges) {
          debouncedHideList(); // 使用防抖处理快速连续的变化
        }
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: false  // 不监听属性变化，只监听DOM结构变化
      });
    }
  });

  // 监听路由变化（SPA应用）
  let lastPath = window.location.pathname;
  const checkPathChange = () => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      // 路由变化时立即执行
      setTimeout(hideList, 50);
    }
  };

  // 监听浏览器历史变化
  window.addEventListener('popstate', checkPathChange);

  // 重写pushState和replaceState以捕获SPA路由变化
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(checkPathChange, 50);
  };

  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    setTimeout(checkPathChange, 50);
  };

  // 使用 requestAnimationFrame 优化初始加载
  const optimizedInitialHide = () => {
    requestAnimationFrame(() => {
      hideList();
      // 再次检查，确保动态加载的内容也被处理
      setTimeout(hideList, 200);
    });
  };

  // 监听DOMContentLoaded和load事件
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizedInitialHide);
  } else {
    optimizedInitialHide();
  }

  window.addEventListener('load', optimizedInitialHide);
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

// -------------------- 优化后的 hideList 函数 --------------------
function hideList() {
  const currentPath = window.location.pathname;

  // 缓存选择器结果，避免重复查询
  const cache = new Map();
  const cachedQuery = (selector) => {
    if (!cache.has(selector)) {
      cache.set(selector, document.querySelectorAll(selector));
    }
    return cache.get(selector);
  };

  // 批量处理样式，减少重排重绘
  const stylesToApply = [];

  if (currentPath !== '/followed-cams/') {
    // 添加访问过的链接样式（只添加一次）
    if (!document.querySelector('#visitedLinksStyle')) {
      const style = document.createElement('style');
      style.id = 'visitedLinksStyle';
      style.textContent = `
        .room_list_room a:visited, .roomCard a:visited, .room-list-carousel-wrapper a:visited{color:yellow!important}
        .list .title a:visited{color: #0A5B83!important;}
      `;
      document.head.appendChild(style);
    }

    // 隐藏关注图标
    cachedQuery('.icon_following').forEach(el => {
      if (el.parentElement && el.parentElement.style.display !== 'none') {
        stylesToApply.push(() => el.parentElement.style.setProperty('display', 'none'));
      }
    });
  }

  if (currentPath.includes('/discover/')) {
    cachedQuery('.category-title').forEach(titleEl => {
      const catTitle = titleEl.textContent || '';
      if (catTitle.includes('Recently Watched') ||
          catTitle.includes('Spy Shows') ||
          catTitle.includes('Followed')) {
        const carousel = titleEl.closest('.carousel-root');
        if (carousel && carousel.style.display !== 'none') {
          stylesToApply.push(() => carousel.style.setProperty('display', 'none'));
        }
      }
    });
  }

  // 批量应用样式变更，减少重排重绘
  if (stylesToApply.length > 0) {
    requestAnimationFrame(() => {
      stylesToApply.forEach(styleFunction => styleFunction());
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