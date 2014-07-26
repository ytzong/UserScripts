// ==UserScript==
// @name       Fuck QQMail
// @namespace  https://twitter.com/ytzong
// @version    0.1
// @description  Fuck QQMail
// @match      https://mail.qq.com/cgi-bin/readtemplate?t=safety*
// @copyright  2014+, ytzong
// ==/UserScript==

window.location.href = document.getElementsByClassName('safety-url')[0].innerHTML;