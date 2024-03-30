// ==UserScript==
// @name         GotoGitHub
// @version      2024.03.30
// @author       ytzong
// @description  GotoGitHub
// @include      http*://*swiftpackageregistry.com/*
// @include      http*://*swiftpackageindex.com/*
// @include      http*://*cocoapods.org/pods/*
// @include      http*://*npmjs.com/package/*
// @copyright    2024+
// @run-at       document-end

// ==/UserScript==
let domain = location.hostname

try {
    var element = document.querySelector(".jumbotron .btn-github")
    if (domain.includes("swiftpackageregistry")) {
        element = document.querySelector(".jumbotron .btn-github")
    }
    if (domain.includes("swiftpackageindex")) {
        element = document.querySelector(".sidebar-links .github")
    }
    if (domain.includes("cocoapods")) {
        element = document.querySelector(".github-link a")
    }
    if (domain.includes("npmjs")) {
        element = document.querySelector("#repository-link")
    }
    if (element) {
        var url = element.getAttribute("href")
        if (url) location.href = url
    }
}
catch (e) {

}