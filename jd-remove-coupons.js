// ==UserScript==
// @name         JD Remove Coupons
// @namespace    JD Remove Coupons
// @version      0.1
// @description  批量删除京东第三方店铺优惠券
// @author       ytzong
// @include      https://quan.jd.com/user_quan.action*
// @include      https://t.jd.com/vender/followVenderList.action
// @grant        none
// @run-at       document-end
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

var domain = window.location.hostname;

if (domain == 'quan.jd.com') {
	setTimeout(function () {
		var item = $('.coupon-item .c-range');
		if (item.length === 0) return;

		var i = 0;
		item.each(function () {
			var title = $(this).find('.range-item:eq(0) span.txt').text();
			if (title.includes(']店铺') || title.includes('茗茶') || title.includes('尿裤')) {
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
					success: function (result) { }
				});
				i++;
			}

		});
		if (i > 0) {
			setTimeout(function () {
				location.reload();
			}, 1000);
		}
	}, 2000);
}
if (domain == 't.jd.com') {
	//var item = $('.mf-shop-item');
	//if (item.length > 0 ) {
	setTimeout(function () {
		$('.batch-btn').trigger('click');
	}, 5000);
	setTimeout(function () {
		$('.batch-operate .u-check').trigger('click');
	}, 7000);
	setTimeout(function () {
		$('.batch-operate .u-unfollow').trigger('click');
	}, 9000);
	setTimeout(function () {
		$('.ui-dialog-btn-submit').trigger('click');
	}, 11000);
	setTimeout(function () {
		location.reload();
	}, 13000);
	//} 
}