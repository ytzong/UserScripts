// ==UserScript==
// @name       QQ Auto Login
// @namespace  QQ Auto Login
// @version    0.1
// @description  QQ Auto Login
// @match      http://ui.ptlogin2.qq.com/cgi-bin/login*
// @match      http://xui.ptlogin2.qq.com/cgi-bin/xlogin*
// @match      http://ui.ptlogin2.tengpay.com/cgi-bin/login*
// @match      http://xui.ptlogin2.tenpay.com/cgi-bin/xlogin*
// @match      https://ui.ptlogin2.qq.com/cgi-bin/login*
// @match      https://xui.ptlogin2.qq.com/cgi-bin/xlogin*
// @match      https://ui.ptlogin2.tengpay.com/cgi-bin/login*
// @match      https://xui.ptlogin2.tenpay.com/cgi-bin/xlogin*
// @copyright  2014+, ytzong
// ==/UserScript==

var strDomain = window.location.hostname;

if (strDomain == 'xui.ptlogin2.qq.com') {
	document.getElementById('switcher_plogin').click();
    ytFunc1();
}

if (strDomain == 'ui.ptlogin2.qq.com') {
    ytFunc1();
    window.setTimeout(ytFunc2, 1000);
}

function ytFunc1(){
    document.getElementById('u').value = ''; //后面引号里输入你的QQ号码
    document.getElementById('p').value = ''; //后面引号里输入你的密码
}
function ytFunc2(){
    document.getElementById('login_button').click();
}
