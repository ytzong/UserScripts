// ==UserScript==
// @name         Google for ytzong
// @version      2022.01.16
// @author       ytzong
// @description  Google
// @include      http*://*google.*/search*
// @copyright    2019+
// @run-at       document-end
// @grant        GM_addStyle

// ==/UserScript==

GM_addStyle('#hdtbMenus{background-color:yellow !important}');
try {
    window.setTimeout(function(){
        document.querySelector('#hdtb-tls').click();
    }, 2000)
    
}
catch (e){
    
}