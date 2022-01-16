// ==UserScript==
// @name         0818tuan
// @version      2019.12.29
// @author       ytzong
// @description  0818tuan
// @include      *://*0818tuan.com/*
// @include      *://tb.zuanke8.com/*
// @include      *://*lanmaoyouhui.com/*
// @include      *://*hxm5.com/*
// @copyright    2017+
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cirocosta.github.io/qcode-decoder/build/qcode-decoder.min.js
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js
// ==/UserScript==

let domain = location.hostname
if (domain.includes('hxm5')) {
  GM_addStyle('#viewad, .mfoot, .boot-menu, .gg-wrapper, .comment, .chat-num, .rk-list-text p img, .rk-list-text p .rk-name, .gg-tt, .gg-oo, .rk_li_i, .author-info, .chat-sender .lazycm, .chat-sender div:nth-of-type(2) span, .chat-triangle, .gotop{display:none !important}#topic-desc p img, .comment-list p img{max-width:100%!important}.rk_li_r, .chat-sender div:nth-of-type(2), .chat-sender div:nth-of-type(3) .it{margin-left:0!important}.rk_ulist li{overflow:hidden}.chat-sender{display:none}')
  GM_addStyle('#pjax-container{min-height:1000px}')
  document.querySelectorAll('#topic-desc a').forEach(function(ele) {
	    // let text = ele.innerText;
	    // if (text.includes('item.') && text.includes('jd.com')) {
	    //   ele.href = text;
	    // }
      let text = ele.innerText;
      if (text.includes('http') && !text.includes('...') && !text.includes('…')) {
        ele.href = text;
      }
	
	    let url = ele.href;
      if (url.includes('hxm5.com/go/')) {
        url = getUrlParameter(url, 'rl')
        url = atob(url);
      }
	
	    url = decodeURIComponent(url);
			if (url.includes('view.action')) {
		        url = url + '.html'
		        url = url.replace(/ware\/view.action\?wareId=/g, '')
		        url = url.replace(/item.m.jd.com/g, 'item.jd.com')
		    }
			if (url.includes('item.jd.com') || url.includes('item.m.jd.com')) {
				//url = getJDAppURL(url);
			}
			
			ele.href = url;
			ele.rel = 'noreferrer';
	  });
  
  let blacks = '管理员, undefined'
    					.split(',');
  window.setTimeout(function(){
    
    document.querySelectorAll('.chat-sender').forEach(function(ele) {  
      let shoudHide = 0;
      let title = ele.innerText;
      for (let b of blacks) {
        if (title.includes(b.trim())) shoudHide = 1;
      }
      if (shoudHide == 0) ele.style.display = 'block';
    })
  }, 500);
  
  $('#topic-desc img').each(function(){
    let imgURL = $(this).attr('data-original')
    // imgURL = imgURL.replace('http:', 'https:')
    $(this).wrap('<a href="' + imgURL + '" target="_blank" />').attr('src', 'https://images.weserv.nl/?url=' + imgURL)
  })
}
if (domain.includes('0818tuan')) {
  GM_addStyle('#footer, .pinglun, iframe, .hb_pop, .hb_pop_cover, .panel-heading small, .alert{display:none!important}.col-md-4, .col-md-8 {float:none!important;width:auto !important;}.yt-source{margin-top:3em;text-align:center}.post-content img{display:inline !important;vertical-align: top;margin:1em 1em 1em 0;}.col-md-4, .list-group img, .list-group img + a {display: none !important}');
}

document.querySelectorAll('.list-group-item').forEach(function(ele) {
    let shoudHide = 0;
    
    let url = ele.href;
    if (!url.includes('.html')) shoudHide = 1;
    
    if(ele.querySelector('font')) shoudHide = 1;
  
  
    let title = ele.innerText;
	let blacks = '促销活动, [顶], ★, 苏宁0元拼购, 京东惊喜红包领24元方法, 分享再领两个, 必看活动, 惊喜三连发, 返利公众号, 置顶, 微信专享, ： ,好吃推荐！, 买单吧, A股, Air, 开奖了, 看你们, 快撸京东支付礼包, &gt;&gt;, >>'
			     .split(',')
	
	//if ($(this).find('img').length) shoudHide = 1;
	for (let b of blacks) {
		if (title.includes(b.trim())) shoudHide = 1;
	}
	if (shoudHide == 1) ele.style.display = 'none';
});
document.querySelectorAll('.post-content p').forEach(function(ele) {
    let shoudHide = 0;
    let blacks = '上一篇：, 下一篇：, 线报有时效性, 加入收藏, 收费群, 登录查看, 特别提醒'
    					.split(',')
    let title = ele.innerText;
	for (let b of blacks) {
		if (title.includes(b.trim())) shoudHide = 1;
	}
	if (shoudHide == 1) ele.style.display = 'none';
    
    var encodedStr = ele.innerHTML
    if (encodedStr.includes('&lt;')) {
        var parser = new DOMParser;
        var dom = parser.parseFromString(encodedStr, 'text/html');
        var decodedString = dom.body.textContent;
        ele.innerHTML = decodedString        
    }

});
/*
document.querySelectorAll('.post-content img').forEach(function(ele) {
    let url = ele.src;
    if (url.includes('zuanke8.com')){
        var wrapper = document.createElement('a');
        wrapper.href = 'x-icabmobile://x-callback-url/open?url=' + url
        ele.parentNode.insertBefore(wrapper, ele);
        wrapper.appendChild(ele);
    }
});
*/
var pathname = location.pathname;

if (location.pathname.includes('/xbhd/')) {
	$('img + br').remove();

	var time = 1000;
	var images = document.querySelectorAll('.post-content img');
	for (let image of images) {
		setTimeout(function() {
			var imgsrc = image.src;
            console.log(image.src);
			toDataURL(imgsrc, function(imageURI) {
				console.log(imageURI);

				QCodeDecoder().decodeFromImage(imageURI, function(err, strQR) {
					if (err) {
						console.log(err);
					} else {
						var strElement = '<p>';
						if (S(strQR).startsWith('http')) {
							strQR = decodeURIComponent(strQR);
							strQR = JDMall2Mobile(strQR);
							strElement += '👍<a target="_blank" rel="noreferrer" href="' + strQR + '">' + strQR + '</a>';
						} else {
							strElement += strQR;
						}
						strElement += '</p>';
						image.insertAdjacentHTML('afterend', strElement);
						image.parentNode.removeChild(image);
					}
				});

			});
			console.log('paused');
		}, time);
		time += 100;
	}
}

document.querySelectorAll('.post-content a').forEach(function(ele) {
  let text = ele.innerText;
	if (text.includes('http') && !text.includes('...') && !text.includes('…')) {
		ele.href = text;
	}

	let url = ele.href;
	url = url.replace(/http:\/\/jd.0818tuan.com\/url\/\?u=/g, '');
	url = url.replace(/http:\/\/www.0818tuan.com\/jd\/url\/\?u=/g, '');
	url = url.replace(/http:\/\/u.0818tuan.com\/jd\/\?u=/g, '');
	url = url.replace(/http:\/\/m.0818tuan.com\/jd\/\?u=/g, '');
  url = url.replace(/http:\/\/m.0818tuan.com\/suning\/\?visitUrl=/g, '');
  url = url.replace(/\/jump\/uland\/\?url=/g, '');
  url = url.replace(/http:\/\/m.0818tuan.com\/tao\/sclick.php\?url=/g, '');
  
  url = url.replace(/http:\/\/www.0818tuan.com\/tao\/taoke.php\?item_id=/g, 'https://item.taobao.com/item.htm?id=');    
  url = url.replace(/http:\/\/m.0818tuan.com\/tao\/taoke.php\?item_id=/g, 'https://item.taobao.com/item.htm?id=');
  url = url.replace(/http:\/\/m.0818tuan.com\/ele.php\?url=/g, ''); 
  url = url.replace(/http:\/\/m.0818tuan.com\/tao\/uland.php\?ulandurl=/g, '');   
  url = url.replace(/http:\/\/www.zuanke8.com\/jd.php\?search_kw=/g, '');
  url = url.replace(/http:\/\/www.zuanke8.com\/jd.php\?ali_itemid=/g, 'https://detail.tmall.com/item.htm?id=');
  
	url = decodeURIComponent(url);
    if (url.includes('view.action')) {
        url = url + '.html'
        url = url.replace(/ware\/view.action\?wareId=/g, '')
        url = url.replace(/item.m.jd.com/g, 'item.jd.com')
    }
	url = JDMall2Mobile(url);
    ele.href = url;
    ele.rel = 'noreferrer';
});

function getUrlParameter(url, name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(url);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}
function JDMall2Mobile(url) {
	var newURL = url;
	if (url.includes('mall.jd.com/index')) {
		var pathnames = url.split('/');
		var pathname = pathnames[pathnames.length - 1];
		pathnames = pathname.split('.');
		pathname = pathnames[0];
		pathname = pathname.replace(/index-/g, '');
		newURL = 'https://shop.m.jd.com/?shopId=' + pathname + '#';
	}
	if (url.includes('shop.m.jd.com')) {
		newURL += '#';
	}
	return newURL;
}
function getJDAppURL(url) {
	var pathnames = url.split('/');
	
	var id = pathnames[pathnames.length - 1].split('.')[0];
	var jdURL = 'openapp.jdmobile://virtual?params=%7B%22sourceValue%22:%220_productDetail_97%22,%22des%22:%22productDetail%22,%22skuId%22:%22' + id
				+ '%22,%22category%22:%22jump%22,%22sourceType%22:%22PCUBE_CHANNEL%22%7D';
	return jdURL;
}
function toDataURL(url, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onload = function() {
		var fileReader = new FileReader();
		fileReader.onloadend = function() {
			callback(fileReader.result);
		}
		fileReader.readAsDataURL(httpRequest.response);
	};
	httpRequest.open('GET', url);
	httpRequest.responseType = 'blob';
	httpRequest.send();
}

