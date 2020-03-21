jQuery(function($){
	$('a[href*="#"]').on('click', function(e) {
 		e.preventDefault();

		let href = $(this).attr('href');
		if ($(href).length>0) {
			$('html,body').animate({
				scrollTop: $(href).offset().top
			}, 500, 'swing');
		}
	});



	$(window).scroll(function(e) {
		//console.log($('html').scrollTop());

		let windowScroll=$('html').scrollTop();

		$('.allDiv > div').each(function() {
			let containerTop=$(this).offset().top;
			let containerBottom=containerTop + $(this).outerHeight(true);

			let moveID = $(this).attr('id');
			if(windowScroll>=containerTop&&windowScroll<containerBottom) {
				//this container is active
				$('a[href="#' + moveID + '"]').addClass('linkActive');
			} else {
				//this container is NOT active
				$('a[href="#' + moveID + '"]').removeClass('linkActive');
			}
		});

	});
});