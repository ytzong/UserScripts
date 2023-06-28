// ==UserScript==
// @name         Google for ytzong
// @version      2023.06.19
// @author       ytzong
// @description  Google
// @include      http*://*google.*/search*
// @copyright    2019+
// @run-at       document-end
// @grant        GM_addStyle

// ==/UserScript==

GM_addStyle(`
.logo+div+div+div{display:none !important}
#hdtbMenus{display:block!important;padding-top:3px;padding-bottom:7px; background-color:yellow !important}
`);
try {
    // window.setTimeout(function(){
    //     document.querySelector('#hdtb-tls').click();
    // }, 2000)
    // document.getElementById('hdtbMenus').style.display
}
catch (e) {

}