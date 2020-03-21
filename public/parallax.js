jQuery(function($){
	$(window).on('scroll', function() {
		let containerHeight = $('#skillsContainer').outerHeight();
		let scrollTop = $(window).scrollTop();
		let containerTop = $('#skillsContainer').offset().top;
		let naviBarHeight = 45;
		let relativeTop = scrollTop - containerTop + naviBarHeight;
		let offsetRatio = relativeTop / containerHeight;
		console.log(scrollTop + ' | ' + containerTop + ' | ' + relativeTop + ' | ' + offsetRatio);
		//console.log(offsetRatio);
		$('#skillsContainer').css('background-position-y', (-offsetRatio*containerHeight*0.2)+'px');
	});
});