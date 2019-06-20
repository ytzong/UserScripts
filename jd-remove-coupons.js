// ==UserScript==
// @name         JD Remove Coupons
// @namespace    JD Remove Coupons
// @version      0.1
// @description  批量删除京东第三方店铺优惠券
// @author       ytzong
// @match        https://quan.jd.com/user_quan.action*
// @grant        none
// @run-at       document-end
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

var url = 'https://quan.jd.com/user_quan.action?couponType=-1&sort=3&page=1';

setTimeout(function() {

	var item = $('.coupon-item .c-range');
	if (item.length === 0) return;
	location.href = url;
	item.each(function() {
		var title = $(this).find('.range-item:eq(0) span.txt').text();
		if (title.includes(']店铺')) {
			var para = {
				couponId: $(this).find('.range-item:eq(2) span.txt').text(),
				pin: document.cookie.replace(/(?:(?:^|.*;\s*)pin\s*\=\s*([^;]*).*$)|^.*$/, "$1")
			}
			jQuery.ajax({
				type: "POST",
				url: "/lock_coupon.action?r=" + Math.random(),
				data: para,
				dataType: "json",
				cache: false,
				success: function(result) {}
			});
		}

	});
	setTimeout(function() {
		location.href = url
	}, 1000);

}, 2000);