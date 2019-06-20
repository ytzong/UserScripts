// ==UserScript==
// @name         Auto Next Page
// @version      0.1
// @author       ytzong
// @namespace    Auto Next Page
// @include      *://*google.*/*
// @include      *://*91porn*/*
// @include      *://*chaturbate*/*
// @include      *://*0818tuan*/*
// @include      *://*dysfz.*/*
// @include      *://*.feng.com/*
// @include      *://*.mrskin.com/*
// @include      *://*smzdm.com/*
// @include      *://*zuanke8.com/*
// @include      *://*tgfcer.com/*
// @include      *://*nga.cn/*
// @include      *://tieba.baidu.com/*
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

var domain = location.host;
var $next = document.querySelector('.next');
if (domain.includes('91porn')) {
	$next = document.querySelector('span.pagingnav').nextElementSibling;
}
if (domain.includes('mrskin.com')) {
	if (location.pathname == '/') $next = document.querySelector('.load-more-btn');
	else $next = document.querySelector('.next a');
}
if (domain.includes('feng.com')) {
	$next = document.querySelector('.fast_next');
}
if (domain.includes('nga.cn')) {
	$next = document.querySelector('.uitxt1');
}
if (domain.includes('tieba.baidu.com')) {
	$next = document.querySelector('#frs_list_pager .next');
}
if (domain.includes('google')) {
	$next = document.querySelector('#pnnext');
}
if (domain.includes('0818tuan')) {
	try {
		document.querySelector('.pager a[title="总数"]').remove();
	} catch {}

	$next = document.querySelector('.pager b').nextElementSibling;
}
if (domain.includes('smzdm')) {
	$next = document.querySelector('.pagenation-list .current').nextElementSibling.querySelector('a')
}
if (domain.includes('zuanke8')) {
	$next = document.querySelector('.pg strong').nextElementSibling;
}
if (domain.includes('tgfcer')) {
	$next = document.querySelector('.pages strong').nextElementSibling;
}

next = $next.getAttribute('href');
console.log(next);

if (next.length > 0) {
	var debounce_timer;
	window.onscroll = function() {
		if (debounce_timer) {
			window.clearTimeout(debounce_timer);
		}

		debounce_timer = window.setTimeout(function() {
			// run your actual function here
			var d = document.documentElement;
			var offset = d.scrollTop + window.innerHeight;
			var height = d.offsetHeight;

			console.log('offset = ' + offset);
			console.log('height = ' + height);

			if (offset + 1 >= height) {
				window.location.href = next;
				console.log('At the bottom');
			}
			console.log('Fire');
		}, 100);
	};
	try {
		document.querySelector('html').setAttribute('style', 'padding-bottom:300px');
	} catch {}
}