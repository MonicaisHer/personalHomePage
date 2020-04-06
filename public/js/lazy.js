let options = {};
let observer = new IntersectionObserver(function(entries,observer){
	entries.forEach(function(entry) {
		if (entry.isIntersecting) {

			//img, iframe
			let photoSrc = $(entry.target).attr('data-src');
			if (typeof photoSrc !== undefined) $(entry.target).attr('src', photoSrc);	

			//css background
			if ($(entry.target).hasClass('lazy')) {
				let originalBgImage = $(entry.target).css('background-image');
				console.log(originalBgImage);
				let newBgImage = originalBgImage.replace("_preview","");
				$(entry.target).css('background-image', newBgImage);
				$(entry.target).removeClass('lazy');	
			}
			observer.unobserve(entry.target);
		}
	});
}, options);

let targets = document.querySelectorAll('[data-src], .lazy');
targets.forEach(function(target){
	observer.observe(target);
});


/*function imgPreview('data-src') {
  var str = document.getElementById("demo").innerHTML; 
  var res = str.replace("_preview", "");
  document.getElementById("demo").innerHTML = res;
};

*/

