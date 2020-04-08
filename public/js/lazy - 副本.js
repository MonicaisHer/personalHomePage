let options = {};
let observer = new IntersectionObserver(function(entries,observer){
	entries.forEach(function(entry) {
		if (entry.isIntersecting) {

			/*this is NOT an iframe*/
			console.log(entry.target.nodeName);
			if (!$(entry.target).is('iframe')) {

				let newSrc = '';

				//1. Get new image src

				//img
				let photoSrc = $(entry.target).attr('data-src');
				if (typeof photoSrc !== undefined) newSrc = photoSrc;

				//css background-image
				if ($(entry.target).hasClass('lazy')) {
					/*let originalBgImage = $(entry.target).css('background-image');
					let newBgImage = originalBgImage.replace('_preview','');
					newBgImage = newBgImage.replace('url("','');
					newBgImage = newBgImage.replace('")','');
					newSrc = newBgImage;*/
					newSrc = $(entry.target).attr('data-css-src');
				}

				//console.log('New src: ' + newSrc);

				//2. Tell JS what to do when the image has been downloaded
				let preLoadImage = new Image();
				preLoadImage.onload = function() {

					//in here: replace the src/url

					//img, iframe
					$(entry.target).attr('src', newSrc);	

					//css background
					if ($(entry.target).hasClass('lazy')) {
						$(entry.target).css('background-image', 'url("' + newSrc + '"');
						$(entry.target).removeClass('lazy');	
					}

				};

				//3. Start Downloading
				preLoadImage.src = newSrc;
			} else {
				//iframes
				$(entry.target).attr('src', $(entry.target).attr('data-src'));
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

