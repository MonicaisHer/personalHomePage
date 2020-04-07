jQuery(function($){
	var calculateParallax = function() {
		let windowHeight = $(window).height();
		let scrollTop = $(window).scrollTop();

		//for each section
		$('.parallaxSection').each(function() {
			let thisSection = this;

			let containerOffset = $(thisSection).offset().top;
			let relativeTop = scrollTop - containerOffset + 45;
			let ratio = relativeTop / $(thisSection).outerHeight();

			let initialized = $(thisSection).attr('data-parallax-initialized') == 1;

			//for each layer
			$(thisSection).children('.parallaxLayer').each(function() {
				let thisLayer = this;

				let parallaxIntensity = $(thisLayer).attr('data-parallax-intensity');
				let parallaxScale = $(thisLayer).attr('data-parallax-scale');

				if (!initialized) {
					$(thisLayer).css('height', $(thisSection).outerHeight() + 'px');
					$(thisLayer).find('.parallaxObjectInner').each(function() {
						$(this).css('transform','scale(' + (parallaxScale) + ')');
					});
				}

				let calculatedOffset = -ratio * $(thisSection).outerHeight() * parallaxIntensity;

				$(thisLayer).css('top', calculatedOffset+'px');
			});

			if (!initialized) $(thisSection).attr('data-parallax-initialized', 1);
		});
	};

	$(window).on('scroll',function() {
		calculateParallax();
	});
	calculateParallax();
});