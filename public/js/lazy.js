/*你就自己编程lazy loading吧：
做个lazy.js，在这个文件里管所有的：<img>、<iframe>、有background-image:...的tag

第一步：隐藏所有的照片和iframe。


第二步：看看你有没有滑到某个照片。
- 用intersection observer api: https://developers.google.com/web/updates/2016/04/intersectionobserver
- 记得：$('img')，$('iframe'), $('.lazy')

第三步：如果某个照片或者iframe的确在viewport里，用脚本告诉浏览器开始下载：
<img>, <iframe>：把data-src的内容复制到src即可
background-image：删掉lazy的类即可

---------------------------------------
*/


let options = {
}

let observer = new IntersectionObserver(function(entries,observer){
	entries.forEach(function(entry) {
		if ($(entry.target).hasClass('doorEffectBackground')) console.log(entry);
		if (entry.isIntersecting) {
			let photoSrc = $(entry.target).attr('data-src');
			console.log(photoSrc);
			if (typeof photoSrc !== undefined) $(entry.target).attr('src', photoSrc);
			if ($(entry.target).hasClass('lazy')) $(entry.target).removeClass('lazy');
		}
	});
}, options);

let targets = document.querySelectorAll('[data-src], .lazy');
targets.forEach(function(target){
	observer.observe(target);
});



