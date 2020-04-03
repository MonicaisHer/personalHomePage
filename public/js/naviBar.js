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
	

	//toggle
	$('#nav-toggle').on('click',function(){
		if ($(window).width() < 1024) $('#mobileNavi').css('display', ($('#mobileNavi').css('display')=='none')?'flex':'none');

		/*if( $('#mobileNavi').css('display')!='none') {
			$('#mobileNavi').css('display','none');
		} else {
			$('#mobileNavi').css('display','flex');
		}*/
	});

	//everything but the toggle
 	$(document).on('click',function(e){
 		if ($(window).width() < 1024 && !$(e.target).is('#nav-toggle') && $('#mobileNavi').css('display')!='none') $('#mobileNavi').css('display','none');
 	})

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