// ==UserScript==
// @name           Buy Linode Tokyo
// @namespace      Buy Linode Tokyo
// @description    Buy Linode Tokyo
// @match        https://manager.linode.com/linodes/add*
// @version    0.2
// @copyright  2015+, ytzong
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "about:blank");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.head.appendChild(script);
    }, false);
    document.head.appendChild(script);
}

function main() {
    try {
    	document.getElementById('linode1024.4').checked = true;
        document.getElementById('DatacenterID').value = 8;
    }
    catch (e) { }
}
addJQuery(main);