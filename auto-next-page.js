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
// @include      *://*btbtt.*/*
// @include      *://*btbbt.*/*
// @include      *://*wuhaozhan.*/*
// @include      *://*.feng.com/*
// @include      *://*.mrskin.com/*
// @include      *://*smzdm.com/*
// @include      *://*zuanke8.com/*
// @include      *://*rec-tube.com/*
// @include      *://*tgfcer.com/*
// @include      *://*nga.cn/*
// @include      *://bbs.a9vg.com/*
// @include      *://*jdbbs.com/*
// @include      *://*mp4ba.com/*
// @include      *://*xclient.info/*
// @include      *://tieba.baidu.com/*
// @include      *://*cocoachina.com/bbs/*
// @include      *://*celebsdude.com/*
// @include      *://*chiphell.com/*
// @include      *://*koolshare.cn/*
// @include      *://*right.com.cn/*
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

var domain = location.host;
var pathname = location.pathname;
var $next = document.querySelector('.next');
if (domain.includes('91porn')) {
	$next = document.querySelector('span.pagingnav').nextElementSibling;
}
if (domain.includes('mrskin.com')) {
	if (pathname == '/') $next = document.querySelector('.load-more-btn');
	else $next = document.querySelector('.next a');
}
if (domain.includes('btbbt') || domain.includes('btbtt')) {
	$next = document.querySelector('.page .checked').nextElementSibling;
}
if (domain.includes('feng.com')) {
	$next = document.querySelector('.fast_next');
}
if (domain.includes('nga.cn')) {
	$next = document.querySelector('.uitxt1');
}
if (domain.includes('celebsdude')) {
	$next = document.querySelector('.next');
}
if (domain.includes('dysfz')) {
	$next = document.querySelector('.pageturn .next');
}
if (domain.includes('tieba.baidu.com')) {
	$next = document.querySelector('#frs_list_pager .next');
}
if (domain.includes('google')) {
	$next = document.querySelector('#pnnext');
}
if (domain.includes('mp4ba')) {
	$next = document.querySelector('.pagelink_a');
}
if (domain.includes('wuhaozhan')) {
	$next = document.querySelector('.pure-button-primary + a');
}
if (domain.includes('xclient')) {
	$next = document.querySelector('.next a');
}
if (domain.includes('0818tuan')) {
	try {
		document.querySelector('.pager a[title="总数"]').remove();
	} catch {}

	$next = document.querySelector('.pager b').nextElementSibling;
}
if (domain.includes('smzdm')) {
    if (pathname.includes('/p/')) $next = document.querySelector('.pagedown a');
    else $next = document.querySelector('.pagenation-list .current').nextElementSibling.querySelector('a');
}
if (domain.includes('right.com.cn') || domain.includes('zuanke8') || domain.includes('a9vg') || domain.includes('chiphell') || domain.includes('jdbbs') || domain.includes('koolshare')) {
	$next = document.querySelector('.pg strong').nextElementSibling;
}

if (domain.includes('cocoachina')) {
	$next = document.querySelector('.pages b').nextElementSibling;
}
if (domain.includes('tgfcer')) {
	$next = document.querySelector('.pages strong').nextElementSibling;
}
if (domain.includes('rec-tube')) {
	$next = document.querySelector('.col-xs-12 .pagination li:nth-last-child(2) a');
}
if (domain.includes('avsforum')) {
	$next = document.querySelector('a[rel="next"]');
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
		}, 300);
	};
	try {
		document.querySelector('html').setAttribute('style', 'padding-bottom:400px');
	} catch {}
}




