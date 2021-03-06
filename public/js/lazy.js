let options = {};
let observer = new IntersectionObserver(function(entries,observer){
	entries.forEach(function(entry) {
		if (entry.isIntersecting) {

			/*this is NOT an iframe*/
			if (entry.target.nodeName != 'IFRAME') {

				let newSrc = '';

				//1. Get new image src

				//img
				let photoSrc = entry.target.getAttribute('data-src');
				if (photoSrc) newSrc = photoSrc;
				//css background-image
				if (entry.target.classList.contains('lazy')) {
					newSrc = entry.target.getAttribute('data-css-src');
				}

				//console.log('New src: ' + newSrc);

				//2. Tell JS what to do when the image has been downloaded
				let preLoadImage = new Image();
				preLoadImage.onload = function() {

					//in here: replace the src/url

					//img, iframe
					entry.target.setAttribute('src', newSrc);	

					//css background
					if (entry.target.classList.contains('lazy')) {
						entry.target.style['background-image'] = 'url("' + newSrc + '")';
						entry.target.classList.remove('lazy');	
					}

				};

				//3. Start Downloading
				preLoadImage.src = newSrc;
			} else {
				//iframes
				entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
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

