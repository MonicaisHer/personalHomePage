let options = {};
let observer = new IntersectionObserver(function(entries,observer){
	entries.forEach(function(entry) {
		if (entry.isIntersecting) {
			let photoSrc = $(entry.target).attr('data-src');
			if (typeof photoSrc !== undefined) $(entry.target).attr('src', photoSrc);	//img, iframe
			if ($(entry.target).hasClass('lazy')) $(entry.target).removeClass('lazy');	//css background
			observer.unobserve(entry.target);
		}
	});
}, options);

let targets = document.querySelectorAll('[data-src], .lazy');
targets.forEach(function(target){
	observer.observe(target);
});



