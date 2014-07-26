// ==UserScript==
// @name       FFH6 Auto Download
// @namespace  http://twitter.com/ytzong
// @version    0.1
// @description  FFH6 Auto Download
// @match      http://www.ffh6.com/bt*
// @copyright  2014+, ytzong
// ==/UserScript==

function ytDownloadTorrent(){
    document.getElementsByClassName('button')[0].click();
}
window.setTimeout(ytDownloadTorrent, 3000);
