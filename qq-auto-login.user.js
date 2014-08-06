// ==UserScript==
// @name       QQ Auto Login
// @namespace  QQ Auto Login
// @version    0.1
// @description  QQ Auto Login
// @match      http://ui.ptlogin2.qq.com/cgi-bin/login*
// @copyright  2014+, ytzong
// ==/UserScript==

document.getElementById('p').value = ''; //后面引号里输入你的密码

function ytFunc(){
    document.getElementById('login_button').click();
}
window.setTimeout(ytFunc, 1000);