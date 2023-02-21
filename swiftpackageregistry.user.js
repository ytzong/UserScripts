// ==UserScript==
// @name         SwiftPackageRegistry
// @version      2023.01.13
// @author       ytzong
// @description  SwiftPackageRegistry
// @include      http*://*swiftpackageregistry.com/*
// @copyright    2023+
// @run-at       document-end
// @grant        GM_addStyle

// ==/UserScript==


try {
    let url = $('.jumbotron .btn-github').attr('href')
    if (url) location.href = $('.jumbotron .btn-github').attr('href')
}
catch (e) {

}